import { Menu, X, User, LogOut, Home, LayoutDashboard, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();

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
          <nav className="flex items-center space-x-6">
            <Button variant="outline" asChild>
              <Link 
                to="/" 
              >
                Inicio
              </Link>
            </Button>
            
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
                  onClick={async () => { await signOut(); navigate('/', { replace: true }); }}
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

        </div>

      </div>
    </header>
  );
};

export default Header;