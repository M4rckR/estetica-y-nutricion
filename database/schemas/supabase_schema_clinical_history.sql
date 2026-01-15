-- ================================================
-- TABLA: clinical_history
-- Descripción: Almacena la historia clínica completa de cada paciente
-- ================================================

CREATE TABLE IF NOT EXISTS clinical_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Datos básicos (primera cita)
  phone VARCHAR(20),
  age INTEGER CHECK (age >= 0 AND age <= 120),
  birth_date DATE,
  first_appointment_date DATE,
  sex VARCHAR(20),
  ocupation TEXT,
  
  -- Historia Clínica
  consult_reason TEXT,
  recent_exams VARCHAR(5) CHECK (recent_exams IN ('si', 'no')),
  recent_exams_details TEXT,
  practices_sports VARCHAR(20) CHECK (practices_sports IN ('si', 'no', 'ocasionalmente')),
  pathological_antecedents TEXT,
  last_menstruation DATE,
  uses_contraceptives VARCHAR(5) CHECK (uses_contraceptives IN ('si', 'no')),
  current_medication TEXT,
  hypertension_diabetes_antecedents TEXT,
  registro_24h_completo TEXT,
  abdominal_pain TEXT,
  sleep_quality TEXT,
  
  -- Cirugías y Alergias
  has_been_operated VARCHAR(5) CHECK (has_been_operated IN ('si', 'no')),
  surgery_details TEXT,
  allergies TEXT,
  
  -- Alimentación
  who_prepares_meals VARCHAR(30) CHECK (who_prepares_meals IS NULL OR who_prepares_meals IN ('tu-mismo', 'pareja-esposo', 'madre', 'hijo', 'empleada', 'otra')),
  eating_out_frequency VARCHAR(20) CHECK (eating_out_frequency IS NULL OR eating_out_frequency IN ('nunca', '1-2-veces', '3-4-veces', '5-mas-veces')),
  favorite_foods TEXT,
  aliments_hate TEXT,
  daily_liquid_intake VARCHAR(20) CHECK (daily_liquid_intake IN ('menos_1L', '1-2L', '2-3L', 'mas_3L')),
  supplements TEXT,
  
  -- Metadatos
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraint: Un paciente solo puede tener una historia clínica
  UNIQUE(patient_id)
);

-- ================================================
-- ÍNDICES para mejorar el rendimiento
-- ================================================
CREATE INDEX idx_clinical_history_patient_id ON clinical_history(patient_id);
CREATE INDEX idx_clinical_history_completed ON clinical_history(completed);

-- ================================================
-- RLS (Row Level Security) Políticas
-- ================================================
ALTER TABLE clinical_history ENABLE ROW LEVEL SECURITY;

-- Política: Los doctores pueden leer todas las historias clínicas
CREATE POLICY "Doctores pueden leer todas las historias clínicas"
ON clinical_history
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- Política: Los pacientes pueden leer su propia historia clínica
CREATE POLICY "Pacientes pueden leer su historia clínica"
ON clinical_history
FOR SELECT
TO authenticated
USING (patient_id = auth.uid());

-- Política: Los doctores pueden insertar historias clínicas
CREATE POLICY "Doctores pueden insertar historias clínicas"
ON clinical_history
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- Política: Los doctores pueden actualizar historias clínicas
CREATE POLICY "Doctores pueden actualizar historias clínicas"
ON clinical_history
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.user_id = auth.uid()
    AND users.rol = 'doctor'
  )
);

-- ================================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ================================================
CREATE OR REPLACE FUNCTION update_clinical_history_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER clinical_history_updated_at
BEFORE UPDATE ON clinical_history
FOR EACH ROW
EXECUTE FUNCTION update_clinical_history_updated_at();

-- ================================================
-- COMENTARIOS para documentación
-- ================================================
COMMENT ON TABLE clinical_history IS 'Almacena la historia clínica completa de cada paciente';
COMMENT ON COLUMN clinical_history.patient_id IS 'ID del paciente (referencia a auth.users)';
COMMENT ON COLUMN clinical_history.completed IS 'Indica si el formulario ha sido completado';
COMMENT ON COLUMN clinical_history.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN clinical_history.updated_at IS 'Fecha de última actualización';

