import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Edit, 
  Eye, 
  BarChart3, 
  Users, 
  Store,
  Settings,
  LogOut,
  Camera
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const [userRole] = useState<'admin' | 'owner'>('owner'); // Simulated user role
  const [hasBusinessProfile] = useState(false); // Simulated business profile state

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            {userRole === 'admin' 
              ? 'Administra todos los negocios de la plataforma' 
              : 'Gestiona tu perfil de negocio y atrae más clientes'
            }
          </p>
        </div>

        {/* Supabase Connection Alert */}
        <Alert className="mb-8 border-warning bg-warning/5">
          <AlertDescription className="text-sm">
            <strong>Conectar Backend:</strong> Para habilitar la funcionalidad completa de autenticación, 
            base de datos y gestión de negocios, necesitas conectar tu proyecto a Supabase. 
            Haz clic en el botón verde "Supabase" en la esquina superior derecha.
          </AlertDescription>
        </Alert>

        {userRole === 'owner' ? (
          <OwnerDashboard hasBusinessProfile={hasBusinessProfile} />
        ) : (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
};

const OwnerDashboard = ({ hasBusinessProfile }: { hasBusinessProfile: boolean }) => {
  if (!hasBusinessProfile) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">🏪</div>
          <h2 className="text-2xl font-bold mb-4">
            ¡Crea el perfil de tu negocio!
          </h2>
          <p className="text-muted-foreground mb-8">
            Comienza creando el perfil de tu negocio para que los clientes puedan encontrarte fácilmente.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            <Plus className="h-5 w-5 mr-2" />
            Crear Perfil de Negocio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="profile">Mi Negocio</TabsTrigger>
        <TabsTrigger value="gallery">Galería</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicks en Teléfono</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas al Sitio Web</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">+18% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calificación</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">67 reseñas</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Negocio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Editar Información
            </Button>
            <p className="text-sm text-muted-foreground">
              Aquí podrás editar toda la información de tu negocio: nombre, descripción, dirección, horarios, etc.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="gallery" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Galería de Fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>
              <Camera className="h-4 w-4 mr-2" />
              Subir Fotos
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Puedes subir hasta 5 imágenes para mostrar tu negocio.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configuración General
            </Button>
            <Button variant="outline" className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const AdminDashboard = () => {
  const mockBusinesses = [
    { id: 1, name: 'Café Central', category: 'Cafetería', status: 'active', owner: 'Juan Pérez' },
    { id: 2, name: 'Restaurante El Buen Sabor', category: 'Restaurante', status: 'active', owner: 'María García' },
    { id: 3, name: 'TecnoReparaciones', category: 'Tecnología', status: 'pending', owner: 'Carlos López' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Negocios</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes de Aprobación</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Requieren revisión</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Negocios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBusinesses.map((business) => (
              <div key={business.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {business.category} • Dueño: {business.owner}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                    {business.status === 'active' ? 'Activo' : 'Pendiente'}
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/business/${business.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;