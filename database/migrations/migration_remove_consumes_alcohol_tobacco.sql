-- ================================================
-- MIGRACIÓN: Eliminar campo duplicado consumes_alcohol_tobacco
-- Fecha: 2026-01-15
-- Descripción: Elimina el campo consumes_alcohol_tobacco de la tabla clinical_history
--              porque es redundante con los campos alcohol_consumption, is_smoker y smoking_details
--              que se capturan con más detalle en el paso 3 del formulario
-- ================================================

-- Eliminar la columna consumes_alcohol_tobacco
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS consumes_alcohol_tobacco;

-- ================================================
-- COMENTARIO
-- ================================================
COMMENT ON TABLE clinical_history IS 'Almacena la historia clínica completa de cada paciente. Campo consumes_alcohol_tobacco eliminado (2026-01-15) por ser redundante con alcohol_consumption e is_smoker';
