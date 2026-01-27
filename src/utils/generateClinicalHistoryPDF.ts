import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UsersType } from '@/types/users';
import { ClinicalHistoryType } from '@/types/clinical/history';
import { formatFullName } from '@/utils/format';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Extender el tipo jsPDF para incluir lastAutoTable
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

const translateValue = (value: string | null | undefined): string => {
  if (!value) return "No especificado";

  const translations: Record<string, string> = {
    'si': 'Sí',
    'no': 'No',
    'ocasionalmente': 'Ocasionalmente',
    'alcohol': 'Alcohol',
    'tabaco': 'Tabaco',
    'ambos': 'Ambos',
    'ninguno': 'Ninguno',
    'hipertension': 'Hipertensión',
    'diabetes': 'Diabetes',
    'tu-mismo': 'Tú mismo',
    'pareja-esposo': 'Tu pareja o esposo',
    'madre': 'Mi madre',
    'hijo': 'Tu hij@',
    'empleada': 'Empleada',
    'otra': 'Otra',
    'nunca': 'Nunca',
    '1-2-veces': '1 a 2 veces/semana',
    '3-4-veces': '3 a 4 veces/semana',
    '5-mas-veces': '5 a más veces/semana',
    '2': '2 comidas',
    '3': '3 comidas',
    '4': '4 comidas',
    '5': '5 comidas',
    'menos_1L': 'Menos de 1 litro',
    '1-2L': '1 - 2 litros',
    '2-3L': '2 - 3 litros',
    'mas_3L': 'Más de 3 litros',
    'online': 'Online',
    'presencial': 'Presencial',
  };

  return translations[value] || value;
};

const translateConsultReason = (value: string | null | undefined): string => {
  if (!value) return "No especificado";

  const consultReasons: Record<string, string> = {
    'reducir_grasa': 'Reducir grasa corporal',
    'aumentar_masa': 'Aumentar masa muscular',
    'rendimiento_deportivo': 'Rendimiento deportivo',
    'salud': 'Salud / tratamiento médico',
    'mejorar_alimentacion': 'Mejorar solo alimentación',
  };

  return consultReasons[value] || value;
};

const translatePlanType = (value: string | null | undefined): string => {
  if (!value) return "No especificado";

  const planTypes: Record<string, string> = {
    'estetica': 'Estética',
    'clinico': 'Clínico',
    'deportivo': 'Deportivo',
    'pediatrico': 'Pediátrico',
    'salud': 'Salud',
    'otro': 'Otro',
  };

  return planTypes[value] || value;
};

const formatDigestiveSymptoms = (value: string | null | undefined): string => {
  if (!value) return "No especificado";
  
  try {
    const symptoms = JSON.parse(value);
    const symptomLabels: Record<string, string> = {
      'hinchazon_abdominal': 'Hinchazón abdominal',
      'estrenimiento': 'Estreñimiento',
      'acidez_reflujo': 'Acidez o reflujo',
      'gases_flatulencia': 'Gases o flatulencia',
      'saciedad_precoz': 'Sensación de saciedad precoz',
      'ansiedad_comida': 'Ansiedad por la comida',
    };
    
    const frequencyLabels: Record<string, string> = {
      'nunca': 'Nunca',
      'ocasional': 'Ocasional',
      'frecuente': 'Frecuente',
    };
    
    const entries = Object.entries(symptoms);
    if (entries.length === 0) return "No especificado";
    
    return entries
      .map(([key, freq]) => {
        const label = symptomLabels[key] || key;
        const frequency = frequencyLabels[freq as string] || freq;
        return `${label}: ${frequency}`;
      })
      .join(' | ');
  } catch {
    return value;
  }
};

const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "No especificado";
  try {
    return format(new Date(date), "PPP", { locale: es });
  } catch {
    return "No especificado";
  }
};

export function generateClinicalHistoryPDF(
  patientData: UsersType,
  clinicalHistory: ClinicalHistoryType
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  }) as jsPDFWithAutoTable;

  // Colores del tema
  const primaryColor: [number, number, number] = [34, 139, 34]; // Verde (#228B22)
  const darkColor: [number, number, number] = [22, 101, 22]; // Verde oscuro
  const lightGray: [number, number, number] = [245, 245, 245];
  const textGray: [number, number, number] = [107, 114, 128];

  // Configuración de fuente
  const fontSize = {
    title: 20,
    heading: 14,
    normal: 10,
    small: 8,
  };

  let yPosition = 20;

  // Encabezado
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(fontSize.title);
  doc.setFont('helvetica', 'bold');
  doc.text('HISTORIA CLÍNICA', 105, 20, { align: 'center' });
  
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');
  doc.text('Documento Médico Confidencial', 105, 28, { align: 'center' });
  
  doc.text(
    `Generado el: ${format(new Date(), "PPP", { locale: es })}`,
    105,
    35,
    { align: 'center' }
  );

  yPosition = 50;

  // Información del Paciente
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(10, yPosition, 190, 8, 'F');
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACIÓN DEL PACIENTE', 15, yPosition + 6);

  yPosition += 12;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(fontSize.normal);
  doc.setFont('helvetica', 'normal');

  const patientInfo = [
    ['Nombre completo', formatFullName(patientData.nombres)],
    ['DNI', patientData.dni || 'No especificado'],
    ['Correo electrónico', patientData.correo || 'No especificado'],
    ['Distrito', patientData.distrito || 'No especificado'],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [['Campo', 'Información']],
    body: patientInfo,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: fontSize.normal,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
    },
    margin: { left: 10, right: 10 },
  });

  yPosition = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yPosition + 20;

  // Paso 1: Datos Generales
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(10, yPosition, 190, 8, 'F');
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('PASO 1: DATOS GENERALES DEL PACIENTE', 15, yPosition + 6);

  yPosition += 12;

  const generalData = [
    ['Motivo de consulta', translateConsultReason(clinicalHistory.consult_reason)],
    ['Sexo', clinicalHistory.sex || 'No especificado'],
    ['Edad', clinicalHistory.age?.toString() || 'No especificado'],
    ['Fecha de Nacimiento', formatDate(clinicalHistory.birth_date)],
    ['Fecha de primera cita', formatDate(clinicalHistory.first_appointment_date)],
    ['Ocupación', clinicalHistory.ocupation || 'No especificado'],
    ['Teléfono', clinicalHistory.phone || 'No especificado'],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [['Campo', 'Información']],
    body: generalData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: fontSize.normal,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
    },
    margin: { left: 10, right: 10 },
  });

  yPosition = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yPosition + 20;

  // Paso 2: Antecedentes Clínicos
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(10, yPosition, 190, 8, 'F');
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('PASO 2: ANTECEDENTES CLÍNICOS', 15, yPosition + 6);

  yPosition += 12;

  const clinicalData: string[][] = [
    ['Antecedentes patológicos', clinicalHistory.pathological_antecedents || 'No especificado'],
  ];

  if (clinicalHistory.sex === 'femenino') {
    clinicalData.push(
      ['Última menstruación', formatDate(clinicalHistory.last_menstruation)],
      ['¿Usa anticonceptivos?', translateValue(clinicalHistory.uses_contraceptives)]
    );
  }

  clinicalData.push(
    ['Antecedentes de enfermedades crónicas', clinicalHistory.hypertension_diabetes_antecedents || 'No especificado'],
    ['Síntomas digestivos', formatDigestiveSymptoms(clinicalHistory.abdominal_pain)],
    ['¿Análisis en los últimos 3-6 meses?', translateValue(clinicalHistory.recent_exams)]
  );

  if (clinicalHistory.recent_exams === 'si' && clinicalHistory.recent_exams_details) {
    clinicalData.push(['Indicadores bioquímicos', clinicalHistory.recent_exams_details]);
  }

  clinicalData.push(
    ['¿Ha sido operado/a?', translateValue(clinicalHistory.has_been_operated)]
  );

  if (clinicalHistory.has_been_operated === 'si' && clinicalHistory.surgery_details) {
    clinicalData.push(['Detalle de cirugías', clinicalHistory.surgery_details]);
  }

  clinicalData.push(
    ['Alergias a medicamentos', clinicalHistory.allergies || 'No especificado'],
    ['¿Consume medicamentos?', clinicalHistory.current_medication ? 'Sí' : 'No']
  );

  if (clinicalHistory.current_medication) {
    clinicalData.push(['Detalle de medicamentos', clinicalHistory.current_medication]);
  }

  clinicalData.push(
    ['Estrés y ansiedad', clinicalHistory.stress_anxiety || 'No especificado'],
    ['Cantidad y calidad de sueño', clinicalHistory.sleep_quality || 'No especificado']
  );

  autoTable(doc, {
    startY: yPosition,
    head: [['Campo', 'Información']],
    body: clinicalData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: fontSize.normal,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
    },
    margin: { left: 10, right: 10 },
  });

  yPosition = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yPosition + 20;

  // Verificar si necesitamos una nueva página
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Paso 3: Alimentación y Hábitos
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(10, yPosition, 190, 8, 'F');
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('PASO 3: ALIMENTACIÓN Y HÁBITOS', 15, yPosition + 6);

  yPosition += 12;

  const nutritionData: string[][] = [
    ['Alergias/intolerancias alimentarias', clinicalHistory.food_allergies_intolerances || 'No especificado'],
    ['¿Quién prepara las comidas?', translateValue(clinicalHistory.who_prepares_meals)],
    ['Frecuencia de comer fuera', translateValue(clinicalHistory.eating_out_frequency)],
    ['Alimentos que no consume', clinicalHistory.aliments_hate || 'No especificado'],
    ['Comidas favoritas', clinicalHistory.favorite_foods || 'No especificado'],
    ['Líquidos diarios', translateValue(clinicalHistory.daily_liquid_intake)],
    ['Comidas al día', translateValue(clinicalHistory.meals_per_day)],
    ['Suplementos nutricionales', clinicalHistory.supplements || 'No especificado'],
    ['Consumo de alcohol', clinicalHistory.alcohol_consumption || 'No especificado'],
    ['Consumo de cafeína/estimulantes', clinicalHistory.caffeine_stimulants_consumption || 'No especificado'],
    ['¿Es fumador?', translateValue(clinicalHistory.is_smoker)],
  ];

  if (clinicalHistory.is_smoker === 'si' && clinicalHistory.smoking_details) {
    nutritionData.push(['Detalle de consumo de tabaco', clinicalHistory.smoking_details]);
  }

  nutritionData.push(
    ['Horarios irregulares de comida', translateValue(clinicalHistory.irregular_meal_times)]
  );

  if (clinicalHistory.irregular_meal_times === 'si' && clinicalHistory.irregular_meal_times_details) {
    nutritionData.push(['Detalle de horarios irregulares', clinicalHistory.irregular_meal_times_details]);
  }

  nutritionData.push(
    ['Otros hábitos', clinicalHistory.other_habits || 'No especificado'],
    ['Actividad física', clinicalHistory.physical_activity_record || 'No especificado'],
    ['¿Practica deporte?', clinicalHistory.practices_sports || 'No especificado'],
    ['Recordatorio 24 horas', clinicalHistory.registro_24h_completo || 'No especificado']
  );

  autoTable(doc, {
    startY: yPosition,
    head: [['Campo', 'Información']],
    body: nutritionData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: fontSize.normal,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
    },
    margin: { left: 10, right: 10 },
  });

  yPosition = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : yPosition + 20;

  // Verificar si necesitamos una nueva página
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Paso 4: Objetivos y Plan
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(10, yPosition, 190, 8, 'F');
  
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFontSize(fontSize.heading);
  doc.setFont('helvetica', 'bold');
  doc.text('PASO 4: OBJETIVOS, TIPO DE PLAN Y SEGUIMIENTO', 15, yPosition + 6);

  yPosition += 12;

  const objectivesData = [
    ['Objetivos corto plazo (1-3 meses)', clinicalHistory.short_term_objectives || 'No especificado'],
    ['Objetivos mediano plazo (3-6 meses)', clinicalHistory.medium_term_objectives || 'No especificado'],
    ['Objetivos largo plazo (6-12 meses)', clinicalHistory.long_term_objectives || 'No especificado'],
    ['Tipo de plan', translatePlanType(clinicalHistory.plan_type)],
    ['Modalidad del plan', translateValue(clinicalHistory.plan_modality)],
    ['Detalle del tipo de plan', clinicalHistory.plan_type_details || 'No especificado'],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [['Campo', 'Información']],
    body: objectivesData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: fontSize.normal,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 130 },
    },
    margin: { left: 10, right: 10 },
  });

  // Pie de página en todas las páginas
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(fontSize.small);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text(
      `Página ${i} de ${pageCount}`,
      105,
      287,
      { align: 'center' }
    );
    doc.text(
      'Este documento es confidencial y de uso médico exclusivo',
      105,
      290,
      { align: 'center' }
    );
  }

  // Generar nombre del archivo
  const patientName = formatFullName(patientData.nombres)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const fileName = `historia-clinica-${patientName}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;

  // Descargar el PDF
  doc.save(fileName);
}
