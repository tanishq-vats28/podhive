
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Download, 
  Edit, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  MessageSquare 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const BookingDetails = () => {
  const { toast } = useToast();
  
  // Mock booking data
  const booking = {
    id: "B001",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerEmail: "rahul.sharma@example.com",
    studioName: "Acoustic Haven",
    studioLocation: "Koramangala, Bangalore",
    date: "June 20, 2023",
    timeSlot: "10:00 AM - 12:00 PM",
    status: "confirmed",
    amount: "₹1,500",
    equipment: [
      "2 Shure SM7B Microphones",
      "Rodecaster Pro",
      "Studio Headphones (4)",
      "Acoustic Treatment"
    ],
    notes: "Customer requested a quiet space for podcast recording. They are bringing 3 guests.",
    paymentStatus: "Paid",
    bookingDate: "June 15, 2023"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Booking Status Updated",
      description: `Booking status has been changed to ${newStatus}.`,
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the customer.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/studio-dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Booking Details</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Booking ID: {booking.id}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Booking
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column - Booking info */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Booking Information</CardTitle>
                <CardDescription>Details about this booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Studio</p>
                    <p className="font-medium">{booking.studioName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="font-medium">{booking.studioLocation}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="font-medium">{booking.date}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <p className="font-medium">{booking.timeSlot}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Equipment Requested</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {booking.equipment.map((item, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="text-gray-700 dark:text-gray-300">{booking.notes}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Studio rental (2 hours)</span>
                    <span>₹1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equipment usage</span>
                    <span>₹300</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>{booking.amount}</span>
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Payment Status</span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">{booking.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Payment Date</span>
                      <span className="text-sm">{booking.bookingDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Customer info and actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{booking.customerPhone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{booking.customerEmail}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleSendMessage}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Customer
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {booking.status === "confirmed" && (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => handleStatusChange("completed")}
                    >
                      Mark as Completed
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleStatusChange("cancelled")}
                    >
                      Cancel Booking
                    </Button>
                  </>
                )}
                {booking.status === "pending" && (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={() => handleStatusChange("confirmed")}
                    >
                      Confirm Booking
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleStatusChange("cancelled")}
                    >
                      Reject Booking
                    </Button>
                  </>
                )}
                {booking.status === "completed" && (
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    Send Feedback Request
                  </Button>
                )}
                {booking.status === "cancelled" && (
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => handleStatusChange("confirmed")}
                  >
                    Restore Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetails;
