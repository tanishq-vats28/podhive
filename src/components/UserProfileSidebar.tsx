
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, BookOpen, Clock, Calendar, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface UserProfileSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    joinDate: string;
  };
}

const UserProfileSidebar = ({ user }: UserProfileSidebarProps) => {
  const [activeSection, setActiveSection] = useState("bookings");
  
  return (
    <div className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-xs rounded-lg p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold text-xl">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Member since {new Date(user.joinDate).toLocaleDateString()}
        </p>
      </div>
      
      <Separator className="my-4" />
      
      <nav className="space-y-1">
        <Button
          variant={activeSection === "bookings" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("bookings")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          My Bookings
        </Button>
        
        <Button
          variant={activeSection === "favorites" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("favorites")}
        >
          <Heart className="mr-2 h-4 w-4" />
          Favorites
        </Button>
        
        <Button
          variant={activeSection === "history" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("history")}
        >
          <Clock className="mr-2 h-4 w-4" />
          Booking History
        </Button>
        
        <Button
          variant={activeSection === "calendar" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("calendar")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          My Calendar
        </Button>
        
        <Button
          variant={activeSection === "settings" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection("settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
      
      <Separator className="my-4" />
      
      <Button variant="outline" className="w-full justify-start text-rose-500 hover:text-rose-600">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfileSidebar;
