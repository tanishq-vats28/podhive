
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import Rating from "./Rating";

interface ReviewCardProps {
  id: number;
  author: {
    name: string;
    image?: string;
    reviewCount: number;
  };
  rating: number;
  content: string;
  date: string;
  likeCount: number;
  liked?: boolean;
}

const ReviewCard = ({
  id,
  author,
  rating,
  content,
  date,
  likeCount,
  liked = false,
}: ReviewCardProps) => {
  return (
    <Card className="shadow-none border bg-gray-50">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={author.image} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-xs text-gray-500">
            {author.reviewCount} reviews
          </div>
        </div>
        
        <div className="ml-auto">
          <Rating value={rating} />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm mt-2">{content}</p>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>{date}</span>
          
          <button
            className={`flex items-center gap-1 ${
              liked ? "text-primary" : ""
            } hover:text-primary transition-colors`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{likeCount}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
