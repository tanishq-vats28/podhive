
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "PodHive helped me find the perfect studio for my podcast. The equipment was top-notch and the staff was incredibly helpful.",
    author: {
      name: "Priya Singh",
      role: "Host, Tech Talks India",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    }
  },
  {
    id: 2,
    content: "As a new podcaster, I was nervous about recording in a professional studio. PodHive made the experience enjoyable and stress-free.",
    author: {
      name: "Rahul Sharma",
      role: "Creator, Mumbai Stories",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    }
  },
  {
    id: 3,
    content: "The booking process was seamless, and the studio had all the equipment I needed. I'll definitely be using PodHive again for my future recordings.",
    author: {
      name: "Ananya Patel",
      role: "Host, Finance Explained",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80",
    }
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What people are saying</h2>
          <p className="text-gray-600 dark:text-gray-300">Hear from our happy podcasters</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 border-0 shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary opacity-50 mb-4" />
                <p className="text-gray-700 dark:text-gray-200 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.author.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
