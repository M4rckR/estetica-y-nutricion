-- ================================================
-- MIGRACIÓN: Agregar campo de seguimiento a consultas
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "seguimiento" a la tabla consultas
--              para registrar el seguimiento a partir de la 2da cita
-- ================================================

-- Agregar la columna seguimiento
ALTER TABLE consultas 
ADD COLUMN IF NOT EXISTS seguimiento TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN consultas.seguimiento IS 'Seguimiento del paciente a partir de la 2da cita - Fecha de control, observaciones/evolución y profesional';

-- ================================================
-- NOTAS:
-- - Campo OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir texto largo
-- - Se usa en el formulario de "Subir Consulta"
-- - Permite registrar múltiples seguimientos en formato libre
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

