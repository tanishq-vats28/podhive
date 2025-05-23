import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import BookingCalendar from "@/components/BookingCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EnhancedReviewCard from "@/components/EnhancedReviewCard";
import { studios as mockStudios, timeSlots as mockTimeSlots, reviews as mockReviews } from "@/utils/mockData";
import VirtualTour from "@/components/VirtualTour";
import { tourImages, defaultTourImages } from "@/utils/tourImages";

const StudioDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [studio, setStudio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchStudio = async () => {
      setIsLoading(true);
      try {
        const foundStudio = mockStudios.find(studio => studio.id.toString() === id);
        if (foundStudio) {
          setStudio(foundStudio);
        } else {
          toast({
            title: "Error",
            description: "Studio not found",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching studio:", error);
        toast({
          title: "Error",
          description: "Failed to load studio details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id, navigate, toast]);

  const studioTimeSlots = mockTimeSlots.filter(slot => slot.studioId.toString() === id);
  
  const studioReviews = mockReviews.filter(review => review.studioId.toString() === id);

  const handleBookNow = () => {
    setSelectedTab("booking");
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Booking Studio",
      description: "Select your preferred date and time slots",
    });
  };

  const handleReviewLike = (reviewId: number) => {
    toast({
      title: "Review liked",
      description: "Thank you for your feedback!",
    });
  };

  const handleReviewReport = (reviewId: number) => {
    toast({
      title: "Review reported",
      description: "We'll look into this review. Thank you!",
    });
  };

  const studioTourImages = id && tourImages[parseInt(id) as keyof typeof tourImages] ? 
    tourImages[parseInt(id) as keyof typeof tourImages] : 
    defaultTourImages;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Studio not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{studio.name}</h1>
          <p className="text-muted-foreground">{studio.location}</p>
        </div>
        <Button onClick={handleBookNow} size="lg">Book Now</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img 
          src={studio.image} 
          alt={studio.name} 
          className="w-full h-60 object-cover rounded-lg col-span-2"
        />
        <div className="grid grid-cols-1 gap-2">
          <img 
            src="https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt={studio.name} 
            className="w-full h-[118px] object-cover rounded-lg"
          />
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                  alt={studio.name} 
                  className="w-full h-[118px] object-cover rounded-lg brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-medium">View All Photos</div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{studio.name} - Gallery</DialogTitle>
                <DialogDescription>Browse all studio photos</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {studioTourImages.map((image, i) => (
                  <img 
                    key={i}
                    src={image.url} 
                    alt={`${studio.name} - ${image.title}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Studio Virtual Tour</h2>
        <VirtualTour 
          studioId={parseInt(id || "1")} 
          images={studioTourImages}
        />
      </div>

      <div ref={bookingSectionRef}>
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="booking">Book</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Studio Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{studio.description || "This professional podcast studio comes equipped with top-of-the-line recording equipment and acoustically treated space. Perfect for podcasts, voiceovers, and audio content creation."}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Equipment</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Professional Microphones (Shure SM7B)</li>
                      <li>RødeCaster Pro Audio Interface</li>
                      <li>Acoustic Treatment</li>
                      <li>Monitoring Headphones</li>
                      <li>Podcast Recording Software</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Amenities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Free WiFi</li>
                      <li>Coffee & Tea</li>
                      <li>Restroom Access</li>
                      <li>Waiting Area</li>
                      <li>Climate Control</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted h-64 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Map view would appear here</p>
                </div>
                <p className="mt-4">{studio.location}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Host Information</CardTitle>
              </CardHeader>
              <CardContent className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="font-medium">Studio Owner</h3>
                  <p className="text-sm text-muted-foreground">Member since {new Date().getFullYear() - 2}</p>
                  <Button variant="outline" className="mt-2">Contact Host</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="booking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Book this Studio</CardTitle>
                <CardDescription>Select date and time for your recording session</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingCalendar timeSlots={studioTimeSlots} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
                <CardDescription>See what others are saying about this studio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {studioReviews.length > 0 ? (
                  studioReviews.map((review) => (
                    <EnhancedReviewCard 
                      key={review.id} 
                      id={review.id}
                      author={review.author}
                      date={review.date}
                      title={review.content.substring(0, 40) + "..."} 
                      rating={review.rating}
                      content={review.content}
                      likeCount={review.likeCount}
                      liked={review.liked}
                      verified={review.author?.reviewCount > 5}
                      photoUrls={[]} 
                      onLike={handleReviewLike}
                      onReport={handleReviewReport}
                    />
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No reviews yet for this studio.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Write a Review</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudioDetails;
