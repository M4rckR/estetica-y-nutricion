import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

export const HeaderAuth = () => {
  return (
    <header className=" lg:col-span-7 px-4 flex items-center justify-center pt-28 pb-16 lg:bg-m-green-dark">
      <div className="text-white flex flex-col gap-6">
        <Link className="flex gap-2 items-center" href="/">
          <Image 
              src="/svg/icon/marca.svg"
              alt="Marca Estetica y Nutricion"
              width={100}
              height={50}
              className="w-20 h-auto md:w-24"
          />
          <p className="text-sm lg:text-lg m-0 md:leading-6">Estética y <br /> nutrición integral</p>
        </Link>
        <Link className="hidden lg:block" href="/auth/register">
          <Button variant="secondary" className="hover:bg-m-green text-xs bg-m-green text-white cursor-pointer rounded-2xl px-10 py-3">Registrarme</Button>
        </Link>
      </div>
    </header>
  )
}
