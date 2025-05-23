
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mic, Calendar, IndianRupee, Settings, CheckCircle, Camera, HomeIcon } from "lucide-react";
import { toast } from "sonner";

const ListStudio = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [hasRoom, setHasRoom] = useState<string>(""); 
  const [needsHelp, setNeedsHelp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !whatsapp || !location || !hasRoom || !needsHelp) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Form submitted successfully!", {
        description: "We'll contact you within 24 hours with your studio starter plan.",
      });
      
      // Reset form
      setName("");
      setWhatsapp("");
      setLocation("");
      setHasRoom("");
      setNeedsHelp("");
      
    } catch (error) {
      toast.error("Failed to submit form", {
        description: "Please try again later.",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary/10 to-white dark:from-primary/20 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎙️ Turn Your Room Into a Podcast Studio
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
              Earn money from your unused space by renting it out to creators, podcasters, and students — we'll help you set it up.
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => {
                const formElement = document.getElementById('signup-form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              👉 Start Now – It's Free
            </Button>
          </div>
        </section>

        {/* Why This Works */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why This Works</h2>
              <p className="text-lg mb-6 text-center">
                India's podcast scene is booming.
                Creators are looking for places to record — but good studios are rare.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-xs my-8">
                <p className="mb-4 font-medium">If you have a spare room, quiet corner, or unused shop space, you can:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Mic className="h-6 w-6 text-primary mr-3 shrink-0 mt-0.5" />
                    <span>Set up a basic podcast studio</span>
                  </li>
                  <li className="flex items-start">
                    <Calendar className="h-6 w-6 text-primary mr-3 shrink-0 mt-0.5" />
                    <span>Get bookings through StudioStash</span>
                  </li>
                  <li className="flex items-start">
                    <IndianRupee className="h-6 w-6 text-primary mr-3 shrink-0 mt-0.5" />
                    <span>Earn ₹4,00,000–₹5,00,000/month</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* We Help You Set It Up */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">🔧 We Help You Set It Up</h2>
              <p className="text-lg mb-8 text-center">
                Don't worry about the tech.
                We guide you with:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Settings className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Simple room setup plan</h3>
                        <p className="text-gray-600 dark:text-gray-400">No construction needed, just smart arrangement of what you already have.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Mic className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Mic & lighting recommendations</h3>
                        <p className="text-gray-600 dark:text-gray-400">Budget-friendly equipment suggestions tailored to your space.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Camera className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Sample layouts + decor tips</h3>
                        <p className="text-gray-600 dark:text-gray-400">Visual guides to make your space attractive to creators.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Calendar className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Booking management</h3>
                        <p className="text-gray-600 dark:text-gray-400">We handle scheduling and payments so you don't have to.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-center mt-8 text-lg font-medium">
                You focus on the space. We'll handle the creators.
              </p>
            </div>
          </div>
        </section>

        {/* What You Can Earn */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">💰 What You Can Earn</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-6 text-left">Booking Type</th>
                      <th className="py-3 px-6 text-left">You Earn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                      <td className="py-3 px-6">10 sessions/day @ ₹2500</td>
                      <td className="py-3 px-6 font-medium">-</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">200 sessions/month</td>
                      <td className="py-3 px-6 font-medium">₹500,000+</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6">Add-on reels or editing upsells</td>
                      <td className="py-3 px-6 font-medium">More revenue potential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                (You set your own schedule – rent by hour, day, or weekend)
              </p>
            </div>
          </div>
        </section>

        {/* Example Studios */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">📸 See Example Studios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Home podcast setup" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white dark:bg-gray-700">
                    <p className="font-medium">Cozy Home Corner Studio</p>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Small studio setup" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white dark:bg-gray-700">
                    <p className="font-medium">Converted Spare Room</p>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1598391639592-9d5a5f384d33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Café corner studio" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white dark:bg-gray-700">
                    <p className="font-medium">Café Corner Setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">✅ Who This Is For</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <HomeIcon className="h-8 w-8 text-primary mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Flat owners & landlords</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      With extra rooms or unused spaces that could generate income.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Camera className="h-8 w-8 text-primary mr-4 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Photographers</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      With underused shooting spaces that can double as podcast studios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-up Form */}
        <section id="signup-form" className="py-16 bg-primary/10 dark:bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">📝 List Your Space – Get Started Now</h2>
              
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input 
                        id="whatsapp" 
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Your WhatsApp number" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location (City/Area)</Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Mumbai, Andheri" 
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="hasRoom">Do you already have a room?</Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <Button
                          type="button"
                          variant={hasRoom === "Yes" ? "default" : "outline"}
                          onClick={() => setHasRoom("Yes")}
                          className="w-full"
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={hasRoom === "No" ? "default" : "outline"}
                          onClick={() => setHasRoom("No")}
                          className="w-full"
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="needsHelp">Would you like help with setup?</Label>
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <Button
                          type="button"
                          variant={needsHelp === "Yes" ? "default" : "outline"}
                          onClick={() => setNeedsHelp("Yes")}
                          className="w-full"
                        >
                          Yes
                        </Button>
                        <Button
                          type="button"
                          variant={needsHelp === "No" ? "default" : "outline"}
                          onClick={() => setNeedsHelp("No")}
                          className="w-full"
                        >
                          No
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Start Setup"}
                      </Button>
                    </div>
                    
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      We'll contact you within 24 hours with your studio starter plan.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Still Thinking Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">🟣 Still Thinking?</h2>
              <p className="text-xl mb-8">
                StudioStash partners earn money while empowering creators.
                <br />No tenants. No hassle. Just bookings.
              </p>
              
              <Button 
                size="lg"
                onClick={() => {
                  const formElement = document.getElementById('signup-form');
                  formElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ListStudio;
