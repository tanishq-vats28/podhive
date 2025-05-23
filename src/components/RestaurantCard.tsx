
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import Rating from "./Rating";

interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: string;
  discount?: string;
  location: string;
  promoted?: boolean;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisines,
  rating,
  deliveryTime,
  priceForTwo,
  discount,
  location,
  promoted = false,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in h-full">
        <div className="relative">
          {promoted && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              Promoted
            </div>
          )}
          
          {discount && (
            <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-medium">
              {discount}
            </div>
          )}
          
          <img
            src={image}
            alt={name}
            className="w-full object-cover h-48"
          />
        </div>
        
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <Rating value={rating} />
          </div>
          
          <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
            <span className="line-clamp-1">{cuisines.join(", ")}</span>
            <span>{priceForTwo}</span>
          </div>
          
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span className="mr-3">{deliveryTime}</span>
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span className="truncate">{location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
