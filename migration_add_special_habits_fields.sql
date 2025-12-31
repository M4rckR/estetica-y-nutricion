-- Migración: Agregar campos separados para Hábitos Especiales
-- Fecha: 2024
-- Descripción: Divide el campo special_habits en campos más estructurados

-- Agregar nuevas columnas para hábitos especiales
ALTER TABLE clinical_history 
ADD COLUMN IF NOT EXISTS alcohol_consumption TEXT NULL,
ADD COLUMN IF NOT EXISTS caffeine_stimulants_consumption TEXT NULL,
ADD COLUMN IF NOT EXISTS is_smoker TEXT NULL CHECK (is_smoker IN ('si', 'no') OR is_smoker IS NULL),
ADD COLUMN IF NOT EXISTS smoking_details TEXT NULL,
ADD COLUMN IF NOT EXISTS irregular_meal_times TEXT NULL CHECK (irregular_meal_times IN ('si', 'no') OR irregular_meal_times IS NULL),
ADD COLUMN IF NOT EXISTS irregular_meal_times_details TEXT NULL,
ADD COLUMN IF NOT EXISTS other_habits TEXT NULL;

-- Agregar comentarios descriptivos a las nuevas columnas
COMMENT ON COLUMN clinical_history.alcohol_consumption IS 'Consumo de alcohol: frecuencia y tipo';
COMMENT ON COLUMN clinical_history.caffeine_stimulants_consumption IS 'Consumo de cafeína o estimulantes';
COMMENT ON COLUMN clinical_history.is_smoker IS '¿Es fumador? (si/no)';
COMMENT ON COLUMN clinical_history.smoking_details IS 'Detalle de consumo de tabaco (solo si es fumador)';
COMMENT ON COLUMN clinical_history.irregular_meal_times IS '¿Tiene horarios de comidas irregulares? (si/no)';
COMMENT ON COLUMN clinical_history.irregular_meal_times_details IS 'Detalle de horarios irregulares (solo si tiene horarios irregulares)';
COMMENT ON COLUMN clinical_history.other_habits IS 'Otros hábitos relevantes para el plan nutricional';

-- Nota: La columna special_habits se mantiene por compatibilidad con datos existentes
-- Los nuevos registros usarán los campos separados

-- Verificar que las columnas se crearon correctamente
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'clinical_history' 
    AND column_name IN (
        'alcohol_consumption',
        'caffeine_stimulants_consumption',
        'is_smoker',
        'smoking_details',
        'irregular_meal_times',
        'irregular_meal_times_details',
        'other_habits'
    )
ORDER BY ordinal_position;

