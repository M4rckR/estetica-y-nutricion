-- ================================================
-- MIGRACIÓN: Actualizar valores de eating_out_frequency
-- Fecha: Diciembre 2024
-- Descripción: Actualiza los valores del campo eating_out_frequency
--              para usar el nuevo formato de veces por semana
-- ================================================

-- Paso 1: Eliminar el CHECK constraint existente
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_eating_out_frequency_check;

-- Paso 2: Actualizar valores existentes al nuevo formato
UPDATE clinical_history 
SET eating_out_frequency = CASE 
  WHEN eating_out_frequency = 'ocasional' THEN '1-2-veces'
  WHEN eating_out_frequency = 'semanal' THEN '3-4-veces'
  WHEN eating_out_frequency = 'diario' THEN '5-mas-veces'
  ELSE eating_out_frequency
END
WHERE eating_out_frequency IN ('ocasional', 'semanal', 'diario');

-- Paso 3: Crear un nuevo CHECK constraint con los valores actualizados (opcional)
-- IMPORTANTE: Permite NULL para que el campo sea opcional
ALTER TABLE clinical_history
ADD CONSTRAINT clinical_history_eating_out_frequency_check 
CHECK (eating_out_frequency IS NULL OR eating_out_frequency IN ('nunca', '1-2-veces', '3-4-veces', '5-mas-veces'));

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.eating_out_frequency IS 'Frecuencia con la que come fuera de casa (veces por semana)';

-- ================================================
-- NOTAS:
-- - Esta migración actualiza los valores antiguos al nuevo formato
-- - Primero elimina el CHECK constraint antiguo
-- - Luego actualiza los valores existentes
-- - Finalmente crea un nuevo CHECK constraint con los valores permitidos
-- - Mapeo de valores:
--   * 'ocasional' -> '1-2-veces' (1 a 2 veces por semana)
--   * 'semanal' -> '3-4-veces' (3 a 4 veces por semana)
--   * 'diario' -> '5-mas-veces' (5 o más veces por semana)
--   * 'nunca' se mantiene igual
-- ================================================

