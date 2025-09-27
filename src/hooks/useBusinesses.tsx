import { useState, useEffect, useCallback } from 'react';
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

interface UseBusinessesProps {
  searchTerm?: string;
  category?: string;
  pageSize?: number;
}

export const useBusinesses = ({ searchTerm, category, pageSize = 9 }: UseBusinessesProps) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBusinesses = useCallback(async (currentPage: number, isNewQuery: boolean) => {
    try {
      setLoading(true);

      let query = supabase
        .from('businesses')
        .select('*', { count: 'exact' });

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      if (category && category !== 'todos') {
        query = query.eq('category', category);
      }

      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data) {
        if (isNewQuery) {
          setBusinesses(data);
        } else {
          setBusinesses(prev => [...prev, ...data]);
        }
        setHasMore(data.length === pageSize && count && (from + data.length) < count);
      }

    } catch (error: any) {
      console.error('Error fetching businesses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los negocios.",
      });
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category, pageSize]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchBusinesses(1, true);
  }, [searchTerm, category, fetchBusinesses]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBusinesses(nextPage, false);
    }
  };

  return { businesses, loading, hasMore, loadMore };
};

// useUserBusiness remains the same
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