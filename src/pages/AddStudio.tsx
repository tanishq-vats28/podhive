
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudioForm from "@/components/StudioForm";
import { toast } from "sonner";

const AddStudio = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to save the studio data
      console.log("Submitting studio data:", formData);
      
      // Log YouTube links specifically for demonstration
      if (formData.youtubeLinks?.length > 0) {
        console.log("YouTube links submitted:", formData.youtubeLinks.filter(Boolean));
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Studio submitted successfully! It will go live after review.", {
        description: "Your studio will be reviewed within 24 hours.",
      });
      
      // Redirect to dashboard
      navigate("/studio-dashboard");
    } catch (error) {
      toast.error("Failed to submit studio", {
        description: "Please try again later.",
      });
      console.error("Error submitting studio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Add New Studio</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Fill in the details below to list your studio on StudioStash
          </p>
          
          <StudioForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddStudio;
