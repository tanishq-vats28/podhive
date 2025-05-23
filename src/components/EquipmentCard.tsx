
import { Card, CardContent } from "@/components/ui/card";

interface EquipmentItem {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  isPremium: boolean;
}

interface EquipmentCardProps {
  item: EquipmentItem;
}

const EquipmentCard = ({ item }: EquipmentCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Premium
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{item.name}</h3>
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
