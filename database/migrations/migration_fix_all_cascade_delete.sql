-- ================================================
-- MIGRACIÓN COMPLETA: Configurar CASCADE en TODAS las tablas
-- Fecha: 2026-01-15
-- Descripción: Asegura que TODAS las tablas relacionadas con auth.users
--              tengan ON DELETE CASCADE para permitir eliminación correcta
-- ================================================

-- ================================================
-- PASO 1: Tabla USERS
-- ================================================

-- Eliminar constraint existente si existe
ALTER TABLE users 
DROP CONSTRAINT IF EXISTS users_user_id_fkey;

-- Crear constraint con CASCADE
ALTER TABLE users
ADD CONSTRAINT users_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

COMMENT ON TABLE users IS 'Tabla de usuarios - Configurada con ON DELETE CASCADE';

-- ================================================
-- PASO 2: Tabla CLINICAL_HISTORY (ya debería tenerlo)
-- ================================================

-- Eliminar constraint existente si existe
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_patient_id_fkey;

-- Crear constraint con CASCADE
ALTER TABLE clinical_history
ADD CONSTRAINT clinical_history_patient_id_fkey 
FOREIGN KEY (patient_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

COMMENT ON TABLE clinical_history IS 'Historias clínicas - Configurada con ON DELETE CASCADE';

-- ================================================
-- PASO 3: Tabla CONSULTAS
-- ================================================

-- Eliminar constraint existente si existe
ALTER TABLE consultas 
DROP CONSTRAINT IF EXISTS consultas_paciente_id_fkey;

-- Crear constraint con CASCADE
ALTER TABLE consultas
ADD CONSTRAINT consultas_paciente_id_fkey 
FOREIGN KEY (paciente_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Habilitar RLS en consultas
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes (si las hay)
DROP POLICY IF EXISTS "Doctores pueden leer todas las consultas" ON consultas;
DROP POLICY IF EXISTS "Pacientes pueden leer sus consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden insertar consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden actualizar consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden eliminar consultas" ON consultas;

-- Crear políticas RLS para consultas
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

CREATE POLICY "Pacientes pueden leer sus consultas"
ON consultas
FOR SELECT
TO authenticated
USING (paciente_id = auth.uid());

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

COMMENT ON TABLE consultas IS 'Consultas médicas - Configurada con ON DELETE CASCADE y RLS';

-- ================================================
-- VERIFICACIÓN FINAL
-- ================================================

-- Ejecuta esto después de la migración para verificar que todo está correcto:
-- 
-- SELECT 
--   tc.table_name,
--   kcu.column_name,
--   ccu.table_name AS foreign_table,
--   rc.delete_rule
-- FROM information_schema.table_constraints AS tc
-- JOIN information_schema.key_column_usage AS kcu
--   ON tc.constraint_name = kcu.constraint_name
-- JOIN information_schema.constraint_column_usage AS ccu
--   ON ccu.constraint_name = tc.constraint_name
-- JOIN information_schema.referential_constraints AS rc
--   ON tc.constraint_name = rc.constraint_name
-- WHERE ccu.table_name = 'users' 
--   AND ccu.column_name = 'id'
--   AND tc.constraint_type = 'FOREIGN KEY'
-- ORDER BY tc.table_name;
--
-- TODAS las filas deberían mostrar delete_rule = 'CASCADE'

-- ================================================
-- COMENTARIOS FINALES
-- ================================================

COMMENT ON SCHEMA public IS 'Schema público - Todas las foreign keys a auth.users configuradas con CASCADE';

-- ================================================
-- ¡LISTO!
-- Ahora puedes eliminar pacientes sin problemas
-- ================================================
