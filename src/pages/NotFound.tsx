import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          ¡Oops! Esta página no existe
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          La página que buscas no se encuentra disponible. 
          Puede que haya sido movida o eliminada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver Atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
