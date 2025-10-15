import React from 'react';
import { Button } from '@/components/ui/button';
import adImage from '@/assets/banner2.png'; // Import the image

const PromotionalPlaceholder: React.FC = () => {
  const adTitle = 'Tu Negocio Merece un Sitio Web Programado para el Éxito.';
  const adDescription = 'Creamos soluciones web a tu medida. Desde el diseño hasta el desarrollo, construimos sitios rápidos, seguros y optimizados para ayudarte a alcanzar tus objetivos digitales.';
  const adButtonText = 'Contactanos';
  const adLinkUrl = 'https://codigobinario.com.mx';

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-lg flex items-center min-h-48">
      <a href={adLinkUrl} target="_blank" rel="noopener noreferrer" className="block w-1/2 h-full">
        <img src={adImage} alt={adTitle} className="w-full h-full object-cover" />
      </a>
      <div className="p-6 w-1/2 text-center">
        <h3 className="text-xl font-bold mb-2">{adTitle}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{adDescription}</p>
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
          <a href={adLinkUrl} target="_blank" rel="noopener noreferrer">
            {adButtonText}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PromotionalPlaceholder;