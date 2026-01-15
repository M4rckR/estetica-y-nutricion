# 📚 Guía de Navegación del Proyecto

> Índice rápido para encontrar cualquier documentación o recurso del proyecto

---

## 🗂️ Documentación Principal

### 📖 README Principal
**[README.md](./README.md)** - Documentación completa del proyecto
- Características y tecnologías
- Instalación y configuración
- Estructura del proyecto
- Scripts y comandos

---

## 🗄️ Base de Datos

### Carpeta: `database/`

| Archivo/Carpeta | Descripción | Link |
|----------------|-------------|------|
| **README.md** | Guía completa de base de datos | [Ver](./database/README.md) |
| **schemas/** | Esquemas SQL de PostgreSQL | [Ver](./database/schemas/) |
| **migrations/** | 17 archivos de migración SQL | [Ver](./database/migrations/) |
| **docs/** | Documentación e instrucciones | [Ver](./database/docs/) |

### Documentación de Base de Datos

#### 📋 Índice de Documentos
**[database/docs/README.md](./database/docs/README.md)** - Índice completo

#### 🔧 Instrucciones de Migraciones
- [Meals Per Day](./database/docs/INSTRUCCIONES_MIGRACION_MEALS_PER_DAY.md)
- [Physical Activity](./database/docs/INSTRUCCIONES_MIGRACION_PHYSICAL_ACTIVITY.md)
- [Special Habits](./database/docs/INSTRUCCIONES_MIGRACION_SPECIAL_HABITS.md)
- [Stress & Anxiety](./database/docs/INSTRUCCIONES_MIGRACION_STRESS_ANXIETY.md)
- [Paso 4](./database/docs/INSTRUCCIONES_MIGRACION_PASO4.md)
- [Paso 4 Actualizado](./database/docs/INSTRUCCIONES_MIGRACION_PASO4_ACTUALIZADO.md)

#### 📦 Supabase
- [2 PDFs](./database/docs/INSTRUCCIONES_SUPABASE_2_PDFS.md)
- [3 PDFs](./database/docs/INSTRUCCIONES_SUPABASE_3_PDFS.md)

#### 📊 Funcionalidades
- [Historia Clínica](./database/docs/HISTORIA_CLINICA_README.md)
- [Vista Paciente](./database/docs/VISTA_PACIENTE_README.md)
- [Seguimiento Consultas](./database/docs/INSTRUCCIONES_SEGUIMIENTO_CONSULTAS.md)

---

## 🎯 Inicio Rápido

### Para Desarrolladores Nuevos

1. **Empezar aquí**: [README.md](./README.md)
2. **Configurar BD**: [database/README.md](./database/README.md)
3. **Ver estructura**: [README.md - Estructura](./README.md#-estructura-del-proyecto)

### Para Configurar Base de Datos

1. **Esquema principal**: `database/schemas/supabase_schema_clinical_history.sql`
2. **Migraciones**: Ver `database/migrations/`
3. **Guías paso a paso**: Ver `database/docs/INSTRUCCIONES_MIGRACION_*.md`

### Para Entender Funcionalidades

1. **Historias Clínicas**: [HISTORIA_CLINICA_README.md](./database/docs/HISTORIA_CLINICA_README.md)
2. **Vista Paciente**: [VISTA_PACIENTE_README.md](./database/docs/VISTA_PACIENTE_README.md)
3. **Seguimiento**: [INSTRUCCIONES_SEGUIMIENTO_CONSULTAS.md](./database/docs/INSTRUCCIONES_SEGUIMIENTO_CONSULTAS.md)

---

## 📂 Estructura Visual

```
📦 estetica-y-nutricion/
│
├── 📖 README.md                    # ← EMPEZAR AQUÍ
├── 📚 PROYECTO.md                  # ← ESTE ARCHIVO (índice)
│
├── 🗄️ database/                    # Base de Datos
│   ├── 📖 README.md               # Guía de BD
│   ├── 📁 schemas/                # Esquemas SQL
│   ├── 📁 migrations/             # Migraciones SQL
│   └── 📁 docs/                   # Documentación
│       ├── 📖 README.md           # Índice de docs
│       ├── 📄 HISTORIA_CLINICA_README.md
│       ├── 📄 VISTA_PACIENTE_README.md
│       └── 📄 INSTRUCCIONES_*.md
│
├── 💻 src/                         # Código Fuente
│   ├── 📁 app/                    # Next.js App Router
│   ├── 📁 components/             # Componentes React
│   ├── 📁 schema/                 # Validaciones Zod
│   ├── 📁 types/                  # Tipos TypeScript
│   ├── 📁 utils/                  # Utilidades
│   ├── 📁 data/                   # Datos estáticos
│   └── 📁 lib/                    # Librerías
│
├── 🖼️ public/                      # Assets
│   ├── 📁 images/
│   ├── 📁 svg/
│   └── 📁 video/
│
└── ⚙️ [Configuración]
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## 🔍 Búsqueda Rápida

### ¿Necesitas...?

| Busco... | Ir a... |
|----------|---------|
| **Instalar el proyecto** | [README.md - Instalación](./README.md#-instalación-rápida) |
| **Configurar Supabase** | [README.md - Base de Datos](./README.md#️-base-de-datos) |
| **Ver tecnologías usadas** | [README.md - Tecnologías](./README.md#️-tecnologías) |
| **Entender la estructura** | [README.md - Estructura](./README.md#-estructura-del-proyecto) |
| **Scripts disponibles** | [README.md - Scripts](./README.md#-scripts-disponibles) |
| **Info de base de datos** | [database/README.md](./database/README.md) |
| **Ejecutar migraciones** | [database/docs/README.md](./database/docs/README.md) |
| **Sistema de historias clínicas** | [HISTORIA_CLINICA_README.md](./database/docs/HISTORIA_CLINICA_README.md) |

---

## 💡 Consejos

### ✅ Antes de Empezar
1. Lee el [README.md](./README.md) principal
2. Configura las variables de entorno (`.env.local`)
3. Ejecuta el esquema SQL principal
4. Aplica las migraciones necesarias

### ✅ Para Desarrollo
1. Usa `npm run dev` para desarrollo local
2. Revisa `src/app/` para las rutas
3. Componentes reutilizables en `src/components/ui/`
4. Esquemas de validación en `src/schema/`

### ✅ Para Base de Datos
1. Siempre lee las instrucciones antes de ejecutar migraciones
2. Haz backup antes de cambios importantes
3. Prueba en ambiente de desarrollo primero
4. Consulta `database/docs/` para guías específicas

---

## 📞 Ayuda y Soporte

- **Issues**: Abre un issue en el repositorio
- **Email**: contacto@esteticaynutricion.com
- **WhatsApp**: +51 931 531 046

---

<div align="center">

**¿Perdido? Empieza por el [README.md](./README.md) principal**

**🌿 LYV | Estética y Nutrición Integral**

</div>
