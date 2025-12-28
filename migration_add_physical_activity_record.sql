-- ================================================
-- MIGRACIÓN: Agregar campo physical_activity_record
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "Recuento de actividad física del día anterior"
--              a la tabla clinical_history
-- ================================================

-- Paso 1: Agregar la columna physical_activity_record
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS physical_activity_record TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.physical_activity_record IS 'Detalle de actividad física un día anterior desde que se levanta hasta que se acuesta';

-- ================================================
-- NOTAS:
-- - Este campo es OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir descripciones detalladas
-- - Similar al campo de calidad de sueño
-- - Se agrega en la sección de Alimentación (Paso 3)
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

