
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
}

const CategoryCard = ({ name, image, slug }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-105 duration-300">
        <div className="h-24 sm:h-32 relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-2 left-0 right-0 text-center text-white font-semibold">
            {name}
          </h3>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
