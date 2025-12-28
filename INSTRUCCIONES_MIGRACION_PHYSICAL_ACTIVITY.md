# 📋 Instrucciones: Migración Campo "Recuento de Actividad Física"

## 🎯 Resumen
Se ha agregado el nuevo campo **"Recuento de Actividad Física"** al Paso 3 de la historia clínica del paciente.

---

## ✅ Cambios Realizados

### 1. **Base de Datos** 📊
- ✅ Archivo de migración creado: `migration_add_physical_activity_record.sql`
- Campo: `physical_activity_record TEXT`
- El campo es **OPCIONAL** (permite NULL)
- Permite descripciones detalladas de actividades del día

### 2. **Schema de Validación** 🔒
- ✅ Actualizado: `src/schema/clinical/history.ts`
- Agregado campo con validación Zod como texto opcional

### 3. **Formulario (Paso 3 - Alimentación)** 📝
- ✅ Actualizado: `src/components/admin/clinical/steps/Step3Alimentacion.tsx`
- Campo agregado al final, después de "Suplementos"
- Tipo: Textarea con FormDescription
- Similar al formato del campo "Calidad de sueño"

### 4. **Server Action** ⚙️
- ✅ Actualizado: `src/app/admin/actions/clinical.ts`
- El campo se guarda correctamente en la base de datos

### 5. **Vista de Historia Clínica** 👁️
- ✅ Actualizado: `src/components/admin/clinical/ClinicalHistoryView.tsx`
- El campo se muestra en la sección de Alimentación

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
1. Abre el archivo `migration_add_physical_activity_record.sql` de tu proyecto
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
3. Verifica que aparezca la nueva columna `physical_activity_record`

---

## 🧪 PRUEBAS A REALIZAR

### 1. **Crear Nueva Historia Clínica**
- [ ] Ve a `/admin/pacientes`
- [ ] Selecciona un paciente
- [ ] Haz clic en "Historia clínica" → "Crear"
- [ ] Completa hasta el Paso 3
- [ ] Verifica que aparezca el campo "Recuento de Actividad Física"
- [ ] Escribe un recuento detallado con horas
- [ ] Completa y guarda el formulario
- [ ] Verifica que se guardó correctamente

### 2. **Ver Historia Clínica Existente**
- [ ] Ve a la vista de una historia clínica guardada
- [ ] Verifica que se muestre el campo "Recuento de Actividad Física"
- [ ] Si no se había llenado antes, debe mostrar "No especificado"

### 3. **Editar Historia Clínica**
- [ ] Edita una historia clínica existente
- [ ] Modifica el recuento de actividad física
- [ ] Guarda los cambios
- [ ] Verifica que se actualizó correctamente

---

## 📊 ESTRUCTURA DEL CAMPO

### En la Base de Datos (Supabase)
```sql
physical_activity_record TEXT
```

### En el Formulario (React)
```typescript
<FormField
  name="physical_activity_record"
  render={({ field }) => (
    <FormItem className="md:col-span-2">
      <FormLabel className="text-m-green">
        Recuento de Actividad Física
      </FormLabel>
      <FormDescription>
        Detalle qué es lo que hace como actividad física un día anterior 
        desde que se levanta hasta que se acuesta (mencione horas y minutos 
        de cada actividad)
      </FormDescription>
      <FormControl>
        <Textarea
          placeholder="Ej: 6:00am - Despierto y camino 30min, 8:00am - Trabajo de oficina sentado..."
          className="bg-m-green-light/20 rounded-3xl min-h-[120px] resize-none"
        />
      </FormControl>
    </FormItem>
  )}
/>
```

### En la Vista
```typescript
<DataRow
  label="Recuento de Actividad Física"
  value={clinicalHistory.physical_activity_record}
/>
```

---

## 📍 UBICACIÓN DEL CAMPO

El campo aparece en el **Paso 3 - Alimentación**, al final:
- ✅ ¿Practica deportes?
- ✅ ¿Quién prepara las comidas?
- ✅ ¿Con qué frecuencia comes fuera de casa?
- ✅ ¿Cuántas comidas realiza al día?
- ✅ Cantidad de líquidos
- ✅ Alimentos favoritos
- ✅ Alimentos que no consume
- ✅ Suplementos
- 🆕 **Recuento de Actividad Física** ← NUEVO

---

## 💡 EJEMPLOS DE RESPUESTAS

### Respuestas Válidas:
```
6:00am - Despierto y camino 30 minutos
8:00am - Trabajo de oficina sentado (4 horas)
12:00pm - Camino 15 minutos al almuerzo
1:00pm - Almuerzo sentado (30 minutos)
2:00pm - Trabajo sentado (4 horas)
7:00pm - Gimnasio: pesas y cardio (1 hora)
9:00pm - Cena y actividades en casa sentado
11:00pm - Dormir
```

```
7:00am - Levantarme y arreglarme (30min)
8:00am - Camino al trabajo (20min)
8:30am-5:00pm - Trabajo de pie atendiendo clientes
5:30pm - Camino a casa (20min)
6:00pm - Actividades del hogar (1 hora)
8:00pm - Descanso sentado viendo TV
10:00pm - Dormir
```

---

## ⚠️ NOTAS IMPORTANTES

1. **El campo es OPCIONAL**: Los pacientes pueden dejarlo sin llenar
2. **Texto libre**: No hay restricciones en el formato de respuesta
3. **Historias clínicas existentes**: Si ya tienes historias clínicas guardadas, este campo aparecerá como NULL hasta que se edite
4. **Similar a "Calidad de sueño"**: Tiene el mismo formato con título, descripción y textarea
5. **Ubicación**: El campo está al final del **Paso 3 - Alimentación**

---

## 🔄 ROLLBACK (Si algo sale mal)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar la columna physical_activity_record
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS physical_activity_record;
```

**IMPORTANTE**: Esto eliminará todos los datos guardados en ese campo.

---

## ✅ CHECKLIST FINAL

- [ ] Migración SQL ejecutada en Supabase
- [ ] Columna `physical_activity_record` visible en Table Editor
- [ ] Campo visible en formulario (Paso 3)
- [ ] FormDescription se muestra correctamente
- [ ] Campo funciona al crear nueva historia clínica
- [ ] Campo funciona al editar historia clínica existente
- [ ] Campo se muestra correctamente en la vista
- [ ] Textarea tiene altura adecuada (min-h-[120px])

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

