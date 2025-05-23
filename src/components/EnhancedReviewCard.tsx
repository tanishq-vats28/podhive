
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ThumbsUp, 
  Flag,
  CheckCircle
} from "lucide-react";
import Rating from "@/components/Rating";

interface EnhancedReviewCardProps {
  id: number;
  author: {
    name: string;
    image?: string;
    reviewCount: number;
  };
  title?: string;
  rating: number;
  content: string;
  date: string;
  likeCount: number;
  liked?: boolean;
  verified?: boolean;
  photoUrls?: string[];
  onLike?: (id: number) => void;
  onReport?: (id: number) => void;
}

const EnhancedReviewCard = ({
  id,
  author,
  title,
  rating,
  content,
  date,
  likeCount,
  liked = false,
  verified = false,
  photoUrls = [],
  onLike,
  onReport,
}: EnhancedReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [expandedPhoto, setExpandedPhoto] = useState<string | null>(null);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikeCount(isLiked ? currentLikeCount - 1 : currentLikeCount + 1);
    if (onLike) onLike(id);
  };
  
  const handleReport = () => {
    if (onReport) onReport(id);
  };

  return (
    <Card className="shadow-none border bg-gray-50 dark:bg-gray-800">
      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
        <Avatar>
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <span className="font-semibold">{author.name}</span>
                {verified && (
                  <Badge variant="outline" className="ml-2 border-green-200 bg-green-50 text-green-700 flex items-center space-x-1 px-2">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span className="text-xs">Verified Visit</span>
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {author.reviewCount} reviews
              </div>
            </div>
            
            <div>
              <Rating value={rating} />
            </div>
          </div>
          
          {/* Review Title - New addition */}
          {title && <h4 className="font-medium mt-2">{title}</h4>}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-sm mt-2 whitespace-pre-line">{content}</p>
        
        {/* Photo Gallery - New addition */}
        {photoUrls.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {photoUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Review ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md cursor-pointer"
                onClick={() => setExpandedPhoto(url)}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{new Date(date).toLocaleDateString()}</span>
          
          <div className="flex items-center gap-3">
            <button
              className={`flex items-center gap-1 ${
                isLiked ? "text-primary" : ""
              } hover:text-primary transition-colors`}
              onClick={handleLike}
              aria-label="Like review"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{currentLikeCount}</span>
            </button>
            
            <button
              className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
              onClick={handleReport}
              aria-label="Report review"
            >
              <Flag className="h-3.5 w-3.5" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </CardContent>
      
      {/* Photo Modal - New addition */}
      {expandedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedPhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh]">
            <img 
              src={expandedPhoto} 
              alt="Review" 
              className="max-w-full max-h-full object-contain" 
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 w-8 h-8 rounded-full flex items-center justify-center"
              onClick={() => setExpandedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EnhancedReviewCard;
