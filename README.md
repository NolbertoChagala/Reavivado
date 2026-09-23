# 📖 Reavivado | Sistema de Gestión y Lectura Bíblica

Plataforma web interactiva desarrollada para la Sociedad de Jóvenes JA (Sede Villas Otoch 4, Cancún), orientada al seguimiento del plan diario de lectura bíblica (*Reavivados por su Palabra*), cronograma de actividades y control administrativo de puntajes por unidades.

---

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) con React 19 y TypeScript.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) con diseño responsivo mobile-first.
- **Base de Datos & ORM:** [Prisma ORM](https://www.prisma.io/) conectado a PostgreSQL en [Supabase](https://supabase.com/).
- **Iconografía:** [Lucide React](https://lucide.dev/).
- **Manejo de Fechas:** [date-fns](https://date-fns.org/) con localización en español.
- **Exportación:** `html-to-image` para generación de flyers digitales en alta resolución.

---

## 🏛️ Arquitectura del Proyecto

El código está estructurado bajo principios de arquitectura modular y separación de responsabilidades:

```text
src/
├── app/                  # Rutas, Server Actions y páginas delgadas (App Router)
│   ├── actions/          # Server Actions (mutaciones y lógica del servidor)
│   ├── (admin)/          # Vistas protegidas de administración (/admin/*)
│   ├── api/              # Route handlers y endpoints REST internos
│   ├── login/            # Flujo de autenticación de operadores
│   ├── layout.tsx        # Cascarón raíz y tipografías
│   └── page.tsx          # Vista pública principal (SSG/SSR)
├── assets/               # Recursos estáticos locales (imágenes institucionales, logos)
├── components/           # Capa de presentación desacoplada
│   ├── admin/            # Vistas, tablas, modales y formularios del panel
│   │   ├── puntos/       # Control de puntajes y tabla interactiva de unidades
│   │   ├── ui/           # Componentes compartidos de administración (KPIs, Headers)
│   │   └── usuarios/     # Alta, listado y revocación de administradores
│   ├── layout/           # Shell global, navegación mobile/desktop y BrandLogo
│   └── views/            # Vistas de lectura: Día, Semana y Calendario Mensual
├── constants/            # Configuración fija y textos institucionales
├── hooks/                # Hooks personalizados de utilidad y ciclo de vida
└── lib/                  # Inicialización de Prisma Client y lógica bíblica de fechas
```

---

## ⚙️ Requisitos Previos

- Node.js (versión 18 o superior recomendada)
- Gestor de paquetes: `npm`, `pnpm` o `yarn`
- Instancia de base de datos PostgreSQL

---

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**

```bash
   git clone https://github.com/NolbertoChagala/Reavivado.git
   cd Reavivado
```

2. **Instalar dependencias:**

```bash
   npm install
```

3. **Configurar variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto basado en el siguiente ejemplo:

```env
   # Conexión principal (pooler de Supabase, para la app en runtime)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

   # Conexión directa (para migraciones con Prisma: db push / migrate)
   DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
```

   > **Nota:** Si usas una base de datos PostgreSQL local, ambas variables pueden apuntar a la misma URL, por ejemplo: `postgresql://usuario:password@localhost:5432/reavivado?schema=public`

4. **Sincronizar la base de datos con Prisma:**

```bash
   npx prisma generate
   npx prisma db push
```

5. **Iniciar el servidor de desarrollo:**

```bash
   npm run dev
```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo local con Turbopack. |
| `npm run build` | Genera la compilación optimizada para producción. |
| `npm run start` | Inicia la aplicación en modo producción tras compilar. |
| `npm run lint` | Ejecuta el análisis estático de código con ESLint. |
| `npx prisma studio` | Abre la interfaz gráfica interactiva para administrar la base de datos. |

---

## 🏛️ Créditos y Organización

- **Organización:** Sociedad de Jóvenes JA — Iglesia Adventista del Séptimo Día
- **Sede:** Villas Otoch 4, Cancún, Quintana Roo
- **Asociación:** Quintana Roo • Unión Mexicana del Sureste