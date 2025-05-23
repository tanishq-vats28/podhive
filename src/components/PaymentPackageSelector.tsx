import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Film, Scissors, Image } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface PackageSelection {
  basePackage: string;
  addons: {
    podcastEdit: boolean;
    introTeaser: boolean;
    reels: boolean;
    reelsQuantity: number;
    thumbnail: boolean;
  };
}

const PaymentPackageSelector = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [selection, setSelection] = useState<PackageSelection>({
    basePackage: "studio-only",
    addons: {
      podcastEdit: false,
      introTeaser: false,
      reels: false,
      reelsQuantity: 1,
      thumbnail: false,
    }
  });
  
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    let price = 0;
    
    switch (selection.basePackage) {
      case "studio-only":
        price += 899;
        break;
      case "two-camera":
        price += 7000;
        break;
      case "three-camera":
        price += 10000;
        break;
      default:
        break;
    }
    
    if (selection.addons.podcastEdit) price += 1500;
    if (selection.addons.introTeaser) price += 1000;
    if (selection.addons.reels) price += 600 * selection.addons.reelsQuantity;
    if (selection.addons.thumbnail) price += 500;
    
    setTotalPrice(price);
  }, [selection]);
  
  const handleBasePackageChange = (value: string) => {
    setSelection(prev => ({
      ...prev,
      basePackage: value
    }));
  };
  
  const handleAddonChange = (addon: keyof typeof selection.addons, value: boolean | number) => {
    setSelection(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addon]: value
      }
    }));
  };
  
  const handleBookNow = () => {
    const storedData = sessionStorage.getItem('bookingData');
    if (!storedData) {
      toast.error("No booking information found");
      return;
    }
    
    try {
      const bookingData = JSON.parse(storedData);
      
      const packageData = {
        ...selection,
        price: totalPrice
      };
      
      sessionStorage.setItem('packageSelectionData', JSON.stringify(packageData));
      
      toast.success("Proceeding to payment", {
        description: "Taking you to the payment page"
      });
      
      const studioId = id || bookingData.studioId || "1";
      
      if (window.parent && typeof window.parent.postMessage === 'function') {
        window.parent.postMessage({ action: 'setActiveTab', value: 'payment' }, '*');
      }
      
      const event = new CustomEvent('changePaymentTab', { detail: { tab: 'payment' } });
      document.dispatchEvent(event);
    } catch (error) {
      console.error("Failed to process booking:", error);
      toast.error("Failed to process booking");
    }
  };
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select a Base Package</h2>
        <RadioGroup
          value={selection.basePackage}
          onValueChange={handleBasePackageChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className={`border rounded-lg p-4 ${selection.basePackage === "studio-only" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="studio-only" id="studio-only" className="sr-only" />
            <Label 
              htmlFor="studio-only" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <Mic className="h-5 w-5 mr-2 text-primary" />
                <span className="font-semibold">Studio Only</span>
              </div>
              <p className="text-lg font-bold text-primary mb-2">₹899</p>
              <ul className="text-sm text-muted-foreground grow">
                <li>• 1 hour studio access</li>
                <li>• No crew provided</li>
                <li>• Bring your own equipment</li>
              </ul>
            </Label>
          </div>
          
          <div className={`border rounded-lg p-4 ${selection.basePackage === "two-camera" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="two-camera" id="two-camera" className="sr-only" />
            <Label 
              htmlFor="two-camera" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <Camera className="h-5 w-5 mr-2 text-primary" />
                <span className="font-semibold">2 Camera Setup</span>
              </div>
              <p className="text-lg font-bold text-primary mb-2">₹7,000</p>
              <ul className="text-sm text-muted-foreground grow">
                <li>• 1 hour recording</li>
                <li>• 2 hour studio access</li>
                <li>• 2 cameras, 2 mics</li>
                <li>• Videographer & light man</li>
                <li>• RGB lighting setup</li>
              </ul>
            </Label>
          </div>
          
          <div className={`border rounded-lg p-4 ${selection.basePackage === "three-camera" ? "border-primary bg-primary/5" : "border-border"}`}>
            <RadioGroupItem value="three-camera" id="three-camera" className="sr-only" />
            <Label 
              htmlFor="three-camera" 
              className="flex flex-col h-full cursor-pointer"
            >
              <div className="flex items-center mb-2">
                <Camera className="h-5 w-5 mr-2 text-primary" />
                <span className="font-semibold">3 Camera Setup</span>
              </div>
              <p className="text-lg font-bold text-primary mb-2">₹10,000</p>
              <ul className="text-sm text-muted-foreground grow">
                <li>• 1 hour recording</li>
                <li>• 2 hour studio access</li>
                <li>• 3 cameras, 2 mics</li>
                <li>• Videographer & light man</li>
                <li>• RGB lighting setup</li>
              </ul>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Optional Add-ons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`${selection.addons.podcastEdit ? "border-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="podcast-edit" 
                    checked={selection.addons.podcastEdit}
                    onCheckedChange={(checked) => handleAddonChange("podcastEdit", checked as boolean)}
                  />
                  <label 
                    htmlFor="podcast-edit" 
                    className="ml-2 font-medium flex items-center cursor-pointer"
                  >
                    <Scissors className="h-4 w-4 mr-2" />
                    Podcast Edit Full
                  </label>
                </div>
                <span className="font-semibold">₹1,500</span>
              </div>
              <p className="ml-6 text-sm text-muted-foreground mt-1">Full edit for 1-hour episode</p>
            </CardContent>
          </Card>
          
          <Card className={`${selection.addons.introTeaser ? "border-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="intro-teaser" 
                    checked={selection.addons.introTeaser}
                    onCheckedChange={(checked) => handleAddonChange("introTeaser", checked as boolean)}
                  />
                  <label 
                    htmlFor="intro-teaser" 
                    className="ml-2 font-medium flex items-center cursor-pointer"
                  >
                    <Film className="h-4 w-4 mr-2" />
                    Intro/Teaser
                  </label>
                </div>
                <span className="font-semibold">₹1,000</span>
              </div>
              <p className="ml-6 text-sm text-muted-foreground mt-1">Up to 1 min teaser</p>
            </CardContent>
          </Card>
          
          <Card className={`${selection.addons.reels ? "border-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="reels" 
                    checked={selection.addons.reels}
                    onCheckedChange={(checked) => handleAddonChange("reels", checked as boolean)}
                  />
                  <label 
                    htmlFor="reels" 
                    className="ml-2 font-medium flex items-center cursor-pointer"
                  >
                    <Film className="h-4 w-4 mr-2" />
                    Reels
                  </label>
                </div>
                <span className="font-semibold">₹600 per reel</span>
              </div>
              <div className="ml-6 flex items-center mt-2">
                <label htmlFor="reels-quantity" className="text-sm mr-2">
                  Quantity:
                </label>
                <Input
                  id="reels-quantity"
                  type="number"
                  min="1"
                  max="5"
                  value={selection.addons.reelsQuantity}
                  onChange={(e) => handleAddonChange("reelsQuantity", parseInt(e.target.value) || 1)}
                  disabled={!selection.addons.reels}
                  className="w-20 h-8"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className={`${selection.addons.thumbnail ? "border-primary" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="thumbnail" 
                    checked={selection.addons.thumbnail}
                    onCheckedChange={(checked) => handleAddonChange("thumbnail", checked as boolean)}
                  />
                  <label 
                    htmlFor="thumbnail" 
                    className="ml-2 font-medium flex items-center cursor-pointer"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Thumbnail
                  </label>
                </div>
                <span className="font-semibold">₹500</span>
              </div>
              <p className="ml-6 text-sm text-muted-foreground mt-1">YouTube/podcast thumbnail</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-bold mb-1">Total Price</h2>
            <p className="text-muted-foreground">Selected package with add-ons</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-3xl font-bold text-primary">₹{totalPrice.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Price inclusive of taxes</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full" size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPackageSelector;
