import { Menu, X, User, LogOut, Home, LayoutDashboard, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, userRole } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background-glass backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/favicon.png" alt="Logo de Revista Belcanto" className="h-8 w-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">Revista Belcanto</span>
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
          <div className="absolute right-0 w-[60%] md:hidden backdrop-filter backdrop-blur-lg bg-black/70 shadow-xl border-l border-white/10 rounded-b-xl">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="flex items-center space-x-3 text-green-400 font-semibold hover:text-green-200 transition-colors py-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-6 w-6" />
                <span>Inicio</span>
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-3 text-green-400 font-semibold hover:text-green-200 transition-colors py-2 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-6 w-6" />
                    <span>Panel de Control</span>
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full text-left text-green-400 font-semibold hover:text-green-200 transition-colors py-2 text-lg"
                  >
                    <LogOut className="h-6 w-6" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center space-x-3 text-green-400 font-semibold hover:text-green-200 transition-colors py-2 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-6 w-6" />
                  <span>Iniciar Sesión</span>
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