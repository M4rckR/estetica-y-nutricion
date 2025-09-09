import Image from "next/image"
import { Button } from "../ui/button"

export const HeaderAuth = () => {
  return (
    <header className="bg-m-green-dark min-h-screen lg:col-span-7 px-4 flex items-center justify-center">
      <div className="text-white space-y-4">
        <Image 
            src="/svg/icon/marca.svg"
            alt="Marca Estetica y Nutricion"
            width={100}
            height={50}
        />
        <p className="text-lg">Accede fácilmente a tus resultados</p>
        <Button variant="secondary" className="hover:bg-m-green-dark text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3">Registrarme</Button>
      </div>
    </header>
  )
}
