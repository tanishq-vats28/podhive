
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ShoppingCart, User, LogIn, LayoutDashboard, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";
import { LoginModal } from "./LoginModal";

const Navbar = () => {
  const [location, setLocation] = useState("Detecting location...");
  const [loginOpen, setLoginOpen] = useState(false);
  const [isStudioOwner, setIsStudioOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const userType = localStorage.getItem("userType");
      setIsStudioOwner(userType === "owner");
      setIsAdmin(userType === "admin");
    };

    checkAuthStatus();

    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            
            if (data.locality) {
              setLocation(data.locality);
            } else if (data.city) {
              setLocation(data.city);
            } else {
              setLocation("Current Location");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Current Location");
          }
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Using default location instead",
            variant: "destructive",
          });
          setLocation("Current Location");
        }
      );
    } else {
      setLocation("Current Location");
    }
  }, [toast]);

  const simulateStudioOwnerLogin = () => {
    localStorage.setItem("userType", "owner");
    setIsStudioOwner(true);
    
    window.dispatchEvent(new Event('userTypeChanged'));
    
    toast({
      title: "Logged in as Studio Owner",
      description: "You now have access to studio management features"
    });
    setLoginOpen(false);
  };

  const simulateLogout = () => {
    localStorage.removeItem("userType");
    setIsStudioOwner(false);
    setIsAdmin(false);
    
    window.dispatchEvent(new Event('userTypeChanged'));
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-xs">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-6">
              <h1 className="text-2xl font-bold text-primary dark:text-white">StudioStash</h1>
            </Link>
            
            <div className="hidden md:flex items-center px-3 py-1 text-sm border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{location}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {isAdmin && (
              <Link to="/admin-dashboard">
                <Button variant="outline" size="icon" title="Admin Dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </Button>
              </Link>
            )}
            
            {isStudioOwner && (
              <>
                <Link to="/studio-dashboard">
                  <Button variant="outline" size="icon" title="Studio Dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/add-studio">
                  <Button variant="outline" size="icon" title="Add New Studio">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  0
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Link to="/list-studio">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                List a Studio
              </Button>
            </Link>
            
            {!isStudioOwner && !isAdmin ? (
              <Button 
                variant="default" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => setLoginOpen(true)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={simulateLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <LoginModal 
        open={loginOpen} 
        onOpenChange={setLoginOpen} 
        onStudioOwnerLogin={simulateStudioOwnerLogin}
      />
    </>
  );
};

export default Navbar;
