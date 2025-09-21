-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'business_owner');

-- Create enum for business categories
CREATE TYPE public.business_category AS ENUM (
  'restaurante', 'tecnologia', 'belleza', 'educacion', 'fitness', 'cafe', 'otros'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'business_owner',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create businesses table
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category business_category NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  hours TEXT,
  main_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for businesses
CREATE POLICY "Anyone can view businesses" 
ON public.businesses 
FOR SELECT 
USING (true);

CREATE POLICY "Business owners can create businesses" 
ON public.businesses 
FOR INSERT 
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Business owners can update their own businesses" 
ON public.businesses 
FOR UPDATE 
USING (auth.uid() = owner_id);

CREATE POLICY "Admins can update any business" 
ON public.businesses 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Business owners can delete their own businesses" 
ON public.businesses 
FOR DELETE 
USING (auth.uid() = owner_id);

CREATE POLICY "Admins can delete any business" 
ON public.businesses 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  
  -- Insert default role as business_owner
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'business_owner');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for business images
INSERT INTO storage.buckets (id, name, public) VALUES ('business-images', 'business-images', true);

-- Create storage policies for business images
CREATE POLICY "Anyone can view business images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'business-images');

CREATE POLICY "Business owners can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'business-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Business owners can update their images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'business-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Business owners can delete their images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'business-images' 
  AND auth.uid() IS NOT NULL
);