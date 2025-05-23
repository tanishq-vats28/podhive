
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface FilterValues {
  searchQuery: string;
  priceRange: number[];
  rating: number;
  category?: string;
}

interface AdvancedFilterBarProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function AdvancedFilterBar({ onFilterChange }: AdvancedFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: "",
    priceRange: [0, 500],
    rating: 0,
    category: undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (value: string) => {
    setFilters((prev) => ({ ...prev, rating: parseInt(value) }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const handlePriceRangeChange = (minOrMax: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    setFilters((prev) => {
      const [min, max] = prev.priceRange;
      return {
        ...prev,
        priceRange: minOrMax === "min" ? [numValue, max] : [min, numValue],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const resetFilters = {
      searchQuery: "",
      priceRange: [0, 500],
      rating: 0,
      category: undefined,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="container mx-auto px-4 py-4 bg-white dark:bg-gray-800 shadow-xs rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">Advanced Search</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchQuery">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="searchQuery"
                  name="searchQuery"
                  placeholder="Search studios, equipment..."
                  className="pl-8"
                  value={filters.searchQuery}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                  className="w-1/2"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Minimum Rating</Label>
              <RadioGroup 
                value={filters.rating.toString()} 
                onValueChange={handleRatingChange}
                className="flex space-x-2"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="flex items-center space-x-1">
                    <RadioGroupItem value={star.toString()} id={`rating-${star}`} />
                    <Label htmlFor={`rating-${star}`}>{star}+</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={filters.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="voice-over">Voice Over</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center"
            >
              <X className="mr-1 h-4 w-4" /> Clear Filters
            </Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdvancedFilterBar;
