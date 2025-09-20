import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Phone, Globe, Star, Camera } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockBusinesses } from "@/data/mockBusinesses";

const BusinessProfile = () => {
  const { id } = useParams();
  const business = mockBusinesses.find(b => b.id === id);

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

  const getCurrentDay = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date().getDay()];
  };

  const todayHours = business.hours[getCurrentDay()];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge variant="secondary" className="mb-2">
            {business.category}
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-business-accent text-business-accent mr-1" />
              <span className="font-semibold">{business.rating}</span>
              <span className="ml-1">({business.reviewCount} reseñas)</span>
            </div>
            <Badge variant={business.isOpen ? "default" : "destructive"}>
              {business.isOpen ? "Abierto" : "Cerrado"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Acerca de {business.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Camera className="h-6 w-6 mr-2" />
                  Galería de Fotos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {business.gallery.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${business.name} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  Horarios de Atención
                </h2>
                <div className="space-y-3">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className={`font-medium ${day === getCurrentDay() ? 'text-primary' : 'text-foreground'}`}>
                        {day}
                      </span>
                      <span className={`${day === getCurrentDay() ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {hours.closed ? 'Cerrado' : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-sm text-muted-foreground">
                        {business.address.street}<br />
                        {business.address.city}, {business.address.state}<br />
                        {business.address.zipCode}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-muted-foreground">{business.phone}</p>
                    </div>
                  </div>

                  {business.website && (
                    <>
                      <Separator />
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Sitio Web</p>
                          <a 
                            href={business.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            Visitar sitio web
                          </a>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Estado actual</p>
                      <p className={`text-sm font-medium ${business.isOpen ? 'text-success' : 'text-destructive'}`}>
                        {business.isOpen ? (
                          todayHours?.closed ? 'Cerrado' : `Abierto hasta las ${todayHours?.close}`
                        ) : (
                          'Cerrado'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" size="lg">
                  Contactar Negocio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;