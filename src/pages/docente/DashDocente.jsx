import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./DashDocente.css";

/* ===== Datos simulados (después vienen del backend) ===== */
const DOCENTE_MOCK = {
  nombre: "Juan",
  apellido: "Pérez",
  departamento: "Tecnologías de la Información",
};

const PERIODO = {
  nombre: "Sept — Dic 2026",
  etiqueta: "Sep–Dic 26",
  cierre: new Date("2026-12-12T23:59:59"),
  cierreTexto: "12 de diciembre",
};

// Anonimato: no se muestran resultados de un grupo con menos respuestas que esto
const MIN_RESPUESTAS = 5;

// Periodos anteriores del docente y media de su carrera en cada uno
const HISTORIAL = [
  { etiqueta: "Ene–Abr 25", promedio: 3.8, carrera: 3.9 },
  { etiqueta: "Sep–Dic 25", promedio: 4.0, carrera: 3.9 },
  { etiqueta: "Ene–Abr 26", promedio: 4.1, carrera: 4.0 },
];
const CARRERA_ACTUAL = 4.0;

const GRUPOS_MOCK = [
  { id: 1, asignatura: "Programación Web", grupo: "A-301", respuestas: 28, total: 35, promedio: 4.4 },
  { id: 2, asignatura: "Programación Web", grupo: "B-301", respuestas: 22, total: 30, promedio: 4.2 },
  { id: 3, asignatura: "Bases de Datos", grupo: "A-501", respuestas: 3, total: 32, promedio: null },
];

// Cuántas calificaciones hubo de cada valor (grupos visibles, todos los criterios)
const DISTRIBUCION_MOCK = { 5: 138, 4: 120, 3: 30, 2: 9, 1: 3 };
const NIVELES = [
  { valor: 5, nombre: "Excelente", tipo: "fav" },
  { valor: 4, nombre: "Bueno", tipo: "fav" },
  { valor: 3, nombre: "Regular", tipo: "neu" },
  { valor: 2, nombre: "Bajo", tipo: "des" },
  { valor: 1, nombre: "Muy bajo", tipo: "des" },
];

// Escala de 1 a 5, agregada de los grupos visibles
const CRITERIOS_MOCK = [
  { id: 1, nombre: "Dominio del tema", valor: 4.6, anterior: 4.4, carrera: 4.3 },
  { id: 2, nombre: "Claridad al explicar", valor: 4.3, anterior: 4.1, carrera: 4.0 },
  { id: 3, nombre: "Puntualidad y asistencia", valor: 4.5, anterior: 4.5, carrera: 4.2 },
  { id: 4, nombre: "Trato respetuoso", valor: 4.7, anterior: 4.6, carrera: 4.4 },
  { id: 5, nombre: "Uso de recursos y tecnología", valor: 4.0, anterior: 3.7, carrera: 3.9 },
  { id: 6, nombre: "Retroalimentación de tareas", valor: 3.8, anterior: 3.9, carrera: 3.9 },
];

// Sin nombre ni dato alguno de quien escribió
const COMENTARIOS_MOCK = [
  { id: 1, grupoId: 1, tipo: "fortaleza", texto: "Explica con ejemplos reales y siempre resuelve las dudas al final de la clase." },
  { id: 2, grupoId: 2, tipo: "sugerencia", texto: "Me gustaría recibir la retroalimentación de las tareas con más rapidez." },
  { id: 3, grupoId: 1, tipo: "fortaleza", texto: "Las prácticas en laboratorio ayudan mucho a entender el tema." },
  { id: 4, grupoId: 2, tipo: "sugerencia", texto: "Las clases son claras, pero a veces falta tiempo para practicar." },
];

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "fortaleza", label: "Fortalezas" },
  { id: "sugerencia", label: "Sugerencias" },
];

const SECCIONES = [
  { id: "resumen", label: "Resumen" },
  { id: "criterios", label: "Criterios" },
  { id: "grupos", label: "Grupos" },
  { id: "comentarios", label: "Comentarios" },
];

const suma = (arr, fn) => arr.reduce((acc, x) => acc + fn(x), 0);
const redondea = (n) => Math.round(n * 10) / 10;
const signo = (n) => (redondea(n) > 0 ? "+" : redondea(n) < 0 ? "−" : "");

/* ===== Iconos ===== */
const Svg = ({ children, sw = 1.8 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const Icons = {
  logo: (
    <Svg sw={2}>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </Svg>
  ),
  resumen: (
    <Svg>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Svg>
  ),
  criterios: (
    <Svg>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </Svg>
  ),
  grupos: (
    <Svg>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  ),
  comentarios: (
    <Svg>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </Svg>
  ),
  user: (
    <Svg>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.7-4 3.4-6 8-6s7.3 2 8 6" />
    </Svg>
  ),
  ayuda: (
    <Svg>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </Svg>
  ),
  logout: (
    <Svg>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </Svg>
  ),
  print: (
    <Svg>
      <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </Svg>
  ),
  star: (
    <Svg>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
    </Svg>
  ),
  favorable: (
    <Svg>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12.5 2.8 2.8L16 9.5" />
    </Svg>
  ),
  trend: (
    <Svg>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  ),
  lock: (
    <Svg>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Svg>
  ),
};

/* Variación frente al periodo anterior */
function Delta({ valor }) {
  const r = redondea(valor);
  const tipo = r > 0 ? "up" : r < 0 ? "down" : "flat";
  const txt = r > 0 ? `▲ ${r.toFixed(1)}` : r < 0 ? `▼ ${Math.abs(r).toFixed(1)}` : "= 0.0";
  const label = r > 0 ? `Subió ${r.toFixed(1)}` : r < 0 ? `Bajó ${Math.abs(r).toFixed(1)}` : "Sin cambio";
  return (
    <span className={`dp-delta ${tipo}`} aria-label={`${label} frente al periodo anterior`}>
      {txt}
    </span>
  );
}

/* Gráfica de evolución: líneas en SVG + textos en HTML (se leen bien en móvil) */
function Tendencia({ puntos }) {
  const MIN = 3;
  const MAX = 5;
  const n = puntos.length;
  const x = (i) => ((i + 0.5) / n) * 100;
  const y = (v) => ((MAX - v) / (MAX - MIN)) * 100;
  const linea = (clave) => puntos.map((p, i) => `${x(i)},${y(p[clave])}`).join(" ");
  const descripcion = puntos.map((p) => `${p.etiqueta}: ${p.promedio.toFixed(1)}`).join(", ");

  return (
    <div className="dp-chart" role="img" aria-label={`Evolución de tu promedio. ${descripcion}`}>
      <div className="dp-plot">
        {[5, 4.5, 4, 3.5, 3].map((t) => (
          <div key={t} className="dp-gridline" style={{ top: `${y(t)}%` }}>
            <span>{t.toFixed(1)}</span>
          </div>
        ))}

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="dp-line-ref" points={linea("carrera")} />
          <polyline className="dp-line" points={linea("promedio")} />
        </svg>

        {puntos.map((p, i) => (
          <span
            key={p.etiqueta}
            className={`dp-pt${i === n - 1 ? " now" : ""}`}
            style={{ left: `${x(i)}%`, top: `${y(p.promedio)}%` }}
          >
            <b>{p.promedio.toFixed(1)}</b>
          </span>
        ))}

        {puntos.map((p, i) => (
          <span key={`l-${p.etiqueta}`} className="dp-xlabel" style={{ left: `${x(i)}%` }}>
            {p.etiqueta}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===== Componente principal ===== */
function DashDocentePro() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [seccion, setSeccion] = useState("resumen");
  const [filtro, setFiltro] = useState("todos");

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  const irA = (id) => {
    setSeccion(id);
    if (id === "resumen") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ----- Cálculos ----- */
  const visibles = GRUPOS_MOCK.filter((g) => g.respuestas >= MIN_RESPUESTAS);
  const hayResultados = visibles.length > 0;
  const respVisibles = suma(visibles, (g) => g.respuestas);
  const promedio = hayResultados ? suma(visibles, (g) => g.promedio * g.respuestas) / respVisibles : null;
  const anterior = HISTORIAL[HISTORIAL.length - 1].promedio;

  const totalResp = suma(GRUPOS_MOCK, (g) => g.respuestas);
  const totalEst = suma(GRUPOS_MOCK, (g) => g.total);
  const participacion = Math.round((totalResp / totalEst) * 100);

  const totalDist = suma(NIVELES, (n) => DISTRIBUCION_MOCK[n.valor]);
  const pctDe = (valor) => Math.round((DISTRIBUCION_MOCK[valor] / totalDist) * 100);
  const favorables = Math.round(((DISTRIBUCION_MOCK[5] + DISTRIBUCION_MOCK[4]) / totalDist) * 100);

  const ordenados = [...CRITERIOS_MOCK].sort((a, b) => b.valor - a.valor);
  const fortaleza = ordenados[0];
  const mejora = ordenados[ordenados.length - 1];

  const puntos = hayResultados
    ? [...HISTORIAL, { etiqueta: PERIODO.etiqueta, promedio: redondea(promedio), carrera: CARRERA_ACTUAL }]
    : [];

  const ahora = new Date();
  const cerrado = ahora > PERIODO.cierre;
  const dias = Math.max(0, Math.ceil((PERIODO.cierre - ahora) / 86400000));

  const grupoDe = (id) => GRUPOS_MOCK.find((g) => g.id === id);
  const etiquetaGrupo = (g) => `${g.asignatura} · ${g.grupo}`;

  // Comentarios: solo de grupos visibles
  const comentariosVisibles = COMENTARIOS_MOCK.filter((c) => {
    const g = grupoDe(c.grupoId);
    return g && g.respuestas >= MIN_RESPUESTAS;
  });
  const cuenta = (tipo) =>
    tipo === "todos" ? comentariosVisibles.length : comentariosVisibles.filter((c) => c.tipo === tipo).length;
  const comentarios = comentariosVisibles.filter((c) => filtro === "todos" || c.tipo === filtro);

  const iniciales = `${DOCENTE_MOCK.nombre[0]}${DOCENTE_MOCK.apellido[0]}`;

  // Resalta en el menú la sección que se está viendo
  useEffect(() => {
    const els = SECCIONES.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setSeccion(visible.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [hayResultados]);

  const iconoDe = { resumen: Icons.resumen, criterios: Icons.criterios, grupos: Icons.grupos, comentarios: Icons.comentarios };

  return (
    <div className="dp-page">
      {/* ============ SIDEBAR ============ */}
      <aside className="dp-sidebar">
        <div className="dp-brand">
          <span className="dp-logo">{Icons.logo}</span>
          <span className="dp-brand-text">UTO</span>
        </div>

        <nav className="dp-nav" aria-label="Principal">
          {SECCIONES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`dp-nav-item${seccion === s.id ? " active" : ""}`}
              aria-current={seccion === s.id ? "true" : undefined}
              onClick={() => irA(s.id)}
            >
              <span className="dp-nav-icon">{iconoDe[s.id]}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="dp-side-bottom">
          <button type="button" className="dp-nav-item">
            <span className="dp-nav-icon">{Icons.user}</span>
            Mi perfil
          </button>
          <button type="button" className="dp-nav-item">
            <span className="dp-nav-icon">{Icons.ayuda}</span>
            Ayuda
          </button>
          <button type="button" className="dp-nav-item" onClick={cerrarSesion}>
            <span className="dp-nav-icon">{Icons.logout}</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ============ PRINCIPAL ============ */}
      <div className="dp-main">
        <header className="dp-topbar">
          <div className="dp-mobile-brand">
            <span className="dp-logo">{Icons.logo}</span>
            <span className="dp-brand-text">UTO</span>
          </div>

          <div className="dp-top-actions">
            <button type="button" className="dp-btn" onClick={() => window.print()}>
              <span className="dp-btn-icon">{Icons.print}</span>
              <span className="dp-btn-text">Exportar PDF</span>
            </button>
            <div className="dp-user">
              <span className="dp-avatar" aria-hidden="true">{iniciales}</span>
              <span className="dp-user-name">
                <strong>{DOCENTE_MOCK.nombre} {DOCENTE_MOCK.apellido}</strong>
                <small>{DOCENTE_MOCK.departamento}</small>
              </span>
            </div>
            <button type="button" className="dp-logout-mobile" onClick={cerrarSesion} aria-label="Cerrar sesión">
              {Icons.logout}
            </button>
          </div>
        </header>

        <main className="dp-content">
          {/* ----- Encabezado ----- */}
          <div className="dp-head" id="resumen">
            <div>
              <h1>Resultados de evaluación</h1>
              <p>
                Prof. {DOCENTE_MOCK.nombre} {DOCENTE_MOCK.apellido} · Periodo {PERIODO.nombre} ·{" "}
                {cerrado ? "Periodo cerrado" : `Cierra el ${PERIODO.cierreTexto} (${dias} ${dias === 1 ? "día" : "días"})`}
              </p>
            </div>
            <p className="dp-privacy">
              <span className="dp-privacy-icon">{Icons.shield}</span>
              Resultados anónimos. Se muestran con un mínimo de {MIN_RESPUESTAS} respuestas por grupo.
            </p>
          </div>

          {/* ----- Indicadores ----- */}
          <section className="dp-kpis" aria-label="Indicadores principales">
            <article className="dp-kpi">
              <div className="dp-kpi-top">
                <span className="dp-kpi-icon">{Icons.star}</span>
                <span>Promedio general</span>
              </div>
              <strong className="dp-kpi-value">
                {hayResultados ? promedio.toFixed(1) : "—"}
                <small> / 5</small>
              </strong>
              <p className="dp-kpi-foot">
                {hayResultados ? (
                  <>
                    <Delta valor={promedio - anterior} /> vs periodo anterior
                  </>
                ) : (
                  "Sin respuestas suficientes"
                )}
              </p>
            </article>

            <article className="dp-kpi">
              <div className="dp-kpi-top">
                <span className="dp-kpi-icon">{Icons.favorable}</span>
                <span>Respuestas favorables</span>
              </div>
              <strong className="dp-kpi-value">{hayResultados ? `${favorables}%` : "—"}</strong>
              <p className="dp-kpi-foot">Calificaciones de 4 o 5</p>
            </article>

            <article className="dp-kpi">
              <div className="dp-kpi-top">
                <span className="dp-kpi-icon">{Icons.grupos}</span>
                <span>Participación</span>
              </div>
              <strong className="dp-kpi-value">{participacion}%</strong>
              <p className="dp-kpi-foot">
                {totalResp} de {totalEst} estudiantes
              </p>
            </article>

            <article className="dp-kpi">
              <div className="dp-kpi-top">
                <span className="dp-kpi-icon">{Icons.trend}</span>
                <span>Frente a tu carrera</span>
              </div>
              <strong className="dp-kpi-value">
                {hayResultados ? `${signo(promedio - CARRERA_ACTUAL)}${Math.abs(redondea(promedio - CARRERA_ACTUAL)).toFixed(1)}` : "—"}
              </strong>
              <p className="dp-kpi-foot">Media de tu carrera: {CARRERA_ACTUAL.toFixed(1)}</p>
            </article>
          </section>

          {hayResultados ? (
            <>
              {/* ----- Evolución + distribución ----- */}
              <section className="dp-row">
                <article className="dp-card">
                  <div className="dp-card-head">
                    <div>
                      <h2>Evolución de tu promedio</h2>
                      <p>Últimos {puntos.length} periodos</p>
                    </div>
                    <ul className="dp-legend">
                      <li><i className="dp-key line" /> Tu promedio</li>
                      <li><i className="dp-key ref" /> Media de tu carrera</li>
                    </ul>
                  </div>
                  <Tendencia puntos={puntos} />
                </article>

                <article className="dp-card">
                  <div className="dp-card-head">
                    <div>
                      <h2>Distribución de calificaciones</h2>
                      <p>{totalDist} calificaciones</p>
                    </div>
                  </div>

                  <ul className="dp-dist">
                    {NIVELES.map((n) => (
                      <li key={n.valor} className={`dp-dist-row ${n.tipo}`}>
                        <span className="dp-dist-label">
                          <b>{n.valor}</b> {n.nombre}
                        </span>
                        <span className="dp-dist-bar">
                          <i style={{ width: `${pctDe(n.valor)}%` }} />
                        </span>
                        <span className="dp-dist-pct">{pctDe(n.valor)}%</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              {/* ----- Criterios ----- */}
              <section className="dp-card" id="criterios">
                <div className="dp-card-head">
                  <div>
                    <h2>Resultados por criterio</h2>
                    <p>Escala de 1 a 5</p>
                  </div>
                  <ul className="dp-legend">
                    <li><i className="dp-key tick" /> Media de tu carrera</li>
                  </ul>
                </div>

                <ul className="dp-crit">
                  {CRITERIOS_MOCK.map((c) => (
                    <li key={c.id} className="dp-crit-row">
                      <span className="dp-crit-name">
                        {c.nombre}
                        {c.id === fortaleza.id && <span className="dp-tag ok">Fortaleza</span>}
                        {c.id === mejora.id && <span className="dp-tag warn">A mejorar</span>}
                      </span>
                      <span className="dp-crit-val">
                        {c.valor.toFixed(1)}
                        <Delta valor={c.valor - c.anterior} />
                      </span>
                      <span
                        className={`dp-track${c.id === mejora.id ? " low" : ""}`}
                        role="img"
                        aria-label={`${c.nombre}: ${c.valor.toFixed(1)} de 5. Media de tu carrera: ${c.carrera.toFixed(1)}`}
                      >
                        <i style={{ width: `${(c.valor / 5) * 100}%` }} />
                        <em style={{ left: `${(c.carrera / 5) * 100}%` }} title={`Carrera: ${c.carrera.toFixed(1)}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <section className="dp-card dp-locked">
              <span className="dp-locked-icon">{Icons.lock}</span>
              <div>
                <h2>Aún no hay suficientes respuestas</h2>
                <p>
                  Los resultados aparecen cuando un grupo reúne al menos {MIN_RESPUESTAS} respuestas. Así se protege el
                  anonimato de tus estudiantes.
                </p>
              </div>
            </section>
          )}

          {/* ----- Grupos ----- */}
          <section className="dp-card" id="grupos">
            <div className="dp-card-head">
              <div>
                <h2>Resultados por grupo</h2>
                <p>{GRUPOS_MOCK.length} grupos en este periodo</p>
              </div>
            </div>

            <table className="dp-table">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Participación</th>
                  <th>Promedio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {GRUPOS_MOCK.map((g) => {
                  const ok = g.respuestas >= MIN_RESPUESTAS;
                  const pct = Math.round((g.respuestas / g.total) * 100);
                  return (
                    <tr key={g.id}>
                      <td data-label="Grupo">
                        <strong>{g.asignatura}</strong>
                        <span>Grupo {g.grupo}</span>
                      </td>
                      <td data-label="Participación">
                        <div className="dp-part">
                          <span className="dp-bar">
                            <i style={{ width: `${pct}%` }} />
                          </span>
                          <span>
                            {g.respuestas} de {g.total} ({pct}%)
                          </span>
                        </div>
                      </td>
                      <td data-label="Promedio">
                        <strong className="dp-prom">{ok ? g.promedio.toFixed(1) : "—"}</strong>
                      </td>
                      <td data-label="Estado">
                        <span className={`dp-pill ${ok ? "ok" : "poco"}`}>{ok ? "Disponible" : "Pocas respuestas"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* ----- Comentarios ----- */}
          {hayResultados && (
            <section className="dp-card" id="comentarios">
              <div className="dp-card-head">
                <div>
                  <h2>Comentarios de tus estudiantes</h2>
                  <p>Sin nombres ni datos personales</p>
                </div>

                <div className="dp-tabs" role="tablist" aria-label="Tipo de comentario">
                  {FILTROS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={filtro === f.id}
                      className={filtro === f.id ? "active" : ""}
                      onClick={() => setFiltro(f.id)}
                    >
                      {f.label} <span>{cuenta(f.id)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {comentarios.length > 0 ? (
                <ul className="dp-comments">
                  {comentarios.map((c) => (
                    <li key={c.id} className="dp-comment">
                      <span className={`dp-tag ${c.tipo === "fortaleza" ? "ok" : "warn"}`}>
                        {c.tipo === "fortaleza" ? "Fortaleza" : "Sugerencia"}
                      </span>
                      <p>“{c.texto}”</p>
                      <span className="dp-comment-src">{etiquetaGrupo(grupoDe(c.grupoId))}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="dp-empty">No hay comentarios de este tipo.</p>
              )}
            </section>
          )}
        </main>
      </div>

      {/* Navegación inferior (solo móvil/tablet) */}
      <nav className="dp-bottom-nav" aria-label="Principal móvil">
        {SECCIONES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`dp-bnav-item${seccion === s.id ? " active" : ""}`}
            onClick={() => irA(s.id)}
          >
            <span className="dp-bnav-icon">{iconoDe[s.id]}</span>
            {s.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default DashDocentePro;
