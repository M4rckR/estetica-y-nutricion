# 🔧 Solución: "Database error deleting user"

## 🎯 Tu Problema

```
Error al eliminar
Error al eliminar el paciente: Database error deleting user
```

## ✅ Diagnóstico

Tu `.env.local` está **correcto** ✅  
El Service Role Key funciona ✅  
**PERO**: Las tablas NO tienen `ON DELETE CASCADE` ❌

## 📋 ¿Qué significa este error?

Cuando intentas eliminar un paciente de `auth.users`, PostgreSQL verifica si hay registros relacionados en otras tablas:

```
Intentas eliminar → Usuario Juan
                    ↓
PostgreSQL verifica:
  - Tabla "users" → ¿Tiene registro con user_id de Juan? ✅ SÍ
  - Tabla "clinical_history" → ¿Tiene registro con patient_id de Juan? ✅ SÍ  
  - Tabla "consultas" → ¿Tiene registros con paciente_id de Juan? ✅ SÍ

Sin CASCADE:
  ❌ ERROR: "No puedo eliminar a Juan porque hay registros dependientes"

Con CASCADE:
  ✅ "Elimino a Juan Y todos sus registros automáticamente"
```

---

## 🚀 SOLUCIÓN: Ejecutar Migración SQL

### Paso 1: Ir a Supabase Dashboard

1. Abre tu navegador
2. Ve a: https://supabase.com
3. Selecciona tu proyecto
4. Ve a **SQL Editor** (en el menú lateral)

---

### Paso 2: Ejecutar la Migración

1. Abre el archivo: **`database/migrations/migration_fix_all_cascade_delete.sql`**
2. Copia TODO el contenido
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"** (o presiona `Ctrl + Enter`)

---

### Paso 3: Verificar que funcionó

Después de ejecutar, verifica que no haya errores. Deberías ver algo como:

```
Success. No rows returned
```

O mensajes confirmando que se crearon los constraints.

---

## 📊 ¿Qué hace esta migración?

La migración `migration_fix_all_cascade_delete.sql` hace lo siguiente:

### 1. Tabla `users`
```sql
ALTER TABLE users
ADD CONSTRAINT users_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```
**Efecto**: Cuando se elimina un usuario de `auth.users`, se elimina su registro en `users`

---

### 2. Tabla `clinical_history`
```sql
ALTER TABLE clinical_history
ADD CONSTRAINT clinical_history_patient_id_fkey 
FOREIGN KEY (patient_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```
**Efecto**: Cuando se elimina un usuario, se elimina su historia clínica

---

### 3. Tabla `consultas`
```sql
ALTER TABLE consultas
ADD CONSTRAINT consultas_paciente_id_fkey 
FOREIGN KEY (paciente_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;
```
**Efecto**: Cuando se elimina un usuario, se eliminan todas sus consultas

---

### 4. Políticas RLS para `consultas`

También configura las políticas de seguridad para proteger los datos:
- ✅ Doctores pueden ver todas las consultas
- ✅ Pacientes solo ven sus propias consultas
- ✅ Solo doctores pueden crear/editar/eliminar consultas

---

## ⚡ Flujo de Eliminación (DESPUÉS de ejecutar el SQL)

```
1. Doctor hace clic en 🗑️
   ↓
2. Confirma en el modal
   ↓
3. Server Action valida permisos
   ↓
4. Ejecuta: supabaseAdmin.auth.admin.deleteUser(patientId)
   ↓
5. PostgreSQL detecta CASCADE
   ↓
6. Elimina EN ORDEN:
   ✅ Registro en "consultas" (CASCADE)
   ✅ Registro en "clinical_history" (CASCADE)
   ✅ Registro en "users" (CASCADE)
   ✅ Usuario en "auth.users" (principal)
   ↓
7. ✅ ¡Éxito! Todo eliminado correctamente
```

---

## 🧪 Cómo Probar

### Después de ejecutar la migración:

1. **Reinicia tu servidor** (por si acaso):
   ```bash
   # Ctrl+C para detener
   npm run dev
   ```

2. **Ve a la lista de pacientes**:
   ```
   http://localhost:3000/admin/pacientes
   ```

3. **Crea un paciente de prueba** (o usa uno existente)

4. **Haz clic en el icono de tacho** 🗑️

5. **Confirma la eliminación**

6. **Debería funcionar sin errores** ✅

---

## ✅ Checklist de Solución

- [x] ✅ `.env.local` configurado con `SUPABASE_SERVICE_ROLE_KEY`
- [x] ✅ Código actualizado para usar `supabaseAdmin`
- [ ] ⏳ **EJECUTAR**: `migration_fix_all_cascade_delete.sql` en Supabase
- [ ] ⏳ **VERIFICAR**: Eliminar un paciente de prueba funciona

---

## 🆘 Si Aún Tienes Errores

### Error: "constraint already exists"
```sql
-- Si ves este error, es porque el constraint ya existe
-- Ignóralo, significa que ya tienes CASCADE en esa tabla
```

### Error: "cannot drop constraint because other objects depend on it"
```sql
-- Necesitas usar CASCADE al eliminar:
ALTER TABLE users DROP CONSTRAINT users_user_id_fkey CASCADE;
-- Luego vuelve a crear el constraint
```

### Error: "relation consultas does not exist"
```sql
-- Si tu tabla se llama diferente, ajusta el nombre
-- Por ejemplo, si se llama "medical_consultations":
ALTER TABLE medical_consultations ...
```

---

## 📚 Más Información

Para entender mejor cómo funciona CASCADE y RLS, lee:
- `database/docs/POLITICAS_SEGURIDAD_Y_CASCADE.md` - Explicación completa
- `INSTRUCCIONES_ELIMINAR_PACIENTES.md` - Guía paso a paso

---

## 🎉 Resumen

1. ✅ Tu configuración está bien
2. ❌ Falta configurar CASCADE en la base de datos
3. 🔧 **SOLUCIÓN**: Ejecuta `migration_fix_all_cascade_delete.sql`
4. ✅ Después funcionará perfectamente

**NO es un problema de código, es un problema de configuración de base de datos que se soluciona con SQL.**
