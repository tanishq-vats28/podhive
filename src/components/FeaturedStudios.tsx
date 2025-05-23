
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import StudioCard from "@/components/StudioCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import { studios } from "@/utils/mockData";

const FeaturedStudios = () => {
  const [featuredStudios, setFeaturedStudios] = useState(studios.filter(s => s.promoted).slice(0, 5));

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector("[data-carousel-container]");
      const nextButton = carousel?.querySelector("[data-carousel-next]");
      if (nextButton) {
        (nextButton as HTMLButtonElement).click();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 bg-linear-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-center md:text-left">Featured Studios</h2>
          <div className="mt-2 md:mt-0">
            <Link to={`/studio/${featuredStudios[0]?.id || 1}`}>
              <Button variant="outline" size="sm" className="group">
                <Video className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                Try Virtual Tour
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative" data-carousel-container>
          <Carousel className="w-full">
            <CarouselContent>
              {featuredStudios.map((studio) => (
                <CarouselItem key={studio.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <StudioCard
                      id={studio.id}
                      name={studio.name}
                      image={studio.image}
                      equipment={studio.equipment}
                      rating={studio.rating}
                      availableTimes={studio.availableTimes}
                      pricePerHour={studio.pricePerHour}
                      discount={studio.discount}
                      location={studio.location}
                      promoted={studio.promoted}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 lg:-left-12" />
            <CarouselNext className="right-0 lg:-right-12" data-carousel-next />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStudios;
