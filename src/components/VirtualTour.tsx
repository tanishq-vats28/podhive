
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Maximize } from "lucide-react";

interface VirtualTourProps {
  studioId: number;
  images: { id: number; url: string; title: string }[];
}

const VirtualTour = ({ studioId, images }: VirtualTourProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const toggleFullscreen = () => {
    const tourElement = document.getElementById(`virtual-tour-${studioId}`);
    
    if (!isFullscreen) {
      if (tourElement?.requestFullscreen) {
        tourElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  if (images.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center p-10">
            <p>Virtual tour not available for this studio</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <div 
          id={`virtual-tour-${studioId}`} 
          className="relative h-80 md:h-96 lg:h-[500px] bg-black"
        >
          <img 
            src={images[currentImageIndex].url} 
            alt={images[currentImageIndex].title} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent text-white">
            <h3 className="font-medium">{images[currentImageIndex].title}</h3>
            <p className="text-sm">{`${currentImageIndex + 1} / ${images.length}`}</p>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-black/30 hover:bg-black/50 text-white border-none pointer-events-auto" 
              onClick={prevImage}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-black/30 hover:bg-black/50 text-white border-none pointer-events-auto" 
              onClick={nextImage}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 rounded-full bg-black/30 hover:bg-black/50 text-white border-none" 
            onClick={toggleFullscreen}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VirtualTour;
