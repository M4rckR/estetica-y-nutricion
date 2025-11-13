import { getUserProfile } from "@/utils/user";
import { formatFirstName } from "@/utils/format";

export async function InfoUserCard() {
  const userProfile = await getUserProfile();

  return (
    <section className="mb-12 md:mb-16 lg:mb-24 px-4 pt-8">
      <div className="text-m-green-dark space-y-6">
        <p className="text-center text-2xl md:text-4xl ">
          Hola, <span className="text-m-green">{userProfile ? formatFirstName(userProfile.nombres) : ""}</span>
        </p>
        <p className="text-center text-sm md:text-base">
          Bienvenido a tu perfil en donde encontraras todo lo necesario para cuidar tu salud
        </p>
      </div>
    </section>
  );
}
