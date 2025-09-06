'use client'
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {

  return (
    <footer className="px-4 pt-12 md:pt-24 max-w-6xl mx-auto">
      <div className="w-full h-[1px] bg-m-gray-light"></div>
      <div className="grid gap-x-4 xl:gap-x-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-y-12 pt-8 pb-14 items-start">
        <div className="flex items-center gap-2">
          <Image
            src="/svg/icon/marca.svg"
            width={80}
            height={40}
            alt="Logo Marca Nutrición"
          />
          <p className="leading-5 text-sm">
            Estética y <br /> nutrición integral
          </p>
        </div>
        <div className="text-xs space-y-3">
          <p className="font-bold">SEDES</p>
          <div className="space-y-3 text-gray-400 w-3/4">
            <p>Av. Jose Galvez barrenechea 765</p>
            <p>Av. Gonzáles Prada 558 A Dos Cuadras De La Municipalidad De Los Olivos</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400">Lunes - Sábados</p>
            <p>10:00 am - 7:00pm</p>
          </div>
        </div>
        <div className="text-xs space-y-3">
          <p className="font-bold">INFORMACION</p>
          <div className="space-y-3 text-gray-400">
            <Link href="#nosotros" className="hover:underline block">
              Nosotros
            </Link>
            <Link href="#servicios" className="hover:underline block">
              Servicios
            </Link>
            <Link href="#planes" className="hover:underline block">
              Planes
            </Link>
          </div>
        </div>
        <div className="text-xs space-y-3">
          <p className="font-bold">CONTACTO</p>
          <div className="space-y-3 text-gray-400">
            <p>931531046</p>
            <Link
              href="mailto:lyv.esteticaynutricion@gmail.com"
              className="hover:underline block"
            >
              lyv.esteticaynutricion@gmail.com
            </Link>
          </div>
        </div>
        <div className="text-xs space-y-3">
          <p className="font-bold">SIGUENOS</p>
          <div className="space-y-3 text-gray-400">
            <p>@Lyvesteticaynutricion</p>
            <div>
              <div className="flex gap-2">
                {/* <Link target="_blank" href="https://www.facebook.com/lyvesteticaynutricion" className="text-m-green-light text-xs">
                  <Image
                    src="/svg/icon/tiktok-green.svg"
                    alt="Icono tiktok"
                    width={20}
                    height={20}
                  />
                </Link> */}
                <Link target="_blank" href="https://www.instagram.com/lyv_esteticaynutricion/" className="text-m-green-light text-xs">
                  <Image
                    src="/svg/icon/instagram-green.svg"
                    alt="Icono instagram"
                    width={20}
                    height={20}
                  />
                </Link>
                <Link target="_blank" href="https://www.facebook.com/lyvesteticaynutricion" className="text-m-green-light text-xs">
                  <Image
                    src="/svg/icon/facebook-green.svg"
                    alt="Icono facebook"
                    width={20}
                    height={20}
                  />
                </Link>
                {/* <Link href="#" className="text-m-green-light text-xs">
                  <Image
                    src="/svg/icon/youtube-green.svg"
                    alt="Icono youtube"
                    width={20}
                    height={20}
                  />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-m-gray-light"></div>
      <p className="text-center text-xs text-gray-400 py-2">Copyright © 2020 <span className="text-m-green">Lorem.</span> All Rights Reserved.</p>
    </footer>
  );
};
