"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { sedesAccordion } from "@/data/sedesAccordion";
import { useEffect, useState } from "react";
import { CalendarDays, CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormPreReservationType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { consultasMedicas } from "@/data/consultasMedicas";
import { formPreReservationSchema } from "@/schema";
import AOS from "aos";

export const ReserveDate = () => {
  const [openCallendar, setOpenCallendar] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const form = useForm<FormPreReservationType>({
    resolver: zodResolver(formPreReservationSchema),
    defaultValues: {
      consultaMedica: "",
      sede: "",
      date: undefined,
    },
  });

  const handleReservar = (data: FormPreReservationType) => {
    if (!data.date) {
      alert("Por favor selecciona una fecha");
      return;
    }
    const fecha = new Date(data.date).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const message =
      `Hola, vi su página web y estoy interesado en atenderme en *${data.consultaMedica}*.\n` +
      `Sede: *${data.sede}*\n` +
      `Día: *${fecha}*`;

    const phoneNumber = "51931531046"; // sin '+' ni espacios
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div data-aos="fade-up" data-aos-duration="1200" className="px-4 pt-6 z-10 relative space-y-8">
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleReservar)}
            className="grid max-w-5xl container mx-auto shadow-xl grid-cols-1 gap-y-8 xl:gap-y-0 xl:grid-cols-12 items-start gap-x-8 rounded-4xl py-6 px-[18px] xl:py-6 md:px-8 bg-white -mt-[96px] xl:mt-0"
          >
            <div className="grid min-w-0 gap-y-4 grid-cols-1 col-span-1 xl:gap-y-0 xl:grid-cols-3 xl:col-span-9 gap-x-2">
              <FormField
                control={form.control}
                name="consultaMedica"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <Select
                      onValueChange={(v) => {
                        field.onChange(v);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full min-w-0 overflow-hidden whitespace-nowrap relative py-6 pl-12 text-sm">
                        <div>
                          <Image
                            src={"/svg/icon/person-medic.svg"}
                            alt="Consulta medica"
                            width={20}
                            height={20}
                            className="absolute left-4"
                          />
                          <SelectValue placeholder="Consulta" />
                        </div>
                      </SelectTrigger>

                      <SelectContent>
                        {consultasMedicas.map((problema) => (
                          <SelectItem key={problema.id} value={problema.value}>
                            {problema.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sede"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(v) => {
                        field.onChange(v);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="overflow-hidden min-w-0 w-full relative py-6 pl-12 text-sm">
                        <div>
                          <Image
                            src={"/svg/icon/icono-sede.svg"}
                            alt="Consulta medica"
                            width={20}
                            height={20}
                            className="absolute left-4"
                          />
                          <SelectValue
                            className="truncate"
                            placeholder="Sede"
                          />
                        </div>
                      </SelectTrigger>

                      <SelectContent>
                        {sedesAccordion.map((sede) => (
                          <SelectItem key={sede.id} value={sede.name}>
                            {sede.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <Popover
                      open={openCallendar}
                      onOpenChange={setOpenCallendar}
                    >
                      <PopoverTrigger
                        className="relative py-3.5 md:py-3"
                        asChild
                      >
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full h-full justify-between font-normal"
                        >
                          <p className="pl-9">
                            {field.value && field.value.toLocaleDateString()}
                          </p>
                          <p className="absolute left-11 text-sm text-gray-500 md:-translate-y-1/2 md:top-1/2 pointer-events-none">
                            {!field.value && "Fecha"}
                          </p>

                          <CalendarDays className="w-4 h-4 left-4 absolute text-m-green" />
                          <ChevronDownIcon className="" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpenCallendar(false);
                          }}
                          captionLayout="dropdown"
                          disabled={(date) => {
                            const startOfToday = new Date();
                            startOfToday.setHours(0, 0, 0, 0);

                            // ❌ deshabilita si es antes de hoy o si es domingo
                            return date < startOfToday || date.getDay() === 0;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-full xl:col-span-3">
              <Button
                type="submit"
                size={"personal"}
                className="w-full bg-m-green h-full hover:bg-m-green-dark py-4 text-sm cursor-pointer rounded-full"
              >
                <CalendarIcon className="w-6 h-4 mr-2" />
                Reservar <span className="hidden 2xl:block">ahora</span>
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};
