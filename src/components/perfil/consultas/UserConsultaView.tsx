export const UserConsultaView = () => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <h2 className="text-center text-2xl mb-8 text-m-green-dark">Recomendaciones</h2>
      <div className="w-full bg-m-green-blank p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-m-green mb-4">
          Tus Recomendaciones Personalizadas
        </h3>
        <p className="text-gray-700 mb-4">
          Según tu perfil y metas, prioriza proteínas magras y vegetales para potenciar tu energía y bienestar general.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Comienza el día con avena integral y frutas frescas para un impulso nutritivo.</li>
          <li>Opta por ensaladas mixtas con quinoa y legumbres en el mediodía.</li>
          <li>Termina con preparaciones ligeras como pescado a la parrilla y verduras.</li>
          <li>Incorpora sesiones de ejercicio cardiovascular para acelerar tus progresos.</li>
        </ul>
        <p className="text-gray-700">
          Mantén una hidratación constante y revisa con tu especialista para personalizar más. ¡La perseverancia es clave!
        </p>
      </div>
        <div className="text-center">
          <button type="button" className="mt-8 inline-block bg-m-green-light text-m-green-dark px-6 py-2 rounded-full w-fit transition cursor-pointer hover:bg-m-green-dark hover:text-white">
            Descargar Consulta
          </button>
        </div>
    </section>
  );
};
