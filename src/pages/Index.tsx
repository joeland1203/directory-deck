import { useState } from "react";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin } from "lucide-react";
import { mockBusinesses } from "@/data/mockBusinesses";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  
  const categories = ["Todas", ...new Set(mockBusinesses.map(business => business.category))];
  
  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra los Mejores
            <span className="block text-business-accent">Negocios Locales</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Descubre y conecta con negocios excepcionales en tu comunidad
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <Input 
              placeholder="¿Qué estás buscando?" 
              className="pl-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/70"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Categorías</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2 text-sm hover:shadow-soft transition-all"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === "Todas" ? "Todos los Negocios" : selectedCategory}
              <span className="text-muted-foreground ml-2">({filteredBusinesses.length})</span>
            </h2>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Mostrando resultados cercanos</span>
            </div>
          </div>

          {/* Business Grid */}
          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map(business => (
                <BusinessCard
                  key={business.id}
                  id={business.id}
                  name={business.name}
                  category={business.category}
                  image={business.image}
                  address={`${business.address.street}, ${business.address.city}`}
                  rating={business.rating}
                  reviewCount={business.reviewCount}
                  isOpen={business.isOpen}
                  phone={business.phone}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
              <p className="text-muted-foreground">
                Intenta con diferentes términos de búsqueda o categorías
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-business-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un negocio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y haz que más clientes descubran tu negocio. 
            Es fácil, rápido y te ayudará a crecer.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:shadow-medium transition-all">
            Registrar mi Negocio
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;