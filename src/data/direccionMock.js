
/*
 * DATOS SIMULADOS DE DIRECCIÓN ACADÉMICA
 * Se reemplazarán por datos reales del backend.
 */

export const PERIODO_DIRECCION =
  "Septiembre – Diciembre 2026";

export const RESUMEN_DIRECCION = {
  docentesEvaluados: 42,
  evaluacionesRecibidas: 1250,
  estudiantesParticipantes: 840,
  estudiantesHabilitados: 1000,
  gruposParticipantes: 36
};

export const PARTICIPACION_DIRECCION = Math.round(
  (
    RESUMEN_DIRECCION.estudiantesParticipantes /
    RESUMEN_DIRECCION.estudiantesHabilitados
  ) * 100
);

export const PARTICIPACION_SEMANAL = [
  { semana: "Semana 1", porcentaje: 15 },
  { semana: "Semana 2", porcentaje: 34 },
  { semana: "Semana 3", porcentaje: 61 },
  { semana: "Semana 4", porcentaje: 84 }
];

export const SECCIONES_DIRECCION = [
  {
    id: 1,
    nombre: "Desempeño docente",
    promedio: 4.2
  },
  {
    id: 2,
    nombre: "Metodología y desarrollo de la clase",
    promedio: 4.0
  },
  {
    id: 3,
    nombre: "Atención y comunicación",
    promedio: 4.4
  }
];

export const PROMEDIO_INSTITUCIONAL =
  SECCIONES_DIRECCION.reduce(
    (total, seccion) => total + seccion.promedio,
    0
  ) / SECCIONES_DIRECCION.length;

export const REPORTES_DIRECCION = [
  {
    id: 1,
    docente: "Juan Pérez",
    carrera: "Tecnologías de la Información",
    promedio: 4.32,
    estado: "Pendiente"
  },
  {
    id: 2,
    docente: "María López",
    carrera: "Administración",
    promedio: 4.50,
    estado: "En revisión"
  },
  {
    id: 3,
    docente: "Carlos Ramírez",
    carrera: "Mantenimiento Industrial",
    promedio: 3.95,
    estado: "Pendiente"
  },
  {
    id: 4,
    docente: "Ana Torres",
    carrera: "Tecnologías de la Información",
    promedio: 4.65,
    estado: "Autorizado"
  }
];

export const REPORTES_POR_REVISAR =
  REPORTES_DIRECCION.filter(
    reporte => reporte.estado !== "Autorizado"
  ).length;

  
/* DOCENTES REGISTRADOS - DATOS DE DEMOSTRACIÓN */

export const DIRECCION_DOCENTES = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    carrera: "Tecnologías de la Información",
    grupos: ["A-301", "B-301", "A-501"],
    activo: true
  },
  {
    id: 2,
    nombre: "María López",
    correo: "maria.lopez@example.com",
    carrera: "Administración",
    grupos: ["ADM-201", "ADM-301"],
    activo: true
  },
  {
    id: 3,
    nombre: "Carlos Ramírez",
    correo: "carlos.ramirez@example.com",
    carrera: "Mantenimiento Industrial",
    grupos: ["MI-401"],
    activo: true
  },
  {
    id: 4,
    nombre: "Ana Torres",
    correo: "ana.torres@example.com",
    carrera: "Tecnologías de la Información",
    grupos: [],
    activo: false
  }
];

export const CARRERAS_DIRECCION = [
  "Tecnologías de la Información",
  "Administración",
  "Mantenimiento Industrial"
];


/* ESTUDIANTES - DATOS DE DEMOSTRACIÓN */

export const GRUPOS_ESTUDIANTES = [
  {
    clave: "A-301",
    carrera: "Tecnologías de la Información"
  },
  {
    clave: "B-301",
    carrera: "Tecnologías de la Información"
  },
  {
    clave: "A-501",
    carrera: "Tecnologías de la Información"
  },
  {
    clave: "ADM-201",
    carrera: "Administración"
  },
  {
    clave: "MI-401",
    carrera: "Mantenimiento Industrial"
  }
];

export const ESTUDIANTES_DIRECCION = [
  {
    id: 1,
    matricula: "UTO26001",
    nombre: "Sofía Hernández",
    correo: "sofia.hernandez@example.com",
    carrera: "Tecnologías de la Información",
    grupo: "A-301",
    activo: true
  },
  {
    id: 2,
    matricula: "UTO26002",
    nombre: "Luis Martínez",
    correo: "luis.martinez@example.com",
    carrera: "Tecnologías de la Información",
    grupo: "B-301",
    activo: true
  },
  {
    id: 3,
    matricula: "UTO26003",
    nombre: "Valeria Gómez",
    correo: "valeria.gomez@example.com",
    carrera: "Administración",
    grupo: "ADM-201",
    activo: true
  },
  {
    id: 4,
    matricula: "UTO26004",
    nombre: "Diego Rodríguez",
    correo: "diego.rodriguez@example.com",
    carrera: "Mantenimiento Industrial",
    grupo: "MI-401",
    activo: true
  },
  {
    id: 5,
    matricula: "UTO26005",
    nombre: "Camila Torres",
    correo: "camila.torres@example.com",
    carrera: "Tecnologías de la Información",
    grupo: "A-501",
    activo: false
  }
];

// Registros usados únicamente para probar el botón
// de importación. No se lee todavía un archivo Excel.
export const ESTUDIANTES_IMPORTACION_DEMO = [
  {
    matricula: "UTO26006",
    nombre: "Daniela Flores",
    correo: "daniela.flores@example.com",
    carrera: "Administración",
    grupo: "ADM-201",
    activo: true
  },
  {
    matricula: "UTO26007",
    nombre: "Emiliano Cruz",
    correo: "emiliano.cruz@example.com",
    carrera: "Tecnologías de la Información",
    grupo: "A-301",
    activo: true
  }
];


/* ASIGNACIONES DE GRUPOS Y ASIGNATURAS */

export const ASIGNACIONES_DIRECCION = [
  {
    id: 1,
    grupo: "A-301",
    asignatura: "Programación Web",
    docenteId: 1
  },
  {
    id: 2,
    grupo: "B-301",
    asignatura: "Programación Web",
    docenteId: 1
  },
  {
    id: 3,
    grupo: "A-501",
    asignatura: "Bases de Datos",
    docenteId: 1
  },
  {
    id: 4,
    grupo: "ADM-201",
    asignatura: "Administración de Recursos",
    docenteId: 2
  },
  {
    id: 5,
    grupo: "ADM-301",
    asignatura: "Contabilidad",
    docenteId: 2
  },
  {
    id: 6,
    grupo: "MI-401",
    asignatura: "Mantenimiento Preventivo",
    docenteId: 3
  },
  {
    id: 7,
    grupo: "MI-401",
    asignatura: "Seguridad Industrial",
    docenteId: null
  }
];
