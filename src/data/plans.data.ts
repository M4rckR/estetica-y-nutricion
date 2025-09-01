import { Plan } from "@/types";

export const plansPresencial: Plan[] = [
  {
    id: "clini-care",
    modality: "presencial",
    title: "Clini-Care Nutrition",
    subtitle:
      "Plan Clínico & Dietoterapia (para pacientes con enfermedades o condiciones específicas)",
    features: [
      "Evaluación nutricional + informe clínico",
      "Lectura de análisis bioquímicos",
      "Plan dietoterapéutico personalizado (5–6 días)",
      "2 controles presenciales al mes + seguimiento online",
      "Suplementación y plan de actividad física sugerido",
    ],
    ctaLabel: "Me interesa",
  },
  {
    id: "body-shape-glow",
    modality: "presencial",
    title: "Body Shape Glow",
    subtitle:
      "Plan Estético & Recomp. Corporal (para mejorar figura, bajar grasa, tonificar)",
    features: [
      "Evaluación nutricional + informe estético",
      "Estrategias nutricionales según objetivo corporal",
      "Plan nutricional personalizado (7 días)",
      "2 controles presenciales al mes + seguimiento online",
      "Suplementación + sugerencia de entrenamiento general",
    ],
    highlight: true,
    ctaLabel: "Me interesa",
  },
  {
    id: "nutripro-kids-teens",
    modality: "presencial",
    title: "NutriPRO Athletic Kids & Teens",
    subtitle:
      "Plan Deportivo / Pediátrico (para niños y jóvenes deportistas o en crecimiento)",
    features: [
      "Evaluación + proyección de crecimiento (niños)",
      "Periodización nutricional según su deporte o actividad física",
      "Plan nutricional personalizado (5–6 días)",
      "2 controles presenciales al mes + seguimiento online",
      "Suplementación + recomendaciones de entrenamiento",
    ],
    ctaLabel: "Me interesa",
  },
];


export const plansOnline: Plan[] = [
  {
    id: "beautyfit-online",
    modality: "online",
    title: "BeautyFit Online",
    subtitle:
      "Plan Estético Virtual – Reducción de grasa & tonificación",
    features: [
      "Evaluación nutricional online + ficha fotográfica y medidas",
      "Estrategias nutricionales para reducción de grasa, moldeado y tonificación",
      "Plan personalizado enviado en 7 días (por correo)",
      "4 citas online al mes + seguimiento constante vía WhatsApp",
      "Sugerencia de suplementos para estética corporal",
      "Recomendación de entrenamiento básico para tonificación",
    ],
    ctaLabel: "Me interesa",
  },
  {
    id: "fitonline-performance",
    modality: "online",
    title: "FitOnline Performance",
    subtitle:
      "Plan Deportivo Virtual – Rendimiento & recomposición corporal",
    features: [
      "Evaluación online + fichas de medidas y hábitos de entrenamiento",
      "Periodización nutricional según rendimiento deportivo o recomposición",
      "Plan alimentario personalizado en 5–6 días",
      "Seguimiento online (4 citas al mes + WhatsApp)",
      "Sugerencias de suplementación deportiva",
      "Plan de entrenamiento general adaptado al objetivo",
    ],
    highlight: true,
    ctaLabel: "Me interesa",
  },
  {
    id: "healthbalance-online",
    modality: "online",
    title: "HealthBalance Online",
    subtitle:
      "Plan Clínico – Dietoterapia virtual",
    features: [
      "Evaluación clínica online + ficha fotográfica y medidas",
      "Interpretación de análisis clínicos recientes",
      "Plan dietoterapéutico personalizado (en 7 días)",
      "4 consultas online al mes + seguimiento “Online to Live”",
      "Suplementación orientada a mejorar condición clínica",
      "Recomendación de actividad física según diagnóstico",
    ],
    ctaLabel: "Me interesa",
  },
];