import { MapPin, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, userRole } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">DirectorioBiz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-foreground/80 hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Panel</span>
                </Link>
                <Button 
                  variant="ghost"
                  onClick={signOut}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Salir</span>
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">
                  Iniciar Sesión
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-foreground/80 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block text-foreground/80 hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Panel de Control
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors py-2"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="block bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;