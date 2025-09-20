import { MapPin, Clock, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  address: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  phone?: string;
}

const BusinessCard = ({ 
  id, 
  name, 
  category, 
  image, 
  address, 
  rating, 
  reviewCount, 
  isOpen,
  phone 
}: BusinessCardProps) => {
  return (
    <Link to={`/business/${id}`}>
      <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={isOpen ? "default" : "destructive"}>
              {isOpen ? "Abierto" : "Cerrado"}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-business-accent text-business-accent" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-3">
            {category}
          </Badge>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{address}</span>
            </div>
            
            {phone && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{phone}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className={isOpen ? "text-success" : "text-destructive"}>
                {isOpen ? "Abierto ahora" : "Cerrado"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BusinessCard;