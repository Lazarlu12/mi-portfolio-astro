import type { PortfolioData } from '../types';
import { images } from '../assets/images';
import type { Skill } from '../types/index';


export const data: PortfolioData = {
  personalInfo: {
    name: "Luca Lazarte",
    role: "Frontend Developer",
    profileImage: images.profileImage.src,
    bio: "Diseñando, desarrollando proyectos y aplicaciones web, escalables y centradas en el usuario.",
    about: "Desarrollador web enfocado en la creación de soluciones eficientes, con experiencia práctica en el desarrollo de proyectos robustos y escalables.En el frontend, me especializo en el ecosistema de React y TypeScript. Para el backend, diseño arquitecturas utilizando Node.js y Next.js, aprovechando tecnologías modernas como Server Actions para conectar ambas capas de forma fluida.",
    email: "lazarteluca036@gmail.com",
    github: "https://github.com/Lazarlu12",
    linkedin: "https://www.linkedin.com/in/lucalazarte/",
    cvLink: "/CVLuca_Lazarte.pdf"
  },
  // Reemplazá el array de skills:
// En el import del archivo, confirmá que esté:

// El array skills:
skills: [
  // ── LENGUAJES & FRAMEWORKS ──────────────────────────────
  { name: 'HTML',              description: 'Estructura y semántica web',        category: 'language' },
  { name: 'CSS',               description: 'Estilos, layouts y animaciones',    category: 'language' },
  { name: 'JavaScript',        description: 'Lenguaje de scripting web',         category: 'language' },
  { name: 'TypeScript',        description: 'JavaScript con tipado estático',    category: 'language' },
  { name: 'React.js',          description: 'Librería para interfaces UI',       category: 'language' },
  { name: 'Next.js',           description: 'Framework React full-stack',        category: 'language' },
  { name: 'Tailwind CSS',      description: 'Framework CSS utility-first',       category: 'language' },
  { name: 'Astro',             description: 'Framework para sitios estáticos',   category: 'language' },
  { name: 'C#',                description: 'Lenguaje de desarrollo .NET',       category: 'language' },

  // ── HERRAMIENTAS & PLATAFORMAS ───────────────────────────
  { name: 'Git',               description: 'Control de versiones distribuido',  category: 'tool' },
  { name: 'GitHub',            description: 'Plataforma de código y colaboración', category: 'tool' },
  { name: 'Vercel',            description: 'Deploy y hosting en el edge',       category: 'tool' },
  { name: 'Supabase',          description: 'Backend as a Service open-source',  category: 'tool' },
  { name: 'PostgreSQL',        description: 'Base de datos relacional robusta',  category: 'tool' },
  { name: 'Prisma',            description: 'ORM moderno para TypeScript',       category: 'tool' },
  { name: 'Clerk',             description: 'Autenticación y gestión de usuarios', category: 'tool' },
  { name: 'PWA',               description: 'Apps web progresivas e instalables', category: 'tool' },
  { name: 'Responsive Design', description: 'UI adaptable a cualquier pantalla', category: 'tool' },
] satisfies Skill[],
  projects: [
    {
      id: "1",
      name: "AutoLog Pro",
      description: "App de control de mantenimiento de vehículos. Lleva control del mantenimiento de tus vehículos. Cronología del vehículo con recordatorios de cambios de aceite, filtros, seguros y vencimientos, etc. También permite la carga de fotos y documentos.",
      image: images.autoLogProImage.src, 
      liveUrl: "https://autologpro.online/",
      repoUrl: "https://github.com/Lazarlu12/AutoLog-Pro",
      stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Clerk", "CSS"],
      featured: true
    },
    {
      id: "2",
      name: "Budget Tracker",
      description: "Aplicación para el registro de gastos y control de presupuesto. Incluye gestión de transacciones mediante modales e integración de Recharts para visualización de datos.",
      image: images.budgetTrackerImage.src, 
      liveUrl: "https://registro-financiero.netlify.app/",
      repoUrl: "https://github.com/Lazarlu12/Gestor-gastos-react",
      stack: ["React", "JavaScript", "Recharts", "CSS"],
      featured: true
    },
    {
      id: "3",
      name: "To Do App",
      description: "Aplicación de lista de tareas pendientes con funcionalidades de crear, eliminar tareas y marcar como completadas.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      liveUrl: "https://github.com/Lazarlu12/lista-pendientes-ts-react",
      repoUrl: "https://github.com/Lazarlu12/lista-pendientes-ts-react",
      stack: ["React", "TypeScript", "CSS"],
      featured: true
    },
    {
      id: "4",
      name: "Carrito de compras",
      description: "Carrito de compras responsivo que permite al usuario agregar productos, gestionar cantidades, filtrado, buscar productos y calcular totales.",
      image: images.carritoImage.src,
      liveUrl: "https://carritopro-react.netlify.app/",
      repoUrl: "https://github.com/Lazarlu12/carrito-compra-react",
      stack: ["React", "API", "JavaScript", "CSS"],
      featured: true
    },
    {
      id: "5",
      name: "Aplicación del clima",
      description: "Aplicación web para consultar el estado del tiempo en diferentes ciudades del mundo, utilizando una API de servicios meteorológicos.",
      image: images.climaImage.src,
      liveUrl: "https://aplicacion-delclima-react.netlify.app/",
      repoUrl: "https://github.com/Lazarlu12/aplicaci-n-clima-curso-react",
      stack: ["React", "API", "JavaScript", "CSS"],
      featured: true
    }
  ],
  experience: [
    {
      id: "1",
      role: "Estudiante de Programación",
      company: "Universidad Tecnológica Nacional - Facultad Regional Tucumán",
      period: "Presente",
      description: "Cursando estudios formales, resolviendo parciales técnicos en C# y desarrollando proyectos."
    },
    {
      id: "2",
      role: "Desarrollador Frontend Freelance",
      company: "Proyectos Personales",
      period: "2022 - Presente",
      description: "Diseño y desarrollo de aplicaciones web a medida, implementando buenas prácticas de UI/UX y arquitecturas limpias."
    },
    {
      id: "3",
      role: "Desarrollador Frontend Freelance",
      company: "Proyectos Web para un cliente",
      period: "2025 - 2025",
      description: "Desarrollo de sitio web a medida para un cliente, diseño, maquetación y desarrollo del sitio web."
    },
    {
      id: "4",
      role: "Desarrollador FullStack Freelance",
      company: "Aplicación Personal de Control de Mantenimiento de Vehículos",
      period: "2026 - 2026",
      description: "Desarrollo de una aplicación web para el control de mantenimiento de vehículos, incluyendo gestión de tareas, recordatorios y visualización de datos."
    }
  ]
};
