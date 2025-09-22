'use server'

import { AuthLogin } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CompleteRegistrationFormType } from "@/types/auth/register"
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function login(formData: AuthLogin) {
    const supabase = await createClient()

    const data = {
        email: formData.email,
        password: formData.password,
    }

      const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
    

export async function register(formData: CompleteRegistrationFormType) {
    const supabase = await createClient()
    

    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { data:authResult, error:authError } = await supabase.auth.signUp(data)

    if (authError) {
        redirect('/error')
    }

    const userId = authResult.user?.id

    const profileData = {
        user_id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        sex: formData.sex,
        age: formData.age,
        first_date: formData.firstDate,
        telephone: formData.telephone,
        practices_sports: formData.practicesSports,
        pat_antecedents: formData.patAntecedents,
        consume: formData.consume,
        last_menstruation: formData.lastMenstruation,
        use_anticonceptive: formData.useAnticonceptive,
        actual_medication: formData.actualMedication,
        hiper_dia_antecedents: formData.hiperDiaAntecedents,
        operated: formData.operated,
        operated_description: formData.operatedDescription,
        allergies: formData.allergies,
        aliments_hate: formData.alimentsHate,
        meals_prepared_by: formData.mealsPreparedBy,
        eat_out_frequency: formData.eatOutFrequency,
        favorite_foods: formData.favoriteFoods,
        daily_liquids: formData.dailyLiquids,
        supplements: formData.supplements,
        updated_at: new Date(),
    }

    // const {error:profileError} = await supabase.from('users').insert(profileData)

    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const {error:profileError} = await supabaseAdmin.from('users').insert(profileData)

    if (profileError) {
        console.log(profileError)
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}