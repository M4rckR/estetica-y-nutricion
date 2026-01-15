# 📋 Instrucciones: Migración Campo "Hábitos Especiales"

## 🎯 Resumen
Se ha agregado el nuevo campo **"Hábitos Especiales"** al Paso 3 de la historia clínica del paciente.

---

## ✅ Cambios Realizados

### 1. **Base de Datos** 📊
- ✅ Archivo de migración creado: `migration_add_special_habits.sql`
- Campo: `special_habits TEXT`
- El campo es **OPCIONAL** (permite NULL)
- Permite descripciones detalladas de múltiples hábitos

### 2. **Schema de Validación** 🔒
- ✅ Actualizado: `src/schema/clinical/history.ts`
- Agregado campo con validación Zod como texto opcional

### 3. **Formulario (Paso 3 - Alimentación)** 📝
- ✅ Actualizado: `src/components/admin/clinical/steps/Step3Alimentacion.tsx`
- Campo agregado al final, después de "Recuento de Actividad Física"
- Tipo: Textarea con FormDescription detallada
- Incluye: alcohol, cafeína, fumador, horarios irregulares, otros

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
1. Abre el archivo `migration_add_special_habits.sql` de tu proyecto
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
3. Verifica que aparezca la nueva columna `special_habits`

---

## 🧪 PRUEBAS A REALIZAR

### 1. **Crear Nueva Historia Clínica**
- [ ] Ve a `/admin/pacientes`
- [ ] Selecciona un paciente
- [ ] Haz clic en "Historia clínica" → "Crear"
- [ ] Completa hasta el Paso 3
- [ ] Verifica que aparezca el campo "Hábitos Especiales"
- [ ] Escribe detalles sobre los hábitos
- [ ] Completa y guarda el formulario
- [ ] Verifica que se guardó correctamente

### 2. **Ver Historia Clínica Existente**
- [ ] Ve a la vista de una historia clínica guardada
- [ ] Verifica que se muestre el campo "Hábitos Especiales"
- [ ] Si no se había llenado antes, debe mostrar "No especificado"

### 3. **Editar Historia Clínica**
- [ ] Edita una historia clínica existente
- [ ] Modifica los hábitos especiales
- [ ] Guarda los cambios
- [ ] Verifica que se actualizó correctamente

---

## 📊 ESTRUCTURA DEL CAMPO

### En la Base de Datos (Supabase)
```sql
special_habits TEXT
```

### En el Formulario (React)
```typescript
<FormField
  name="special_habits"
  render={({ field }) => (
    <FormItem className="md:col-span-2">
      <FormLabel className="text-m-green">
        Hábitos Especiales
      </FormLabel>
      <FormDescription>
        Detalle sobre estos hábitos: Consumo de alcohol (cuántas veces 
        la semana y qué tipo), Consumo de cafeína o estimulantes a la 
        semana, Fumador SI/NO (si es sí detallar cuántos cigarros a la 
        semana), Horarios de comidas irregulares SI/NO, Otros hábitos 
        que consideres a mejorar
      </FormDescription>
      <FormControl>
        <Textarea
          placeholder="Ej: Consumo de alcohol: 2 veces/semana (cerveza)..."
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
  label="Hábitos Especiales"
  value={clinicalHistory.special_habits}
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
- ✅ Recuento de Actividad Física
- 🆕 **Hábitos Especiales** ← NUEVO

---

## 💡 EJEMPLOS DE RESPUESTAS

### Respuesta Completa:
```
Consumo de alcohol: 2 veces por semana (cerveza los fines de semana)
Consumo de cafeína: 3 cafés al día (mañana, tarde y noche)
Fumador: No
Horarios de comidas irregulares: Sí, ceno muy tarde (10pm-11pm)
Otros hábitos: Picoteo entre comidas, consumo excesivo de dulces por ansiedad
```

### Respuesta Simple:
```
Consumo de alcohol: Ocasional (1 vez al mes)
Cafeína: 1 café por la mañana
Fumador: No
Horarios regulares: Sí
Otros: Ninguno
```

### Respuesta con Fumador:
```
Consumo de alcohol: No consumo
Cafeína: No consumo
Fumador: Sí, 10 cigarros al día
Horarios de comida: Regulares
Otros: Estoy intentando dejar de fumar
```

---

## ⚠️ NOTAS IMPORTANTES

1. **El campo es OPCIONAL**: Los pacientes pueden dejarlo sin llenar
2. **Texto libre**: Permite describir múltiples hábitos en un solo campo
3. **Historias clínicas existentes**: Si ya tienes historias clínicas guardadas, este campo aparecerá como NULL hasta que se edite
4. **Incluye múltiples aspectos**: Alcohol, cafeína, tabaco, horarios, otros
5. **Ubicación**: El campo está al final del **Paso 3 - Alimentación**

---

## 🔄 ROLLBACK (Si algo sale mal)

Si necesitas revertir los cambios en la base de datos:

```sql
-- Eliminar la columna special_habits
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS special_habits;
```

**IMPORTANTE**: Esto eliminará todos los datos guardados en ese campo.

---

## ✅ CHECKLIST FINAL

- [ ] Migración SQL ejecutada en Supabase
- [ ] Columna `special_habits` visible en Table Editor
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

