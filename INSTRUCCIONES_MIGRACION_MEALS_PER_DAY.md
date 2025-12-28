# 📋 Instrucciones: Migración Campo "Comidas por día"

## 🎯 Resumen
Se ha agregado el nuevo campo **"¿Cuántas comidas normalmente realiza al día?"** a la historia clínica del paciente.

---

## ✅ Cambios Realizados

### 1. **Base de Datos** 📊
- ✅ Archivo de migración creado: `migration_add_meals_per_day.sql`
- Campo: `meals_per_day VARCHAR(10)`
- Valores permitidos: `'2'`, `'3'`, `'4'`, `'5'`
- El campo es **OPCIONAL** (permite NULL)

### 2. **Schema de Validación** 🔒
- ✅ Actualizado: `src/schema/clinical/history.ts`
- Agregado campo con validación Zod

### 3. **Tipos TypeScript** 📝
- ✅ Los tipos se infieren automáticamente del schema Zod
- No requiere cambios manuales

### 4. **Formulario (Paso 3 - Alimentación)** 📝
- ✅ Actualizado: `src/components/admin/clinical/steps/Step3Alimentacion.tsx`
- Campo agregado después de "¿Con qué frecuencia comes fuera de casa?"
- Tipo: Select con 4 opciones (2, 3, 4, 5 comidas)

### 5. **Server Action** ⚙️
- ✅ Actualizado: `src/app/admin/actions/clinical.ts`
- El campo se guarda correctamente en la base de datos

### 6. **Vista de Historia Clínica** 👁️
- ✅ Actualizado: `src/components/admin/clinical/ClinicalHistoryView.tsx`
- El campo se muestra en la sección de Alimentación
- Traducciones agregadas para mostrar "X comidas"

---

## 🚀 PASOS PARA APLICAR EN SUPABASE

### **Paso 1: Abrir Supabase Dashboard**
1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión en tu proyecto
3. Selecciona tu proyecto de **Estética y Nutrición**

### **Paso 2: Abrir SQL Editor**
1. En el menú lateral, haz clic en **SQL Editor**
2. Haz clic en **New Query** (Nueva consulta)

### **Paso 3: Copiar y Ejecutar la Migración**
1. Abre el archivo `migration_add_meals_per_day.sql` de tu proyecto
2. Copia **TODO** el contenido del archivo
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **Run** (Ejecutar) o presiona `Ctrl + Enter`

### **Paso 4: Verificar que se Ejecutó Correctamente**
Deberías ver un mensaje de éxito como:
```
Success. No rows returned
```

### **Paso 5: Verificar la Columna**
1. Ve a **Table Editor** en el menú lateral
2. Selecciona la tabla `clinical_history`
3. Verifica que aparezca la nueva columna `meals_per_day`

---

## 🧪 PRUEBAS A REALIZAR

### 1. **Crear Nueva Historia Clínica**
- [ ] Ve a `/admin/pacientes`
- [ ] Selecciona un paciente
- [ ] Haz clic en "Historia clínica" → "Crear"
- [ ] Completa el formulario hasta el Paso 3
- [ ] Verifica que aparezca el campo "¿Cuántas comidas normalmente realiza al día?"
- [ ] Selecciona una opción (2, 3, 4 o 5 comidas)
- [ ] Completa y guarda el formulario
- [ ] Verifica que se guardó correctamente

### 2. **Ver Historia Clínica Existente**
- [ ] Ve a la vista de una historia clínica guardada
- [ ] Verifica que se muestre el campo "¿Cuántas comidas normalmente realiza al día?"
- [ ] Si no se había llenado antes, debe mostrar "No especificado"

### 3. **Editar Historia Clínica**
- [ ] Edita una historia clínica existente
- [ ] Cambia el valor del campo "Comidas por día"
- [ ] Guarda los cambios
- [ ] Verifica que se actualizó correctamente

---

## 📊 ESTRUCTURA DEL CAMPO

### En la Base de Datos (Supabase)
```sql
meals_per_day VARCHAR(10) 
CHECK (meals_per_day IS NULL OR meals_per_day IN ('2', '3', '4', '5'))
```

### En el Formulario (React)
```typescript
<Select>
  <SelectItem value="2">2 comidas</SelectItem>
  <SelectItem value="3">3 comidas</SelectItem>
  <SelectItem value="4">4 comidas</SelectItem>
  <SelectItem value="5">5 comidas</SelectItem>
</Select>
```

### En la Vista
```typescript
// Traducciones
'2': '2 comidas',
'3': '3 comidas',
'4': '4 comidas',
'5': '5 comidas',
```

---

## ⚠️ NOTAS IMPORTANTES

1. **El campo es OPCIONAL**: Los pacientes pueden dejarlo sin llenar
2. **Historias clínicas existentes**: Si ya tienes historias clínicas guardadas, este campo aparecerá como NULL hasta que se edite
3. **Validación**: Solo acepta los valores '2', '3', '4', '5' (como strings)
4. **Ubicación**: El campo está en el **Paso 3 - Alimentación** del formulario

---

## 🔄 ROLLBACK (Si algo sale mal)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar la columna meals_per_day
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS meals_per_day;
```

**IMPORTANTE**: Esto eliminará todos los datos guardados en ese campo.

---

## ✅ CHECKLIST FINAL

- [ ] Migración SQL ejecutada en Supabase
- [ ] Columna `meals_per_day` visible en Table Editor
- [ ] Campo visible en formulario (Paso 3)
- [ ] Campo funciona al crear nueva historia clínica
- [ ] Campo funciona al editar historia clínica existente
- [ ] Campo se muestra correctamente en la vista
- [ ] Validación funciona (solo acepta 2, 3, 4, 5)

---

## 📞 SOPORTE

Si encuentras algún problema:
1. Verifica que la migración se ejecutó correctamente en Supabase
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que los archivos modificados estén guardados
4. Reinicia el servidor de desarrollo (`npm run dev`)

---

**Fecha de creación**: Diciembre 2024  
**Versión**: 1.0  
**Estado**: ✅ Listo para producción

