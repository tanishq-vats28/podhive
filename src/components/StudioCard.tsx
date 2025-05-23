
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Rating from "@/components/Rating";

interface StudioCardProps {
  id: number;
  name: string;
  image: string;
  equipment: string[];
  rating: number;
  availableTimes: string;
  pricePerHour: string;
  discount?: string;
  location: string;
  promoted?: boolean;
}

const StudioCard = ({
  id,
  name,
  image,
  equipment,
  rating,
  availableTimes,
  pricePerHour,
  discount,
  location,
  promoted,
}: StudioCardProps) => {
  return (
    <Link to={`/studio/${id}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative">
          {promoted && (
            <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
              Promoted
            </div>
          )}
          <div className="h-48 relative">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
              <Rating value={rating} />
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
              {equipment.join(", ")}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-600">{location}</p>
              <p className="text-sm font-medium">{availableTimes}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-bold text-primary">{pricePerHour}</p>
              {discount && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {discount}
                </span>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default StudioCard;
