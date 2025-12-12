import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  textColor?: "white" | "dark";
}

export function Logo({ textColor = "white" }: LogoProps) {
  const textClass = textColor === "white" ? "text-white" : "text-m-green-dark lg:text-white";

  return (
    <Link className="flex gap-2 items-center" href="/">
      <Image
        src="/svg/icon/marca.svg"
        alt="Icono marca estetica y nutricion"
        width={60}
        height={30}
        className="w-12 h-auto md:w-16"
      />
      <p className={`text-sm leading-3.5 font-light ${textClass}`}>
        Estética y <br /> nutrición integral
      </p>
    </Link>
  );
}

