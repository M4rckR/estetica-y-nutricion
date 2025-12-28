-- ================================================
-- MIGRACIÓN: Agregar campos de objetivos y tipo de plan
-- Fecha: Diciembre 2024
-- Descripción: Agrega los campos para el Paso 4:
--              - nutritional_objectives (objetivos nutricionales)
--              - plan_type (tipo de plan)
--              - plan_type_details (detalle del tipo de plan)
-- ================================================

-- Paso 1: Agregar la columna nutritional_objectives
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS nutritional_objectives TEXT;

-- Paso 2: Agregar la columna plan_type
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS plan_type VARCHAR(20) CHECK (plan_type IS NULL OR plan_type IN ('estetica', 'clinico', 'deportivo', 'pediatrico', 'salud', 'otro'));

-- Paso 3: Agregar la columna plan_type_details
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS plan_type_details TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.nutritional_objectives IS 'Objetivos nutricionales del paciente (metas de corto, mediano y largo plazo)';
COMMENT ON COLUMN clinical_history.plan_type IS 'Tipo de plan que le corresponde al paciente';
COMMENT ON COLUMN clinical_history.plan_type_details IS 'Detalle adicional del tipo de plan (especialmente si selecciona "otro")';

-- ================================================
-- NOTAS:
-- - Todos los campos son OPCIONALES (permiten NULL)
-- - nutritional_objectives: TEXT para permitir descripción detallada de metas
-- - plan_type: VARCHAR con valores específicos
-- - plan_type_details: TEXT para detalles adicionales
-- - Se agregan en el Paso 4: "Objetivos, Tipo de Plan y Seguimiento"
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

