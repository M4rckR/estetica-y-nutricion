-- ================================================
-- MIGRACIÓN: Agregar campo food_allergies_intolerances
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "Alergias e intolerancias alimentarias"
--              a la tabla clinical_history
-- ================================================

-- Paso 1: Agregar la columna food_allergies_intolerances
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS food_allergies_intolerances TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.food_allergies_intolerances IS 'Indicar si es alérgico e intolerante a algún alimento (detalle)';

-- ================================================
-- NOTAS:
-- - Este campo es OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir descripciones detalladas
-- - Incluye tanto alergias como intolerancias alimentarias
-- - Se agrega en la sección de Alimentación (Paso 3)
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

