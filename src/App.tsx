import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useEffect } from "react";
import { reinitializeSupabaseClient } from "./integrations/supabase/client";

import Index from "./pages/Index";
import BusinessProfile from "./pages/BusinessProfile";
import BusinessProfileForm from "./pages/BusinessProfileForm";
import CategoryPage from "./pages/CategoryPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('App visible, reinitializing Supabase client...');
        reinitializeSupabaseClient();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/business/:id" element={<BusinessProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/business-profile" element={<BusinessProfileForm />} />
                <Route path="/business-profile/edit" element={<BusinessProfileForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
