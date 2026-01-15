-- ================================================
-- MIGRACIÓN: Separar objetivos nutricionales en 3 campos
-- Fecha: Diciembre 2024
-- Descripción: Reemplaza el campo nutritional_objectives por 3 campos separados:
--              - short_term_objectives (objetivos de corto plazo)
--              - medium_term_objectives (objetivos de mediano plazo)
--              - long_term_objectives (objetivos de largo plazo)
-- ================================================

-- Paso 1: Eliminar la columna nutritional_objectives (si existe)
ALTER TABLE clinical_history 
DROP COLUMN IF EXISTS nutritional_objectives;

-- Paso 2: Agregar las 3 nuevas columnas
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS short_term_objectives TEXT;

ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS medium_term_objectives TEXT;

ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS long_term_objectives TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.short_term_objectives IS 'Objetivos nutricionales de corto plazo (1-3 meses)';
COMMENT ON COLUMN clinical_history.medium_term_objectives IS 'Objetivos nutricionales de mediano plazo (3-6 meses)';
COMMENT ON COLUMN clinical_history.long_term_objectives IS 'Objetivos nutricionales de largo plazo (6-12 meses)';

-- ================================================
-- NOTAS:
-- - Todos los campos son OPCIONALES (permiten NULL)
-- - Tipo: TEXT para permitir descripción detallada de metas
-- - Facilita la recuperación y visualización estructurada de objetivos
-- - Se agregan en el Paso 4: "Objetivos, Tipo de Plan y Seguimiento"
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

