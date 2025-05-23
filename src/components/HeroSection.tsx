
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import AnimatedDemo from "./AnimatedDemo";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="relative h-[350px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        
        <div className="relative inset-0 bg-black bg-opacity-60" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find the best podcast studios near you
          </h1>
          
          <div className="max-w-2xl mx-auto mt-8 flex flex-col md:flex-row gap-3 md:gap-0">
            <div className="relative flex-1 md:rounded-l-md md:rounded-r-none bg-white flex items-center">
              <MapPin className="absolute left-3 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Current Location"
                className="border-0 pl-10 pr-3 py-6 rounded-md md:rounded-l-md md:rounded-r-none focus-visible:ring-0"
              />
            </div>
            
            <div className="relative flex-2 md:rounded-r-md md:rounded-l-none bg-white flex items-center">
              <Search className="absolute left-3 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for studios, equipment or location"
                className="border-0 border-l md:border-l-1 pl-10 pr-3 py-6 rounded-md md:rounded-l-none md:rounded-r-md focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>
      
      <AnimatedDemo />
    </div>
  );
};

export default HeroSection;
