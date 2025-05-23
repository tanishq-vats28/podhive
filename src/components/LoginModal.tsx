import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Phone, Building, Mail } from "lucide-react";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudioOwnerLogin?: () => void;
};

export function LoginModal({ open, onOpenChange, onStudioOwnerLogin }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"user" | "owner" | "admin">("user");
  const { toast } = useToast();

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Mock OTP sending
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone",
    });
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }

    // Save user type to localStorage
    localStorage.setItem("userType", accountType);

    // Mock verification
    toast({
      title: getAccountTypeTitle(),
      description: `Welcome to PodHive${getAccountTypeRedirectMessage()}!`,
    });
    
    // Call onStudioOwnerLogin if it exists and user is studio owner
    if (accountType === "owner" && onStudioOwnerLogin) {
      onStudioOwnerLogin();
    }
    
    // Redirect to appropriate dashboard
    redirectToDashboard();
    
    onOpenChange(false);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Save user type to localStorage
    localStorage.setItem("userType", accountType);

    // Mock login
    toast({
      title: getAccountTypeTitle(),
      description: `Welcome to PodHive${getAccountTypeRedirectMessage()}!`,
    });
    
    // Call onStudioOwnerLogin if it exists and user is studio owner
    if (accountType === "owner" && onStudioOwnerLogin) {
      onStudioOwnerLogin();
    }
    
    // Redirect to appropriate dashboard
    redirectToDashboard();
    
    onOpenChange(false);
  };

  const handleGoogleLogin = () => {
    // Save user type to localStorage
    localStorage.setItem("userType", accountType);
    
    // Mock Google login
    toast({
      title: `Google login (${getAccountTypeTitle()})`,
      description: "Redirecting to Google authentication...",
    });
    
    // In a real app, this would redirect to Google auth
    setTimeout(() => {
      toast({
        title: getAccountTypeTitle(),
        description: `Welcome to PodHive${getAccountTypeRedirectMessage()}!`,
      });
      
      // Call onStudioOwnerLogin if it exists and user is studio owner
      if (accountType === "owner" && onStudioOwnerLogin) {
        onStudioOwnerLogin();
      }
      
      // Redirect to appropriate dashboard
      redirectToDashboard();
      
      onOpenChange(false);
    }, 1500);
  };

  const getAccountTypeTitle = () => {
    switch(accountType) {
      case "owner": return "Studio Owner login successful";
      case "admin": return "Admin login successful";
      default: return "User login successful";
    }
  };

  const getAccountTypeRedirectMessage = () => {
    switch(accountType) {
      case "owner": return " Studio Dashboard";
      case "admin": return " Admin Dashboard";
      default: return "";
    }
  };

  const redirectToDashboard = () => {
    if (accountType === "owner") {
      window.location.href = "/studio-dashboard";
    } else if (accountType === "admin") {
      window.location.href = "/admin-dashboard";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to PodHive</DialogTitle>
          <DialogDescription>
            Sign in to access bookings, reviews, and more.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            variant={accountType === "user" ? "default" : "outline"} 
            onClick={() => setAccountType("user")}
            className="w-full"
          >
            User
          </Button>
          <Button 
            variant={accountType === "owner" ? "default" : "outline"} 
            onClick={() => setAccountType("owner")}
            className="w-full"
          >
            <Building className="mr-2 h-4 w-4" />
            Studio
          </Button>
          <Button 
            variant={accountType === "admin" ? "default" : "outline"} 
            onClick={() => setAccountType("admin")}
            className="w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Admin
          </Button>
        </div>
        
        <Tabs defaultValue="phone" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone" className="space-y-4">
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button className="w-full" onClick={handleSendOtp}>
                  <Phone className="mr-2 h-4 w-4" />
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    placeholder="Enter the OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleVerifyOtp}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Verify & Login
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setOtpSent(false)}>
                  Change Number
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleEmailLogin}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 488 512" className="mr-2 h-4 w-4">
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"/>
            </svg>
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
