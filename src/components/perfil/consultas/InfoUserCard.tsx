interface InfoUserCardProps {
  userName?: string | null;
}

export function InfoUserCard({ userName }: InfoUserCardProps) {
  return (
    <section className="mb-12 md:mb-16 lg:mb-24 px-4">
        <div className="text-m-green-dark space-y-6">
            <p className="text-center text-2xl md:text-4xl ">Hola, {" "}
                <span className="text-m-green">{
                    userName || "Usuario"
                }</span></p>
            <p className="text-center text-sm md:text-base">Bienvenido a tu perfil en donde encontraras todo lo necesario para cuidar tu salud</p>
        </div>
    </section>
  )
}
