-- ================================================
-- MIGRACIÓN: Agregar campo tipo_plan a consultas
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "tipo_plan" a la tabla consultas
--              para indicar si el plan es ONLINE o PRESENCIAL
-- ================================================

-- Primero, eliminar el constraint si existe (por si hubo intentos previos)
ALTER TABLE consultas 
DROP CONSTRAINT IF EXISTS consultas_tipo_plan_check;

-- Eliminar la columna si existe (para empezar limpio)
ALTER TABLE consultas 
DROP COLUMN IF EXISTS tipo_plan;

-- Agregar la columna tipo_plan sin el constraint inline
ALTER TABLE consultas 
ADD COLUMN tipo_plan VARCHAR(20);

-- Agregar el constraint con un nombre específico
ALTER TABLE consultas 
ADD CONSTRAINT consultas_tipo_plan_check 
CHECK (tipo_plan IS NULL OR tipo_plan IN ('online', 'presencial'));

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN consultas.tipo_plan IS 'Tipo de plan: online o presencial (opcional)';

-- ================================================
-- NOTAS:
-- - Campo OPCIONAL (permite NULL)
-- - Tipo: VARCHAR(20) con CHECK constraint para validar valores
-- - Valores permitidos: 'online', 'presencial' o NULL
-- - Se usa en el formulario de "Subir Consulta"
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

