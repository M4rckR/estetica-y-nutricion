-- ================================================
-- MIGRACIÓN: Verificar y configurar CASCADE y RLS en tabla consultas
-- Fecha: 2026-01-15
-- Descripción: Asegura que la tabla consultas tenga:
--              1. ON DELETE CASCADE en la foreign key
--              2. RLS habilitado
--              3. Políticas de seguridad configuradas
-- ================================================

-- PASO 1: Verificar estructura actual de la tabla consultas
-- (Ejecuta esto primero para ver el estado actual)
-- SELECT 
--   tc.constraint_name, 
--   tc.table_name, 
--   kcu.column_name,
--   ccu.table_name AS foreign_table_name,
--   ccu.column_name AS foreign_column_name,
--   rc.update_rule,
--   rc.delete_rule
-- FROM information_schema.table_constraints AS tc
-- JOIN information_schema.key_column_usage AS kcu
--   ON tc.constraint_name = kcu.constraint_name
-- JOIN information_schema.constraint_column_usage AS ccu
--   ON ccu.constraint_name = tc.constraint_name
-- JOIN information_schema.referential_constraints AS rc
--   ON tc.constraint_name = rc.constraint_name
-- WHERE tc.table_name = 'consultas' 
--   AND tc.constraint_type = 'FOREIGN KEY';

-- ================================================
-- PASO 2: Si la foreign key NO tiene CASCADE, ejecutar esto:
-- ================================================

-- Primero, obtener el nombre del constraint actual (puede variar)
-- Suponiendo que se llama algo como "consultas_paciente_id_fkey"
-- Ajusta el nombre según lo que te devuelva la query anterior

-- Eliminar la foreign key actual (SIN CASCADE)
-- ALTER TABLE consultas 
-- DROP CONSTRAINT IF EXISTS consultas_paciente_id_fkey;

-- Crear la foreign key CON CASCADE
-- ALTER TABLE consultas
-- ADD CONSTRAINT consultas_paciente_id_fkey 
-- FOREIGN KEY (paciente_id) 
-- REFERENCES auth.users(id) 
-- ON DELETE CASCADE;

-- ================================================
-- PASO 3: Habilitar RLS en la tabla consultas
-- ================================================
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;

-- ================================================
-- PASO 4: Eliminar políticas existentes (si las hay)
-- ================================================
DROP POLICY IF EXISTS "Doctores pueden leer todas las consultas" ON consultas;
DROP POLICY IF EXISTS "Pacientes pueden leer sus consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden insertar consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden actualizar consultas" ON consultas;
DROP POLICY IF EXISTS "Doctores pueden eliminar consultas" ON consultas;

-- ================================================
-- PASO 5: Crear políticas RLS para consultas
-- ================================================

-- Política 1: Los doctores pueden leer todas las consultas
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

-- Política 2: Los pacientes pueden leer solo sus propias consultas
CREATE POLICY "Pacientes pueden leer sus consultas"
ON consultas
FOR SELECT
TO authenticated
USING (paciente_id = auth.uid());

-- Política 3: Los doctores pueden insertar consultas
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

-- Política 4: Los doctores pueden actualizar consultas
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

-- Política 5: Los doctores pueden eliminar consultas
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

-- ================================================
-- COMENTARIOS
-- ================================================
COMMENT ON TABLE consultas IS 'Consultas médicas de los pacientes - Configurado con RLS y CASCADE';

-- ================================================
-- INSTRUCCIONES DE USO
-- ================================================
-- 1. Primero ejecuta la query de verificación (líneas 8-23) para ver el estado actual
-- 2. Si delete_rule NO es 'CASCADE', descomenta y ejecuta las líneas 32-40
-- 3. Ejecuta el resto del script para configurar RLS y políticas
-- 4. Verifica que todo funcione correctamente
-- ================================================
