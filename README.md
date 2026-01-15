# 🌿 LYV | Estética y Nutrición Integral

> Plataforma web integral para servicios de nutrición y estética con sistema de gestión médica

Una aplicación moderna construida con Next.js 15, React 19 y Supabase que conecta a pacientes con profesionales de la salud, ofreciendo planes nutricionales personalizados, tratamientos estéticos y un sistema completo de gestión de historias clínicas.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Instalación](#-instalación-rápida)
- [Base de Datos](#️-base-de-datos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts](#-scripts-disponibles)
- [Funcionalidades](#-funcionalidades-principales)

---

## ✨ Características

### 👥 Para Pacientes
- ✅ Registro y autenticación segura
- ✅ Perfil personal con historial médico completo
- ✅ Sistema de consultas médicas online
- ✅ Planes nutricionales personalizados (clínicos, estéticos, deportivos)
- ✅ Visualización de progreso y seguimiento
- ✅ Reserva de citas

### 👨‍⚕️ Para Doctores/Nutricionistas
- ✅ Panel de administración completo
- ✅ Gestión de pacientes (búsqueda, filtrado, paginación)
- ✅ Sistema de historias clínicas digitales
- ✅ Subida y gestión de documentos médicos
- ✅ Seguimiento de consultas
- ✅ Control de acceso basado en roles

### 🎨 Experiencia de Usuario
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna y accesible
- ✅ Animaciones suaves
- ✅ SEO optimizado
- ✅ Notificaciones en tiempo real

---

## 🛠️ Tecnologías

### Frontend
- **Next.js 15.5.2** - Framework React con App Router
- **React 19.1.0** - UI con Concurrent Features
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utilitarios

### Backend & Database
- **Supabase** - Backend completo
  - Authentication (con roles)
  - PostgreSQL Database (con RLS)
  - Storage (documentos médicos)
  - Real-time subscriptions

### Librerías UI/UX
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos
- **Embla Carousel** - Carruseles
- **Vidstack** - Reproductor de video
- **AOS** - Animaciones on scroll

### Formularios & Validación
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas
- **Zustand** - Estado global

---

## 🚀 Instalación Rápida

### 1️⃣ Prerequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase

### 2️⃣ Clonar e Instalar

```bash
# Clonar repositorio
git clone <url-del-repo>
cd estetica-y-nutricion

# Instalar dependencias
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 4️⃣ Configurar Base de Datos

```bash
# 1. En Supabase SQL Editor, ejecuta el esquema principal:
database/schemas/supabase_schema_clinical_history.sql

# 2. Ejecuta las migraciones necesarias desde:
database/migrations/

# 📖 Ver documentación detallada:
database/README.md
database/docs/README.md
```

### 5️⃣ Iniciar Desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

---

## 🗄️ Base de Datos

### Estructura Organizada

```
database/
├── schemas/         # Esquemas completos de PostgreSQL
├── migrations/      # 17 archivos de migración SQL
├── docs/            # Documentación e instrucciones
│   ├── HISTORIA_CLINICA_README.md
│   ├── VISTA_PACIENTE_README.md
│   ├── INSTRUCCIONES_MIGRACION_*.md
│   └── INSTRUCCIONES_SUPABASE_*.md
└── README.md        # Guía completa de base de datos
```

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `users` | Perfiles de usuarios (pacientes y doctores) |
| `clinical_history` | Historias clínicas completas |
| `medical_consults` | Registro de consultas médicas |
| `physical_activity_record` | Actividad física de pacientes |
| `seguimiento_consultas` | Seguimiento y progreso |

### Características de Seguridad

- ✅ Row Level Security (RLS) en todas las tablas
- ✅ Políticas de acceso por roles (paciente/doctor)
- ✅ Encriptación de datos sensibles
- ✅ Storage seguro para documentos médicos

### 📖 Documentación Completa

Para configuración detallada, instrucciones de migraciones y guías:
👉 **[Ver database/README.md](./database/README.md)**

---

## 📁 Estructura del Proyecto

```
estetica-y-nutricion/
├── database/                    # 🗄️ SQL schemas, migrations y docs
│   ├── schemas/
│   ├── migrations/
│   └── docs/
│
├── src/
│   ├── app/                     # 🎯 Next.js App Router
│   │   ├── (home)/             # Rutas públicas
│   │   │   ├── page.tsx        # Página principal
│   │   │   ├── admin/          # Panel de administración
│   │   │   └── perfil/         # Perfil de usuario
│   │   ├── auth/               # Autenticación
│   │   │   ├── login/
│   │   │   ├── register/       # Registro multi-paso
│   │   │   └── signout/
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Layout raíz
│   │   └── globals.css
│   │
│   ├── components/              # 🧩 Componentes React
│   │   ├── auth/               # Login, registro
│   │   ├── admin/              # Panel admin, pacientes
│   │   │   ├── clinical/       # Historias clínicas
│   │   │   └── pacientes/      # Gestión de pacientes
│   │   ├── main/               # Componentes principales
│   │   │   ├── PlansSection/   # Planes nutricionales
│   │   │   ├── ServicesSection/ # Servicios
│   │   │   └── Testimonials/   # Testimonios en video
│   │   ├── perfil/             # Perfil y consultas
│   │   ├── common/             # Footer, WhatsApp, etc.
│   │   └── ui/                 # Componentes reutilizables
│   │
│   ├── schema/                  # 📝 Validación con Zod
│   │   ├── register/
│   │   ├── clinical/
│   │   └── upload/
│   │
│   ├── types/                   # 📘 Tipos TypeScript
│   │   ├── auth/
│   │   ├── clinical/
│   │   └── plans/
│   │
│   ├── utils/                   # 🔧 Utilidades
│   │   ├── supabase/           # Cliente Supabase
│   │   ├── auth.ts
│   │   └── middleware.ts
│   │
│   ├── data/                    # 📊 Datos estáticos
│   │   ├── plans.data.ts
│   │   ├── testimonials.data.ts
│   │   └── sedesAccordion.ts
│   │
│   └── lib/                     # 📚 Librerías
│       ├── store.ts            # Zustand store
│       └── utils.ts
│
├── public/                      # 🖼️ Assets estáticos
│   ├── images/
│   ├── svg/
│   └── video/
│
└── [archivos de configuración]
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (Turbopack)
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Supabase (requiere Supabase CLI)
npx supabase start   # Iniciar Supabase local
npx supabase db push # Push cambios a producción
```

---

## 🎯 Funcionalidades Principales

### 1. Sistema de Registro Multi-paso
- **Paso 1**: Datos personales básicos
- **Paso 2**: Historia clínica (deportes, antecedentes)
- **Paso 3**: Cirugías y alergias
- **Paso 4**: Hábitos alimenticios y estilo de vida

### 2. Historias Clínicas Digitales
Sistema completo para recopilar y gestionar información médica:
- Datos antropométricos
- Antecedentes médicos y familiares
- Hábitos alimenticios
- Actividad física
- Estrés y ansiedad
- Alergias e intolerancias
- Cirugías previas

### 3. Planes Nutricionales

#### 📍 Presenciales
- **Clini-Care Nutrition**: Plan clínico completo
- **Body Shape Glow**: Plan estético
- **NutriPRO Athletic Kids & Teens**: Plan deportivo juvenil

#### 💻 Online
- **BeautyFit Online**: Plan estético virtual
- **FitOnline Performance**: Plan deportivo online
- **HealthBalance Online**: Plan clínico virtual

### 4. Servicios de Estética
- Tratamientos faciales (PRP, dermapen, limpiezas)
- Tratamientos corporales (hidrolipoclasia, carboxiterapia)
- Venta de suplementos nutricionales

### 5. Panel de Administración
- Lista de pacientes con búsqueda y filtros
- Sistema de subida de documentos médicos
- Gestión de consultas y seguimiento
- Generación de reportes

---

## 📍 Ubicaciones

- **Jesús María**: Av. Jose Galvez barrenechea 765
- **Los Olivos**: Av. Gonzáles Prada 558
- **WhatsApp**: +51 931 531 046

---

## 🔒 Seguridad

- ✅ Autenticación segura con Supabase Auth
- ✅ Row Level Security (RLS) en base de datos
- ✅ Validación de datos client-side y server-side con Zod
- ✅ Middleware de protección de rutas
- ✅ Encriptación de datos sensibles
- ✅ Políticas de acceso granular por roles

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Convenciones
- Usa TypeScript estrictamente
- Sigue las convenciones de nomenclatura del proyecto
- Documenta nuevas funcionalidades
- Escribe tests cuando sea posible

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 🙏 Agradecimientos

- **5,000+ pacientes satisfechos** que confían en nuestros servicios
- Comunidad de Next.js y React
- Equipo de Supabase
- Contribuyentes de código abierto

---

<div align="center">

**Desarrollado con ❤️ para promover la salud y el bienestar integral**

[🌐 Sitio Web](https://esteticaynutricion.com) • [📞 WhatsApp](https://wa.me/51931531046)

</div>
