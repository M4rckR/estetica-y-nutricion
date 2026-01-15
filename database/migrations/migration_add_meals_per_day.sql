-- ================================================
-- MIGRACIÓN: Agregar campo meals_per_day
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "Cuántas comidas normalmente realiza al día"
--              a la tabla clinical_history
-- ================================================

-- Paso 1: Agregar la columna meals_per_day
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS meals_per_day VARCHAR(10) 
CHECK (meals_per_day IS NULL OR meals_per_day IN ('2', '3', '4', '5'));

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.meals_per_day IS 'Cantidad de comidas que realiza al día (2, 3, 4 o 5)';

-- ================================================
-- NOTAS:
-- - Este campo es OPCIONAL (permite NULL)
-- - Valores permitidos: '2', '3', '4', '5'
-- - Se almacena como VARCHAR para mantener consistencia con otros campos similares
-- - El campo se agrega en la sección de Alimentación (Paso 3)
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

