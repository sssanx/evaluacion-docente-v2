
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


/* PERIODOS ACADÉMICOS - DATOS SIMULADOS */

export const PERIODOS_DIRECCION = [
  {
    id: 1,
    nombre: "Enero – Abril 2026",
    fechaInicio: "2026-01-12",
    fechaFin: "2026-04-24",
    estado: "cerrado",
    descripcion: "Evaluación docente del primer periodo 2026"
  },
  {
    id: 2,
    nombre: "Septiembre – Diciembre 2026",
    fechaInicio: "2026-09-01",
    fechaFin: "2026-12-18",
    estado: "abierto",
    descripcion: "Periodo de evaluación docente actual"
  },
  {
    id: 3,
    nombre: "Enero – Abril 2027",
    fechaInicio: "2027-01-11",
    fechaFin: "2027-04-23",
    estado: "programado",
    descripcion: "Próximo periodo de evaluación docente"
  }
];


/* CUESTIONARIO DE EVALUACIÓN DOCENTE - DEMOSTRACIÓN */

export const CUESTIONARIO_DIRECCION = [
  {
    id: 1,
    nombre: "Desempeño docente",
    preguntas: [
      {
        id: 1,
        texto: "Dominio del tema",
        activa: true
      },
      {
        id: 2,
        texto: "Puntualidad y asistencia",
        activa: true
      }
    ]
  },
  {
    id: 2,
    nombre: "Metodología y desarrollo de la clase",
    preguntas: [
      {
        id: 3,
        texto: "Claridad al explicar",
        activa: true
      },
      {
        id: 4,
        texto: "Uso de recursos y tecnología",
        activa: true
      }
    ]
  },
  {
    id: 3,
    nombre: "Atención, comunicación y ambiente de aprendizaje",
    preguntas: [
      {
        id: 5,
        texto: "Trato respetuoso",
        activa: true
      },
      {
        id: 6,
        texto: "Retroalimentación de tareas",
        activa: true
      }
    ]
  }
];

export const ESCALA_EVALUACION = [
  { valor: 1, etiqueta: "Muy bajo" },
  { valor: 2, etiqueta: "Bajo" },
  { valor: 3, etiqueta: "Regular" },
  { valor: 4, etiqueta: "Bueno" },
  { valor: 5, etiqueta: "Excelente" }
];


/* RESULTADOS INSTITUCIONALES - DATOS SIMULADOS
   Cada registro representa una asignatura y grupo.
   Las calificaciones son promedios de ejemplo en escala 1 a 5.
*/

export const MIN_RESPUESTAS_RESULTADOS = 5;

export const RESULTADOS_INSTITUCIONALES_DEMO = [
  {
    id: 1,
    periodo: "Septiembre – Diciembre 2026",
    docente: "Juan Pérez",
    carrera: "Tecnologías de la Información",
    asignatura: "Programación Web",
    grupo: "A-301",
    inscritos: 35,
    respuestas: 28,
    secciones: {
      desempeno: 4.6,
      metodologia: 4.4,
      comunicacion: 4.7
    }
  },
  {
    id: 2,
    periodo: "Septiembre – Diciembre 2026",
    docente: "Juan Pérez",
    carrera: "Tecnologías de la Información",
    asignatura: "Programación Web",
    grupo: "B-301",
    inscritos: 30,
    respuestas: 22,
    secciones: {
      desempeno: 4.5,
      metodologia: 4.1,
      comunicacion: 4.3
    }
  },
  {
    id: 3,
    periodo: "Septiembre – Diciembre 2026",
    docente: "Juan Pérez",
    carrera: "Tecnologías de la Información",
    asignatura: "Bases de Datos",
    grupo: "A-501",
    inscritos: 32,
    respuestas: 3,
    secciones: {
      desempeno: 4.2,
      metodologia: 3.8,
      comunicacion: 4.1
    }
  },
  {
    id: 4,
    periodo: "Septiembre – Diciembre 2026",
    docente: "María López",
    carrera: "Administración",
    asignatura: "Administración de Recursos",
    grupo: "ADM-201",
    inscritos: 29,
    respuestas: 24,
    secciones: {
      desempeno: 4.3,
      metodologia: 4.2,
      comunicacion: 4.6
    }
  },
  {
    id: 5,
    periodo: "Septiembre – Diciembre 2026",
    docente: "María López",
    carrera: "Administración",
    asignatura: "Contabilidad",
    grupo: "ADM-301",
    inscritos: 25,
    respuestas: 18,
    secciones: {
      desempeno: 4.0,
      metodologia: 4.1,
      comunicacion: 4.4
    }
  },
  {
    id: 6,
    periodo: "Septiembre – Diciembre 2026",
    docente: "Carlos Ramírez",
    carrera: "Mantenimiento Industrial",
    asignatura: "Mantenimiento Preventivo",
    grupo: "MI-401",
    inscritos: 27,
    respuestas: 20,
    secciones: {
      desempeno: 3.9,
      metodologia: 3.8,
      comunicacion: 4.1
    }
  },
  {
    id: 7,
    periodo: "Enero – Abril 2026",
    docente: "Juan Pérez",
    carrera: "Tecnologías de la Información",
    asignatura: "Programación Web",
    grupo: "A-301",
    inscritos: 35,
    respuestas: 26,
    secciones: {
      desempeno: 4.2,
      metodologia: 4.0,
      comunicacion: 4.4
    }
  },
  {
    id: 8,
    periodo: "Enero – Abril 2026",
    docente: "María López",
    carrera: "Administración",
    asignatura: "Administración de Recursos",
    grupo: "ADM-201",
    inscritos: 29,
    respuestas: 20,
    secciones: {
      desempeno: 4.1,
      metodologia: 4.0,
      comunicacion: 4.3
    }
  },
  {
    id: 9,
    periodo: "Enero – Abril 2026",
    docente: "Carlos Ramírez",
    carrera: "Mantenimiento Industrial",
    asignatura: "Mantenimiento Preventivo",
    grupo: "MI-401",
    inscritos: 27,
    respuestas: 19,
    secciones: {
      desempeno: 3.8,
      metodologia: 3.7,
      comunicacion: 4.0
    }
  }
];


/* PLANES DE ACCIÓN Y SEGUIMIENTO - DEMOSTRACIÓN */

export const ESTADOS_PLAN_ACCION = [
  "Pendiente",
  "En proceso",
  "Completado"
];

export const PLANES_ACCION_DIRECCION = [
  {
    id: 1,
    reporteId: 1,
    periodo: "Septiembre – Diciembre 2026",
    areaOportunidad: "Retroalimentación de tareas",
    accion:
      "Establecer un calendario para entregar observaciones " +
      "a los estudiantes después de cada actividad.",
    responsable: "Juan Pérez",
    fechaImplementacion: "2026-10-20",
    fechaSeguimiento: "2026-11-05",
    evidencia: "",
    observaciones:
      "Revisar el avance durante la siguiente reunión académica.",
    estado: "Pendiente"
  },
  {
    id: 2,
    reporteId: 3,
    periodo: "Septiembre – Diciembre 2026",
    areaOportunidad: "Metodología de enseñanza",
    accion:
      "Incorporar ejercicios prácticos y actividades " +
      "de aplicación durante las sesiones.",
    responsable: "Carlos Ramírez",
    fechaImplementacion: "2026-10-19",
    fechaSeguimiento: "2026-11-10",
    evidencia: "Planeación didáctica actualizada (ejemplo).",
    observaciones: "Revisar las nuevas actividades implementadas.",
    estado: "En proceso"
  }
];
