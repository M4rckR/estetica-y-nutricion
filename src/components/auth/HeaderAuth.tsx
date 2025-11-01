import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

export const HeaderAuth = () => {
  return (
    <header className="bg-m-green-dark lg:min-h-screen lg:col-span-7 px-4 flex items-center justify-center">
      <div className="text-white flex flex-col gap-2">
        <Link href="/">
          <Image 
              src="/svg/icon/marca.svg"
              alt="Marca Estetica y Nutricion"
              width={100}
              height={50}
              className="w-16 h-auto md:w-24"
          />
        </Link>
        <p className="text-sm lg:text-lg m-0">Accede fácilmente a tus resultados</p>
        <Link href="/auth/register">
          <Button variant="secondary" className="hover:bg-m-green text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3">Registrarme</Button>
        </Link>
      </div>
    </header>
  )
}
