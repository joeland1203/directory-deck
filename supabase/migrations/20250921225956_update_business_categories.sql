-- Eliminar temporalmente la columna 'category' de la tabla 'businesses'
-- Esto es necesario porque no se puede modificar un tipo ENUM si está en uso.
ALTER TABLE public.businesses DROP COLUMN category;

-- Eliminar el tipo ENUM antiguo
DROP TYPE public.business_category;

-- Crear el nuevo tipo ENUM con las categorías actualizadas
CREATE TYPE public.business_category AS ENUM (
  'alimentos',
  'servicios',
  'productos',
  'snacks',
  'tecnologia',
  'belleza'
);

-- Volver a añadir la columna 'category' a la tabla 'businesses' con el nuevo tipo ENUM
-- Asignar un valor por defecto a los registros existentes para evitar errores de NOT NULL
ALTER TABLE public.businesses ADD COLUMN category public.business_category NOT NULL DEFAULT 'alimentos';