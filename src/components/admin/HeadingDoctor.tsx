'use client'; // 1. Marcamos este como un Componente de Cliente

import { useState, useEffect } from 'react'; // 2. Importamos los hooks necesarios
import { createClient } from '@/utils/supabase/client'; // 3. Usamos el cliente para el navegador
import { camelCase } from "@/utils/CamelCase";

export const HeadingDoctor = () => {
  // 4. Creamos un estado para guardar el perfil del usuario
  const [userProfile, setUserProfile] = useState<{ first_name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // 5. Usamos useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    const supabase = createClient(); // Creamos el cliente aquí

    const fetchDoctorProfile = async () => {
      // Obtenemos el usuario actual
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser) {
        // Buscamos su perfil en nuestra tabla 'users'
        const { data } = await supabase
          .from("users")
          .select("first_name") // Pedimos solo el dato que necesitamos
          .eq("user_id", currentUser.id)
          .single();
        setUserProfile(data);
      }
      setLoading(false); // Dejamos de cargar
    };

    fetchDoctorProfile();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  return (
    <div className="space-y-4">
      <h1 className="text-center text-4xl text-m-green-dark">
        Hola,{" "}
        <span className="text-m-green">
          {/* 6. Mostramos un texto de carga mientras esperamos los datos */}
          {loading ? "Doctor..." : camelCase(userProfile?.first_name || "")}
        </span>
      </h1>
      <p className="text-center text-m-green-dark max-w-3xl mx-auto text-sm">
        Bienvenido, doctor. Aquí podrás subir tus recomendaciones y adjuntar un
        archivo PDF para que tus pacientes accedan fácilmente a la información
        de su consulta, de forma rápida y organizada.
      </p>
    </div>
  );
};