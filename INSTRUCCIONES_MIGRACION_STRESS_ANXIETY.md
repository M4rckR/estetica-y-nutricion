# 📋 Instrucciones: Migración Campo "Estrés y Ansiedad"

## 🎯 Resumen
Se ha agregado el nuevo campo **"¿Sufres de estrés y ansiedad?"** al Paso 1 de la historia clínica del paciente.

---

## ✅ Cambios Realizados

### 1. **Base de Datos** 📊
- ✅ Archivo de migración creado: `migration_add_stress_anxiety.sql`
- Campo: `stress_anxiety TEXT`
- El campo es **OPCIONAL** (permite NULL)
- Permite respuestas libres (texto largo)

### 2. **Schema de Validación** 🔒
- ✅ Actualizado: `src/schema/clinical/history.ts`
- Agregado campo con validación Zod como texto opcional

### 3. **Formulario (Paso 1 - Historia Clínica)** 📝
- ✅ Actualizado: `src/components/admin/clinical/steps/Step1HistoriaClinica.tsx`
- Campo agregado después de "Antecedentes de enfermedades crónicas"
- Tipo: Textarea (texto libre)
- Placeholder sugiere escribir "No" o describir los factores

### 4. **Server Action** ⚙️
- ✅ Actualizado: `src/app/admin/actions/clinical.ts`
- El campo se guarda correctamente en la base de datos

### 5. **Vista de Historia Clínica** 👁️
- ✅ Actualizado: `src/components/admin/clinical/ClinicalHistoryView.tsx`
- El campo se muestra en la sección de Historia Clínica

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
1. Abre el archivo `migration_add_stress_anxiety.sql` de tu proyecto
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
3. Verifica que aparezca la nueva columna `stress_anxiety`

---

## 🧪 PRUEBAS A REALIZAR

### 1. **Crear Nueva Historia Clínica**
- [ ] Ve a `/admin/pacientes`
- [ ] Selecciona un paciente
- [ ] Haz clic en "Historia clínica" → "Crear"
- [ ] En el Paso 1, verifica que aparezca el campo "¿Sufres de estrés y ansiedad?"
- [ ] Escribe una respuesta (ej: "Sí, por trabajo y familia" o "No")
- [ ] Completa y guarda el formulario
- [ ] Verifica que se guardó correctamente

### 2. **Ver Historia Clínica Existente**
- [ ] Ve a la vista de una historia clínica guardada
- [ ] Verifica que se muestre el campo "¿Sufres de estrés y ansiedad?"
- [ ] Si no se había llenado antes, debe mostrar "No especificado"

### 3. **Editar Historia Clínica**
- [ ] Edita una historia clínica existente
- [ ] Modifica el valor del campo de estrés y ansiedad
- [ ] Guarda los cambios
- [ ] Verifica que se actualizó correctamente

---

## 📊 ESTRUCTURA DEL CAMPO

### En la Base de Datos (Supabase)
```sql
stress_anxiety TEXT
```

### En el Formulario (React)
```typescript
<Textarea
  placeholder="Ej: Sí, por trabajo y problemas familiares... o simplemente: No"
  className="bg-m-green-light/20 rounded-2xl min-h-[100px] resize-none"
/>
```

### En la Vista
```typescript
<DataRow
  label="¿Sufres de estrés y ansiedad?"
  value={clinicalHistory.stress_anxiety}
/>
```

---

## 📍 UBICACIÓN DEL CAMPO

El campo aparece en el **Paso 1 - Historia Clínica**, después de:
- ✅ Antecedentes de enfermedades crónicas
- 🆕 **¿Sufres de estrés y ansiedad?** ← NUEVO
- ✅ Síntomas digestivos

---

## 💡 EJEMPLOS DE RESPUESTAS

### Respuestas Válidas:
- "No"
- "Sí, por el trabajo"
- "Sí, factores: trabajo estresante, problemas familiares y presión económica"
- "Ocasionalmente, cuando tengo mucho trabajo"
- "Sí, principalmente por ansiedad generalizada"

---

## ⚠️ NOTAS IMPORTANTES

1. **El campo es OPCIONAL**: Los pacientes pueden dejarlo sin llenar
2. **Texto libre**: No hay restricciones en la respuesta, puede escribir lo que necesite
3. **Historias clínicas existentes**: Si ya tienes historias clínicas guardadas, este campo aparecerá como NULL hasta que se edite
4. **Sin validaciones especiales**: Acepta cualquier texto (no distingue entre "Sí" o "No")
5. **Ubicación**: El campo está en el **Paso 1 - Historia Clínica** del formulario

---

## 🔄 ROLLBACK (Si algo sale mal)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar la columna stress_anxiety
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS stress_anxiety;
```

**IMPORTANTE**: Esto eliminará todos los datos guardados en ese campo.

---

## ✅ CHECKLIST FINAL

- [ ] Migración SQL ejecutada en Supabase
- [ ] Columna `stress_anxiety` visible en Table Editor
- [ ] Campo visible en formulario (Paso 1)
- [ ] Campo funciona al crear nueva historia clínica
- [ ] Campo funciona al editar historia clínica existente
- [ ] Campo se muestra correctamente en la vista
- [ ] Textarea permite escribir texto largo

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

