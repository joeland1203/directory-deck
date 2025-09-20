import cafeImage from '@/assets/cafe-central.jpg';
import restauranteImage from '@/assets/restaurante-sabor.jpg';
import tecnoImage from '@/assets/tecno-reparaciones.jpg';
import esteticaImage from '@/assets/estetica-bella.jpg';
import libreriaImage from '@/assets/libreria-conocimiento.jpg';
import gimnasioImage from '@/assets/gimnasio-fitlife.jpg';

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  gallery: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  website?: string;
  hours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  ownerId: string;
}

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Café Central',
    description: 'Un acogedor café en el corazón de la ciudad que sirve los mejores granos de café artesanal, postres caseros y un ambiente perfecto para trabajar o relajarse.',
    category: 'Cafetería',
    image: cafeImage,
    gallery: [
      cafeImage,
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Av. Principal 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '01000'
    },
    phone: '+52 55 1234-5678',
    website: 'https://cafecentral.com',
    hours: {
      'Lunes': { open: '07:00', close: '20:00' },
      'Martes': { open: '07:00', close: '20:00' },
      'Miércoles': { open: '07:00', close: '20:00' },
      'Jueves': { open: '07:00', close: '20:00' },
      'Viernes': { open: '07:00', close: '22:00' },
      'Sábado': { open: '08:00', close: '22:00' },
      'Domingo': { open: '08:00', close: '18:00' }
    },
    rating: 4.8,
    reviewCount: 127,
    isOpen: true,
    ownerId: 'owner1'
  },
  {
    id: '2',
    name: 'Restaurante El Buen Sabor',
    description: 'Restaurante familiar especializado en cocina tradicional mexicana con recetas caseras transmitidas de generación en generación.',
    category: 'Restaurante',
    image: restauranteImage,
    gallery: [
      restauranteImage,
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Calle Reforma 456',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44100'
    },
    phone: '+52 33 2345-6789',
    website: 'https://elbuensabor.com',
    hours: {
      'Lunes': { open: '12:00', close: '22:00' },
      'Martes': { open: '12:00', close: '22:00' },
      'Miércoles': { open: '12:00', close: '22:00' },
      'Jueves': { open: '12:00', close: '22:00' },
      'Viernes': { open: '12:00', close: '23:00' },
      'Sábado': { open: '12:00', close: '23:00' },
      'Domingo': { open: '12:00', close: '21:00' }
    },
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    ownerId: 'owner2'
  },
  {
    id: '3',
    name: 'TecnoReparaciones',
    description: 'Servicio técnico especializado en reparación de dispositivos electrónicos, smartphones, tablets y computadoras con garantía.',
    category: 'Tecnología',
    image: tecnoImage,
    gallery: [
      tecnoImage,
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Blvd. Tecnológico 789',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64000'
    },
    phone: '+52 81 3456-7890',
    hours: {
      'Lunes': { open: '09:00', close: '18:00' },
      'Martes': { open: '09:00', close: '18:00' },
      'Miércoles': { open: '09:00', close: '18:00' },
      'Jueves': { open: '09:00', close: '18:00' },
      'Viernes': { open: '09:00', close: '18:00' },
      'Sábado': { open: '09:00', close: '14:00' },
      'Domingo': { closed: true, open: '', close: '' }
    },
    rating: 4.9,
    reviewCount: 156,
    isOpen: false,
    ownerId: 'owner3'
  },
  {
    id: '4',
    name: 'Estética Bella Vista',
    description: 'Salón de belleza completo ofreciendo servicios de cortes, peinados, manicura, pedicura y tratamientos faciales con productos de primera calidad.',
    category: 'Belleza',
    image: esteticaImage,
    gallery: [
      esteticaImage,
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Av. Belleza 321',
      city: 'Puebla',
      state: 'Puebla',
      zipCode: '72000'
    },
    phone: '+52 22 4567-8901',
    website: 'https://esteticabellavista.com',
    hours: {
      'Lunes': { closed: true, open: '', close: '' },
      'Martes': { open: '10:00', close: '19:00' },
      'Miércoles': { open: '10:00', close: '19:00' },
      'Jueves': { open: '10:00', close: '19:00' },
      'Viernes': { open: '10:00', close: '19:00' },
      'Sábado': { open: '09:00', close: '17:00' },
      'Domingo': { open: '10:00', close: '15:00' }
    },
    rating: 4.7,
    reviewCount: 203,
    isOpen: true,
    ownerId: 'owner4'
  },
  {
    id: '5',
    name: 'Librería Conocimiento',
    description: 'Librería independiente con amplia selección de libros, revistas, material educativo y un rincón especial para eventos literarios.',
    category: 'Libros',
    image: libreriaImage,
    gallery: [
      libreriaImage,
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Calle Cultura 654',
      city: 'Mérida',
      state: 'Yucatán',
      zipCode: '97000'
    },
    phone: '+52 99 5678-9012',
    website: 'https://libreriaconocimiento.com',
    hours: {
      'Lunes': { open: '09:00', close: '20:00' },
      'Martes': { open: '09:00', close: '20:00' },
      'Miércoles': { open: '09:00', close: '20:00' },
      'Jueves': { open: '09:00', close: '20:00' },
      'Viernes': { open: '09:00', close: '20:00' },
      'Sábado': { open: '10:00', close: '18:00' },
      'Domingo': { open: '11:00', close: '16:00' }
    },
    rating: 4.5,
    reviewCount: 67,
    isOpen: true,
    ownerId: 'owner5'
  },
  {
    id: '6',
    name: 'Gimnasio FitLife',
    description: 'Gimnasio moderno equipado con la última tecnología en fitness, clases grupales, entrenamiento personalizado y área de spa.',
    category: 'Fitness',
    image: gimnasioImage,
    gallery: [
      gimnasioImage,
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    address: {
      street: 'Av. Deportes 987',
      city: 'Tijuana',
      state: 'Baja California',
      zipCode: '22000'
    },
    phone: '+52 66 6789-0123',
    website: 'https://gimnasiofitlife.com',
    hours: {
      'Lunes': { open: '05:00', close: '23:00' },
      'Martes': { open: '05:00', close: '23:00' },
      'Miércoles': { open: '05:00', close: '23:00' },
      'Jueves': { open: '05:00', close: '23:00' },
      'Viernes': { open: '05:00', close: '23:00' },
      'Sábado': { open: '06:00', close: '22:00' },
      'Domingo': { open: '07:00', close: '21:00' }
    },
    rating: 4.4,
    reviewCount: 312,
    isOpen: true,
    ownerId: 'owner6'
  }
];