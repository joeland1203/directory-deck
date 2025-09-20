import { MapPin, Search, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">DirectorioBiz</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar negocios..." 
              className="pl-10"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">
                <Settings className="h-4 w-4 mr-2" />
                Panel
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/login">
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar negocios..." 
            className="pl-10"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;