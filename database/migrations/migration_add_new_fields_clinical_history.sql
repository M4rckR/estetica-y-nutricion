-- ================================================
-- MIGRACIÓN: Agregar nuevos campos a clinical_history
-- Fecha: 2024
-- Descripción: Agrega los campos birth_date, sex, ocupation, consult_reason, 
--              recent_exams, recent_exams_details, registro_24h_completo, 
--              abdominal_pain, sleep_quality, y aliments_hate
-- ================================================

-- Agregar campo birth_date (Fecha de Nacimiento)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS birth_date DATE;

-- Agregar campo sex (Sexo)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS sex VARCHAR(20);

-- Agregar campo ocupation (Ocupación)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS ocupation TEXT;

-- Agregar campo consult_reason (Motivo de consulta)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS consult_reason TEXT;

-- Agregar campo recent_exams (¿Tiene exámenes recientes?)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS recent_exams VARCHAR(5) CHECK (recent_exams IN ('si', 'no'));

-- Agregar campo recent_exams_details (Detalles de exámenes recientes)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS recent_exams_details TEXT;

-- Agregar campo registro_24h_completo (Recordatorio de 24 horas)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS registro_24h_completo TEXT;

-- Agregar campo abdominal_pain (Síntomas digestivos)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS abdominal_pain TEXT;

-- Agregar campo sleep_quality (Calidad de sueño)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS sleep_quality TEXT;

-- Agregar campo aliments_hate (Alimentos que no consume)
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS aliments_hate TEXT;

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON COLUMN clinical_history.birth_date IS 'Fecha de nacimiento del paciente';
COMMENT ON COLUMN clinical_history.sex IS 'Sexo del paciente (masculino/femenino)';
COMMENT ON COLUMN clinical_history.ocupation IS 'Ocupación del paciente';
COMMENT ON COLUMN clinical_history.consult_reason IS 'Motivo de consulta del paciente';
COMMENT ON COLUMN clinical_history.recent_exams IS 'Indica si tiene exámenes recientes (si/no)';
COMMENT ON COLUMN clinical_history.recent_exams_details IS 'Detalles de los exámenes recientes';
COMMENT ON COLUMN clinical_history.registro_24h_completo IS 'Recordatorio de 24 horas detallado del consumo y actividad';
COMMENT ON COLUMN clinical_history.abdominal_pain IS 'Síntomas digestivos (nunca/ocasional/frecuente)';
COMMENT ON COLUMN clinical_history.sleep_quality IS 'Calidad de sueño y factores que lo afectan';
COMMENT ON COLUMN clinical_history.aliments_hate IS 'Alimentos que no consume o no le agradan';

