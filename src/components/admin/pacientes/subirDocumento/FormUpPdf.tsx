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
import { Spinner } from "@/components/ui/spinner";
import { X } from "lucide-react";
import Link from "next/link";

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
      pdf1: undefined,
      pdf2: undefined,
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

    // Obtener rol del usuario desde la tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('rol')
      .eq('user_id', user.id)
      .single();

    if (userError || !userData) {
      setStatus('Error: No se pudo obtener información del usuario');
      toast.error('Error al verificar permisos', {
        description: 'No se pudo verificar tu rol de usuario.',
      });
      setLoading(false);
      return;
    }

    const userRole = userData.rol;

    // Verificar si el usuario tiene el rol de doctor
    if (userRole !== 'doctor') {
      setStatus('Error: Solo los doctores pueden subir archivos');
      toast.error('Acceso denegado', {
        description: 'Solo los doctores pueden subir archivos.',
      });
      setLoading(false);
      return;
    }

    // Variables para guardar las rutas de los PDFs
    let pdf1Path: string | null = null;
    let pdf2Path: string | null = null;

    // Subir PDF 1 si existe
    if (data.pdf1) {
      setStatus('Subiendo el primer archivo PDF...');
      const file1 = data.pdf1;
      const filePath1 = `${patientId}/${Date.now()}-pdf1-${file1.name}`;

      const { data: uploadData1, error: uploadError1 } = await supabase.storage
        .from('archivos_pacientes')
        .upload(filePath1, file1, {
          upsert: true,
          contentType: file1.type,
          cacheControl: '3600'
        });

      if (uploadError1) {
        setStatus(`Error al subir el primer archivo: ${uploadError1.message}`);
        toast.error('Error al subir primer archivo', {
          description: uploadError1.message,
        });
        setLoading(false);
        return;
      }

      pdf1Path = uploadData1.path;
    }

    // Subir PDF 2 si existe
    if (data.pdf2) {
      setStatus('Subiendo el segundo archivo PDF...');
      const file2 = data.pdf2;
      const filePath2 = `${patientId}/${Date.now()}-pdf2-${file2.name}`;

      const { data: uploadData2, error: uploadError2 } = await supabase.storage
        .from('archivos_pacientes')
        .upload(filePath2, file2, {
          upsert: true,
          contentType: file2.type,
          cacheControl: '3600'
        });

      if (uploadError2) {
        setStatus(`Error al subir el segundo archivo: ${uploadError2.message}`);
        toast.error('Error al subir segundo archivo', {
          description: uploadError2.message,
        });
        setLoading(false);
        return;
      }

      pdf2Path = uploadData2.path;
    }

    setStatus('Guardando los detalles de la consulta...');

    const { error: insertError } = await supabase
      .from('consultas')
      .insert({
        paciente_id: patientId,
        titulo: data.titulo,
        recomendacion: data.recomendacion,
        pdf_path: pdf1Path,      // Primer PDF (puede ser null)
        pdf_path_2: pdf2Path,    // Segundo PDF (puede ser null)
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
    toast.success('Archivo(s) subido(s) exitosamente', {
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
        <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
          status.includes('Error') || status.includes('denegado')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : status.includes('éxito')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {loading && !status.includes('Error') && !status.includes('éxito') && (
            <Spinner size="sm" className="border-blue-700 border-t-transparent" />
          )}
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
            name="pdf1"
            render={() => (
              <FormItem>
                <FormLabel className="text-m-green-dark">Plan nutricional</FormLabel>
                <FormControl>
                  <Controller
                    name="pdf1"
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
                  Selecciona el primer archivo PDF (máx. 5MB) - Opcional.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pdf2"
            render={() => (
              <FormItem>
                <FormLabel className="text-m-green-dark">Informe antropométrico</FormLabel>
                <FormControl>
                  <Controller
                    name="pdf2"
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
                  Selecciona el segundo archivo PDF (máx. 5MB) - Opcional.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-4 mt-12">
            <Link href="/admin/pacientes">
              <Button
                type="button"
                className="bg-m-green hover:bg-m-green-dark text-white rounded-full w-12 h-12 p-0 flex items-center justify-center cursor-pointer"
                aria-label="Cancelar"
              >
                <X className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              className="bg-m-green px-12 text-white hover:bg-m-green-dark cursor-pointer rounded-full flex items-center gap-2 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading && <Spinner size="sm" className="border-white border-t-transparent" />}
              {loading ? 'Subiendo...' : 'Subir Consulta'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
