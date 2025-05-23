
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

interface ManualBookingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const ManualBookingForm = ({ onSuccess, onCancel }: ManualBookingFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [duration, setDuration] = useState("1");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const { toast } = useToast();

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
  ];

  const durationOptions = ["0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName || !selectedDate || !startTime || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Calculate end time
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);
    const durationHours = parseFloat(duration);
    
    const endHour = startHour + Math.floor(durationHours);
    const endMinute = startMinute + (durationHours % 1) * 60;
    
    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
    const timeSlot = `${startTime} - ${formattedEndTime}`;

    // In a real application, this would be an API call to save the booking
    const newBooking = {
      id: `B${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail,
      customerPhone,
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      timeSlot,
      status: "confirmed",
      amount: amount ? `₹${amount}` : "₹0",
      paymentStatus,
      notes
    };

    console.log("New manual booking created:", newBooking);

    toast({
      title: "Booking Added",
      description: `Manual booking for ${customerName} has been added successfully`,
    });

    onSuccess();
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Add Manual Booking</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Record bookings made outside the app
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium mb-1">
                Customer Name *
              </label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter customer email"
              />
            </div>
            
            <div>
              <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter customer phone"
              />
            </div>
          </div>
          
          {/* Booking Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                Start Time *
              </label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger id="startTime" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-1">
                Duration (hours) *
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option} {option === "1" ? "hour" : "hours"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount (₹)
            </label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              type="number"
            />
          </div>
          
          <div>
            <label htmlFor="paymentStatus" className="block text-sm font-medium mb-1">
              Payment Status
            </label>
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
              <SelectTrigger id="paymentStatus" className="w-full">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="free">Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">
            Notes
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes about this booking"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Add Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManualBookingForm;
