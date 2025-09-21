import { MapPin, Clock, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Business } from "@/hooks/useBusinesses";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const fullAddress = `${business.address}, ${business.city}, ${business.state}`;
  const displayImage = business.main_image_url || '/placeholder.svg';
  return (
    <Link to={`/business/${business.id}`}>
      <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={displayImage} 
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary">
              {business.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {business.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.5</span>
              <span className="text-sm text-muted-foreground">(12)</span>
            </div>
          </div>
          
          {business.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {business.description}
            </p>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{fullAddress}</span>
            </div>
            
            {business.phone && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{business.phone}</span>
              </div>
            )}
            
            {business.hours && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{business.hours}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BusinessCard;