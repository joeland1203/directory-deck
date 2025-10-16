import React from 'react';
import { Button } from '@/components/ui/button';
import adImage from '@/assets/banner2.png'; // Import the image

// This is a comment to force re-processing
const PromotionalPlaceholder: React.FC = () => {
  const adTitle = 'Tu Negocio Merece un Sitio Web Programado para el Éxito.';
  const adDescription = 'Construimos sitios rápidos, seguros y optimizados para ayudarte a alcanzar tus objetivos digitales';
  const adButtonText = 'Contactanos';
  const adLinkUrl = 'https://codigobinario.com.mx';

  return (
    <div className="relative aspect-[2/1] w-full max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-card border rounded-lg overflow-hidden shadow-lg flex items-stretch">
        <div className="block w-1/2 h-full relative">
          <img src={adImage} alt={adTitle} className="w-full h-full object-cover" />
        <h3 className="absolute bottom-0 left-0 right-0 p-1 text-white text-base font-bold bg-black/50 text-center" style={{ lineHeight: 'var(--ad-title-line-height)' }}>
          {adTitle}
        </h3>        </div>
      <div className="p-6 w-1/2 text-center flex flex-col justify-between">
        <div className="flex items-center justify-center flex-grow">
          <h3 className="text-base md:text-xl mb-2">{adDescription}</h3>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
            <a href={adLinkUrl} target="_blank" rel="noopener noreferrer">
              {adButtonText}
            </a>
          </Button>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <p className="text-muted-foreground text-sm md:text-2xl font-bold">codigobinario.com.mx</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PromotionalPlaceholder;