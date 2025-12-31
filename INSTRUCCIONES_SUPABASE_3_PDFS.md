# 📋 Instrucciones para Supabase - Agregar soporte para 3 PDFs (Otros documentos)

## 🎯 Objetivo
Agregar una nueva columna en la tabla `consultas` para almacenar la ruta del tercer PDF llamado "Otros documentos".

---

## 📝 Pasos a seguir en Supabase

### 1️⃣ Acceder al Editor SQL
1. Ingresa a tu proyecto en [Supabase](https://supabase.com)
2. Ve a la sección **SQL Editor** en el menú lateral izquierdo
3. Crea una nueva query

### 2️⃣ Ejecutar el siguiente comando SQL

```sql
-- Agregar nueva columna para el tercer PDF (Otros documentos)
ALTER TABLE consultas 
ADD COLUMN pdf_path_3 TEXT NULL;
```

### 3️⃣ Agregar un comentario descriptivo (opcional pero recomendado)

```sql
-- Agregar comentarios descriptivos a las columnas
COMMENT ON COLUMN consultas.pdf_path IS 'Ruta del Plan Nutricional (PDF opcional)';
COMMENT ON COLUMN consultas.pdf_path_2 IS 'Ruta del Informe Antropométrico (PDF opcional)';
COMMENT ON COLUMN consultas.pdf_path_3 IS 'Ruta de Otros Documentos (PDF opcional)';
```

### 4️⃣ Verificar que la columna se creó correctamente

```sql
-- Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'consultas'
ORDER BY ordinal_position;
```

Deberías ver algo como:

| column_name    | data_type | is_nullable |
|----------------|-----------|-------------|
| id             | bigint    | NO          |
| created_at     | timestamp | NO          |
| titulo         | text      | NO          |
| recomendacion  | text      | NO          |
| seguimiento    | text      | YES         |
| pdf_path       | text      | YES         |
| pdf_path_2     | text      | YES         |
| pdf_path_3     | text      | YES         |
| paciente_id    | uuid      | NO          |

---

## ✅ Verificación

Para verificar que todo funciona correctamente:

1. **En Supabase:**
   - Ve a **Table Editor**
   - Selecciona la tabla `consultas`
   - Verifica que aparezca la columna `pdf_path_3`

2. **En tu aplicación:**
   - Intenta subir una consulta con los 3 PDFs
   - Intenta subir una consulta solo con PDF 3
   - Verifica que el documento se muestre correctamente en la vista del paciente

---

## 🔒 Políticas de Seguridad (RLS)

Si tienes Row Level Security (RLS) habilitado, las políticas existentes para `pdf_path` y `pdf_path_2` deberían aplicarse automáticamente a `pdf_path_3` ya que todas son columnas TEXT simples.

**No necesitas modificar las políticas de seguridad.**

---

## 📦 Storage

El bucket `archivos_pacientes` en Supabase Storage ya está configurado y **no requiere cambios**. Los archivos se subirán con el mismo sistema existente.

### Estructura de archivos en el bucket:
```
archivos_pacientes/
  └── {patientId}/
      ├── {timestamp}-pdf1-{filename}.pdf  (Plan nutricional)
      ├── {timestamp}-pdf2-{filename}.pdf  (Informe antropométrico)
      └── {timestamp}-pdf3-{filename}.pdf  (Otros documentos)
```

---

## 🎉 ¡Listo!

Después de ejecutar estos comandos SQL, tu aplicación estará lista para manejar 3 PDFs opcionales por consulta.

### Características implementadas:
✅ Los 3 PDFs son **opcionales**  
✅ Puedes subir 0, 1, 2 o 3 PDFs por consulta  
✅ **PDF 1:** Plan nutricional  
✅ **PDF 2:** Informe antropométrico  
✅ **PDF 3:** Otros documentos  
✅ Los PDFs se muestran en la vista del paciente con botones separados y etiquetados  
✅ La validación permite archivos de hasta 5MB cada uno  
✅ Solo se aceptan archivos en formato PDF  

---

## ⚠️ Notas importantes

1. **Backup:** Antes de ejecutar cualquier comando SQL en producción, asegúrate de tener un backup de tu base de datos.

2. **Testing:** Prueba primero en un ambiente de desarrollo si es posible.

3. **Migración de datos existentes:** Los registros existentes en la tabla `consultas` tendrán `pdf_path_3` como `NULL`, lo cual es correcto y esperado.

4. **Bucket de Storage:** Asegúrate de que el bucket `archivos_pacientes` tenga las políticas correctas para permitir la subida de archivos. Si ya funcionaba con pdf1 y pdf2, debería funcionar automáticamente con pdf3.

---

## 🔍 Verificación del Bucket (Opcional)

Si quieres verificar que el bucket está configurado correctamente:

1. Ve a **Storage** en Supabase
2. Selecciona el bucket `archivos_pacientes`
3. Verifica que las políticas permitan:
   - **INSERT:** Para subir archivos
   - **SELECT:** Para descargar archivos
   - **UPDATE:** Para actualizar archivos (si usas upsert)
   - **DELETE:** Para eliminar archivos (si es necesario)

Las políticas deberían estar configuradas para usuarios autenticados con rol de doctor.

---

## 📝 Resumen de cambios en el código

Los siguientes archivos fueron modificados:

1. ✅ `src/schema/upload/consult.ts` - Agregado campo `pdf3` al schema
2. ✅ `src/components/admin/pacientes/subirDocumento/FormUpPdf.tsx` - Agregado campo y lógica de subida
3. ✅ Base de datos - Agregada columna `pdf_path_3` (este archivo te guía)

¡Todo listo para usar! 🚀

