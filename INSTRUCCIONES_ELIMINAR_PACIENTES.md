# 🗑️ Instrucciones: Eliminar Pacientes

## ✅ Problemas Solucionados

### 1. Error de HTML (Hidratación)
**Problema**: `<ul>` no puede estar dentro de `<p>` en HTML  
**Solución**: ✅ Cambiado a usar `<div>` con `asChild` en `DialogDescription`

### 2. Error "user not allowed"
**Problema**: No tienes permisos para usar `supabase.auth.admin.deleteUser()`  
**Solución**: ✅ Ahora usa `supabaseAdmin` con el **Service Role Key**

---

## 🔑 IMPORTANTE: Configurar Service Role Key

Para que la eliminación funcione, necesitas tener configurada la **Service Role Key** en tu archivo `.env.local`:

### Paso 1: Obtener tu Service Role Key

1. Ve a tu proyecto en **Supabase Dashboard**: https://supabase.com
2. Ve a **Settings** (Configuración) → **API**
3. Busca la sección **Project API keys**
4. Copia el valor de **`service_role` secret**

⚠️ **ADVERTENCIA**: Esta es una clave secreta MUY PODEROSA. NUNCA la compartas ni la subas a Git.

---

### Paso 2: Agregar al archivo .env.local

Abre tu archivo `.env.local` (en la raíz del proyecto) y agrega:

```env
# ... tus otras variables de entorno ...

# Supabase Service Role Key (SOLO PARA EL SERVIDOR)
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

**Ejemplo**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Paso 3: Reiniciar el servidor de desarrollo

Después de agregar la variable de entorno:

```bash
# Detén el servidor (Ctrl+C)
# Vuelve a iniciarlo
npm run dev
```

---

## 📋 Sobre la Migración SQL

### ¿Necesito ejecutar el SQL?

**Sí, es ALTAMENTE recomendado** ejecutar la migración `migration_verify_cascade_and_rls_consultas.sql` para:

1. ✅ Asegurar que la tabla `consultas` tiene **ON DELETE CASCADE**
2. ✅ Habilitar **RLS** (Row Level Security)
3. ✅ Crear **políticas de seguridad** para proteger los datos

Sin esto:
- ❌ Podrías tener problemas al eliminar pacientes
- ❌ Los datos de consultas no estarían protegidos
- ❌ Pacientes podrían ver consultas de otros pacientes

---

## 🚀 Pasos para ejecutar la migración:

### 1. Verificar estado actual (OPCIONAL)

Primero, verifica si necesitas agregar CASCADE:

```sql
-- Ejecuta esto en Supabase SQL Editor
SELECT 
  tc.constraint_name, 
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name,
  rc.update_rule,
  rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON tc.constraint_name = rc.constraint_name
WHERE tc.table_name = 'consultas' 
  AND tc.constraint_type = 'FOREIGN KEY';
```

**Si `delete_rule` NO dice "CASCADE"**, necesitas ejecutar el paso 2.

---

### 2. Ejecutar la migración completa

1. Abre **Supabase Dashboard**
2. Ve a **SQL Editor**
3. Abre el archivo: `database/migrations/migration_verify_cascade_and_rls_consultas.sql`
4. **LEE LOS COMENTARIOS** del archivo (tiene instrucciones)
5. Si necesitas CASCADE:
   - Descomenta las líneas 32-40
   - Ajusta el nombre del constraint si es necesario
6. Ejecuta el script completo
7. Verifica que no haya errores

---

## ✅ Verificación Final

### Después de configurar todo, verifica:

#### 1. Variable de entorno configurada
```bash
# En la terminal, dentro del proyecto:
echo $SUPABASE_SERVICE_ROLE_KEY
# Debería mostrar tu service role key
```

#### 2. Servidor reiniciado
```bash
npm run dev
```

#### 3. Probar eliminación

1. Ve a `/admin/pacientes`
2. Haz clic en el icono de **tacho rojo** 🗑️
3. Confirma la eliminación en el modal
4. Debería eliminar correctamente sin errores

---

## 🔒 Seguridad

### ¿Es seguro usar Service Role Key?

**SÍ**, siempre que:
- ✅ Solo se use en el **servidor** (Server Actions)
- ✅ NO se exponga en el cliente
- ✅ Esté en `.env.local` (ignorado por Git)
- ✅ Se valide el rol de doctor antes de usarla

### ¿Qué hace el código?

```typescript
// 1. Verifica que el usuario esté autenticado
const { data: { user } } = await supabase.auth.getUser();

// 2. Verifica que sea doctor
if (userData?.rol !== "doctor") {
  return { error: "No autorizado" };
}

// 3. Verifica que el usuario a eliminar sea paciente
if (patientData.rol !== "paciente") {
  return { error: "Solo se pueden eliminar pacientes" };
}

// 4. Solo ENTONCES usa el admin client
const { error } = await supabaseAdmin.auth.admin.deleteUser(patientId);
```

**Resultado**: Solo doctores pueden eliminar, y solo pacientes pueden ser eliminados.

---

## 📊 Flujo de Eliminación Completo

```
1. Doctor hace clic en 🗑️
   ↓
2. Modal de confirmación aparece
   ↓
3. Usuario confirma "Sí, eliminar"
   ↓
4. Server Action valida:
   - ¿Autenticado? ✅
   - ¿Es doctor? ✅
   - ¿El target es paciente? ✅
   ↓
5. Usa supabaseAdmin (service role)
   ↓
6. Ejecuta: deleteUser(patientId)
   ↓
7. PostgreSQL CASCADE elimina:
   - ✅ Usuario de auth.users
   - ✅ Registro en users
   - ✅ Historia clínica
   - ✅ Consultas
   ↓
8. Refresca la página ♻️
   ↓
9. ✅ Paciente eliminado
```

---

## 🆘 Solución de Problemas

### Error: "user not allowed"
- ❌ No tienes `SUPABASE_SERVICE_ROLE_KEY` configurada
- ✅ Agrégala al `.env.local` y reinicia el servidor

### Error: "No autorizado"
- ❌ Tu usuario no es doctor
- ✅ Verifica el rol en la tabla `users`

### Error: "Solo se pueden eliminar pacientes"
- ❌ Intentaste eliminar un doctor u otro rol
- ✅ Solo pacientes pueden ser eliminados

### Error de hidratación HTML
- ❌ Ya está solucionado en el código
- ✅ Reinicia el servidor si persiste

### El paciente se elimina pero quedan datos huérfanos
- ❌ No tienes CASCADE configurado
- ✅ Ejecuta la migración SQL

---

## ✨ Resumen

1. ✅ Arreglado error de HTML en modal
2. ✅ Cambiado a usar `supabaseAdmin`
3. ⏳ **TÚ DEBES**: Agregar `SUPABASE_SERVICE_ROLE_KEY` al `.env.local`
4. ⏳ **TÚ DEBES**: Reiniciar el servidor
5. ⏳ **RECOMENDADO**: Ejecutar migración SQL para CASCADE y RLS

---

## 🎉 ¡Listo!

Una vez completados los pasos 3, 4 y 5, la eliminación de pacientes funcionará correctamente con todas las garantías de seguridad e integridad de datos.
