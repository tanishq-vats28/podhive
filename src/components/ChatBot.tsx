
import { useState } from "react";
import { MessageCircle, HelpCircle, X, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Hi there! 👋 I'm StudioBot. How can I help you with your studio booking today?",
    isBot: true,
    timestamp: new Date(),
  },
];

const FAQ_LIST: FAQ[] = [
  {
    question: "How do I book a studio?",
    answer: "You can book a studio by browsing our available studios, selecting your preferred date and time slot, and completing the payment process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, credit/debit cards, and net banking for all studio bookings."
  },
  {
    question: "What is your cancellation policy?",
    answer: "You can cancel a booking at least 24 hours in advance for a full refund. Cancellations made less than 24 hours before the scheduled time will be charged 50% of the booking fee."
  },
  {
    question: "What equipment is provided in the studios?",
    answer: "Each studio comes with professional recording equipment including microphones, headphones, acoustic treatment, and mixing consoles. You can check specific equipment details on each studio's page."
  },
  {
    question: "How long can I book a studio for?",
    answer: "Studios can be booked in hourly increments, with a minimum booking of 1 hour and a maximum of 8 hours per day."
  }
];

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    const userMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I can help you book a studio session. Would you like to check availability?",
        "Our studios are equipped with professional recording equipment. Do you have any specific requirements?",
        "You can pay for bookings using UPI, credit/debit cards. Let me know if you need help with the payment process.",
        "If you need to cancel a booking, please do so at least 24 hours in advance to receive a full refund.",
        "Studio sessions start at ₹999 per hour. Is there anything specific you'd like to know about pricing?",
      ];
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFAQClick = (answer: string) => {
    const faqMessage = {
      id: messages.length + 1,
      text: answer,
      isBot: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, faqMessage]);
    setActiveTab("chat");
  };
  
  const ChatContent = () => (
    <div className="flex flex-col h-full">
      <CardHeader className="px-4 py-2 border-b">
        <CardTitle className="text-lg flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          StudioBot
        </CardTitle>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 overflow-y-auto">
          <CardContent className="p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className={`text-xs mt-1 ${message.isBot ? "text-muted-foreground" : "text-primary-foreground/80"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="faq" className="flex-1 overflow-y-auto">
          <CardContent className="p-4">
            <div className="space-y-3">
              {FAQ_LIST.map((faq, index) => (
                <Card key={index} className="cursor-pointer hover:bg-accent" onClick={() => handleFAQClick(faq.answer)}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{faq.question}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      {activeTab === "chat" && (
        <CardFooter className="border-t p-2">
          <div className="flex w-full items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-9 flex-1 resize-none"
            />
            <Button onClick={handleSendMessage} size="icon">
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              className="h-12 w-12 rounded-full shadow-lg"
              size="icon"
            >
              <MessageCircle />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="h-full">
              <ChatContent />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="h-12 w-12 rounded-full shadow-lg"
            size="icon"
          >
            <MessageCircle />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] h-[500px] p-0">
          <DialogTitle className="sr-only">Chat with StudioBot</DialogTitle>
          <ChatContent />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatBot;
