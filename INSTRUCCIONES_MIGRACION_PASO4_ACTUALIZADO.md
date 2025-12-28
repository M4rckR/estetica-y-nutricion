# 📋 Instrucciones para Migración - Paso 4: Objetivos y Tipo de Plan (ACTUALIZADO)

## 🎯 Resumen
Se ha actualizado el **Paso 4** del formulario de Historia Clínica para separar los objetivos nutricionales en 3 campos independientes:
- Objetivos de corto plazo (1-3 meses)
- Objetivos de mediano plazo (3-6 meses)
- Objetivos de largo plazo (6-12 meses)
- Tipo de plan
- Detalle del tipo de plan

## 📁 Archivos Actualizados

### ✅ Archivos de Migración:
1. ~~`migration_add_objectives_plan_type.sql`~~ - **NO USAR** (versión antigua)
2. **`migration_update_objectives_separate_fields.sql`** - ⭐ **USAR ESTE**

### ✅ Archivos Modificados:
1. `src/schema/clinical/history.ts` - Actualizado con los 3 campos separados
2. `src/components/admin/clinical/steps/Step4ObjetivosYPlan.tsx` - 3 textareas independientes
3. `src/components/admin/clinical/ClinicalHistoryForm.tsx` - Agregados los 3 campos
4. `src/app/admin/actions/clinical.ts` - Guardado de los 3 campos

## 🗄️ Migración de Base de Datos

### Campos a Agregar:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `short_term_objectives` | TEXT | Objetivos de corto plazo (1-3 meses) |
| `medium_term_objectives` | TEXT | Objetivos de mediano plazo (3-6 meses) |
| `long_term_objectives` | TEXT | Objetivos de largo plazo (6-12 meses) |
| `plan_type` | VARCHAR(20) | Tipo de plan (estética, clínico, deportivo, pediátrico, salud, otro) |
| `plan_type_details` | TEXT | Detalle adicional del tipo de plan |

### 📝 Pasos para Ejecutar la Migración:

1. **Abre Supabase Dashboard**
   - Ve a tu proyecto en https://supabase.com
   - Navega a "SQL Editor"

2. **Ejecuta el Script de Migración ACTUALIZADO**
   - Abre el archivo **`migration_update_objectives_separate_fields.sql`**
   - Copia todo el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en "Run" o presiona Ctrl+Enter

3. **Verifica la Migración**
   - Ve a "Table Editor"
   - Selecciona la tabla `clinical_history`
   - Verifica que aparezcan las nuevas columnas:
     - ✅ `short_term_objectives`
     - ✅ `medium_term_objectives`
     - ✅ `long_term_objectives`
     - ✅ `plan_type`
     - ✅ `plan_type_details`
   - Verifica que NO exista la columna `nutritional_objectives` (fue eliminada)

## 🎨 Estructura del Paso 4 (Actualizada)

### Sección 1: Objetivos Nutricionales

1. **Objetivos de Corto Plazo (1-3 meses)** (Textarea)
   - Campo: `short_term_objectives`
   - Metas inmediatas y alcanzables en el primer trimestre

2. **Objetivos de Mediano Plazo (3-6 meses)** (Textarea)
   - Campo: `medium_term_objectives`
   - Metas a alcanzar en el segundo trimestre

3. **Objetivos de Largo Plazo (6-12 meses)** (Textarea)
   - Campo: `long_term_objectives`
   - Metas de mantenimiento y consolidación

### Sección 2: Tipo de Plan Nutricional

4. **Tipo de Plan** (Select)
   - Campo: `plan_type`
   - Opciones: Estética, Clínico, Deportivo, Pediátrico, Salud, Otro

5. **Detalle del Tipo de Plan** (Textarea)
   - Campo: `plan_type_details`
   - Información adicional o detalles

## ✅ Ventajas de esta Estructura

- ✅ **Mejor organización:** Cada objetivo tiene su propio campo
- ✅ **Fácil recuperación:** Puedes consultar objetivos por plazo específico
- ✅ **Mejor UX:** El usuario sabe exactamente qué escribir en cada campo
- ✅ **Análisis más fácil:** Puedes hacer reportes por tipo de objetivo
- ✅ **Validación independiente:** Puedes validar cada campo por separado

## 🔄 Cambios Visuales

**Antes:**
- 1 textarea grande para todos los objetivos

**Ahora:**
- 3 textareas separadas con títulos claros:
  - "Objetivos de Corto Plazo (1-3 meses)"
  - "Objetivos de Mediano Plazo (3-6 meses)"
  - "Objetivos de Largo Plazo (6-12 meses)"
- Separador visual entre secciones
- Mejor organización con subtítulos

## ✅ Checklist de Verificación

Después de ejecutar la migración, verifica:

- [ ] Las 5 columnas nuevas aparecen en la tabla `clinical_history`
- [ ] La columna `nutritional_objectives` ya NO existe
- [ ] El formulario muestra 3 textareas separadas para objetivos
- [ ] Cada textarea tiene su placeholder correspondiente
- [ ] Los campos se pueden llenar independientemente
- [ ] Los datos se guardan correctamente en la base de datos
- [ ] No hay errores en la consola del navegador

## 🚨 Rollback (Si es necesario)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar las columnas agregadas
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS short_term_objectives;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS medium_term_objectives;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS long_term_objectives;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS plan_type;

ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS plan_type_details;
```

## 📊 Ejemplo de Uso

### Objetivos de Corto Plazo:
```
- Reducir 5kg de peso
- Mejorar hábitos alimenticios
- Aumentar consumo de agua a 2L diarios
- Reducir consumo de azúcares procesados
```

### Objetivos de Mediano Plazo:
```
- Alcanzar peso objetivo de 70kg
- Establecer rutina de ejercicio regular
- Consolidar hábitos alimenticios saludables
- Mejorar marcadores bioquímicos (colesterol, glucosa)
```

### Objetivos de Largo Plazo:
```
- Mantener peso saludable
- Consolidar estilo de vida saludable
- Mejorar composición corporal
- Prevenir enfermedades crónicas
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

Una vez ejecutada la migración actualizada, el Paso 4 tendrá una estructura mucho más organizada y fácil de usar.

