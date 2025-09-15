'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Progress } from '@/components/ui/progressGreen'
import { PersonalDataForm } from './steps/PersonalDataForm'
import { ClinicalHistoryForm } from './steps/ClinicalHistoryForm'
import { SurgeriesAllergiesForm } from './steps/SurgeriesAllergiesForm'
import { NutritionForm } from './steps/NutritionForm'
import { useRegisterStore } from '@/lib/store'
import { completeRegistrationSchema, personalDataSchema, clinicalHistorySchema, surgeriesAllergiesSchema, nutritionSchema } from '@/schema/register/register'
import { CompleteRegistrationFormType } from '@/types/auth/register'

// Define step schemas and their field names
const stepSchemas = [
  { schema: personalDataSchema, fields: ['firstName', 'lastName', 'sex', 'age', 'firstDate', 'email', 'telephone', 'password'] },
  { schema: clinicalHistorySchema, fields: ['practicesSports', 'patAntecedents', 'consume', 'lastMenstruation', 'useAnticonceptive', 'actualMedication', 'hiperDiaAntecedents'] },
  { schema: surgeriesAllergiesSchema, fields: ['operated', 'operatedDescription', 'allergies', 'alimentsHate'] },
  { schema: nutritionSchema, fields: ['mealsPreparedBy', 'eatOutFrequency', 'favoriteFoods', 'dailyLiquids', 'supplements'] },
]

const steps = [
  { component: PersonalDataForm, title: 'Datos Personales' },
  { component: ClinicalHistoryForm, title: 'Historia Clínica' },
  { component: SurgeriesAllergiesForm, title: 'Cirugías y Alergias' },
  { component: NutritionForm, title: 'Alimentación' },
]

export const RegisterSection = () => {
  const { currentStep, totalSteps, nextStep, prevStep, updateFormData } = useRegisterStore()

  const form = useForm<CompleteRegistrationFormType>({
    mode: 'onChange',
    resolver: zodResolver(completeRegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      sex: '',
      age: undefined,
      firstDate: undefined,
      email: '',
      telephone: '',
      password: '',
      practicesSports: '',
      patAntecedents: '',
      consume: '',
      lastMenstruation: undefined,
      useAnticonceptive: '',
      actualMedication: '',
      hiperDiaAntecedents: '',
      operated: false,
      operatedDescription: '',
      allergies: '',
      alimentsHate: '',
      mealsPreparedBy: '',
      eatOutFrequency: '',
      favoriteFoods: '',
      dailyLiquids: '',
      supplements: '',
    } as Partial<CompleteRegistrationFormType>,
  })

  const handleNext = async () => {
    if (currentStep === totalSteps - 1) {
      // Final step - validate all fields and submit
      const isValid = await form.trigger() // Trigger validation for all fields
      if (isValid) {
        const allData = form.getValues()
        console.log('Form submitted:', allData)
        // Here you would typically send the data to your backend
        alert('Registro completado exitosamente!')
      }
    } else {
      // Not final step - validate only current step fields
      const currentStepConfig = stepSchemas[currentStep]

      // Clear any existing errors for this step first
      currentStepConfig.fields.forEach(field => {
        form.clearErrors(field as keyof CompleteRegistrationFormType)
      })

      // Trigger validation for current step fields only
      const fieldsToValidate = currentStepConfig.fields as (keyof CompleteRegistrationFormType)[]
      const isStepValid = await form.trigger(fieldsToValidate)

      if (isStepValid) {
        updateFormData(form.getValues())
        nextStep()
      }
      // Errors will be shown automatically by react-hook-form
    }
  }


  const handlePrev = () => {
    updateFormData(form.getValues())
    prevStep()
  }

  // Limpiar errores automáticamente cuando cambian los valores
  useEffect(() => {
    const currentStepConfig = stepSchemas[currentStep]
    const subscription = form.watch((value, { name }) => {
      if (name && currentStepConfig.fields.includes(name)) {
        // Si el campo cambió y pertenece al paso actual, limpiar su error
        const fieldValue = value[name as keyof typeof value]
        if (fieldValue && fieldValue !== '') {
          form.clearErrors(name as keyof CompleteRegistrationFormType)
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [currentStep, form])

  const progressValue = ((currentStep + 1) / totalSteps) * 100
  const CurrentStepComponent = steps[currentStep].component

  return (
    <section className='max-w-5xl mx-auto container px-4 sm:px-6 lg:px-8'>
      <div className="mb-8 sm:mb-12">
        {/* Header responsive */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
          <h2 className="text-xl sm:text-2xl font-bold text-m-green-dark">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm text-gray-600 order-first sm:order-last">
            Paso {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <Progress className="w-full h-3 sm:h-4" value={progressValue} />
        </div>
      </div>

      {/* Form component */}
      <div className="w-full">
        <CurrentStepComponent
          form={form}
          onNext={handleNext}
          onPrev={handlePrev}
          isLastStep={currentStep === totalSteps - 1}
        />
      </div>
    </section>
  )
}
