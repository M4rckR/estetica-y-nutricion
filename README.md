# LYV | Estética y Nutrición Integral

Una aplicación web moderna y completa para servicios de estética y nutrición integral, construida con tecnologías de vanguardia. Ofrece planes nutricionales personalizados, tratamientos estéticos avanzados, consultas médicas en línea y presenciales, y un sistema de gestión para profesionales de la salud.

## 🚀 Características Principales

### 👤 Para Pacientes
- **Registro y Autenticación**: Sistema seguro con Supabase Auth
- **Planes Nutricionales Personalizados**: Clínicos, estéticos y deportivos (presenciales y online)
- **Sistema de Reservas**: Reserva de citas directamente desde la plataforma
- **Perfil Personal**: Gestión de consultas, historial médico y progreso
- **Testimonios Interactivos**: Videos reales de pacientes satisfechos
- **Ubicaciones**: Información detallada de sedes en Jesús María y Los Olivos

### 👨‍⚕️ Para Profesionales (Doctores)
- **Panel de Administración**: Gestión completa de pacientes
- **Lista de Pacientes**: Búsqueda, filtrado y paginación
- **Subida de Documentos**: Gestión de consultas y documentos médicos
- **Roles y Permisos**: Sistema de autenticación basado en roles

### 🎨 Experiencia de Usuario
- **Responsive Design**: Optimizado para móviles, tablets y desktop
- **SEO Optimizado**: Metadatos completos y optimización para motores de búsqueda
- **Animaciones Suaves**: Integración con AOS para transiciones elegantes
- **Accesibilidad**: Componentes Radix UI para mejor accesibilidad

## 🛠️ Tecnologías y Arquitectura

### 🖥️ Frontend
- **Next.js 15.5.2** - Framework React con App Router y Server Components
- **React 19.1.0** - Biblioteca para interfaces de usuario con Concurrent Features
- **TypeScript 5** - Tipado estático completo para mayor robustez
- **Tailwind CSS 4** - Framework CSS utilitario con configuración personalizada

### 🎨 UI/UX Components
- **Radix UI** - Componentes primitivos accesibles y personalizables
- **Lucide React** - Iconos consistentes y escalables
- **Embla Carousel** - Carruseles interactivos y personalizables
- **Vidstack** - Reproductor de video avanzado para testimonios

### 🔧 Backend & Base de Datos
- **Supabase** - Backend-as-a-Service completo
  - **Authentication**: Sistema de auth con roles (paciente/doctor)
  - **Database**: PostgreSQL con Row Level Security
  - **Storage**: Gestión de archivos (documentos médicos, imágenes)
  - **Real-time**: Suscripciones en tiempo real

### 📝 Formularios y Validación
- **React Hook Form** - Manejo eficiente de formularios
- **Zod** - Validación de esquemas TypeScript-first
- **@hookform/resolvers** - Integración entre React Hook Form y Zod

### 🎯 Gestión de Estado
- **Zustand** - Store ligero y eficiente para estado global
- **React Context** - Para estado local cuando es necesario

### 📱 Librerías Adicionales
- **AOS (Animate On Scroll)** - Animaciones al hacer scroll
- **Date-fns** - Manipulación de fechas y horarios
- **Sonner** - Notificaciones toast elegantes
- **Class Variance Authority** - Utilidades para variantes de componentes
- **Tailwind Merge** - Fusión inteligente de clases Tailwind

## 📁 Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Grupo de rutas públicas
│   │   ├── page.tsx             # Página principal
│   │   ├── admin/               # Panel de administración
│   │   │   └── pacientes/       # Gestión de pacientes
│   │   └── perfil/              # Perfil del usuario
│   ├── auth/                     # Rutas de autenticación
│   │   ├── login/               # Login
│   │   ├── register/            # Registro multi-paso
│   │   └── signout/             # Logout
│   ├── layout.tsx               # Layout raíz con metadatos SEO
│   ├── globals.css              # Estilos globales
│   └── favicon.ico              # Favicon
├── components/                   # Componentes React
│   ├── auth/                     # Componentes de autenticación
│   │   ├── Login.tsx            # Formulario de login
│   │   └── register/            # Componentes de registro
│   ├── admin/                    # Componentes del panel admin
│   │   ├── PatientList.tsx      # Lista de pacientes
│   │   └── HeadingDoctor.tsx    # Encabezado del doctor
│   ├── common/                   # Componentes compartidos
│   │   ├── Footer.tsx           # Pie de página
│   │   └── WhatsAppSection.tsx  # Sección de WhatsApp
│   ├── main/                     # Componentes principales
│   │   ├── HeaderMain.tsx       # Header principal
│   │   ├── PlansSection.tsx     # Sección de planes
│   │   ├── ServicesSection.tsx  # Sección de servicios
│   │   ├── LocationsSection.tsx # Sección de ubicaciones
│   │   ├── Testimonials.tsx     # Testimonios en video
│   │   └── CarouselHomeCta.tsx  # Carrusel CTA principal
│   ├── perfil/                   # Componentes del perfil
│   └── ui/                       # Componentes UI reutilizables
│       ├── button.tsx           # Botón personalizado
│       ├── input.tsx            # Input personalizado
│       ├── tabs.tsx             # Sistema de pestañas
│       └── ...
├── data/                         # Datos estáticos
│   ├── plans.data.ts            # Datos de planes nutricionales
│   ├── testimonials.data.ts     # Datos de testimonios
│   ├── sedesAccordion.ts        # Datos de sedes
│   └── steps.data.ts            # Pasos del registro
├── lib/                          # Utilidades y configuración
│   ├── store.ts                 # Store Zustand
│   └── utils.ts                 # Utilidades generales
├── schema/                       # Esquemas de validación Zod
│   ├── register/                # Esquemas de registro
│   │   └── register.ts          # Validación completa del registro
│   └── upload/                  # Esquemas de subida
│       └── consult.ts           # Validación de consultas
├── types/                        # Definiciones TypeScript
│   ├── index.ts                 # Tipos principales
│   ├── auth/                    # Tipos de autenticación
│   ├── plans/                   # Tipos de planes
│   └── upload/                  # Tipos de subida
├── utils/                        # Utilidades específicas
│   ├── auth.ts                  # Utilidades de autenticación
│   ├── supabase/                # Cliente Supabase
│   │   ├── client.ts            # Cliente browser
│   │   ├── server.ts            # Cliente server
│   │   └── admin.ts             # Cliente admin
│   ├── middleware.ts            # Middleware de autenticación
│   └── CamelCase.ts             # Utilidades de formato
└── middleware.ts                # Middleware Next.js
```

## 🏃‍♂️ Instalación y Configuración

### Prerrequisitos
- **Node.js** 18+ y **npm** o **yarn**
- **Cuenta de Supabase** para backend y base de datos

### Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd estetica-y-nutricion
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura Supabase**
   - Crea un proyecto en [Supabase](https://supabase.com)
   - Ve a Settings > API y copia la URL y las keys
   - Configura las tablas de base de datos (ver sección siguiente)

4. **Variables de entorno**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key  # Para operaciones admin
   ```

5. **Configura la base de datos**
   Ejecuta las siguientes consultas SQL en el SQL Editor de Supabase:

   ```sql
   -- Tabla de usuarios (perfiles adicionales)
   CREATE TABLE users (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     first_name TEXT,
     last_name TEXT,
     email TEXT,
     phone TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Tabla de consultas médicas
   CREATE TABLE medical_consults (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     patient_id UUID REFERENCES auth.users(id),
     doctor_id UUID REFERENCES auth.users(id),
     consult_date DATE,
     consult_type TEXT,
     notes TEXT,
     documents JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Políticas RLS (Row Level Security)
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE medical_consults ENABLE ROW LEVEL SECURITY;

   -- Políticas para users
   CREATE POLICY "Users can view own profile" ON users
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can update own profile" ON users
     FOR UPDATE USING (auth.uid() = user_id);

   -- Políticas para medical_consults
   CREATE POLICY "Doctors can view patient consults" ON medical_consults
     FOR SELECT USING (
       auth.jwt() ->> 'role' = 'doctor' OR
       auth.uid() = patient_id
     );
   ```

6. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

7. **Abre tu navegador** en `http://localhost:3000`

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Base de datos (requiere Supabase CLI)
npx supabase start   # Iniciar Supabase local
npx supabase db push # Push cambios a producción
```

## 🎨 Funcionalidades Detalladas

### Sistema de Registro Multi-paso
- **Paso 1**: Datos personales (nombre, email, teléfono, etc.)
- **Paso 2**: Historia clínica básica (deportes, antecedentes, etc.)
- **Paso 3**: Cirugías y alergias
- **Paso 4**: Hábitos alimenticios

### Planes Nutricionales

#### Presenciales
- **Clini-Care Nutrition**: Plan clínico completo con evaluaciones especializadas
- **Body Shape Glow**: Plan estético para transformación corporal
- **NutriPRO Athletic Kids & Teens**: Plan deportivo para jóvenes atletas

#### Online
- **BeautyFit Online**: Plan estético virtual con seguimiento remoto
- **FitOnline Performance**: Plan deportivo online con periodización
- **HealthBalance Online**: Plan clínico virtual con consultas remotas

### Servicios de Estética
- **Tratamientos Faciales**: Limpiezas profundas, PRP, dermapen
- **Tratamientos Corporales**: Hidrolipoclasia, carboxiterapia, maderoterapia
- **Venta de Suplementos**: Amplia gama de productos nutricionales

## 📍 Ubicaciones y Contacto

- **Jesús María**: Av. Jose Galvez barrenechea 765
- **Los Olivos**: Av. Gonzáles Prada 558
- **WhatsApp**: +51 931 531 046
- **Sitio web**: [esteticaynutricion.com](https://esteticaynutricion.com)

## 🔒 Seguridad y Privacidad

- **Autenticación Segura**: Implementada con Supabase Auth
- **Row Level Security**: Políticas de acceso granular en la base de datos
- **Validación de Datos**: Esquemas Zod para validación client-side y server-side
- **Protección CSRF**: Middleware de Next.js para rutas protegidas
- **Encriptación**: Datos sensibles encriptados en tránsito y reposo

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Desarrollo
- Usa TypeScript estrictamente
- Sigue las convenciones de nomenclatura
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Más de 5,000 pacientes satisfechos** que confían en nuestros servicios
- Comunidad de Next.js y React por frameworks excepcionales
- Equipo de Supabase por el backend-as-a-service
- Contribuyentes de código abierto por las librerías utilizadas

---

*Desarrollado con ❤️ para promover la salud y el bienestar integral*