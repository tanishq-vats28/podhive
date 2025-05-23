
import { useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import CollectionCard from "@/components/CollectionCard";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import StudioCard from "@/components/StudioCard";
import Footer from "@/components/Footer";
import { categories, collections, studios } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Cart from "@/components/Cart";
import FeaturedStudios from "@/components/FeaturedStudios";
import Testimonials from "@/components/Testimonials";
import { AdvancedFilterBar } from "@/components/AdvancedFilterBar";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudioOwner, setIsStudioOwner] = useState(false);
  const [filteredStudios, setFilteredStudios] = useState(studios);
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    
    let filtered = studios;
    
    if (filters.priceRange && Array.isArray(filters.priceRange)) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((studio) => {
        const price = parseInt(studio.pricePerHour.replace(/\D/g, ''));
        return price >= min && price <= max;
      });
    }
    
    if (filters.rating) {
      filtered = filtered.filter((studio) => studio.rating >= filters.rating);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((studio) => 
        studio.name.toLowerCase().includes(query) || 
        studio.location.toLowerCase().includes(query) ||
        studio.equipment.some((eq: string) => eq.toLowerCase().includes(query))
      );
    }
    
    setFilteredStudios(filtered);
  };
  
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setIsStudioOwner(userType === "owner");

    const handleStorageChange = () => {
      const updatedUserType = localStorage.getItem("userType");
      setIsStudioOwner(updatedUserType === "owner");
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('userTypeChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userTypeChanged', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <HeroSection />
      
      <AdvancedFilterBar onFilterChange={handleFilterChange} />
      
      <main className="flex-1">
        <FeaturedStudios />
        
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Podcast Studios</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                image={category.image}
                slug={category.slug}
              />
            ))}
          </div>
        </section>
        
        <Testimonials />
        
        <section className="py-10 container mx-auto px-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Studios</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover the best podcast recording studios in your area
              </p>
            </div>
            <Button variant="link" size="sm" className="text-primary hidden md:flex">
              All Collections <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                id={collection.id}
                title={collection.title}
                description={collection.description}
                image={collection.image}
                placesCount={collection.placesCount}
              />
            ))}
          </div>
        </section>
        
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Popular Studios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard
                key={studio.id}
                id={studio.id}
                name={studio.name}
                image={studio.image}
                equipment={studio.equipment}
                rating={studio.rating}
                availableTimes={studio.availableTimes}
                pricePerHour={studio.pricePerHour}
                discount={studio.discount}
                location={studio.location}
                promoted={studio.promoted}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button>
              View More Studios
            </Button>
          </div>
        </section>
      </main>
      
      {!isStudioOwner && (
        <div className="fixed bottom-4 right-4 z-40 md:hidden">
          <Button 
            onClick={() => setIsCartOpen(true)} 
            className="rounded-full h-14 w-14 shadow-lg"
          >
            <BookingIcon className="h-6 w-6" />
          </Button>
        </div>
      )}
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </div>
  );
};

const BookingIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

export default Index;
