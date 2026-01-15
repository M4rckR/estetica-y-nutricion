-- ================================================
-- MIGRACIÓN: Agregar opción 'madre' al campo who_prepares_meals
-- Fecha: 2026-01-15
-- Descripción: Actualiza el constraint CHECK del campo who_prepares_meals
--              para incluir la opción 'madre' (Mi madre)
-- ================================================

-- Primero, eliminar el constraint existente
ALTER TABLE clinical_history 
DROP CONSTRAINT IF EXISTS clinical_history_who_prepares_meals_check;

-- Crear el nuevo constraint con la opción 'madre' incluida
ALTER TABLE clinical_history 
ADD CONSTRAINT clinical_history_who_prepares_meals_check 
CHECK (who_prepares_meals IS NULL OR who_prepares_meals IN ('tu-mismo', 'pareja-esposo', 'madre', 'hijo', 'empleada', 'otra'));

-- ================================================
-- COMENTARIO
-- ================================================
COMMENT ON COLUMN clinical_history.who_prepares_meals IS '¿Quién prepara las comidas? Opciones: tu-mismo, pareja-esposo, madre, hijo, empleada, otra';
