import { useState } from "react";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import { useBusinesses } from "@/hooks/useBusinesses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const { businesses, loading } = useBusinesses();

  const categories = [
    { value: "todos", label: "Todas las categorías" },
    { value: "restaurante", label: "Restaurantes" },
    { value: "tecnologia", label: "Tecnología" },
    { value: "belleza", label: "Belleza" },
    { value: "educacion", label: "Educación" },
    { value: "fitness", label: "Fitness" },
    { value: "cafe", label: "Cafés" },
  ];

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (business.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encuentra los mejores
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                negocios locales
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre y conecta con negocios excepcionales en tu comunidad
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="¿Qué estás buscando?"
                className="pl-12 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2 text-sm hover:shadow-soft transition-all"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory === "todos" ? "Todos los Negocios" : 
               categories.find(c => c.value === selectedCategory)?.label}
              <span className="text-muted-foreground ml-2">({filteredBusinesses.length})</span>
            </h2>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Mostrando resultados</span>
            </div>
          </div>

          {/* Business Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}

          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron negocios</h3>
              <p className="text-muted-foreground">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes un negocio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y haz que más clientes descubran tu negocio.
            Es fácil, rápido y te ayudará a crecer.
          </p>
          <Button size="lg" className="bg-gradient-primary" asChild>
            <Link to="/login">
              Registrar mi Negocio
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;