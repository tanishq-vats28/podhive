
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CollectionCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  placesCount: number;
}

const CollectionCard = ({
  id,
  title,
  description,
  image,
  placesCount,
}: CollectionCardProps) => {
  return (
    <Link to={`/collections/${id}`} className="block h-full">
      <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white text-sm font-medium">
                {placesCount} Places
              </span>
              <ArrowRight className="text-white h-4 w-4" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;
