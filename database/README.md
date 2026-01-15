# Database

Esta carpeta contiene todos los archivos SQL del proyecto organizados de manera estructurada.

## Estructura

```
database/
├── docs/           # Documentación e instrucciones de migraciones
│   ├── HISTORIA_CLINICA_README.md
│   ├── INSTRUCCIONES_MIGRACION_*.md
│   ├── INSTRUCCIONES_SEGUIMIENTO_CONSULTAS.md
│   ├── INSTRUCCIONES_SUPABASE_*.md
│   └── VISTA_PACIENTE_README.md
├── migrations/     # Archivos de migración de la base de datos
│   └── migration_*.sql
├── schemas/        # Esquemas de base de datos
│   └── supabase_schema_clinical_history.sql
└── README.md       # Este archivo
```

## Migraciones

La carpeta `migrations/` contiene todas las migraciones de la base de datos de Supabase. Estas migraciones incluyen:

- Añadir campos nuevos a las tablas existentes
- Modificar campos existentes
- Crear nuevas tablas
- Actualizar estructuras de datos

### Convención de nombres

Los archivos de migración siguen el patrón:
- `migration_add_*.sql` - Para añadir nuevas tablas o campos
- `migration_update_*.sql` - Para actualizar campos existentes
- `migration_modify_*.sql` - Para modificar estructuras existentes

## Schemas

La carpeta `schemas/` contiene los esquemas completos de las tablas de la base de datos.

## Documentación

La carpeta `docs/` contiene toda la documentación relacionada con las migraciones y la base de datos:

### Instrucciones de Migración
- **INSTRUCCIONES_MIGRACION_*.md** - Guías paso a paso para ejecutar migraciones específicas
- **INSTRUCCIONES_SEGUIMIENTO_CONSULTAS.md** - Documentación del sistema de seguimiento de consultas
- **INSTRUCCIONES_SUPABASE_*.md** - Instrucciones específicas de Supabase

### READMEs de Funcionalidades
- **HISTORIA_CLINICA_README.md** - Documentación del sistema de historias clínicas
- **VISTA_PACIENTE_README.md** - Documentación de la vista de pacientes

## Uso

Para aplicar una migración en Supabase:

1. Accede al dashboard de Supabase
2. Ve a la sección "SQL Editor"
3. Copia y pega el contenido del archivo SQL
4. Ejecuta la query

## Notas

- Siempre revisa las migraciones antes de ejecutarlas en producción
- Mantén un backup de la base de datos antes de aplicar cambios importantes
- Los archivos están ordenados alfabéticamente, no cronológicamente
