import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import BusinessCard from "@/components/BusinessCard";
import { useBusinesses } from "@/hooks/useBusinesses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PromotionalPlaceholder from "@/components/PromotionalPlaceholder";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const { businesses, loading, hasMore, loadMore } = useBusinesses({
    searchTerm,
    category: categoryName,
    pageSize: 9, // Number of businesses to load per page
  });

  const displayCategoryName = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "Categoría";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-2">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Categorías
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 capitalize text-center">{displayCategoryName}</h1>
          <p className="text-muted-foreground text-center">
            Descubre una selección de los mejores negocios en la categoría de {displayCategoryName}. Encuentra lo que buscas y apoya a la comunidad local.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Buscar negocio en esta categoría..."
            className="pl-12 py-6 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Business Grid */}
        {loading && businesses.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
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
            {businesses.slice(0, 2).map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
            {businesses.length > 2 && <PromotionalPlaceholder key="promo-1" />}
            {businesses.slice(2).map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}

        {!loading && businesses.length === 0 && searchTerm === "" && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay negocios en esta categoría</h3>
            <p className="text-muted-foreground">
              Sé el primero en registrar uno.
            </p>
          </div>
        )}

        {!loading && businesses.length === 0 && searchTerm !== "" && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground">
              Intenta ajustar tu búsqueda.
            </p>
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} disabled={loading}>
              {loading ? "Cargando..." : "Cargar más"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
