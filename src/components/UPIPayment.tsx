
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { sendBookingNotification } from "@/utils/notificationService";

interface BookingData {
  date: string;
  slots: string[];
  rawSlots?: string[];
  studioId: number;
}

const UPIPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("phonepe");
  const [showQR, setShowQR] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [userName, setUserName] = useState("Guest User");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve booking data from session storage
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
      } catch (error) {
        console.error("Failed to parse booking data:", error);
      }
    }
    
    // In a real app, we would get the user info from authentication
    // For now, we'll try to get it from localStorage for demo purposes
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.name) setUserName(user.name);
        if (user.phone) setUserPhone(user.phone);
        if (user.email) setUserEmail(user.email);
      }
    } catch (error) {
      console.error("Failed to get user info:", error);
    }
  }, []);
  
  const handlePayNow = () => {
    setShowQR(true);
    toast.success(`${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} QR code generated!`);
  };
  
  const handlePaymentComplete = () => {
    if (bookingData) {
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
      
      // Send notifications
      if (bookingData.slots.length > 0) {
        // Get the studio name (in a real app, this would come from the backend)
        const studioName = getStudioName(bookingData.studioId);
        
        // Send booking notification
        sendBookingNotification({
          studioId: bookingData.studioId,
          studioName: studioName,
          date: bookingData.date,
          time: bookingData.slots.join(", "),
          userPhone: userPhone,
          userEmail: userEmail,
          userName: userName
        });
      }
    }
    
    toast.success("Payment successful! Your booking is confirmed.");
    setShowQR(false);
    // Clear the booking data from session storage
    sessionStorage.removeItem('bookingData');
    // Navigate to booking confirmation page or back to studio
    const studioId = bookingData?.studioId || 1;
    navigate(`/booking/${studioId}`);
  };

  // Helper function to get studio name from ID
  const getStudioName = (studioId: number): string => {
    // In a real app, this would come from an API or store
    const studioNames: Record<number, string> = {
      1: "SoundWave Studios",
      2: "Echo Recording",
      3: "Rhythm Room",
      4: "Maestro Music Hall",
      5: "Sonic Space"
    };
    
    return studioNames[studioId] || "Studio";
  };

  // Get package data to calculate total
  const getPackageData = () => {
    const packageStored = sessionStorage.getItem('packageSelectionData');
    if (packageStored) {
      try {
        return JSON.parse(packageStored);
      } catch (error) {
        console.error("Failed to parse package data:", error);
      }
    }
    return null;
  };

  // Calculate total amount
  const calculateTotal = () => {
    const packageData = getPackageData();
    if (packageData && packageData.price) {
      return packageData.price;
    }
    
    const basePrice = 999; // Base price per slot
    const slotsCount = bookingData?.slots.length || 0;
    return basePrice * slotsCount;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Select Payment Method</CardTitle>
        {bookingData && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p>Booking for: {bookingData.date}</p>
            <p>Selected slots: {bookingData.slots.join(", ")}</p>
            <p className="font-medium mt-1">Total: ₹{calculateTotal().toLocaleString()}</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upi" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="upi">UPI Apps</TabsTrigger>
            <TabsTrigger value="cards">Credit/Debit Card</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upi" className="mt-4">
            <RadioGroup 
              defaultValue="phonepe" 
              className="grid grid-cols-3 gap-4"
              onValueChange={setPaymentMethod}
            >
              <div>
                <RadioGroupItem value="phonepe" id="phonepe" className="peer sr-only" />
                <Label
                  htmlFor="phonepe"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg" alt="PhonePe" className="h-12 w-12" />
                  <span className="mt-2 text-sm">PhonePe</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="paytm" id="paytm" className="peer sr-only" />
                <Label
                  htmlFor="paytm"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg" alt="Paytm" className="h-12 w-12" />
                  <span className="mt-2 text-sm">Paytm</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="gpay" id="gpay" className="peer sr-only" />
                <Label
                  htmlFor="gpay"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <img src="https://www.logo.wine/a/logo/Google_Pay/Google_Pay-Logo.wine.svg" alt="Google Pay" className="h-12 w-12" />
                  <span className="mt-2 text-sm">Google Pay</span>
                </Label>
              </div>
            </RadioGroup>
            
            {showQR ? (
              <div className="mt-6 flex flex-col items-center">
                <div className="p-4 bg-white rounded-lg shadow-xs mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://${paymentMethod}@axa/pay?pa=example@okaxis&pn=StudioBooking&am=${calculateTotal()}.00&cu=INR&tn=StudioBooking`} 
                    alt="QR Code" 
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">Scan this QR code to pay</p>
                <Button onClick={handlePaymentComplete}>
                  I've completed the payment
                </Button>
              </div>
            ) : (
              <Button onClick={handlePayNow} className="w-full mt-6">
                Pay Now
              </Button>
            )}
          </TabsContent>
          
          <TabsContent value="cards" className="mt-4">
            <p className="text-sm text-gray-600 mb-4">Credit/Debit Card payment integration with Razorpay</p>
            <Button className="w-full">
              Continue with Razorpay
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UPIPayment;
