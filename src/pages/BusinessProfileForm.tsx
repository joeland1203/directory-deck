import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { X, Trash2, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

const businessCategories = [
  "alimentos", 
  "servicios", 
  "productos", 
  "snacks", 
  "tecnologia", 
  "belleza"
] as const;

const profileFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  category: z.enum(businessCategories, { required_error: "Debes seleccionar una categoría." }),
  description: z.string().optional(),
  address: z.string().min(5, "La dirección es obligatoria."),
  city: z.string().min(3, "La ciudad es obligatoria."),
  state: z.string().min(2, "El estado es obligatorio."),
  postal_code: z.string().min(4, "El código postal es obligatorio."),
  phone: z.string().optional(),
  website: z.string().url("Debe ser una URL válida.").optional().or(z.literal('')),
  main_image_url: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  hours: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const BusinessProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  const isEditMode = location.pathname.includes("/edit");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { name: "", category: undefined, description: "", address: "", city: "", state: "", postal_code: "", phone: "", website: "", main_image_url: "", gallery_images: [], hours: "" },
  });

  useEffect(() => {
    if (isEditMode && user) {
      const fetchBusinessData = async () => {
        setIsLoading(true);
        const { data } = await supabase.from("businesses").select("* ").eq("owner_id", user.id).single();
        if (data) {
          const formData = { ...data, description: data.description || "", phone: data.phone || "", website: data.website || "", main_image_url: data.main_image_url || "", gallery_images: data.gallery_images || [], hours: data.hours || "" };
          form.reset(formData);
          if (data.main_image_url) setExistingImageUrl(data.main_image_url);
          if (data.gallery_images) setExistingGalleryUrls(data.gallery_images);
        }
        setIsLoading(false);
      };
      fetchBusinessData();
    }
  }, [isEditMode, user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      toast({
        title: "Imagen demasiado grande",
        description: `La imagen \"${file.name}\" supera el límite de 500 KB.`, 
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    const currentTotalImages = existingGalleryUrls.length + galleryFiles.length;
    const remainingSlots = 4 - currentTotalImages;

    if (files.length > remainingSlots) {
      toast({
        title: "Límite de imágenes alcanzado",
        description: `Solo puedes subir ${remainingSlots} imágenes más. Máximo 4 en total.`,
        variant: "destructive",
      });
      return;
    }

    for (const file of files) {
      if (file.size > 500 * 1024) {
        toast({
          title: "Imagen de galería demasiado grande",
          description: `La imagen \"${file.name}\" supera el límite de 500 KB y no será añadida.`, 
          variant: "destructive",
        });
      } else {
        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    }

    if (validFiles.length > 0) {
      setGalleryFiles(prev => [...prev, ...validFiles]);
      setGalleryPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeNewGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (url: string) => {
    setExistingGalleryUrls(prev => prev.filter(u => u !== url));
  };

  const handleRemoveMainImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setExistingImageUrl(null);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast({ title: "Error", description: "Debes iniciar sesión.", variant: "destructive" });
      return;
    }
    setIsLoading(true);

    // Store original gallery URLs to compare for deletions
    const originalGalleryUrls = form.getValues().gallery_images || [];

    // 1. Handle Main Image Upload
    let imageUrl = existingImageUrl;
    if (imageFile) {
      const filePath = `public/${user.id}-${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage.from("business-images").upload(filePath, imageFile);
      if (uploadError) {
        toast({ title: "Error al subir la imagen principal", description: uploadError.message, variant: "destructive" });
        setIsLoading(false);
        return;
      }
      imageUrl = supabase.storage.from("business-images").getPublicUrl(filePath).data.publicUrl;
    } else if (existingImageUrl === null) {
      // If existing image was removed by user
      imageUrl = null;
    }

    // 2. Handle Gallery Images Upload
    const newGalleryUrls = await Promise.all(
      galleryFiles.map(async (file) => {
        const filePath = `public/${user.id}-gallery-${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("business-images").upload(filePath, file);
        if (error) {
          toast({ title: `Error al subir ${file.name}`, description: error.message, variant: "destructive" });
          return null;
        }
        return supabase.storage.from("business-images").getPublicUrl(filePath).data.publicUrl;
      })
    );
    const filteredNewUrls = newGalleryUrls.filter((url): url is string => url !== null);
    const finalGalleryUrls = [...existingGalleryUrls, ...filteredNewUrls];

    // 3. Identify images to delete from storage
    const imagesToDelete = originalGalleryUrls.filter(url => !finalGalleryUrls.includes(url));
    if (imagesToDelete.length > 0) {
      const filePathsToDelete = imagesToDelete.map(url => {
        const pathSegments = url.split('/');
        return `public/${pathSegments[pathSegments.length - 1]}`;
      });
      const { error: deleteError } = await supabase.storage.from("business-images").remove(filePathsToDelete);
      if (deleteError) {
        console.error("Error deleting old gallery images:", deleteError);
        toast({ title: "Error al eliminar imágenes antiguas", description: deleteError.message, variant: "destructive" });
      }
    }

    // 4. Prepare business data
    const businessData = { ...data, owner_id: user.id, main_image_url: imageUrl, gallery_images: finalGalleryUrls };

    // 5. Insert or Update database
    let dbError;
    if (isEditMode) {
      const { error } = await supabase.from("businesses").update(businessData).eq("owner_id", user.id);
      dbError = error;
    } else {
      const { error } = await supabase.from("businesses").insert(businessData);
      dbError = error;
    }

    setIsLoading(false);
    if (dbError) {
      toast({ title: `Error al ${isEditMode ? 'actualizar' : 'crear'} el perfil`, description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: `¡Perfil ${isEditMode ? 'actualizado' : 'creado'}!`, description: `Tu perfil ha sido ${isEditMode ? 'actualizado' : 'creado'} exitosamente.` });
      navigate("/dashboard");
    }
  };

  if (isLoading && !form.formState.isSubmitting) {
    return <div>Cargando datos del negocio...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{isEditMode ? "Editar" : "Crear"} Perfil de Negocio</CardTitle>
            <CardDescription>
              <p>Rellena los siguientes campos para crear o actualizar el perfil de tu negocio. La información que proporciones será visible para los clientes en el directorio.</p>
              <h4 className="font-semibold mt-4 mb-2">Pasos a seguir:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li><strong>Información Principal:</strong> Asegúrate de que el nombre, la categoría y la descripción sean claros y atractivos.</li>
                <li><strong>Imágenes:</strong> Sube una imagen principal que represente bien a tu negocio y hasta 4 imágenes adicionales para tu galería (límite de 500 KB por imagen).</li>
                <li><strong>Ubicación y Contacto:</strong> Proporciona la dirección completa y los datos de contacto para que los clientes puedan encontrarte.</li>
                <li><strong>Horarios:</strong> Especifica tus horarios de atención para que los clientes sepan cuándo visitarte.</li>
              </ol>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <FormField
                  control={form.control}
                  name="main_image_url"
                  render={() => (
                    <FormItem>
                      <FormLabel>Imagen Principal</FormLabel>
                      <FormControl>
                        <div>
                          {(previewUrl || existingImageUrl) && (
                              <img src={previewUrl || existingImageUrl || ''} alt="Vista previa" className="w-full aspect-video rounded-md mb-4 object-cover" />
                          )}
                          <div className="flex justify-center">
                            <Label htmlFor="main-image-input" className="cursor-pointer bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md flex items-center justify-center w-2/3 md:w-fit">
                              <Upload className="h-4 w-4 mr-2" />
                              Subir Imagen
                            </Label>
                            <Input id="main-image-input" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                          </div>
                          {(previewUrl || existingImageUrl) && (
                            <div className="flex justify-center">
                              <Button type="button" variant="destructive" size="sm" className="mt-2" onClick={handleRemoveMainImage}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar Imagen Principal
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gallery_images"
                  render={() => (
                    <FormItem>
                      <FormLabel>Galería de Imágenes (Máximo 4 imágenes)</FormLabel>
                      <FormDescription>
                        Toca una imagen para que aparezca la 'X' y poder eliminarla.
                      </FormDescription>
                      <FormControl>
                        <div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            {[...existingGalleryUrls, ...galleryPreviewUrls].map((url, index) => (
                              <div key={index} className="relative group">
                                <img src={url} alt={`Vista previa de la galería de imágenes ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                                  onClick={() => index < existingGalleryUrls.length ? removeExistingGalleryImage(url) : removeNewGalleryImage(index - existingGalleryUrls.length)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center">
                            <Label htmlFor="gallery-image-input" className="cursor-pointer bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md flex items-center justify-center w-2/3 md:w-fit">
                              <Upload className="h-4 w-4 mr-2" />
                              Subir Imágenes
                            </Label>
                            <Input id="gallery-image-input" type="file" accept="image/*" multiple onChange={handleGalleryChange} className="sr-only" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Negocio</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Café El Buen Sabor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe tu negocio..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Av. Siempre Viva 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Springfield" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: California" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: 90210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 55 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sitio Web</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horarios</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Lunes a Viernes: 9am - 6pm\nSábados: 10am - 2pm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Guardando..." : (isEditMode ? "Guardar Cambios" : "Guardar Perfil")}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessProfileForm;