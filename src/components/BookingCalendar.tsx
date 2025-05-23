
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

interface DaySlots {
  id: number;
  studioId: number;
  date: string;
  slots: TimeSlot[];
}

interface BookingCalendarProps {
  timeSlots: DaySlots[];
}

// Helper function to format time slots into time ranges
const formatTimeRange = (startTime: string): string => {
  // Parse the start time
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const startHourNum = startHour % 12 || 12; // Convert 0 to 12 for 12-hour format
  const startAmPm = startHour >= 12 ? 'PM' : 'AM';
  
  // Calculate end time (2 hours later)
  let endHour = startHour + 2;
  const endHourNum = endHour % 12 || 12;
  const endAmPm = endHour >= 12 ? 'PM' : 'AM';
  
  // Format as range
  return `${startHourNum}${startMinute > 0 ? `:${startMinute}` : ''}${startAmPm} - ${endHourNum}${startMinute > 0 ? `:${startMinute}` : ''}${endAmPm}`;
};

// Generate fixed time slots from 9am to 9pm in 2-hour blocks
const generateFixedTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
  if (!selectedDate) return [];
  
  const slots: TimeSlot[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if selected date is today
  const isToday = selectedDate && 
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear();
  
  const currentHour = isToday ? new Date().getHours() : 0;
  
  // Generate slots from 9am to 9pm in 2-hour blocks
  for (let hour = 9; hour <= 19; hour += 2) {
    // For today, only show future time slots
    const available = !isToday || hour > currentHour;
    
    slots.push({
      time: `${hour}:00`,
      available: available,
      booked: false
    });
  }
  
  return slots;
};

const BookingCalendar = ({ timeSlots }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load booked slots from localStorage on component mount
  useEffect(() => {
    const savedBookedSlots = localStorage.getItem('bookedSlots');
    if (savedBookedSlots) {
      try {
        setBookedSlots(JSON.parse(savedBookedSlots));
      } catch (error) {
        console.error("Failed to parse booked slots:", error);
      }
    }
  }, []);

  // Format date to match our timeSlots data format
  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  // Find slots for the selected date from provided data or generate fixed ones
  const daySlots = timeSlots.find(day => day.date === formattedDate);
  
  // Check if a time slot is booked for the current date
  const isSlotBooked = (time: string) => {
    if (!formattedDate) return false;
    return bookedSlots[formattedDate]?.includes(time) || false;
  };

  // Get time slots - either from provided data or generate fixed ones
  const getTimeSlots = () => {
    let slots: TimeSlot[] = [];
    
    if (daySlots && daySlots.slots.length > 0) {
      slots = daySlots.slots;
    } else {
      slots = generateFixedTimeSlots(selectedDate);
    }
    
    // Mark booked slots
    return slots.map(slot => ({
      ...slot,
      available: slot.available && !isSlotBooked(slot.time),
      booked: isSlotBooked(slot.time)
    }));
  };

  // Group time slots into 2-hour ranges
  const getTimeRanges = () => {
    const slots = getTimeSlots();
    if (slots.length === 0) return [];
    
    // Sort slots by time
    const sortedSlots = [...slots].sort((a, b) => a.time.localeCompare(b.time));
    const timeRanges: { range: string, available: boolean, booked: boolean, startTime: string }[] = [];
    
    // Convert each slot to a time range
    for (const slot of sortedSlots) {
      timeRanges.push({
        range: formatTimeRange(slot.time),
        available: slot.available,
        booked: slot.booked || false,
        startTime: slot.time
      });
    }
    
    return timeRanges;
  };

  const handleSlotClick = (startTime: string) => {
    // Don't allow selection of booked slots
    if (isSlotBooked(startTime)) {
      return;
    }
    
    if (selectedSlots.includes(startTime)) {
      setSelectedSlots(selectedSlots.filter(slot => slot !== startTime));
    } else {
      setSelectedSlots([...selectedSlots, startTime]);
    }
  };

  const handleBooking = () => {
    if (selectedSlots.length === 0) {
      toast({
        title: "No time slot selected",
        description: "Please select at least one time slot to book",
        variant: "destructive"
      });
      return;
    }

    // Format booking data for payment page
    const bookingData = {
      date: formattedDate,
      slots: selectedSlots.map(slot => formatTimeRange(slot)),
      rawSlots: selectedSlots,
      studioId: timeSlots[0]?.studioId || 1
    };

    // Save booking data to session storage to pass to payment page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

    toast({
      title: "Redirecting to payment",
      description: `Processing ${selectedSlots.length} slot(s) booking`,
    });

    // Navigate to payment page
    navigate(`/payment/${timeSlots[0]?.studioId || 1}`);
  };

  const timeRanges = getTimeRanges();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Select Date
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={(date) => {
              // Disable dates in the past
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Available Time Slots
          </h3>
          
          {timeRanges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {timeRanges.map((slot, idx) => (
                <Button
                  key={idx}
                  variant={selectedSlots.includes(slot.startTime) ? "default" : "outline"}
                  className={`w-full text-sm ${!slot.available ? 'opacity-50' : ''} ${slot.booked ? 'bg-gray-300 text-gray-600 hover:bg-gray-300 cursor-not-allowed' : ''}`}
                  disabled={!slot.available || slot.booked}
                  onClick={() => handleSlotClick(slot.startTime)}
                >
                  {slot.range}
                  {slot.booked && <span className="ml-2 text-xs">(Booked)</span>}
                </Button>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-gray-500">
                No slots available for selected date
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          size="lg" 
          onClick={handleBooking}
          disabled={selectedSlots.length === 0}
        >
          Book Now ({selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''})
        </Button>
      </div>
    </div>
  );
};

export default BookingCalendar;
