# 📋 Instrucciones - Campo de Seguimiento en Consultas

## 🎯 Resumen
Se ha agregado un nuevo campo de **"Seguimiento (A partir de la 2da cita)"** en el formulario de "Subir Consulta" del paciente.

## 📁 Archivos Modificados

### ✅ Archivos Actualizados:
1. `src/components/admin/pacientes/subirDocumento/FormUpPdf.tsx` - Agregado campo de seguimiento
2. `src/schema/upload/consult.ts` - Agregado al schema de validación
3. `migration_add_seguimiento_consultas.sql` - Migración para la base de datos

## 🗄️ Migración de Base de Datos

### Campo a Agregar:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `seguimiento` | TEXT | Seguimiento del paciente (fecha, observaciones, profesional) |

### 📝 Pasos para Ejecutar la Migración:

1. **Abre Supabase Dashboard**
   - Ve a tu proyecto en https://supabase.com
   - Navega a "SQL Editor"

2. **Ejecuta el Script de Migración**
   - Abre el archivo `migration_add_seguimiento_consultas.sql`
   - Copia todo el contenido
   - Pégalo en el SQL Editor de Supabase
   - Haz clic en "Run" o presiona Ctrl+Enter

3. **Verifica la Migración**
   - Ve a "Table Editor"
   - Selecciona la tabla `consultas`
   - Verifica que aparezca la nueva columna:
     - ✅ `seguimiento` (TEXT)

## 🎨 Ubicación en el Formulario

El nuevo campo aparece en la ruta:
```
http://localhost:3000/admin/pacientes/[patientId]/subir-documento
```

### Orden de los Campos (Total: 5 campos):

1. **Título** (Input text)
2. **Tipo de tratamiento y diseño del plan** (Textarea)
3. **Seguimiento (A partir de la 2da cita)** ⭐ NUEVO (Textarea)
4. **Plan nutricional** (File upload PDF)
5. **Informe antropométrico** (File upload PDF)

## 📋 Características del Campo

### Campo: Seguimiento (A partir de la 2da cita)

- **Tipo:** Textarea grande (min-height: 150px)
- **Obligatorio:** No (opcional)
- **Descripción:** "Registre: Fecha de control, observaciones/evolución del paciente y profesional que atendió"
- **Placeholder con ejemplo:**
  ```
  Ejemplo:

  Fecha: 15/01/2024
  Observaciones: Paciente ha perdido 3kg desde la última consulta. 
  Se observa mejor adherencia al plan nutricional. 
  Reporta más energía y mejor calidad de sueño. 
  Se ajusta el plan para incluir más proteínas.
  Profesional: Dra. María García

  ---

  Fecha: 15/02/2024
  Observaciones: Continúa con buena evolución...
  Profesional: Dra. María García
  ```

## 💡 Casos de Uso

### Primera Cita:
- El campo "Seguimiento" se deja vacío
- Solo se llena "Tipo de tratamiento y diseño del plan"

### Segunda Cita y Siguientes:
- Se llena el campo "Seguimiento" con:
  - Fecha de la consulta
  - Observaciones sobre la evolución del paciente
  - Nombre del profesional que atendió
- Se pueden agregar múltiples seguimientos separados por "---"

### Ejemplo Real:
```
Fecha: 15/01/2024
Observaciones: Paciente ha perdido 3kg desde la última consulta. 
Mejora en adherencia al plan. Reporta más energía. 
Se ajusta el plan: aumentar proteínas a 1.8g/kg.
Profesional: Dra. María García

---

Fecha: 15/02/2024
Observaciones: Peso estable. Excelente adherencia. 
Mejora en composición corporal. Mantener plan actual.
Profesional: Dra. María García

---

Fecha: 15/03/2024
Observaciones: Alcanzó objetivo de peso. 
Iniciar fase de mantenimiento.
Profesional: Dra. María García
```

## ✅ Checklist de Verificación

Después de ejecutar la migración, verifica:

- [ ] La columna `seguimiento` aparece en la tabla `consultas`
- [ ] El formulario muestra 5 campos en total
- [ ] El campo "Seguimiento" aparece después de "Tipo de tratamiento"
- [ ] El campo tiene el placeholder con ejemplo
- [ ] El campo es opcional (no es obligatorio)
- [ ] Los datos se guardan correctamente en la base de datos
- [ ] No hay errores en la consola del navegador

## 🚨 Rollback (Si es necesario)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar la columna agregada
ALTER TABLE consultas 
DROP COLUMN IF EXISTS seguimiento;
```

## 📊 Estructura de la Tabla `consultas`

Después de la migración, la tabla tendrá:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | ID único |
| created_at | TIMESTAMP | Fecha de creación |
| paciente_id | UUID | ID del paciente |
| titulo | TEXT | Título de la consulta |
| recomendacion | TEXT | Tipo de tratamiento y diseño del plan |
| seguimiento | TEXT | ⭐ NUEVO - Seguimiento del paciente |
| pdf_path | TEXT | Ruta del primer PDF |
| pdf_path_2 | TEXT | Ruta del segundo PDF |

## 🎉 ¡Listo!

Una vez ejecutada la migración, el campo de seguimiento estará completamente funcional y listo para registrar las consultas de seguimiento del paciente.

