
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UPIPayment from "@/components/UPIPayment";
import PaymentPackageSelector from "@/components/PaymentPackageSelector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { studios as mockStudios } from "@/utils/mockData";
import { ArrowLeft, CreditCard, Store } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingData {
  date: string;
  slots: string[];
  studioId: number;
}

const PaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [studio, setStudio] = useState<any>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [activeTab, setActiveTab] = useState("packages");
  const [packageData, setPackageData] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Find studio data
    const foundStudio = mockStudios.find(studio => studio.id.toString() === id);
    if (foundStudio) {
      setStudio(foundStudio);
    } else {
      toast.error("Studio not found");
      navigate("/");
    }

    // Get booking data from session storage
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
      } catch (error) {
        console.error("Failed to parse booking data:", error);
        toast.error("Invalid booking data");
      }
    } else {
      toast.error("No booking information found");
    }
    
    // Check if package data exists
    const packageStored = sessionStorage.getItem('packageSelectionData');
    if (packageStored) {
      try {
        const parsedPackage = JSON.parse(packageStored);
        setPackageData(parsedPackage);
      } catch (error) {
        console.error("Failed to parse package data:", error);
      }
    }
    
    // Add event listener for tab changing
    const handleTabChange = (e: CustomEvent) => {
      if (e.detail && e.detail.tab) {
        setActiveTab(e.detail.tab);
      }
    };
    
    document.addEventListener('changePaymentTab', handleTabChange as EventListener);
    
    return () => {
      document.removeEventListener('changePaymentTab', handleTabChange as EventListener);
    };
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowPayment(false);
  };

  const handlePayNow = () => {
    setShowPayment(true);
  };
  
  const handlePayAtStudio = () => {
    if (bookingData && packageData) {
      // Save booked slots to localStorage
      const date = bookingData.date;
      const rawSlots = bookingData.rawSlots || [];
      
      // Get existing booked slots
      const savedBookedSlots = localStorage.getItem('bookedSlots');
      let bookedSlots: Record<string, string[]> = {};
      
      if (savedBookedSlots) {
        try {
          bookedSlots = JSON.parse(savedBookedSlots);
        } catch (error) {
          console.error("Failed to parse booked slots:", error);
        }
      }
      
      // Update booked slots for this date
      bookedSlots[date] = [...(bookedSlots[date] || []), ...rawSlots];
      
      // Save back to localStorage
      localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
      
      // Store payment method information
      const bookingConfirmation = {
        studio: studio?.name || "Studio",
        date: bookingData.date,
        slots: bookingData.slots,
        package: packageData.basePackage,
        addons: packageData.addons,
        price: packageData.price,
        paymentMethod: "pay-at-studio"
      };
      
      // Store confirmation data in session storage
      sessionStorage.setItem('bookingConfirmation', JSON.stringify(bookingConfirmation));
      
      // Clear the booking data from session storage
      sessionStorage.removeItem('bookingData');
      
      // Navigate to booking confirmation page 
      navigate(`/booking/${id}`);
      
      toast.success("Booking confirmed! Please pay at the studio.");
    } else {
      toast.error("Missing booking or package information");
    }
  };
  
  // Get package data when moving to booking-details or payment tab
  useEffect(() => {
    if ((activeTab === 'booking-details' || activeTab === 'payment') && !packageData) {
      const packageStored = sessionStorage.getItem('packageSelectionData');
      if (packageStored) {
        try {
          const parsedPackage = JSON.parse(packageStored);
          setPackageData(parsedPackage);
        } catch (error) {
          console.error("Failed to parse package data:", error);
          toast.error("Please select a package first");
          setActiveTab('packages');
        }
      } else {
        toast.error("Please select a package first");
        setActiveTab('packages');
      }
    }
  }, [activeTab, packageData]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBackClick} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{studio?.name} - Payment</h1>
        <p className="text-muted-foreground">Complete your booking payment</p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="packages" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="packages">Choose Package</TabsTrigger>
            <TabsTrigger value="booking-details">Booking Details</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages">
            <PaymentPackageSelector />
          </TabsContent>
          
          <TabsContent value="booking-details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h2 className="text-xl font-semibold mb-2">Booking Summary</h2>
                  {bookingData ? (
                    <div className="space-y-2">
                      <p><span className="font-medium">Date:</span> {bookingData.date}</p>
                      <p><span className="font-medium">Time Slots:</span></p>
                      <ul className="list-disc pl-5">
                        {bookingData.slots.map((slot, index) => (
                          <li key={index}>{slot}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No booking information available</p>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Studio Details</h2>
                  {studio && (
                    <div className="flex items-start gap-4">
                      <img 
                        src={studio.imageUrl} 
                        alt={studio.name} 
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{studio.name}</h3>
                        <p className="text-sm text-muted-foreground">{studio.location}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm">⭐</span>
                          <span className="text-sm">{studio.rating}</span>
                          <span className="text-sm text-muted-foreground">({studio.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Package Information</h2>
                {packageData ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Selected Package:</h3>
                      <p className="capitalize">
                        {packageData.basePackage.split('-').join(' ')}
                      </p>
                    </div>
                    
                    {Object.entries(packageData.addons).some(([key, value]) => 
                      key !== 'reelsQuantity' && Boolean(value)
                    ) && (
                      <div>
                        <h3 className="font-medium">Add-ons:</h3>
                        <ul className="list-disc pl-5">
                          {packageData.addons.podcastEdit && (
                            <li>Podcast Edit Full</li>
                          )}
                          {packageData.addons.introTeaser && (
                            <li>Intro/Teaser</li>
                          )}
                          {packageData.addons.reels && (
                            <li>{packageData.addons.reelsQuantity} Reel(s)</li>
                          )}
                          {packageData.addons.thumbnail && (
                            <li>Thumbnail</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="text-xl font-bold">₹{packageData.price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button onClick={() => setActiveTab("payment")} className="w-full">
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please select your package options in the previous tab.
                    </p>
                    <Button onClick={() => setActiveTab("packages")} variant="outline">
                      Go to Package Selection
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
                  {packageData && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Selected Package:</h3>
                        <p className="capitalize">
                          {packageData.basePackage.split('-').join(' ')}
                        </p>
                      </div>
                      
                      {Object.entries(packageData.addons).some(([key, value]) => 
                        key !== 'reelsQuantity' && Boolean(value)
                      ) && (
                        <div>
                          <h3 className="font-medium">Add-ons:</h3>
                          <ul className="list-disc pl-5">
                            {packageData.addons.podcastEdit && (
                              <li>Podcast Edit Full</li>
                            )}
                            {packageData.addons.introTeaser && (
                              <li>Intro/Teaser</li>
                            )}
                            {packageData.addons.reels && (
                              <li>{packageData.addons.reelsQuantity} Reel(s)</li>
                            )}
                            {packageData.addons.thumbnail && (
                              <li>Thumbnail</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      <div className="pt-2 border-t mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Total Amount:</span>
                          <span className="text-xl font-bold">₹{packageData.price.toLocaleString()}</span>
                        </div>
                        
                        <div className="space-y-3">
                          <Button 
                            className="w-full flex items-center justify-center" 
                            onClick={handlePayNow}
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                          
                          <Button 
                            className="w-full flex items-center justify-center" 
                            variant="outline"
                            onClick={handlePayAtStudio}
                          >
                            <Store className="mr-2 h-4 w-4" />
                            Pay at Studio
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center">
                            Booking will be held for 10 mins past the slot start time. 
                            Please reach on time to retain your spot.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {showPayment && <UPIPayment />}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentPage;
