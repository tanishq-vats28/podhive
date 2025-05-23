
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  studioId: number;
  studioName: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Mock cart items for demonstration
  useEffect(() => {
    setCartItems([
      {
        id: 1,
        name: "Professional Studio - 1 Hour",
        price: 999,
        quantity: 1,
        studioId: 1,
        studioName: "SoundWave Studios"
      },
      {
        id: 2,
        name: "Premium Microphone",
        price: 299,
        quantity: 2,
        studioId: 1,
        studioName: "SoundWave Studios"
      }
    ]);
  }, []);

  // Calculate subtotal whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
        <Card className="h-full border-0 rounded-none">
          <CardHeader className="sticky top-0 z-10 bg-white border-b">
            <CardTitle className="flex justify-between items-center">
              <span>Your Booking</span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </CardTitle>
            {cartItems.length > 0 && (
              <div className="text-sm text-gray-500">
                from {cartItems[0]?.studioName}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-0 flex-1">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="w-24 h-24 mb-4">
                  <img
                    src="https://b.zmtcdn.com/web_assets/b69badeeb9ef00f52396c4a9386b1c361630706839.png"
                    alt="Empty cart"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cart Empty</h3>
                <p className="text-gray-500 text-center mb-6">
                  Great studios are waiting! Go ahead, book some time slots or equipment.
                </p>
                <Button onClick={onClose}>Browse Studios</Button>
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        <div className="h-4 w-4 mt-1 border border-green-600 rounded-sm flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-gray-500">
                            ₹{item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-primary"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </Button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-primary"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="w-20 text-right">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          
          {cartItems.length > 0 && (
            <CardFooter className="flex-col p-0 sticky bottom-0 bg-white border-t">
              <div className="p-4 w-full">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booking Fee</span>
                    <span>₹40.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST and Studio Charges</span>
                    <span>₹{(subtotal * 0.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(subtotal + 40 + subtotal * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="p-4 w-full">
                <Button className="w-full" size="lg">
                  Confirm Booking
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Cart;
