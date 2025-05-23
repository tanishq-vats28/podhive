
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudioDetails from "./pages/StudioDetails";
import StudioDashboard from "./pages/StudioDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookingDetails from "./pages/BookingDetails";
import AddStudio from "./pages/AddStudio";
import ListStudio from "./pages/ListStudio";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import PaymentPage from "./pages/PaymentPage";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/studio/:id" element={<StudioDetails />} />
          <Route path="/studio-dashboard" element={<StudioDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/add-studio" element={<AddStudio />} />
          <Route path="/list-studio" element={<ListStudio />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
