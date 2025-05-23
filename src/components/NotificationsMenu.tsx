
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'reminder' | 'promotion' | 'system';
}

// Singleton NotificationManager to handle notifications across components
export class NotificationManager {
  private static instance: NotificationManager;
  private listeners: ((notification: Notification) => void)[] = [];
  
  private constructor() {}
  
  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }
  
  addListener(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  addNotification(notification: Notification) {
    this.listeners.forEach(listener => listener(notification));
    
    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      icon: this.getNotificationIcon(notification.type),
    });
    
    // If this is a booking notification, send it to the studio owner
    if (notification.type === 'booking') {
      this.sendToStudioOwner(notification);
    }
  }
  
  private sendToStudioOwner(notification: Notification) {
    console.log("Sending notification to studio owner:", notification);
    // In a real app, this would call an API endpoint to send SMS/email
  }
  
  private getNotificationIcon(type: string): string {
    switch (type) {
      case 'booking':
        return "📅";
      case 'reminder':
        return "⏰";
      case 'promotion':
        return "🎁";
      case 'system':
        return "ℹ️";
      default:
        return "🔔";
    }
  }
}

const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "Booking Confirmed",
    message: "Your booking at SoundWave Studios has been confirmed.",
    time: "10 minutes ago",
    read: false,
    type: 'booking'
  },
  {
    id: "notif2",
    title: "Upcoming Session",
    message: "Your session at SoundWave is tomorrow at 2:00 PM.",
    time: "1 hour ago",
    read: false,
    type: 'reminder'
  },
  {
    id: "notif3",
    title: "Special Discount",
    message: "Get 20% off on weekday bookings!",
    time: "3 hours ago",
    read: true,
    type: 'promotion'
  },
  {
    id: "notif4",
    title: "Review Request",
    message: "Please share your experience at EchoBox Recording.",
    time: "Yesterday",
    read: true,
    type: 'system'
  }
];

const NotificationsMenu = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Listen for new notifications
  useState(() => {
    const notificationManager = NotificationManager.getInstance();
    const unsubscribe = notificationManager.addListener((newNotification) => {
      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });
    
    return unsubscribe;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return "📅";
      case 'reminder':
        return "⏰";
      case 'promotion':
        return "🎁";
      case 'system':
        return "ℹ️";
      default:
        return "🔔";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7" 
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-2 py-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={`px-4 py-3 cursor-default ${notification.read ? "" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 self-start mt-2" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
