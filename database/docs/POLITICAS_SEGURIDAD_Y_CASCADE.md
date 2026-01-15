# 🔒 Políticas de Seguridad y Eliminación en Cascada

## 📋 Resumen
Este documento explica las políticas de seguridad (RLS) y eliminación en cascada (ON DELETE CASCADE) implementadas en la base de datos.

---

## 1️⃣ ON DELETE CASCADE (Eliminación en Cascada)

### ¿Qué es?
Es una regla de **integridad referencial** que automáticamente elimina registros dependientes cuando se elimina el registro padre.

### ¿Cómo funciona?
```
Usuario (Padre)
    ↓ ON DELETE CASCADE
Historia Clínica (Hijo) → Se elimina automáticamente
    ↓ ON DELETE CASCADE  
Consultas (Nieto) → Se elimina automáticamente
```

### Implementación Actual

#### ✅ Tabla `clinical_history`
```sql
CREATE TABLE clinical_history (
  id UUID PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- ... otros campos
);
```
**Estado**: ✅ Correctamente configurado

#### ⚠️ Tabla `consultas`
**Debe tener**:
```sql
paciente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
```

**Verificar**: Esta tabla necesita tener `ON DELETE CASCADE` configurado.

---

## 2️⃣ RLS (Row Level Security) - Seguridad a Nivel de Fila

### ¿Qué es?
Sistema de PostgreSQL/Supabase que controla **qué usuarios pueden ver/modificar qué filas** de una tabla.

### Ventajas:
- ✅ Seguridad a nivel de base de datos (no solo en el código)
- ✅ Los pacientes NO pueden ver datos de otros pacientes
- ✅ Solo doctores pueden crear/editar historias clínicas
- ✅ Protección contra acceso no autorizado

---

## 3️⃣ Políticas RLS en `clinical_history`

### Política 1: Lectura para Doctores
```sql
CREATE POLICY "Doctores pueden leer todas las historias clínicas"
ON clinical_history
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);
```

**¿Qué hace?**
- Permite a los doctores autenticados **VER todas** las historias clínicas
- Verifica que el rol del usuario sea `'doctor'`

**Ejemplo de uso**:
```javascript
// Como doctor, puedo ver todas las historias
const { data } = await supabase
  .from('clinical_history')
  .select('*'); // ✅ Ver todas las historias
```

---

### Política 2: Lectura para Pacientes (Solo su historia)
```sql
CREATE POLICY "Pacientes pueden leer su historia clínica"
ON clinical_history
FOR SELECT
TO authenticated
USING (patient_id = auth.uid());
```

**¿Qué hace?**
- Permite a los pacientes **VER solo su propia** historia clínica
- Verifica que `patient_id` sea igual al ID del usuario autenticado

**Ejemplo de uso**:
```javascript
// Como paciente, solo veo MI historia
const { data } = await supabase
  .from('clinical_history')
  .select('*'); // ✅ Solo mi historia (filtrado automático)
```

---

### Política 3: Inserción solo para Doctores
```sql
CREATE POLICY "Doctores pueden insertar historias clínicas"
ON clinical_history
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);
```

**¿Qué hace?**
- Solo doctores pueden **CREAR** nuevas historias clínicas
- Los pacientes NO pueden crear historias

**Ejemplo de uso**:
```javascript
// Como doctor, puedo crear historias
const { data } = await supabase
  .from('clinical_history')
  .insert({ patient_id: '...', age: 25 }); // ✅ Permitido

// Como paciente, NO puedo crear
// ❌ Error: new row violates row-level security policy
```

---

### Política 4: Actualización solo para Doctores
```sql
CREATE POLICY "Doctores pueden actualizar historias clínicas"
ON clinical_history
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);
```

**¿Qué hace?**
- Solo doctores pueden **EDITAR** historias clínicas existentes
- Los pacientes NO pueden editar historias

---

## 4️⃣ Flujo Completo de Eliminación

### Cuando se elimina un paciente:

```
1. Doctor hace clic en "Eliminar paciente" 🗑️
   ↓
2. Modal de confirmación aparece ⚠️
   ↓
3. Usuario confirma "Sí, eliminar" ✅
   ↓
4. Se ejecuta: deletePatient(patientId)
   ↓
5. Verifica: ¿Es doctor? ✅
   ↓
6. Verifica: ¿El usuario es paciente? ✅
   ↓
7. Ejecuta: supabase.auth.admin.deleteUser(patientId)
   ↓
8. PostgreSQL ve el ON DELETE CASCADE
   ↓
9. Elimina automáticamente:
   - ✅ Usuario de auth.users
   - ✅ Registro en users (tabla custom)
   - ✅ Historia clínica en clinical_history
   - ✅ Consultas en consultas
   - ✅ Archivos PDF asociados
   ↓
10. Refresca la página ♻️
```

---

## 5️⃣ Tabla de Verificación

| Tabla | ON DELETE CASCADE | RLS Habilitado | Políticas Configuradas |
|-------|-------------------|----------------|------------------------|
| `clinical_history` | ✅ Sí | ✅ Sí | ✅ 4 políticas |
| `consultas` | ⚠️ **Verificar** | ⚠️ **Verificar** | ⚠️ **Crear políticas** |
| `users` | ✅ Sí (implícito) | ⚠️ **Verificar** | ⚠️ **Verificar** |

---

## 6️⃣ Políticas Recomendadas para `consultas`

### Crear políticas similares para la tabla `consultas`:

```sql
-- Habilitar RLS
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Política 1: Doctores pueden leer todas las consultas
CREATE POLICY "Doctores pueden leer todas las consultas"
ON consultas
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- Política 2: Pacientes pueden leer solo sus consultas
CREATE POLICY "Pacientes pueden leer sus consultas"
ON consultas
FOR SELECT
TO authenticated
USING (paciente_id = auth.uid());

-- Política 3: Doctores pueden insertar consultas
CREATE POLICY "Doctores pueden insertar consultas"
ON consultas
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- Política 4: Doctores pueden actualizar consultas
CREATE POLICY "Doctores pueden actualizar consultas"
ON consultas
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- Política 5: Doctores pueden eliminar consultas
CREATE POLICY "Doctores pueden eliminar consultas"
ON consultas
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);
```

---

## 7️⃣ Seguridad en la Eliminación

### Validaciones en el código (Server Action):
```typescript
// ✅ Verificar autenticación
const { data: { user } } = await supabase.auth.getUser();
if (!user) return { error: "No autenticado" };

// ✅ Verificar rol de doctor
const { data: userData } = await supabase
  .from("users")
  .select("rol")
  .eq("user_id", user.id)
  .single();
if (userData?.rol !== "doctor") {
  return { error: "No autorizado" };
}

// ✅ Verificar que es un paciente
const { data: patientData } = await supabase
  .from("users")
  .select("rol")
  .eq("user_id", patientId)
  .single();
if (patientData?.rol !== "paciente") {
  return { error: "Solo se pueden eliminar pacientes" };
}

// ✅ Eliminar con confirmación en UI
const { error } = await supabase.auth.admin.deleteUser(patientId);
```

---

## 8️⃣ Ventajas de este Sistema

### ✅ Seguridad Multi-Capa:
1. **UI**: Modal de confirmación
2. **Código**: Validación de roles en Server Action
3. **Base de Datos**: RLS impide acceso no autorizado
4. **Integridad**: CASCADE elimina datos relacionados

### ✅ Integridad de Datos:
- No quedan registros huérfanos
- Limpieza automática de datos relacionados
- Base de datos siempre consistente

### ✅ Experiencia de Usuario:
- Confirmación antes de eliminar
- Mensaje claro de lo que se eliminará
- Notificaciones de éxito/error

---

## 🚨 Advertencias Importantes

### ⚠️ ON DELETE CASCADE es IRREVERSIBLE
- Una vez eliminado, NO hay forma de recuperar los datos
- **Recomendación**: Implementar soft delete si es necesario

### ⚠️ RLS debe estar HABILITADO
- Si RLS no está habilitado, las políticas no funcionan
- Verifica: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`

### ⚠️ Backup Regular
- Siempre mantén backups de la base de datos
- Supabase tiene backups automáticos, pero verifica la configuración

---

## 📝 Checklist de Verificación

- [x] ✅ `clinical_history` tiene ON DELETE CASCADE
- [ ] ⚠️ `consultas` verificar/agregar ON DELETE CASCADE
- [x] ✅ `clinical_history` tiene RLS habilitado
- [ ] ⚠️ `consultas` verificar/habilitar RLS
- [x] ✅ `clinical_history` tiene políticas configuradas
- [ ] ⚠️ `consultas` crear políticas RLS
- [x] ✅ Modal de confirmación en UI
- [x] ✅ Validación de roles en código
- [x] ✅ Notificaciones de éxito/error

---

## 🔧 Próximos Pasos

1. **Verificar tabla `consultas`**:
   - Revisar si tiene `ON DELETE CASCADE`
   - Si no, crear migración para agregarlo

2. **Crear políticas RLS para `consultas`**:
   - Habilitar RLS
   - Crear las 5 políticas (SELECT, INSERT, UPDATE, DELETE)

3. **Probar eliminación**:
   - Crear un paciente de prueba
   - Crear historia clínica
   - Crear consultas
   - Eliminar paciente
   - Verificar que todo se eliminó correctamente

---

## 📚 Referencias

- [PostgreSQL Foreign Keys](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL ON DELETE CASCADE](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
