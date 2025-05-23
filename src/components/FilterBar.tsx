
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowDown, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="bg-white p-3 sticky top-16 z-30 shadow-xs">
      <div className="container mx-auto">
        <div className="flex items-center overflow-x-auto scrollbar-none pb-1 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <div className="border-r h-6 mx-1" />

          <Button
            variant={activeFilter === "rating" ? "default" : "outline"}
            size="sm"
            className="flex items-center"
            onClick={() => handleFilterClick("rating")}
          >
            Rating
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>

          <Select>
            <SelectTrigger className="h-8 border">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={activeFilter === "delivery" ? "default" : "outline"}
            size="sm"
            className="flex items-center whitespace-nowrap"
            onClick={() => handleFilterClick("delivery")}
          >
            Delivery Time
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>

          <Select>
            <SelectTrigger className="h-8 border whitespace-nowrap">
              <SelectValue placeholder="Cuisines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="thai">Thai</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center whitespace-nowrap"
          >
            More Filters
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
