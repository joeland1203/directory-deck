import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        navigate(redirectTo);
      }
    }
  }, [user, loading, requireAuth, redirectTo, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="h-7 w-7 bg-white rounded"></div>
          </div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;