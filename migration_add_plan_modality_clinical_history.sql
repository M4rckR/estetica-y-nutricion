-- ================================================
-- MIGRACIÓN: Agregar campo plan_modality a clinical_history
-- Fecha: Enero 2025
-- Descripción: Agrega el campo "plan_modality" a la tabla clinical_history
--              para indicar si el plan es online o presencial
-- ================================================

-- Agregar la columna plan_modality
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS plan_modality VARCHAR(20) CHECK (plan_modality IS NULL OR plan_modality IN ('online', 'presencial'));

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.plan_modality IS 'Modalidad del plan nutricional: online o presencial (opcional)';

-- ================================================
-- NOTAS:
-- - Campo OPCIONAL (permite NULL)
-- - Tipo: VARCHAR(20) con CHECK constraint para validar valores
-- - Valores permitidos: 'online', 'presencial' o NULL
-- - Se usa en el Paso 4 del formulario de Historia Clínica
-- - Este campo va después de plan_type y antes de plan_type_details
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

