import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Globe, 
  Clock,
  Image as ImageIcon,
  Settings,
  BarChart3,
  Users
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useBusinesses, useUserBusiness } from "@/hooks/useBusinesses";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const { businesses } = useBusinesses({});
  const { business: userBusiness, loading: businessLoading } = useUserBusiness(user?.id);
  const [activeTab, setActiveTab] = useState("my-business");

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || businessLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = userRole === "admin";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? 'Administra todos los negocios de la plataforma'
              : 'Gestiona tu perfil de negocio y atrae más clientes'
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-border">
          {!isAdmin && (
            <Button
              variant={activeTab === "my-business" ? "default" : "ghost"}
              onClick={() => setActiveTab("my-business")}
              className="rounded-b-none"
            >
              Mi Negocio
            </Button>
          )}
          
          {isAdmin && (
            <>
              <Button
                variant={activeTab === "all-businesses" ? "default" : "ghost"}
                onClick={() => setActiveTab("all-businesses")}
                className="rounded-b-none"
              >
                Todos los Negocios
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                onClick={() => setActiveTab("analytics")}
                className="rounded-b-none"
              >
                Estadísticas
              </Button>
            </>
          )}
        </div>

        {/* Content */}
        {activeTab === "my-business" && !isAdmin && (
          <BusinessOwnerDashboard userBusiness={userBusiness} navigate={navigate} />
        )}
        
        {activeTab === "all-businesses" && isAdmin && (
          <AdminBusinessesDashboard businesses={businesses} />
        )}
        
        {activeTab === "analytics" && isAdmin && (
          <AdminAnalyticsDashboard />
        )}
      </div>
    </div>
  );
};

const BusinessOwnerDashboard = ({ userBusiness, navigate }: { userBusiness: any, navigate: any }) => {
  if (!userBusiness) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            ¡Crea el perfil de tu negocio!
          </h2>
          <p className="text-muted-foreground mb-8">
            Comienza creando el perfil de tu negocio para que los clientes puedan encontrarte fácilmente.
          </p>
          <Button size="lg" className="bg-gradient-primary" onClick={() => navigate('/business-profile')}>
            <Plus className="h-5 w-5 mr-2" />
            Crear Perfil de Negocio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Business Info Card */}
      <Card>
        <div className="md:grid md:grid-cols-3 md:gap-6 p-6">
          <div className="md:col-span-1">
            {userBusiness.main_image_url ? (
              <img 
                src={userBusiness.main_image_url} 
                alt={userBusiness.name} 
                className="w-full h-auto aspect-video object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-auto aspect-video bg-secondary rounded-lg flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="md:col-span-2 mt-4 md:mt-0">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{userBusiness.name}</CardTitle>
                <Button variant="default" onClick={() => navigate('/business-profile/edit')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Información Básica</h4>
                  <p className="text-sm text-muted-foreground mb-1 capitalize">
                    <strong>Categoría:</strong> {userBusiness.category}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Dirección:</strong> {userBusiness.address}, {userBusiness.city}
                  </p>
                  {userBusiness.phone && (
                    <p className="text-sm text-muted-foreground mb-1">
                      <Phone className="h-4 w-4 inline mr-1" />
                      {userBusiness.phone}
                    </p>
                  )}
                  {userBusiness.website && (
                    <p className="text-sm text-muted-foreground">
                      <Globe className="h-4 w-4 inline mr-1" />
                      {userBusiness.website}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Descripción</h4>
                  <p className="text-sm text-muted-foreground">
                    {userBusiness.description || 'Sin descripción'}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start" onClick={() => navigate('/business-profile/edit')}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Gestionar Galería
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate('/business-profile/edit')}>
              <Clock className="h-4 w-4 mr-2" />
              Actualizar Horarios
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => navigate('/business-profile/edit')}>
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link to={`/business/${userBusiness.id}`}>
                Ver Perfil Público
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminBusinessesDashboard = ({ businesses }: { businesses: any[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestión de Negocios</h2>
        <Badge variant="secondary">{businesses.length} negocios</Badge>
      </div>

      <div className="space-y-4">
        {businesses.map((business) => (
          <Card key={business.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {business.category} • {business.city}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Creado: {new Date(business.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/business/${business.id}`}>
                      Ver Perfil
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AdminAnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estadísticas de la Plataforma</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Negocios</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+8 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">+15% este mes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;