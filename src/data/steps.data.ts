import { PersonalDataForm } from "@/components/auth/register/steps/PersonalDataForm";
import { ClinicalHistoryForm } from "@/components/auth/register/steps/ClinicalHistoryForm";
import { SurgeriesAllergiesForm } from "@/components/auth/register/steps/SurgeriesAllergiesForm";
import { NutritionForm } from "@/components/auth/register/steps/NutritionForm";

export const steps = [
  {
    id: 1,
    title: 'Empecemos un camino de',
    titleHighLight: 'nutricion saludable',
    subtitle: '¡Súmate a los más de 300 pacientes que ya vivieron su transformación!',
    content: PersonalDataForm
  },
  {
    id: 2,
    title: 'Historia clínica',
    subtitle: 'Ingresa tus datos personales',
    content: ClinicalHistoryForm
  },
  {
    id: 3,
    title: 'Cirugías y alergias',
    subtitle: 'Ingresa tus datos personales',
    content: SurgeriesAllergiesForm
  },
  {
    id: 4,
    title: 'Alimentación',
    subtitle: 'Ingresa tus datos personales',
    content: NutritionForm
  }
]