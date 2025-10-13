# LYV | Estética y Nutrición Integral

Una aplicación web moderna para servicios de estética y nutrición, construida con Next.js, TypeScript y Tailwind CSS. Ofrece planes nutricionales personalizados, tratamientos estéticos y consultas en línea y presenciales.

## 🚀 Características

- **Planes Nutricionales**: Ofrece planes clínicos, estéticos y deportivos tanto presenciales como en línea
- **Sistema de Reservas**: Permite a los usuarios reservar citas directamente desde la plataforma
- **Autenticación**: Sistema de login y registro con Supabase
- **Testimonios**: Videos de pacientes satisfechos
- **Ubicaciones**: Información de sedes en Jesús María y Los Olivos
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **SEO Optimizado**: Metadatos completos para motores de búsqueda

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.5.2** - Framework React con App Router
- **React 19.1.0** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework CSS utilitario
- **Radix UI** - Componentes primitivos accesibles

### Backend & Base de Datos
- **Supabase** - Backend-as-a-Service (Autenticación, Base de Datos)
- **Zustand** - Gestión de estado global

### Librerías Adicionales
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Embla Carousel** - Carruseles interactivos
- **Vidstack** - Reproductor de video
- **AOS** - Animaciones al hacer scroll
- **Lucide React** - Iconos
- **Date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas y layouts de Next.js
│   ├── (home)/            # Página principal
│   ├── auth/              # Páginas de autenticación
│   └── layout.tsx         # Layout raíz
├── components/            # Componentes React
│   ├── auth/              # Componentes de autenticación
│   ├── common/            # Componentes compartidos
│   ├── main/              # Componentes principales
│   └── ui/                # Componentes de UI reutilizables
├── data/                  # Datos estáticos
├── lib/                   # Utilidades y configuración
├── schema/                # Esquemas de validación
├── types/                 # Definiciones de tipos TypeScript
└── utils/                 # Utilidades adicionales
```

## 🏃‍♂️ Instalación y Ejecución

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd estetica-y-nutricion
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador** en `http://localhost:3000`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🎨 Planes Disponibles

### Presenciales
- **Clini-Care Nutrition**: Plan clínico para pacientes con condiciones específicas
- **Body Shape Glow**: Plan estético para mejora corporal
- **NutriPRO Athletic Kids & Teens**: Plan deportivo para niños y jóvenes

### En Línea
- **BeautyFit Online**: Plan estético virtual
- **FitOnline Performance**: Plan deportivo virtual
- **HealthBalance Online**: Plan clínico virtual

## 📍 Ubicaciones

- **Jesús María**: Av. Circunvalación los olivos 206
- **Los Olivos**: Av. Circunvalación los olivos 206

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- Sitio web: [esteticaynutricion.com](https://esteticaynutricion.com)
- WhatsApp: Reserva tu consulta nutricional personalizada

---

*Más de 5,000 pacientes satisfechos*