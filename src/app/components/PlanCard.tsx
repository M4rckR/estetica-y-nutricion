import { Plan } from "@/types";
import Image from "next/image";
import Link from "next/link";

type PlanCardProps = {
  plan: Plan;
}


export const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <article className={`${plan.highlight ? 'bg-m-green-light' : 'bg-m-gray-bg'} h-full flex flex-col rounded-4xl px-4 py-8 shadow-sm`}>
        <div className="space-y-4 pb-8">
            <h3 className="text-center text-2xl text-m-green-dark font-medium line-clamp-2 min-h-[62px]">{plan.title}</h3>
            <p className="text-center text-m-green-dark px-6">{plan.subtitle}</p>
        </div>
        <div className="px-4 space-y-4">
            {
                plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 ">
                        <Image src="/svg/icon/check-card-plan.svg" alt="Check icon" width={24} height={24} />
                        <p className="text-m-green-dark">{feature}</p>
                    </div>
                ))
            }
        </div>
        <div className="mt-auto pt-8">
            <Link className="flex justify-center" href="#">
                <p className={`${plan.highlight ? 'text-m-green bg-white hover:bg-m-green-dark hover:text-white' : 'text-m-green-dark bg-m-green-light hover:bg-white hover:border-m-green-dark'} text-center inline-block px-12 py-2 rounded-full transition duration-150 border border-transparent`}>Me interesa</p>
            </Link>

        </div>
    </article>
  )
}
