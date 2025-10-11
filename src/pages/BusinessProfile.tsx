
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, MapPin, Phone, Globe, Star, Camera } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PromotionalPlaceholder from "@/components/PromotionalPlaceholder";

// Define a type for the business data for type safety
interface BusinessData {
  id: string;
  name: string;
  description: string | null;
  category: string;
  main_image_url: string | null;
  gallery_images: string[] | null;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string | null;
  website: string | null;
  hours: string | null; // Assuming hours are stored as text for now
}

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const fromCategory = location.state?.fromCategory;
  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async (retries = 3) => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("businesses")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching business:", error);
          if (retries > 0 && error.message.includes("Failed to fetch")) {
            console.log(`Retrying fetch for business ${id}... (${retries} retries left)`);
            await new Promise(res => setTimeout(res, 1000)); // Wait 1 second before retrying
            return fetchBusiness(retries - 1);
          }
          setBusiness(null);
        } else {
          setBusiness(data);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchBusiness();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">Cargando...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Negocio no encontrado</h1>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {business && (
        <Helmet>
          <title>{`${business.name} - Revista Belcanto`}</title>
          <meta name="description" content={business.description?.substring(0, 160) || `Encuentra información sobre ${business.name}, un negocio local destacado en Revista Belcanto.`} />
          <link rel="canonical" href={`https://www.revistabelcanto.com/business/${business.id}`} />
          <meta property="og:title" content={`${business.name} - Revista Belcanto`} />
          <meta property="og:description" content={business.description?.substring(0, 160) || `Encuentra información sobre ${business.name}, un negocio local destacado en Revista Belcanto.`} />
          <meta property="og:image" content={business.main_image_url || "https://www.revistabelcanto.com/favicon.png"} />
          <meta property="og:url" content={`https://www.revistabelcanto.com/business/${business.id}`} />
          <meta name="twitter:title" content={`${business.name} - Revista Belcanto`} />
          <meta name="twitter:description" content={business.description?.substring(0, 160) || `Encuentra información sobre ${business.name}, un negocio local destacado en Revista Belcanto.`} />
          <meta name="twitter:image" content={business.main_image_url || "https://www.revistabelcanto.com/favicon.png"} />
        </Helmet>
      )}
      <Header />
      
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link to={fromCategory ? `/category/${fromCategory}` : "/"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
      </div>

      <div className="relative h-96 overflow-hidden">
        {business.main_image_url ? (
          <img src={business.main_image_url} alt={business.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <Camera className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge variant="secondary" className="mb-2 capitalize">{business.category}</Badge>
          <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card><CardContent className="p-6"><h2 className="text-2xl font-bold mb-4">Acerca de {business.name}</h2><p className="text-muted-foreground leading-relaxed">{business.description || "No hay descripción disponible."}</p></CardContent></Card>

            {business.gallery_images && business.gallery_images.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center"><Camera className="h-6 w-6 mr-2" />Galería de Fotos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {business.gallery_images.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img src={image} alt={`${business.name} - Imagen ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {business.hours && <Card><CardContent className="p-6"><h2 className="text-2xl font-bold mb-4 flex items-center"><Clock className="h-6 w-6 mr-2" />Horarios</h2><p>{business.hours}</p></CardContent></Card>}
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3"><MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" /><div><p className="font-medium">Dirección</p><p className="text-sm text-muted-foreground">{business.address}<br />{business.city}, {business.state} {business.postal_code}</p></div></div>
                  {business.phone && <><Separator /><div className="flex items-center space-x-3"><Phone className="h-5 w-5 text-primary flex-shrink-0" /><div><p className="font-medium">Teléfono</p><p className="text-sm text-muted-foreground">{business.phone}</p></div></div></>}
                  {business.website && <><Separator /><div className="flex items-center space-x-3"><Globe className="h-5 w-5 text-primary flex-shrink-0" /><div><p className="font-medium">Sitio Web</p><a href={business.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Visitar sitio web</a></div></div></>}
                </div>
                <Button className="w-full mt-6" size="lg">Contactar Negocio</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <PromotionalPlaceholder />
      </div>
    </div>
  );
};

export default BusinessProfile;
