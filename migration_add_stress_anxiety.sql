-- ================================================
-- MIGRACIÓN: Agregar campo stress_anxiety
-- Fecha: Diciembre 2024
-- Descripción: Agrega el campo "Sufres de estrés y ansiedad"
--              a la tabla clinical_history
-- ================================================

-- Paso 1: Agregar la columna stress_anxiety
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS stress_anxiety TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.stress_anxiety IS 'Sufres de estrés y ansiedad. Si es sí, qué factores lo alteran (texto libre)';

-- ================================================
-- NOTAS:
-- - Este campo es OPCIONAL (permite NULL)
-- - Tipo: TEXT para permitir respuestas largas
-- - El paciente puede escribir "No" o describir sus factores de estrés
-- - Se agrega en la sección de Historia Clínica (Paso 1)
-- - IMPORTANTE: Ejecutar esta migración en Supabase SQL Editor
-- ================================================

