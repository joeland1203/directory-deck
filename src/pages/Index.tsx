import { useState } from "react";
import { Search, Filter, MapPin, Star, Utensils, ShoppingBag, Package, Popcorn, Laptop, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PromotionalPlaceholder from "@/components/PromotionalPlaceholder";

const Index = () => {
  const categories = [
    { value: "alimentos", label: "Alimentos", icon: Utensils },
    { value: "servicios", label: "Servicios", icon: Search },
    { value: "productos", label: "Productos", icon: ShoppingBag },
    { value: "snacks", label: "Snacks", icon: Popcorn },
    { value: "tecnologia", label: "Tecnología", icon: Laptop },
    { value: "belleza", label: "Belleza", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Revista Belcanto - Directorio de Negocios Locales</title>
        <meta name="description" content="Encuentra y conecta con los mejores negocios locales en tu comunidad. Explora categorías como alimentos, servicios, productos y más." />
      </Helmet>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Encuentra los mejores
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                negocios locales
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre y conecta con negocios excepcionales en tu comunidad
            </p>

            {/* Search Bar - Will be moved to Category Page */}
            {/* <div className="max-w-md mx-auto relative opacity-50 cursor-not-allowed">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="¿Qué estás buscando? (Próximamente en categorías)"
                className="pl-12 py-6 text-lg"
                disabled
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explora por Categoría</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link to={`/category/${category.value}`} key={category.value}>
                <Card className="flex flex-col items-center justify-center p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="mb-4 text-primary">
                    <category.icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-xl font-semibold capitalize">{category.label}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placeholder Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <PromotionalPlaceholder />
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
