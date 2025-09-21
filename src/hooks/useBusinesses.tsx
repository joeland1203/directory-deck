import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Business {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string | null;
  website: string | null;
  hours: string | null;
  main_image_url: string | null;
  gallery_images: string[];
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los negocios.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return { businesses, loading, refetch: fetchBusinesses };
};

export const useUserBusiness = (userId: string | undefined) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserBusiness = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', userId)
        .maybeSingle();

      if (error) throw error;
      setBusiness(data);
    } catch (error) {
      console.error('Error fetching user business:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el negocio.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBusiness();
  }, [userId]);

  return { business, loading, refetch: fetchUserBusiness };
};