import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¿Tienes un negocio?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Únete a nuestra plataforma y haz que más clientes descubran tu negocio.
          Es fácil, rápido y te ayudará a crecer.
        </p>
        <Button size="lg" className="bg-gradient-primary" asChild>
          <Link to="/login">
            Registrar mi Negocio
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
