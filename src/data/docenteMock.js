
/*
 * DATOS SIMULADOS DEL DOCENTE
 * Todos los módulos consultan este archivo.
 * Después se reemplazará por datos del backend.
 */

export const PERIODO_ACTUAL = "Septiembre – Diciembre 2026";

export const MIN_RESPUESTAS = 5;

// Autorización simulada.
// En producción el backend verificará los permisos.
export const REPORTE_AUTORIZADO_DEMO = true;

export const GRUPOS = [
  {
    id: 1,
    nombre: "Programación Web · A-301",
    asignatura: "Programación Web",
    grupo: "A-301",
    carrera: "Tecnologías de la Información",
    estudiantes: 35,
    respuestas: 28,
    promedio: 4.4
  },
  {
    id: 2,
    nombre: "Programación Web · B-301",
    asignatura: "Programación Web",
    grupo: "B-301",
    carrera: "Tecnologías de la Información",
    estudiantes: 30,
    respuestas: 22,
    promedio: 4.2
  },
  {
    id: 3,
    nombre: "Bases de Datos · A-501",
    asignatura: "Bases de Datos",
    grupo: "A-501",
    carrera: "Tecnologías de la Información",
    estudiantes: 32,
    respuestas: 3,
    promedio: null
  }
];

export const GRUPOS_PUBLICABLES = GRUPOS.filter(
  grupo => grupo.respuestas >= MIN_RESPUESTAS
);

export const TOTAL_RESPUESTAS = GRUPOS.reduce(
  (total, grupo) => total + grupo.respuestas,
  0
);

// Respuestas de grupos que cumplen el mínimo
// para mostrar resultados en la demostración.
export const EVALUACIONES_CONSIDERADAS =
  GRUPOS_PUBLICABLES.reduce(
    (total, grupo) => total + grupo.respuestas,
    0
  );

export const TOTAL_ESTUDIANTES = GRUPOS.reduce(
  (total, grupo) => total + grupo.estudiantes,
  0
);

export const PARTICIPACION = TOTAL_ESTUDIANTES > 0
  ? Math.round(
      (TOTAL_RESPUESTAS / TOTAL_ESTUDIANTES) * 100
    )
  : 0;

export const DOCENTE = {
  nombre: "Juan Pérez",
  correo: "Pendiente de configurar",
  rol: "Docente",
  departamento: "Tecnologías de la Información",
  carrera: "Tecnologías de la Información",
  periodo: PERIODO_ACTUAL,
  asignaturas: ["Programación Web", "Bases de Datos"],
  evaluaciones: EVALUACIONES_CONSIDERADAS
};

export const SECCIONES = [
  {
    id: 1,
    nombre: "Desempeño docente",
    preguntas: [
      {
        id: 1,
        nombre: "Dominio del tema",
        promedio: 4.6
      },
      {
        id: 2,
        nombre: "Puntualidad y asistencia",
        promedio: 4.5
      }
    ]
  },
  {
    id: 2,
    nombre: "Metodología y desarrollo de la clase",
    preguntas: [
      {
        id: 3,
        nombre: "Claridad al explicar",
        promedio: 4.3
      },
      {
        id: 4,
        nombre: "Uso de recursos y tecnología",
        promedio: 4.0
      }
    ]
  },
  {
    id: 3,
    nombre: "Atención, comunicación y ambiente de aprendizaje",
    preguntas: [
      {
        id: 5,
        nombre: "Trato respetuoso",
        promedio: 4.7
      },
      {
        id: 6,
        nombre: "Retroalimentación de tareas",
        promedio: 3.8
      }
    ]
  }
];

export const COMENTARIOS = [
  {
    id: 1,
    grupoId: 1,
    tipo: "fortaleza",
    texto:
      "Explica los temas de forma clara y utiliza ejemplos reales."
  },
  {
    id: 2,
    grupoId: 2,
    tipo: "sugerencia",
    texto:
      "Sería útil recibir retroalimentación de las tareas más rápido."
  },
  {
    id: 3,
    grupoId: 1,
    tipo: "fortaleza",
    texto:
      "Las prácticas de laboratorio ayudan a comprender la materia."
  },
  {
    id: 4,
    grupoId: 2,
    tipo: "sugerencia",
    texto:
      "Me gustaría tener más tiempo para resolver ejercicios."
  },
  {
    id: 5,
    grupoId: 1,
    tipo: "fortaleza",
    texto:
      "Siempre muestra disposición para resolver nuestras dudas."
  },
  {
    id: 6,
    grupoId: 2,
    tipo: "sugerencia",
    texto:
      "Podría compartir más materiales de apoyo para estudiar."
  }
];

export const COMENTARIOS_PUBLICABLES = COMENTARIOS.filter(
  comentario => GRUPOS_PUBLICABLES.some(
    grupo => grupo.id === comentario.grupoId
  )
);

// Funciones compartidas para resultados.
export const promedioDe = preguntas => {
  if (!preguntas.length) return 0;

  const suma = preguntas.reduce(
    (total, pregunta) => total + pregunta.promedio,
    0
  );

  return suma / preguntas.length;
};

export const SECCIONES_CON_PROMEDIO = SECCIONES.map(
  seccion => ({
    ...seccion,
    promedio: promedioDe(seccion.preguntas)
  })
);

export const TODAS_LAS_PREGUNTAS = SECCIONES.flatMap(
  seccion => seccion.preguntas
);

export const PROMEDIO_GENERAL = promedioDe(
  TODAS_LAS_PREGUNTAS
);

export const PREGUNTAS_ORDENADAS = [
  ...TODAS_LAS_PREGUNTAS
].sort((a, b) => b.promedio - a.promedio);

export const FORTALEZA = PREGUNTAS_ORDENADAS[0];
export const AREA_OPORTUNIDAD =
  PREGUNTAS_ORDENADAS[PREGUNTAS_ORDENADAS.length - 1];
