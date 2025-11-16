# 📋 Sistema de Historia Clínica - Guía de Implementación

## 📁 Archivos Creados

### 1. Schema y Tipos
- ✅ `src/schema/clinical/history.ts` - Schema de validación con Zod
- ✅ `src/types/clinical/history.ts` - Tipos TypeScript
- ✅ `supabase_schema_clinical_history.sql` - Schema SQL para Supabase

### 2. Componentes Actualizados
- ✅ `src/components/admin/PatientList.tsx` - Agregado botón "Historia clínica"

## 🗄️ Estructura de la Tabla en Supabase

### Tabla: `clinical_history`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | ID único del registro |
| `patient_id` | UUID | ID del paciente (FK a auth.users) |
| **Datos Básicos** | | |
| `phone` | VARCHAR(20) | Teléfono del paciente |
| `age` | INTEGER | Edad del paciente |
| `first_appointment_date` | DATE | Fecha de primera cita |
| **Historia Clínica** | | |
| `practices_sports` | VARCHAR(20) | ¿Practica deportes? |
| `pathological_antecedents` | TEXT | Antecedentes patológicos |
| `consumes_alcohol_tobacco` | VARCHAR(20) | ¿Consume alcohol o tabaco? |
| `last_menstruation` | DATE | Última menstruación |
| `uses_contraceptives` | VARCHAR(5) | ¿Usa anticonceptivos? |
| `current_medication` | TEXT | Medicación actual |
| `hypertension_diabetes_antecedents` | VARCHAR(20) | Antecedentes de hipertensión/diabetes |
| **Cirugías y Alergias** | | |
| `has_been_operated` | VARCHAR(5) | ¿Ha sido operado/a? |
| `surgery_details` | TEXT | Detalles de cirugías |
| `allergies` | TEXT | Alergias |
| `disliked_foods` | TEXT | Alimentos que no le gustan |
| **Alimentación** | | |
| `who_prepares_meals` | VARCHAR(20) | ¿Quién prepara las comidas? |
| `eating_out_frequency` | VARCHAR(20) | Frecuencia de comer fuera |
| `favorite_foods` | TEXT | Alimentos favoritos |
| `daily_liquid_intake` | VARCHAR(20) | Consumo diario de líquidos |
| `supplements` | TEXT | Suplementos que consume |
| **Metadatos** | | |
| `completed` | BOOLEAN | ¿Formulario completado? |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Fecha de actualización |

## 🚀 Pasos para Implementar

### Paso 1: Crear la tabla en Supabase

1. Abre **Supabase Dashboard**
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `supabase_schema_clinical_history.sql`
4. Ejecuta el script (Run)

### Paso 2: Verificar las políticas RLS

Asegúrate de que las siguientes políticas estén activas:
- ✅ Doctores pueden leer todas las historias clínicas
- ✅ Pacientes pueden leer su propia historia clínica
- ✅ Doctores pueden insertar historias clínicas
- ✅ Doctores pueden actualizar historias clínicas

### Paso 3: Crear las páginas necesarias

#### a) Página de Historia Clínica (Vista/Edición)
Crear: `src/app/(home)/admin/pacientes/[patientId]/historia-clinica/page.tsx`

```typescript
import { ClinicalHistoryForm } from "@/components/admin/clinical/ClinicalHistoryForm";
import { HeaderIntern } from "@/components/main/HeaderIntern";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ClinicalHistoryPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const supabase = await createClient();

  // Verificar si el usuario es doctor
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: userData } = await supabase
    .from("users")
    .select("rol")
    .eq("user_id", user.id)
    .single();

  if (userData?.rol !== "doctor") {
    redirect("/unauthorized");
  }

  // Obtener datos del paciente
  const { data: patientData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", patientId)
    .single();

  // Obtener historia clínica existente
  const { data: clinicalHistory } = await supabase
    .from("clinical_history")
    .select("*")
    .eq("patient_id", patientId)
    .single();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <aside className="lg:col-span-4 2xl:col-span-3 px-4 py-4 md:p-8 bg-white lg:bg-m-green-dark lg:sticky lg:top-0 lg:h-screen">
        <HeaderIntern />
      </aside>
      <section className="lg:col-span-8 2xl:col-span-9 lg:py-16 xl:px-8">
        <ClinicalHistoryForm
          patientId={patientId}
          patientData={patientData}
          existingData={clinicalHistory}
        />
      </section>
    </div>
  );
}
```

#### b) Loading State
Crear: `src/app/(home)/admin/pacientes/[patientId]/historia-clinica/loading.tsx`

```typescript
import { LoadingOverlay } from "@/components/ui/spinner";

export default function Loading() {
  return <LoadingOverlay message="Cargando historia clínica..." />;
}
```

### Paso 4: Crear el componente del formulario

Crear: `src/components/admin/clinical/ClinicalHistoryForm.tsx`

Este componente debe:
- Mostrar un formulario multi-paso (como en las imágenes)
- Usar `react-hook-form` con el schema de validación
- Guardar/actualizar en Supabase
- Mostrar mensaje si no hay datos previos

## 📊 Valores de los campos SELECT

### practices_sports
- `si`
- `no`
- `ocasionalmente`

### consumes_alcohol_tobacco
- `no`
- `alcohol`
- `tabaco`
- `ambos`

### uses_contraceptives
- `si`
- `no`

### hypertension_diabetes_antecedents
- `ninguno`
- `hipertension`
- `diabetes`
- `ambos`

### has_been_operated
- `si`
- `no`

### who_prepares_meals
- `yo`
- `familiar`
- `empleada`
- `otro`

### eating_out_frequency
- `nunca`
- `ocasional`
- `semanal`
- `diario`

### daily_liquid_intake
- `menos_1L`
- `1-2L`
- `2-3L`
- `mas_3L`

## 🎨 Características de la UI

### Estado "Sin datos"
Cuando no hay historia clínica:
```tsx
{!clinicalHistory && (
  <div className="text-center p-8">
    <p className="text-m-green-dark mb-4">
      No hay datos de historia clínica registrados
    </p>
    <p className="text-gray-600 text-sm">
      Solo se tienen los datos de registro inicial
    </p>
  </div>
)}
```

### Botones en PatientList
- **Historia clínica**: Botón outline verde
- **Subir Consulta**: Botón filled verde

## 🔐 Seguridad

- ✅ RLS habilitado
- ✅ Solo doctores pueden crear/editar
- ✅ Pacientes solo pueden ver su propia historia
- ✅ Constraint UNIQUE por patient_id

## 📝 Notas Importantes

1. **Un paciente = Una historia clínica**: La tabla tiene constraint UNIQUE en `patient_id`
2. **Campo `completed`**: Indica si el formulario fue completado completamente
3. **Campos opcionales**: Muchos campos son opcionales para permitir guardado parcial
4. **Trigger automático**: `updated_at` se actualiza automáticamente en cada UPDATE

## 🧪 Testing

### Queries de ejemplo:

```sql
-- Ver historias clínicas de todos los pacientes
SELECT 
  ch.*,
  u.nombres,
  u.correo
FROM clinical_history ch
JOIN users u ON ch.patient_id = u.user_id;

-- Ver pacientes SIN historia clínica
SELECT 
  u.user_id,
  u.nombres,
  u.correo
FROM users u
LEFT JOIN clinical_history ch ON u.user_id = ch.patient_id
WHERE u.rol = 'paciente' 
AND ch.id IS NULL;

-- Actualizar historia clínica
UPDATE clinical_history
SET 
  phone = '987654321',
  age = 25,
  completed = true
WHERE patient_id = 'uuid-del-paciente';
```

## ✅ Checklist de Implementación

- [ ] Ejecutar script SQL en Supabase
- [ ] Verificar políticas RLS
- [ ] Crear página de historia clínica
- [ ] Crear componente de formulario
- [ ] Crear loading state
- [ ] Probar creación de historia clínica
- [ ] Probar edición de historia existente
- [ ] Verificar que pacientes SIN datos muestren mensaje
- [ ] Probar que solo doctores puedan acceder

