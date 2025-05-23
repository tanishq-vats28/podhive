
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import UserProfileSidebar from "@/components/UserProfileSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Clock, CreditCard, Pencil, Star, Trash2 } from "lucide-react";

// Mock user data
const user = {
  id: "1",
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  image: "https://i.pravatar.cc/150?img=32",
  joinDate: "2023-09-15",
  profession: "Podcaster & Content Creator",
  bio: "Creating audio stories and podcast content for 5+ years. Always looking for quality recording spaces.",
  location: "Mumbai, India"
};

// Mock bookings data
const bookings = [
  {
    id: 101,
    studioId: 1,
    studioName: "SoundWave Studios",
    date: "2025-04-15",
    time: "10:00 AM - 12:00 PM",
    status: "upcoming",
    price: 999,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 102,
    studioId: 2,
    studioName: "Echo Recording Studio",
    date: "2025-04-22",
    time: "2:00 PM - 4:00 PM",
    status: "upcoming",
    price: 1299,
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjb3JkaW5nJTIwc3R1ZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 103,
    studioId: 3,
    studioName: "Harmony Studios",
    date: "2025-03-30",
    time: "11:00 AM - 1:00 PM",
    status: "completed",
    price: 899,
    image: "https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3R1ZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
];

// Mock favorites data
const favorites = [
  {
    id: 1,
    name: "SoundWave Studios",
    location: "South Mumbai",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Echo Recording Studio",
    location: "Bandra West",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVjb3JkaW5nJTIwc3R1ZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  }
];

const UserProfile = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const handleNavigateToStudio = (studioId: number) => {
    navigate(`/studio/${studioId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <UserProfileSidebar user={user} />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="calendar">My Calendar</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-6">
                <div className="grid grid-cols-1 gap-6">
                  <h2 className="text-2xl font-bold">My Bookings</h2>
                  
                  {bookings.filter(booking => booking.status === "upcoming").length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
                      {bookings
                        .filter(booking => booking.status === "upcoming")
                        .map(booking => (
                          <Card key={booking.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div 
                                className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                                style={{backgroundImage: `url(${booking.image})`}}
                              />
                              <CardContent className="p-6 w-full md:w-2/3 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Link to={`/studio/${booking.studioId}`} className="text-xl font-bold hover:text-primary">
                                      {booking.studioName}
                                    </Link>
                                    <Badge>{booking.status === "upcoming" ? "Upcoming" : "Completed"}</Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>{booking.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>{booking.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>₹{booking.price}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                  <Button variant="outline" onClick={() => navigate(`/booking/${booking.id}`)}>
                                    View Details
                                  </Button>
                                  <Button>Manage Booking</Button>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        ))
                      }
                    </div>
                  )}
                  
                  {bookings.filter(booking => booking.status === "completed").length > 0 && (
                    <div className="space-y-4 mt-8">
                      <h3 className="text-lg font-semibold">Past Bookings</h3>
                      {bookings
                        .filter(booking => booking.status === "completed")
                        .map(booking => (
                          <Card key={booking.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div 
                                className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                                style={{backgroundImage: `url(${booking.image})`}}
                              />
                              <CardContent className="p-6 w-full md:w-2/3 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Link to={`/studio/${booking.studioId}`} className="text-xl font-bold hover:text-primary">
                                      {booking.studioName}
                                    </Link>
                                    <Badge variant="outline">Completed</Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>{booking.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>{booking.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                      <span>₹{booking.price}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                  <Button variant="outline" onClick={() => navigate(`/booking/${booking.id}`)}>
                                    View Details
                                  </Button>
                                  <Button>
                                    <Star className="h-4 w-4 mr-2" />
                                    Write Review
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        ))
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6">
                <h2 className="text-2xl font-bold mb-6">My Favorite Studios</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map(studio => (
                    <Card key={studio.id} className="overflow-hidden cursor-pointer" onClick={() => handleNavigateToStudio(studio.id)}>
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{backgroundImage: `url(${studio.image})`}}
                      />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{studio.name}</h3>
                            <p className="text-sm text-gray-500">{studio.location}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{studio.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/studio/${studio.id}`)}>
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Calendar</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border mb-6"
                    />
                    
                    <div className="w-full max-w-md">
                      <h3 className="text-lg font-semibold mb-4">Bookings for {selectedDate?.toLocaleDateString()}</h3>
                      
                      {bookings.filter(booking => booking.date === selectedDate?.toISOString().split('T')[0]).length > 0 ? (
                        bookings
                          .filter(booking => booking.date === selectedDate?.toISOString().split('T')[0])
                          .map(booking => (
                            <Card key={booking.id} className="mb-4">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-semibold">{booking.studioName}</h4>
                                    <p className="text-sm text-gray-500">{booking.time}</p>
                                  </div>
                                  <Button variant="outline" size="sm" onClick={() => navigate(`/booking/${booking.id}`)}>
                                    Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No bookings for this date</p>
                          <Button className="mt-4" onClick={() => navigate('/')}>
                            Find a Studio
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src={user.image} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="mt-4">
                          <Pencil className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>
                      
                      <div className="md:w-2/3 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Name</label>
                            <input 
                              type="text" 
                              value={user.name} 
                              className="w-full p-2 border rounded-md" 
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Email</label>
                            <input 
                              type="email" 
                              value={user.email} 
                              className="w-full p-2 border rounded-md" 
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Bio</label>
                          <textarea 
                            value={user.bio} 
                            className="w-full p-2 border rounded-md h-24" 
                            readOnly
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Profession</label>
                            <input 
                              type="text" 
                              value={user.profession} 
                              className="w-full p-2 border rounded-md" 
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Location</label>
                            <input 
                              type="text" 
                              value={user.location} 
                              className="w-full p-2 border rounded-md" 
                              readOnly
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
