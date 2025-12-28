-- ================================================
-- MIGRACIÓN: Agregar campo special_habits
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "Hábitos especiales"
--              a la tabla clinical_history
-- ================================================

-- Paso 1: Agregar la columna special_habits
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS special_habits TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.special_habits IS 'Hábitos especiales: consumo de alcohol, cafeína, fumador, horarios de comida irregulares, otros hábitos relevantes';

-- ================================================
-- NOTAS:
-- - Este campo es OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir descripciones detalladas
-- - Incluye: consumo de alcohol, cafeína, fumador, horarios irregulares, otros
-- - Se agrega en la sección de Alimentación (Paso 3)
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

