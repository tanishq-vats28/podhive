
import { NotificationManager } from "@/components/NotificationsMenu";

interface SendNotificationOptions {
  studioId?: number;
  studioName: string;
  date: string;
  time: string;
  userPhone?: string;
  userEmail?: string;
  userName?: string;
}

// Function to format the current time as a string (e.g., "5 minutes ago")
const formatTimeAgo = (): string => {
  return "Just now";
};

// Send booking notification to both user and studio owner
export const sendBookingNotification = (options: SendNotificationOptions) => {
  const { studioName, date, time, userName } = options;
  const notificationManager = NotificationManager.getInstance();
  
  // Create user notification
  const userNotification = {
    id: `booking-${Date.now()}`,
    title: "Booking Confirmed",
    message: `Your booking at ${studioName} on ${date} at ${time} has been confirmed.`,
    time: formatTimeAgo(),
    read: false,
    type: 'booking' as const
  };
  
  // Add notification
  notificationManager.addNotification(userNotification);
  
  // In a real application, you would make API calls here to:
  // 1. Send SMS to the user's phone
  console.log("Sending SMS to user's phone:", options.userPhone);
  
  // 2. Send email to studio owner
  console.log("Sending email to studio owner about new booking");
  
  // 3. Send SMS to studio owner's phone
  console.log("Sending SMS to studio owner's phone about new booking");
  
  return userNotification;
};

// Send upcoming session reminder
export const sendReminderNotification = (options: SendNotificationOptions) => {
  const { studioName, date, time } = options;
  const notificationManager = NotificationManager.getInstance();
  
  const reminder = {
    id: `reminder-${Date.now()}`,
    title: "Upcoming Session Reminder",
    message: `Your session at ${studioName} on ${date} at ${time} is coming up soon.`,
    time: formatTimeAgo(),
    read: false,
    type: 'reminder' as const
  };
  
  notificationManager.addNotification(reminder);
  return reminder;
};
