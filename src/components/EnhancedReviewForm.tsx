
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ReviewFormProps {
  studioId: number;
  onSubmit: (review: any) => void;
}

const EnhancedReviewForm = ({ studioId, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Limit to max 3 photos
      if (photos.length + selectedFiles.length > 3) {
        toast.error("You can upload a maximum of 3 photos");
        return;
      }
      
      const newPhotos = [...photos, ...selectedFiles];
      setPhotos(newPhotos);
      
      // Generate previews
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPhotosPreviews([...photosPreviews, ...newPreviews]);
    }
  };
  
  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    
    const updatedPreviews = [...photosPreviews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPhotosPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (content.trim() === "") {
      toast.error("Please enter a review");
      return;
    }
    
    setSubmitting(true);
    
    // Create form data with review info + photos
    const formData = new FormData();
    formData.append("studioId", studioId.toString());
    formData.append("rating", rating.toString());
    formData.append("title", title);
    formData.append("content", content);
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    
    try {
      // For demo purposes we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const reviewData = {
        id: Math.floor(Math.random() * 1000),
        studioId,
        rating,
        title,
        content,
        date: new Date().toISOString(),
        photoUrls: photosPreviews,
        author: {
          name: "Alex Johnson",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          reviewCount: 5
        },
        likeCount: 0,
        verified: true
      };
      
      onSubmit(reviewData);
      
      // Reset form
      setRating(0);
      setContent("");
      setTitle("");
      setPhotos([]);
      setPhotosPreviews([]);
      
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="rating" className="block mb-2">Your Rating</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRatingClick(value)}
              className="focus:outline-hidden"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating ? `${rating} ${rating === 1 ? "star" : "stars"}` : "Select rating"}
          </span>
        </div>
      </div>
      
      <div>
        <Label htmlFor="title">Review Title</Label>
        <Input
          id="title"
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="review" className="block mb-2">Your Review</Label>
        <Textarea
          id="review"
          placeholder="Tell others about your experience at this studio..."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="photos" className="block mb-2">Add Photos (Optional)</Label>
        <div className="mb-3 flex flex-wrap gap-2">
          {photosPreviews.map((preview, index) => (
            <div key={index} className="relative w-20 h-20 group">
              <img 
                src={preview}
                alt={`Review photo ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
          {photos.length < 3 && (
            <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary">
              <span className="text-2xl text-gray-400">+</span>
              <span className="text-xs text-gray-500">Add photo</span>
              <Input 
                id="photos" 
                type="file" 
                accept="image/*"
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-gray-500">Add up to 3 photos to show your experience</p>
      </div>
      
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default EnhancedReviewForm;
