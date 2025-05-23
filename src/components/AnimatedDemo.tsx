
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Mic, Calendar, CreditCard, CheckCircle } from "lucide-react";

const AnimatedDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const steps = [
    {
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      title: "Find the Perfect Studio",
      description: "Search for studios based on location, equipment, and price",
      icon: <Mic className="h-8 w-8" />
    },
    {
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
      title: "Check Availability",
      description: "View available time slots and choose what works for you",
      icon: <Calendar className="h-8 w-8" />
    },
    {
      image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc",
      title: "Instant Booking",
      description: "Book and pay securely with just a few clicks",
      icon: <CreditCard className="h-8 w-8" />
    },
    {
      image: "https://images.unsplash.com/photo-1520170350707-b2da59970118",
      title: "Ready to Record",
      description: "Show up and start creating amazing content",
      icon: <CheckCircle className="h-8 w-8" />
    }
  ];
  
  useEffect(() => {
    let timer: number;
    
    if (isPlaying && autoPlay) {
      timer = window.setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, autoPlay, steps.length]);
  
  useEffect(() => {
    // Start playing automatically after component mount
    setIsPlaying(true);
    
    return () => {
      setIsPlaying(false);
    };
  }, []);
  
  const handleStepChange = (index: number) => {
    setCurrentStep(index);
    setAutoPlay(false);
    setIsPlaying(false);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setAutoPlay(true);
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-1/2 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        
        <div className="relative overflow-hidden rounded-xl bg-black aspect-video shadow-xl">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10 opacity-80" />
          
          {/* Images */}
          <div className="relative h-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentStep === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={`${step.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80`}
                  alt={step.title}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
            <div className={`transition-all duration-700 transform ${
              isPlaying ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary rounded-full">
                  {steps[currentStep].icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold">{steps[currentStep].title}</h3>
              </div>
              <p className="text-sm md:text-base text-gray-200">{steps[currentStep].description}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="absolute top-4 right-4 z-30">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlay}
              className="bg-black/50 border-white/20 text-white hover:bg-black/70"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Steps indicator */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-2">
            <div className="flex gap-2 p-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepChange(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === index 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDemo;
