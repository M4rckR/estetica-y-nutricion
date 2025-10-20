'use client'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { schemaConsult } from "@/schema/upload/consult";
import { UploadPdfType } from "@/types/upload/uploadPdf";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const FormUpPdf = ({ patientId }: { patientId: string }) => {

  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const form = useForm<UploadPdfType>({
    resolver: zodResolver(schemaConsult),
    defaultValues: {
      titulo: "",
      recomendacion: "",
      pdf: undefined,
    },
  });

  async function onSubmit(data: UploadPdfType) {
    setLoading(true);
    setStatus('Verificando autenticación...');

    // Verificar autenticación del usuario
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      setStatus('Error: Usuario no autenticado');
      toast.error('Error de autenticación', {
        description: 'No se pudo verificar tu sesión. Por favor, inicia sesión nuevamente.',
      });
      setLoading(false);
      return;
    }

    // Verificar rol de doctor
    const userRole = user.app_metadata?.role;
    console.log('Metadata del usuario:', {
      app_metadata: user.app_metadata,
      role: userRole,
      user_id: user.id
    });

    if (userRole !== 'doctor') {
      setStatus('Error: Solo los doctores pueden subir archivos');
      toast.error('Acceso denegado', {
        description: 'Solo los doctores pueden subir archivos.',
      });
      setLoading(false);
      return;
    }

    // Mostrar información completa del usuario
    console.log('Información completa del usuario:', {
      id: user.id,
      email: user.email,
      role: user.app_metadata?.role,
      metadata: user.app_metadata,
      raw_user_meta_data: user.user_metadata,
      raw_app_meta_data: user.app_metadata
    });

    // Verificar si el usuario tiene el rol de doctor
    if (!user.app_metadata?.role || user.app_metadata.role !== 'doctor') {
      console.error('Usuario no tiene rol de doctor:', user.app_metadata);
      setStatus('Error: Usuario no tiene permisos de doctor');
      setLoading(false);
      return;
    }

    setStatus('1/2: Subiendo el archivo PDF...');

    const file = data.pdf
    // Crear ruta del archivo usando el ID del paciente directamente
    const filePath = `${patientId}/${Date.now()}-${file.name}`;

    console.log('Usuario autenticado:', user.id);
    console.log('Archivo a subir:', file);
    console.log('Ruta del archivo:', filePath);
    console.log('Tamaño del archivo:', file.size);
    console.log('Tipo del archivo:', file.type);

    console.log('Intentando subir archivo con configuración:', {
      bucket: 'archivos_pacientes',
      path: filePath,
      fileType: file.type,
      fileSize: file.size
    });

    // Intentar subir el archivo
    console.log('Intentando subir archivo con configuración:', {
      bucket: 'archivos_pacientes',
      path: filePath,
      fileType: file.type,
      fileSize: file.size
    });

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('archivos_pacientes')
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Error completo de subida:', {
        message: uploadError.message,
        name: uploadError.name
      });
      setStatus(`Error al subir el archivo: ${uploadError.message}`);
      toast.error('Error al subir archivo', {
        description: uploadError.message,
      });
      setLoading(false);
      return;
    }

    setStatus('2/2: Guardando los detalles de la consulta...');

    const { error: insertError } = await supabase
      .from('consultas') // Tu tabla de consultas
      .insert({
        paciente_id: patientId,            // El ID del paciente que recibimos
        titulo: data.titulo,               // El título del formulario
        recomendacion: data.recomendacion, // La recomendación del formulario
        pdf_path: uploadData.path,         // La ruta del PDF que acabamos de subir
    });

    if (insertError) {
      setStatus(`Error al guardar la consulta: ${insertError.message}`);
      toast.error('Error al guardar consulta', {
        description: insertError.message,
      });
      setLoading(false);
      return;
    }

    setStatus('¡Consulta guardada con éxito! Redirigiendo...');
    setLoading(false);

    // Mostrar toast de éxito
    toast.success('Archivo subido exitosamente', {
      description: 'La consulta se ha guardado correctamente.',
      duration: 3000,
    });

    setTimeout(() => {
      router.push('/admin/pacientes');
    }, 3000);

  } 

  return (
    <div className="max-w-2xl mx-auto">
      {status && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          status.includes('Error') || status.includes('denegado')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : status.includes('éxito')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {status}
        </div>
      )}
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green-dark">Título</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Escribe el título"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recomendacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-m-green-dark">Recomendación</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Escribe la recomendación"/>
                </FormControl>
    
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pdf"
            render={() => (
              <FormItem>
                <FormLabel className="text-m-green-dark">PDF</FormLabel>
                <FormControl>
                  <Controller
                    name="pdf"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0] || undefined)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Selecciona un archivo PDF (máx. 5MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center mt-12">
            <Button
              className="bg-m-green px-12 text-white hover:bg-m-green-dark cursor-pointer rounded-full"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir Consulta'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
