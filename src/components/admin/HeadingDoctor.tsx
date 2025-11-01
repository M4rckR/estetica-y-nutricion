'use client'; // 1. Marcamos este como un Componente de Cliente


export const HeadingDoctor = () => {

  return (
    <div className="space-y-4">
      <h1 className="text-center text-4xl text-m-green-dark">
        Bienvenido
      </h1>
      <p className="text-center text-m-green-dark max-w-3xl mx-auto text-sm">
        Hola, doctor. Aquí podrás subir tus recomendaciones y adjuntar un
        archivo PDF para que tus pacientes accedan fácilmente a la información
        de su consulta, de forma rápida y organizada.
      </p>
    </div>
  );
};