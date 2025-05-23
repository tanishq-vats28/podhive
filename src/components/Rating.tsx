
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  className?: string;
  showValue?: boolean;
}

const Rating = ({ value, className, showValue = true }: RatingProps) => {
  // Determine color based on rating value
  const getColor = (rating: number) => {
    if (rating >= 4) return "bg-zomato-rating-green text-white";
    if (rating >= 3) return "bg-zomato-rating-orange text-white";
    return "bg-zomato-rating-red text-white";
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-1.5 py-0.5 rounded text-xs font-medium",
        getColor(value),
        className
      )}
    >
      {showValue && value.toFixed(1)}
      <svg
        className="w-3 h-3 ml-0.5 fill-current"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  );
};

export default Rating;
