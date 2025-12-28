-- ================================================
-- MIGRACIÓN: Actualizar valores de who_prepares_meals
-- Fecha: Diciembre 2024
-- Descripción: Actualiza los valores del campo who_prepares_meals
--              para usar opciones más específicas y descriptivas
-- ================================================

-- Paso 1: Eliminar el CHECK constraint existente
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_who_prepares_meals_check;

-- Paso 2: Actualizar TODOS los valores existentes al nuevo formato
-- IMPORTANTE: Actualiza todos los registros, no solo algunos
UPDATE clinical_history 
SET who_prepares_meals = CASE 
  WHEN who_prepares_meals = 'yo' THEN 'tu-mismo'
  WHEN who_prepares_meals = 'familiar' THEN 'otra'
  WHEN who_prepares_meals = 'otro' THEN 'otra'
  WHEN who_prepares_meals = 'empleada' THEN 'empleada'
  ELSE 'otra'  -- Por defecto, cualquier otro valor se convierte en 'otra'
END
WHERE who_prepares_meals IS NOT NULL;

-- Paso 3: Crear un nuevo CHECK constraint con los valores actualizados
-- IMPORTANTE: Permite NULL para que el campo sea opcional
ALTER TABLE clinical_history
ADD CONSTRAINT clinical_history_who_prepares_meals_check 
CHECK (who_prepares_meals IS NULL OR who_prepares_meals IN ('tu-mismo', 'pareja-esposo', 'hijo', 'empleada', 'otra'));

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.who_prepares_meals IS 'Quién prepara las comidas del paciente';

-- ================================================
-- NOTAS:
-- - Esta migración actualiza TODOS los valores antiguos al nuevo formato
-- - Primero elimina el CHECK constraint antiguo
-- - Luego actualiza TODOS los valores existentes (no solo algunos)
-- - Finalmente crea un nuevo CHECK constraint con los valores permitidos
-- - Mapeo de valores:
--   * 'yo' -> 'tu-mismo' (Tú mismo)
--   * 'familiar' -> 'otra' (Otra - por defecto)
--   * 'otro' -> 'otra' (Otra)
--   * 'empleada' -> 'empleada' (se mantiene)
--   * Cualquier otro valor -> 'otra' (por defecto)
--   * 'hijo' y 'pareja-esposo' son nuevos valores disponibles
-- - El campo permite NULL para ser opcional
-- - IMPORTANTE: Ejecutar esta migración ANTES de usar el formulario actualizado
-- ================================================

