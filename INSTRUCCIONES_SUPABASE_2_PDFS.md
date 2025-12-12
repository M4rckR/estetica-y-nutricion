# 📋 Instrucciones para Supabase - Agregar soporte para 2 PDFs

## 🎯 Objetivo
Agregar una nueva columna en la tabla `consultas` para almacenar la ruta del segundo PDF.

---

## 📝 Pasos a seguir en Supabase

### 1️⃣ Acceder al Editor SQL
1. Ingresa a tu proyecto en [Supabase](https://supabase.com)
2. Ve a la sección **SQL Editor** en el menú lateral izquierdo
3. Crea una nueva query

### 2️⃣ Ejecutar el siguiente comando SQL

```sql
-- Agregar nueva columna para el segundo PDF
ALTER TABLE consultas 
ADD COLUMN pdf_path_2 TEXT NULL;
```

### 3️⃣ Agregar un comentario descriptivo (opcional pero recomendado)

```sql
-- Agregar comentarios descriptivos a las columnas
COMMENT ON COLUMN consultas.pdf_path IS 'Ruta del Plan Nutricional (PDF opcional)';
COMMENT ON COLUMN consultas.pdf_path_2 IS 'Ruta del Informe Antropométrico (PDF opcional)';
```

### 4️⃣ Verificar que la columna se creó correctamente

```sql
-- Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'consultas';
```

Deberías ver algo como:

| column_name    | data_type | is_nullable |
|----------------|-----------|-------------|
| id             | bigint    | NO          |
| created_at     | timestamp | NO          |
| titulo         | text      | NO          |
| recomendacion  | text      | NO          |
| pdf_path       | text      | YES         |
| pdf_path_2     | text      | YES         |
| paciente_id    | uuid      | NO          |

---

## ✅ Verificación

Para verificar que todo funciona correctamente:

1. **En Supabase:**
   - Ve a **Table Editor**
   - Selecciona la tabla `consultas`
   - Verifica que aparezca la columna `pdf_path_2`

2. **En tu aplicación:**
   - Intenta subir una consulta con ambos PDFs
   - Intenta subir una consulta solo con PDF 1
   - Intenta subir una consulta solo con PDF 2
   - Verifica que los documentos se muestren correctamente en la vista del paciente

---

## 🔒 Políticas de Seguridad (RLS)

Si tienes Row Level Security (RLS) habilitado, las políticas existentes para `pdf_path` deberían aplicarse automáticamente a `pdf_path_2` ya que ambas son columnas TEXT simples.

**No necesitas modificar las políticas de seguridad.**

---

## 📦 Storage

El bucket `archivos_pacientes` en Supabase Storage ya está configurado y **no requiere cambios**. Los archivos se subirán con el mismo sistema existente.

---

## 🎉 ¡Listo!

Después de ejecutar estos comandos SQL, tu aplicación estará lista para manejar 2 PDFs opcionales por consulta.

### Características implementadas:
✅ Ambos PDFs son **opcionales**  
✅ Puedes subir 0, 1 o 2 PDFs por consulta  
✅ **PDF 1:** Plan nutricional  
✅ **PDF 2:** Informe antropométrico  
✅ Los PDFs se muestran en la vista del paciente con botones separados y etiquetados  
✅ La validación permite archivos de hasta 5MB cada uno  
✅ Solo se aceptan archivos en formato PDF  

---

## ⚠️ Notas importantes

1. **Backup:** Antes de ejecutar cualquier comando SQL en producción, asegúrate de tener un backup de tu base de datos.

2. **Testing:** Prueba primero en un ambiente de desarrollo si es posible.

3. **Migración de datos existentes:** Los registros existentes en la tabla `consultas` tendrán `pdf_path_2` como `NULL`, lo cual es correcto y esperado.

