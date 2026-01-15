# 📋 Instrucciones para Migración - Paso 4: Objetivos y Tipo de Plan

## 🎯 Resumen
Se ha creado el **Paso 4** del formulario de Historia Clínica con los campos:
- Objetivos nutricionales
- Tipo de plan
- Detalle del tipo de plan

## 📁 Archivos Creados/Modificados

### ✅ Archivos Nuevos:
1. `migration_add_objectives_plan_type.sql` - Script de migración para la base de datos
2. `src/components/admin/clinical/steps/Step4ObjetivosYPlan.tsx` - Componente del Paso 4
3. `INSTRUCCIONES_MIGRACION_PASO4.md` - Este archivo

### ✅ Archivos Modificados:
1. `src/schema/clinical/history.ts` - Agregados los nuevos campos al schema
2. `src/components/admin/clinical/ClinicalHistoryForm.tsx` - Integrado el Paso 4
3. `src/app/admin/actions/clinical.ts` - Agregados los campos al guardar

## 🗄️ Migración de Base de Datos

### Campos a Agregar:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `nutritional_objectives` | TEXT | Objetivos nutricionales (corto, mediano y largo plazo) |
| `plan_type` | VARCHAR(20) | Tipo de plan (estética, clínico, deportivo, pediátrico, salud, otro) |
| `plan_type_details` | TEXT | Detalle adicional del tipo de plan |

### 📝 Pasos para Ejecutar la Migración:

1. **Abre Supabase Dashboard**
   - Ve a tu proyecto en https://supabase.com
   - Navega a "SQL Editor"

2. **Ejecuta el Script de Migración**
   - Abre el archivo `migration_add_objectives_plan_type.sql`
   - Copia todo el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en "Run" o presiona Ctrl+Enter

3. **Verifica la Migración**
   - Ve a "Table Editor"
   - Selecciona la tabla `clinical_history`
   - Verifica que aparezcan las nuevas columnas:
     - `nutritional_objectives`
     - `plan_type`
     - `plan_type_details`

## 🎨 Estructura del Paso 4

### Campos del Formulario:

1. **Objetivos Nutricionales** (Textarea grande)
   - Campo: `nutritional_objectives`
   - Permite detallar metas de corto, mediano y largo plazo
   - Placeholder con ejemplo estructurado

2. **Tipo de Plan** (Select)
   - Campo: `plan_type`
   - Opciones:
     - Estética
     - Clínico
     - Deportivo
     - Pediátrico
     - Salud
     - Otro

3. **Detalle del Tipo de Plan** (Textarea)
   - Campo: `plan_type_details`
   - Para información adicional o detalles si selecciona "Otro"

## 🔄 Cambios en el Flujo

- **Total de Pasos:** Ahora son 4 pasos (antes eran 3)
- **Paso 1:** Datos Generales del Paciente
- **Paso 2:** Antecedentes Clínicos del Paciente
- **Paso 3:** Alimentación y Hábitos del Paciente
- **Paso 4:** Objetivos, Tipo de Plan y Seguimiento ⭐ NUEVO

## ✅ Checklist de Verificación

Después de ejecutar la migración, verifica:

- [ ] Las 3 columnas nuevas aparecen en la tabla `clinical_history`
- [ ] El formulario muestra 4 pasos en lugar de 3
- [ ] El Paso 4 se muestra correctamente al navegar
- [ ] Los campos se pueden llenar y guardar
- [ ] Los datos se guardan correctamente en la base de datos
- [ ] No hay errores en la consola del navegador

## 🚨 Rollback (Si es necesario)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar las columnas agregadas
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS nutritional_objectives;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS plan_type;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS plan_type_details;
```

## 📊 Ejemplo de Uso

### Objetivos Nutricionales (Ejemplo):
```
Corto plazo (1-3 meses):
- Reducir 5kg de peso
- Mejorar hábitos alimenticios
- Aumentar consumo de agua a 2L diarios

Mediano plazo (3-6 meses):
- Alcanzar peso objetivo de 70kg
- Establecer rutina de ejercicio regular
- Reducir consumo de azúcares procesados

Largo plazo (6-12 meses):
- Mantener peso saludable
- Consolidar hábitos alimenticios saludables
- Mejorar composición corporal
```

### Tipo de Plan:
- Seleccionar: "Estética"

### Detalle del Tipo de Plan:
```
Plan enfocado en reducción de grasa corporal con enfoque estético. 
Incluye control de porciones y macronutrientes. 
Considerar restricciones alimentarias por intolerancia a la lactosa.
```

## 🎉 ¡Listo!

Una vez ejecutada la migración, el Paso 4 estará completamente funcional y listo para usar.

