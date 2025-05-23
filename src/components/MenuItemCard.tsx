
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface MenuItemCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isBestseller?: boolean;
  onAddToCart?: (id: number, quantity: number) => void;
}

const MenuItemCard = ({
  id,
  name,
  description,
  price,
  image,
  isVeg,
  isBestseller = false,
  onAddToCart,
}: MenuItemCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
    }
    
    if (onAddToCart) {
      onAddToCart(id, quantity + 1);
    }
    
    setQuantity((prev) => prev + 1);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-none hover:bg-gray-50">
      <CardContent className="p-4 flex justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`h-4 w-4 border rounded-sm flex items-center justify-center ${
                isVeg ? "border-green-600" : "border-red-600"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  isVeg ? "bg-green-600" : "bg-red-600"
                }`}
              />
            </div>
            
            {isBestseller && (
              <span className="text-amber-500 text-xs font-medium">
                ★ Bestseller
              </span>
            )}
          </div>
          
          <h3 className="font-semibold mt-1">{name}</h3>
          <div className="mt-1 mb-2">₹{price.toFixed(2)}</div>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
        
        <div className="relative min-w-[120px] h-24">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-md"
            />
          )}
          
          <div className="absolute -bottom-3 inset-x-0 flex justify-center">
            {quantity === 0 ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddToCart}
                className="bg-white hover:bg-white text-primary hover:text-primary border border-gray-200 shadow-xs"
              >
                <span className="mr-1">Add</span>
                <PlusCircle className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex items-center bg-white border border-gray-200 rounded-md shadow-xs">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-primary"
                  onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
                >
                  -
                </Button>
                <span className="mx-2 text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-primary"
                  onClick={handleAddToCart}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
