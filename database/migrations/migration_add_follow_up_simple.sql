-- ================================================
-- MIGRACIÓN: Agregar campo de seguimiento simple
-- Fecha: Diciembre 2024
-- Descripción: Agrega campo de texto para seguimiento del paciente
--              a partir de la segunda cita (Paso 4)
-- ================================================

-- Agregar la columna follow_up_tracking (Seguimiento y reevaluación)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS follow_up_tracking TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.follow_up_tracking IS 'Seguimiento y reevaluación del paciente - Fecha de control, observaciones/evolución y profesional';

-- ================================================
-- NOTAS:
-- - Campo OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir texto largo
-- - El profesional puede registrar: fecha, observaciones y nombre del profesional
-- - Se agrega en el Paso 4: "Objetivos, Tipo de Plan y Seguimiento"
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

