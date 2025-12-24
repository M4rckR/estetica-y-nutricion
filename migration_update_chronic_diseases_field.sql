-- ================================================
-- MIGRACIÓN: Cambiar campo hypertension_diabetes_antecedents a TEXT
-- Fecha: Diciembre 2025
-- Descripción: Cambia el campo de enum a texto libre para permitir
--              detalles completos sobre enfermedades crónicas
-- ================================================

-- Paso 1: Eliminar el constraint CHECK existente
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_hypertension_diabetes_antecedents_check;

-- Paso 2: Cambiar el tipo de columna a TEXT
ALTER TABLE clinical_history 
ALTER COLUMN hypertension_diabetes_antecedents TYPE TEXT;

-- Paso 3: Actualizar el comentario de la columna
COMMENT ON COLUMN clinical_history.hypertension_diabetes_antecedents IS 
'Antecedentes de enfermedades crónicas: hipertensión, diabetes, cáncer, osteoporosis, enfermedad renal u otras. Texto libre para detalles.';

