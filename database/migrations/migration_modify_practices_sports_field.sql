-- ================================================
-- MIGRACIÓN: Modificar campo practices_sports
-- Fecha: Diciembre 2024
-- Descripción: Elimina el CHECK constraint y cambia el tipo de 
--              practices_sports de enum a TEXT para permitir texto libre
-- ================================================

-- Paso 1: Eliminar el CHECK constraint existente
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_practices_sports_check;

-- Paso 2: Modificar el tipo de columna a TEXT
ALTER TABLE clinical_history 
ALTER COLUMN practices_sports TYPE TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.practices_sports IS 'Descripción de deportes que practica y frecuencia (texto libre)';

-- ================================================
-- NOTAS:
-- - Esta migración convierte el campo de enum a texto libre
-- - Los valores existentes ('si', 'no', 'ocasionalmente') se mantendrán
-- - Ahora el usuario puede escribir descripciones detalladas
-- ================================================

