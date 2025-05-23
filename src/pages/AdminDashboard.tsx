import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  DownloadCloud, 
  Filter, 
  Eye, 
  BarChart4, 
  PieChart, 
  TrendingUp, 
  Users, 
  Building2 
} from "lucide-react";
import GrowthChart from "@/components/GrowthChart";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeStudio, setActiveStudio] = useState<string>("all");
  
  // Mock data for all studios
  const studios = [
    {
      id: "S001",
      name: "Acoustic Haven",
      owner: "Raj Malhotra",
      location: "Delhi",
      bookingsCount: 24,
      revenue: "₹32,400",
      status: "active",
    },
    {
      id: "S002",
      name: "Sound Sanctuary",
      owner: "Priya Sharma",
      location: "Mumbai",
      bookingsCount: 18,
      revenue: "₹26,800",
      status: "active",
    },
    {
      id: "S003",
      name: "Melody Studios",
      owner: "Vikram Singh",
      location: "Bangalore",
      bookingsCount: 12,
      revenue: "₹18,600",
      status: "pending",
    },
    {
      id: "S004",
      name: "Rhythm Room",
      owner: "Neha Gupta",
      location: "Chennai",
      bookingsCount: 8,
      revenue: "₹12,000",
      status: "inactive",
    },
  ];
  
  // Mock data for bookings
  const bookings = [
    {
      id: "B001",
      customerName: "Rahul Sharma",
      studioName: "Acoustic Haven",
      studioId: "S001",
      date: "2023-06-20",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "confirmed",
      amount: "₹1,500",
    },
    {
      id: "B002",
      customerName: "Priya Patel",
      studioName: "Acoustic Haven",
      studioId: "S001",
      date: "2023-06-21",
      timeSlot: "2:00 PM - 5:00 PM",
      status: "pending",
      amount: "₹2,500",
    },
    {
      id: "B003",
      customerName: "Arjun Singh",
      studioName: "Sound Sanctuary",
      studioId: "S002",
      date: "2023-06-22",
      timeSlot: "9:00 AM - 11:00 AM",
      status: "completed",
      amount: "₹1,800",
    },
    {
      id: "B004",
      customerName: "Neha Gupta",
      studioName: "Sound Sanctuary",
      studioId: "S002",
      date: "2023-06-25",
      timeSlot: "3:00 PM - 6:00 PM",
      status: "cancelled",
      amount: "₹3,000",
    },
    {
      id: "B005",
      customerName: "Amit Joshi",
      studioName: "Melody Studios",
      studioId: "S003",
      date: "2023-06-26",
      timeSlot: "1:00 PM - 3:00 PM",
      status: "pending",
      amount: "₹2,200",
    },
  ];

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
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handleViewDetails = (id: string, type: 'booking' | 'studio') => {
    toast({
      title: `View ${type} Details`,
      description: `Viewing ${type} ${id} details`,
    });
  };

  const filteredBookings = activeStudio === "all" 
    ? bookings 
    : bookings.filter(booking => booking.studioId === activeStudio);

  // Calculate statistics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => {
    const amount = parseInt(booking.amount.replace(/[^\d]/g, ''));
    return sum + amount;
  }, 0);
  const totalStudios = studios.length;
  const activeStudios = studios.filter(studio => studio.status === "active").length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all bookings and studios</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              <BarChart4 className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Studios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudios}</div>
              <p className="text-xs text-muted-foreground">+1 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Studios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeStudios}</div>
              <p className="text-xs text-muted-foreground">{((activeStudios / totalStudios) * 100).toFixed(0)}% of total</p>
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart Section */}
        <div className="mb-8">
          <GrowthChart title="Platform Performance Trends" />
        </div>

        <Tabs defaultValue="bookings" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="studios">Studios</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Booking Details</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                <CardDescription>Filter by studio:</CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant={activeStudio === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveStudio("all")}
                  >
                    All Studios
                  </Button>
                  {studios.map((studio) => (
                    <Button
                      key={studio.id}
                      variant={activeStudio === studio.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveStudio(studio.id)}
                    >
                      {studio.name}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Studio</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.studioName}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.timeSlot}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewDetails(booking.id, 'booking')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="studios" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Studio List</CardTitle>
                  <Button>
                    <Building2 className="mr-2 h-4 w-4" />
                    Add New Studio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Studio ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studios.map((studio) => (
                      <TableRow key={studio.id}>
                        <TableCell className="font-medium">{studio.id}</TableCell>
                        <TableCell>{studio.name}</TableCell>
                        <TableCell>{studio.owner}</TableCell>
                        <TableCell>{studio.location}</TableCell>
                        <TableCell>{studio.bookingsCount}</TableCell>
                        <TableCell>{studio.revenue}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(studio.status)}`}>
                            {studio.status.charAt(0).toUpperCase() + studio.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewDetails(studio.id, 'studio')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Summary of platform performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-8">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Booking Trends</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <TrendingUp className="h-24 w-24 text-muted-foreground/50" />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-24 w-24 text-muted-foreground/50" />
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-around items-center py-8">
                        <div className="text-center">
                          <Users className="h-12 w-12 mx-auto text-primary" />
                          <div className="mt-2 text-xl font-bold">1,248</div>
                          <div className="text-sm text-muted-foreground">Total Users</div>
                        </div>
                        <div className="text-center">
                          <Building2 className="h-12 w-12 mx-auto text-primary" />
                          <div className="mt-2 text-xl font-bold">{studios.length}</div>
                          <div className="text-sm text-muted-foreground">Studios</div>
                        </div>
                        <div className="text-center">
                          <Calendar className="h-12 w-12 mx-auto text-primary" />
                          <div className="mt-2 text-xl font-bold">{bookings.length}</div>
                          <div className="text-sm text-muted-foreground">Bookings</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
