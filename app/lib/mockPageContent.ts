export const PAGE_CONTENT: Record<string, any> = {
    // ADMINISTRACIÓN
    "control-permisos": {
        title: "Control de Permisos",
        description: "Gestión centralizada de roles y control de acceso basado en roles (RBAC).",
        type: "table",
        columns: ["Usuario", "Rol", "Módulos Asignados", "Nivel Acceso", "Último Login", "Estado"],
        data: [
            { user: "admin.central", rol: "Super Administrador", mod: "Todos", nivel: "L1 (Root)", last: "Ahora", status: "Activo" },
            { user: "operador.norte", rol: "Operador Regional", mod: "Gestión, Monitoreo", nivel: "L2", last: "Hace 15m", status: "Activo" },
            { user: "auditor.externo", rol: "Auditor", mod: "Solo Lectura", nivel: "L3", last: "Hace 2h", status: "Activo" },
            { user: "digitador.baq", rol: "Digitador", mod: "Ingreso Actas", nivel: "L4", last: "Ayer", status: "Inactivo" },
            { user: "supervisor.ant", rol: "Supervisor", mod: "Validación", nivel: "L2", last: "Hace 5m", status: "Activo" },
        ]
    },
    "dispositivos": {
        title: "Inventario de Dispositivos",
        description: "Monitoreo de terminales de transmisión E-14 y biométricos.",
        type: "table",
        columns: ["Serial", "Modelo", "Ubicación (Puesto)", "Estado Red", "Batería", "Firmware", "Último Ping"],
        data: [
            { ser: "DEV-8823", mod: "Biometric X1", loc: "Bogotá - Corferias", net: "4G LTE", bat: "98%", fw: "v2.1.0", ping: "2ms" },
            { ser: "DEV-1120", mod: "Scanner Pro", loc: "Medellín - Plaza Mayor", net: "WiFi 6", bat: "85%", fw: "v2.1.0", ping: "12ms" },
            { ser: "DEV-5541", mod: "Tablet E-14", loc: "Cali - Coliseo", net: "5G", bat: "12%", fw: "v2.0.9", ping: "45ms" },
            { ser: "DEV-9932", mod: "Biometric X1", loc: "Barranquilla - Estadio", net: "4G LTE", bat: "100%", fw: "v2.1.0", ping: "8ms" },
            { ser: "DEV-2210", mod: "Gateway LoRa", loc: "Chocó - Rural", net: "Satelital", bat: "45%", fw: "v1.5.0", ping: "800ms" },
        ],
        chartData: {
            connected: {
                value: 99.8,
                metrics: [
                    { label: "Hash Válido", value: "99.8%", color: "green" },
                    { label: "Firma Digital", value: "99.5%", color: "blue" },
                    { label: "Sello Tiempo", value: "98.9%", color: "green" },
                    { label: "Geolocalización", value: "96.2%", color: "blue" }
                ]
            },
            disconnected: {
                total: 166,
                breakdown: [
                    { name: "Dif. Imagen/Dato", value: 12, color: "#E31A1C" },
                    { name: "Geo inconsistente", value: 34, color: "#FFB547" },
                    { name: "Hora anómala", value: 120, color: "#05CD99" }
                ],
                metrics: [
                    { label: "ALTAS", value: "12" },
                    { label: "MEDIAS", value: "34" },
                    { label: "BAJAS", value: "120" }
                ]
            },
            sentInfo: {
                value: 99.8,
                metrics: [
                    { label: "Hash Válido", value: "99.8%", color: "green" },
                    { label: "Firma Digital", value: "99.5%", color: "blue" },
                    { label: "Sello Tiempo", value: "98.9%", color: "green" },
                    { label: "Geolocalización", value: "96.2%", color: "blue" }
                ]
            },
            pendingInfo: {
                total: 166,
                breakdown: [
                    { name: "Dif. Imagen/Dato", value: 12, color: "#E31A1C" },
                    { name: "Geo inconsistente", value: 34, color: "#FFB547" },
                    { name: "Hora anómala", value: 120, color: "#05CD99" }
                ],
                metrics: [
                    { label: "ALTAS", value: "12" },
                    { label: "MEDIAS", value: "34" },
                    { label: "BAJAS", value: "120" }
                ]
            },
            incidents: {
                total: 166,
                breakdown: [
                    { name: "Dif. Imagen/Dato", value: 12, color: "#E31A1C" },
                    { name: "Geo inconsistente", value: 34, color: "#FFB547" },
                    { name: "Hora anómala", value: 120, color: "#05CD99" }
                ],
                metrics: [
                    { label: "ALTAS", value: "12" },
                    { label: "MEDIAS", value: "34" },
                    { label: "BAJAS", value: "120" }
                ]
            }
        }
    },
    "gestion-usuarios": {
        title: "Gestión de Usuarios Operativos",
        description: "Administración del ciclo de vida de las cuentas de usuario.",
        type: "table",
        columns: ["Nombre Completo", "Correo Corporativo", "Cargo", "Departamento", "Fecha Alta", "2FA"],
        data: [
             { nom: "Carlos Pérez", email: "c.perez@registraduria.gov.co", cargo: "Coordinador TIC", dep: "Bogotá", alta: "2025-11-01", mfa: "Sí" },
             { nom: "Ana Gómez", email: "a.gomez@registraduria.gov.co", cargo: "Analista de Datos", dep: "Antioquia", alta: "2026-02-15", mfa: "Sí" },
             { nom: "Luis Díaz", email: "l.diaz@proveedor.com", cargo: "Técnico Campo", dep: "Valle", alta: "2026-03-01", mfa: "No" },
        ]
    },
    "permisos": { 
        title: "Matriz de Permisos", 
        description: "Configuración granular de ACLs por objeto y acción.", 
        type: "grid", 
        data: [
            { title: "Escritura Base de Datos", status: "Restringido (Admin)", img: "https://placehold.co/400x200/4318FF/FFFFFF/png?text=DB+Write" },
            { title: "Lectura Resultados", status: "Público", img: "https://placehold.co/400x200/05CD99/FFFFFF/png?text=Read+Results" },
            { title: "Eliminación Registros", status: "Prohibido", img: "https://placehold.co/400x200/E31A1C/FFFFFF/png?text=Delete+Log" },
        ]
    },
    "usuarios": { 
        title: "Directorio General", 
        description: "Listado maestro de todo el personal involucrado.", 
        type: "stats", 
        data: [
            { label: "Total Usuarios", value: "1,245" },
            { label: "Activos Ahora", value: "850" },
            { label: "Bloqueados", value: "12" }
        ] 
    },

    // GESTIÓN
    "actas-escaneadas": {
        title: "Repositorio de Actas E-14",
        description: "Visualización y auditoría de documentos digitalizados en tiempo real.",
        type: "grid",
        data: [
            { title: "Mesa 101 - Bogotá", status: "Validada", img: "/images/acta-sample.jpeg" },
            { title: "Mesa 204 - Cali", status: "Revisión", img: "/images/acta-sample.jpeg" },
            { title: "Mesa 305 - Medellín", status: "Validada", img: "/images/acta-sample.jpeg" },
            { title: "Mesa 004 - Rural", status: "Ilegible", img: "/images/acta-sample.jpeg" },
            { title: "Mesa 555 - Barranquilla", status: "Validada", img: "/images/acta-sample.jpeg" },
            { title: "Mesa 888 - Tunja", status: "Validada", img: "/images/acta-sample.jpeg" },
        ]
    },
    "cobertura-region": {
        title: "Cobertura Detallada por Región",
        description: "Avance de transmisión de mesas el día de votaciones (simulación realista Colombia).",
        type: "table",
        columns: ["Región", "Mesas Totales", "Mesas Informadas", "% Avance", "Votos Totales", "Tendencia Transmisión"],
        data: [
            { region: "Andina", total: "52,000", inf: "46,800", avance: "90.0%", votos: "14.25M", tendencia: "Alta – zonas urbanas" },
            { region: "Caribe", total: "26,500", inf: "17,600", avance: "66.4%", votos: "6.10M", tendencia: "Media – transmisión tardía rural" },
            { region: "Pacífico", total: "18,200", inf: "9,800", avance: "53.8%", votos: "3.20M", tendencia: "Baja – conectividad limitada" },
            { region: "Orinoquía", total: "6,400", inf: "5,980", avance: "93.4%", votos: "1.25M", tendencia: "Alta – pocas mesas, rápido cierre" },
            { region: "Amazonía", total: "3,100", inf: "820", avance: "26.4%", votos: "210K", tendencia: "Muy baja – acceso fluvial" }
        ]
    },
    "estadisticas": { 
        title: "Estadísticas Globales y Proyecciones", 
        description: "Análisis nacional – simulación técnica preconteo", 
        type: "stats", 
        data: [
            { label: "Participación Total", value: "63.1%", color: "#05CD99", trend: "+3.8% vs elección anterior" },
            { label: "Abstención", value: "36.9%", color: "#FFB547", trend: "-3.8%" },
            { label: "Votos en Blanco", value: "2.4%", color: "#A3AED0", trend: "Leve alza urbana" },
            { label: "Votos Nulos", value: "0.9%", color: "#E31A1C", trend: "+0.1%" },
            { label: "Votos Válidos", value: "96.7%", color: "#4318FF", trend: "Alta confiabilidad" },
            { label: "Proyección Cierre Preconteo", value: "19:20", color: "#7551FF", trend: "Amazonía y Pacífico pendientes" }
        ]
    },
    "mapa-electoral": { 
        title: "Georreferenciación Electoral", 
        description: "Mapa térmico de votación a nivel municipal.", 
        type: "text", 
        content: "El módulo de mapa a pantalla completa está cargando las capas vectoriales de los 1,102 municipios..." 
    },
    "registro-cambios": { 
        title: "Log de Auditoría (Blockchain)", 
        description: "Registro inmutable de todas las transacciones del sistema.", 
        type: "table", 
        columns: ["Timestamp UTC", "Actor ID", "Acción Realizada", "Recurso Afectado", "Hash SHA-256"], 
        data: [
            { time: "18:30:01", actor: "System Worker", action: "Sync Data", res: "Batch #442", hash: "8a7b...9cc1" },
            { time: "18:29:55", actor: "User Admin", action: "Approve E-14", res: "Mesa 102", hash: "1d4f...2e3a" },
            { time: "18:28:12", actor: "Gatekeeper", action: "Open Port", res: "VPN Tunnel", hash: "99aa...11bb" },
        ] 
    },
    "registro": { title: "Registro de Contingencia", description: "Formulario de ingreso manual para mesas sin conectividad.", type: "text", content: "Formulario habilitado solo para usuarios con permisos nivel Supervidor." },
    "reporte-anomalias": { 
        title: "Centro de Alertas y Anomalías", 
        description: "Gestión de incidentes de seguridad e integridad.", 
        type: "table", 
        columns: ["ID Caso", "Severidad", "Categoría", "Descripción", "Tiempo Abierto", "Estado"], 
        data: [
            { id: "CASE-99", sev: "CRITICAL", cat: "Integridad", desc: "Firma digital inválida Mesa 205", time: "10 min", estado: "Investigando" },
            { id: "CASE-98", sev: "HIGH", cat: "Red", desc: "Pérdida conectividad Chocó", time: "35 min", estado: "Escalado" },
            { id: "CASE-97", sev: "MEDIUM", cat: "Logística", desc: "Retraso apertura Mesa 10", time: "4 horas", estado: "Resuelto" },
        ] 
    },
    "resultados": { 
        title: "Resultados Electorales Detallados", 
        description: "Consolidado nacional por agrupación política.", 
        type: "table", 
        columns: ["Candidato / Partido", "Votos Totales", "Porcentaje", "Votos Urbanos", "Votos Rurales", "Variación vs 2022"], 
        data: [
            { can: "Iván Cepeda", tot: "4,520,100", pct: "45.2%", urb: "3.1M", rur: "1.4M", var: "+12%" },
            { can: "Abelardo de la Espriella", tot: "3,890,200", pct: "38.9%", urb: "2.8M", rur: "1.0M", var: "+5%" },
            { can: "Voto en Blanco", tot: "250,000", pct: "2.5%", urb: "200K", rur: "50K", var: "-1%" },
            { can: "Nulos", tot: "120,000", pct: "1.2%", urb: "100K", rur: "20K", var: "0%" },
        ],
        evolutionData: [
            { time: "16:00", candidate1: 150000, candidate2: 120000, candidate3: 10000 },
            { time: "16:30", candidate1: 850000, candidate2: 780000, candidate3: 45000 },
            { time: "17:00", candidate1: 1800000, candidate2: 1650000, candidate3: 90000 },
            { time: "17:30", candidate1: 2900000, candidate2: 2400000, candidate3: 150000 },
            { time: "18:00", candidate1: 3800000, candidate2: 3100000, candidate3: 200000 },
            { time: "18:30", candidate1: 4200000, candidate2: 3600000, candidate3: 230000 },
            { time: "19:00", candidate1: 4520100, candidate2: 3890200, candidate3: 250000 },
        ]
    },
    "validacion-datos": { 
        title: "Motor de Validación", 
        description: "Dashboard centralizado de calidad de datos, riesgos e integridad electoral.", 
        type: "validation-dashboard", 
        data: {
            kpis: {
                executedRules: "1.5M",
                failures: "0",
                votes: "1.234.567",
                difference: "+ 6.2%",
                trustIndex: "98.4%"
            },
            mainCard: {
                title: "Mesas Informadas",
                value: "12.345",
                subValue: "/ 19.800 Totales"
            },
            candidate: {
                label: "Candidato Lider",
                name: "Iván Cepeda",
                trend: "Tendencia clara"
            },
            integrity: {
                score: 99.8,
                hash: "99.8%",
                signature: "99.5%",
                timestamp: "98.9%",
                geo: "96.2%"
            },
            alerts: {
                total: 166,
                high: 12,
                medium: 34,
                low: 120
            },
            riskDetailed: {
                zones: [
                    { id: "ant", name: "Antioquia", x: 30, y: 32, level: "high" },
                    { id: "cho", name: "Chocó", x: 18, y: 38, level: "extreme" },
                    { id: "val", name: "Valle", x: 20, y: 58, level: "high" },
                    { id: "cau", name: "Cauca", x: 20, y: 68, level: "extreme" },
                    { id: "nar", name: "Nariño", x: 15, y: 80, level: "extreme" },
                    { id: "put", name: "Putumayo", x: 25, y: 85, level: "high" },
                    { id: "caq", name: "Caquetá", x: 35, y: 78, level: "medium" },
                    { id: "met", name: "Meta", x: 45, y: 58, level: "medium" },
                    { id: "guv", name: "Guaviare", x: 52, y: 68, level: "medium" },
                    { id: "vic", name: "Vichada", x: 78, y: 48, level: "low" },
                    { id: "ara", name: "Arauca", x: 63, y: 32, level: "high" },
                    { id: "nor", name: "Norte de Santander", x: 51, y: 23, level: "extreme" },
                    { id: "bol", name: "Bolívar", x: 33, y: 18, level: "high" },
                    { id: "atl", name: "Atlántico", x: 32, y: 8, level: "medium" },
                    { id: "guaj", name: "La Guajira", x: 52, y: 5, level: "high" },
                    { id: "bog", name: "Bogotá", x: 38, y: 50, level: "medium" },
                ],
                stats: {
                    extreme: { count: 40, label: "Riesgo Extremo", color: "#E31A1C" },
                    high: { count: 66, label: "Riesgo Alto", color: "#FFB547" },
                    medium: { count: 46, label: "Riesgo Medio", color: "#FFEB3B" } // Adjusted to yellow for medium
                },
                history: [
                    { year: "2015", extreme: 59, high: 89, medium: 56 },
                    { year: "2019", extreme: 40, high: 66, medium: 46 },
                ]
            },
            processedE14: {
                amount: "165.520",
                change: "25.30%"
            },
            validVotes: {
                amount: "356.260",
                change: "20.18%"
            },
            alertsMetric: {
                amount: "190.450",
                change: "18.50%"
            },
            highRiskMetric: {
                amount: "15.450",
                change: "5.50%"
            },
            riskometer: {
                value: 95.5,
                percentage: 98.5,
                label: "Confiable"
            },
            detailedTable: [
                { 
                    mesa: "Mesa 01", 
                    municipio: "Bogotá, D.C.", 
                    score: "98/100", 
                    estado: "Válido", 
                    alertas: "Sin alertas",
                    witness: {
                        name: "Ramón Lozano",
                        role: "Testigo Electoral",
                        id: "96.452.XXX",
                        email: "ramon.lozano@email.com",
                        phone: "302 456 7890",
                        leader: "Andrea Cárdenas",
                        department: "Bogotá",
                        municipio: "Bogotá, D.C.",
                        lugar: "COLEGIO SAN FACON",
                        zona: "01",
                        puesto: "44",
                        mesa: "02",
                        status: "Activo - En el lugar",
                        confirmed: true
                    }
                },
                { 
                    mesa: "Mesa 04", 
                    municipio: "Medellín", 
                    score: "45/100", 
                    estado: "Riesgo Alto", 
                    alertas: "E-14 Alterado",
                    witness: {
                        name: "Luisa Fernanda",
                        role: "Testigo Electoral",
                        id: "52.123.XXX",
                        email: "luisa.fer@email.com",
                        phone: "311 123 4567",
                        leader: "Carlos Perez",
                        department: "Antioquia",
                        municipio: "Medellín",
                        lugar: "INST. TECNICO INDUSTRIAL",
                        zona: "12",
                        puesto: "05",
                        mesa: "04",
                        status: "Inactivo",
                        confirmed: false
                    }
                },
                { 
                    mesa: "Mesa 12", 
                    municipio: "Cali", 
                    score: "76/100", 
                    estado: "Riesgo Medio", 
                    alertas: "Inconsistencia",
                    witness: {
                        name: "Jorge Martinez",
                        role: "Testigo Electoral",
                        id: "79.852.XXX",
                        email: "jorge.mtz@email.com",
                        phone: "300 987 6543",
                        leader: "Maria Rodriguez",
                        department: "Valle del Cauca",
                        municipio: "Cali",
                        lugar: "COLISEO DEL PUEBLO",
                        zona: "03",
                        puesto: "21",
                        mesa: "12",
                        status: "Activo - En el lugar",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 08",
                    municipio: "Barranquilla",
                    score: "92/100",
                    estado: "Válido",
                    alertas: "Control superado",
                    witness: {
                        name: "Ricardo Suarez",
                        role: "Testigo Electoral",
                        id: "12.345.XXX",
                        email: "ricardo.s@email.com",
                        phone: "315 789 1234",
                        leader: "Javier Moreno",
                        department: "Atlántico",
                        municipio: "Barranquilla",
                        lugar: "INSTITUCIÓN EDUCATIVA DISTRITAL",
                        zona: "05",
                        puesto: "02",
                        mesa: "08",
                        status: "Activo",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 15",
                    municipio: "Cartagena",
                    score: "88/100",
                    estado: "Válido",
                    alertas: "Sin alertas",
                    witness: {
                        name: "Elena Torres",
                        role: "Testigo Electoral",
                        id: "45.678.XXX",
                        email: "elena.t@email.com",
                        phone: "318 456 7890",
                        leader: "Roberto Diaz",
                        department: "Bolívar",
                        municipio: "Cartagena",
                        lugar: "UNIVERSIDAD TECNOLÓGICA",
                        zona: "02",
                        puesto: "08",
                        mesa: "15",
                        status: "Activo",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 22",
                    municipio: "Bucaramanga",
                    score: "65/100",
                    estado: "Riesgo Medio",
                    alertas: "Error sumatoria",
                    witness: {
                        name: "Mario Gomez",
                        role: "Testigo Electoral",
                        id: "33.221.XXX",
                        email: "mario.g@email.com",
                        phone: "320 111 2233",
                        leader: "Sofia Luna",
                        department: "Santander",
                        municipio: "Bucaramanga",
                        lugar: "ESC. NORMAL SUPERIOR",
                        zona: "08",
                        puesto: "12",
                        mesa: "22",
                        status: "Activo",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 31",
                    municipio: "Cúcuta",
                    score: "35/100",
                    estado: "Riesgo Alto",
                    alertas: "Tachaduras",
                    witness: {
                        name: "Felipe Ruiz",
                        role: "Testigo Electoral",
                        id: "13.442.XXX",
                        email: "felipe.r@email.com",
                        phone: "312 333 4455",
                        leader: "Gabriel Santos",
                        department: "Norte de Santander",
                        municipio: "Cúcuta",
                        lugar: "CENTRO EDUCATIVO EL PROGRESO",
                        zona: "04",
                        puesto: "15",
                        mesa: "31",
                        status: "Pendiente",
                        confirmed: false
                    }
                },
                {
                    mesa: "Mesa 05",
                    municipio: "Pereira",
                    score: "83/100",
                    estado: "Válido",
                    alertas: "Sin alertas",
                    witness: {
                        name: "Natalia Castro",
                        role: "Testigo Electoral",
                        id: "24.551.XXX",
                        email: "natalia.c@email.com",
                        phone: "313 555 6677",
                        leader: "Paula Rincon",
                        department: "Risaralda",
                        municipio: "Pereira",
                        lugar: "COLEGIO DE OCCIDENTE",
                        zona: "01",
                        puesto: "10",
                        mesa: "05",
                        status: "Activo",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 10",
                    municipio: "Santa Marta",
                    score: "95/100",
                    estado: "Válido",
                    alertas: "Sin alertas",
                    witness: {
                        name: "Andres Gil",
                        role: "Testigo Electoral",
                        id: "19.882.XXX",
                        email: "andres.gil@email.com",
                        phone: "310 882 1100",
                        leader: "Juan Carlos",
                        department: "Magdalena",
                        municipio: "Santa Marta",
                        lugar: "IE MANUEL RODRIGUEZ",
                        zona: "03",
                        puesto: "05",
                        mesa: "10",
                        status: "Activo",
                        confirmed: true
                    }
                },
                {
                    mesa: "Mesa 03",
                    municipio: "Ibagué",
                    score: "89/100",
                    estado: "Válido",
                    alertas: "Sin alertas",
                    witness: {
                        name: "Claudia Mora",
                        role: "Testigo Electoral",
                        id: "65.334.XXX",
                        email: "claudia.m@email.com",
                        phone: "316 333 4444",
                        leader: "Diana Rojas",
                        department: "Tolima",
                        municipio: "Ibagué",
                        lugar: "COLEGIO LEONIDAS RUBIO",
                        zona: "05",
                        puesto: "18",
                        mesa: "03",
                        status: "Activo",
                        confirmed: true
                    }
                }
            ],
            auditList: [
                { name: "Mesa 442 - Norte", value: "Riesgo Alto", status: "ver", change: "Prioridad 1" },
                { name: "Puesto Corferias", value: "Inconsistencia", status: "ver", change: "Prioridad 1" },
                { name: "Mesa 102 - Sur", value: "Firma Inválida", status: "ver", change: "Prioridad 2" },
                { name: "Puesto Kennedy", value: "Hora Anómala", status: "ver", change: "Prioridad 2" },
                { name: "Mesa 88 - Centro", value: "Sin Transmisión", status: "ver", change: "Prioridad 3" }
            ],
            resolvedList: [
                { name: "Mesa 10 - Tunja", value: "Validada", status: "Resuelta", change: "OK" },
                { name: "Puesto 4 - Cali", value: "Revisada", status: "en proceso", change: "Analizando" },
                { name: "Mesa 55 - B.quilla", value: "Descalificada", status: "Riesgo", change: "Anulada" },
                { name: "Mesa 12 - Pasto", value: "Pendiente", status: "pendiente", change: "En cola" },
                { name: "Mesa 9 - Cúcuta", value: "Corregida", status: "Hecho", change: "OK" }
            ]
        }
    },
    "validacion": { title: "Dashboard de Calidad", description: "Métricas de calidad del dato.", type: "text", content: "Calidad del dato al 99.99%." },

    // MONITOREO
    "cobertura": { 
        title: "Monitor de Cobertura en Tiempo Real", 
        description: "Seguimiento al despliegue y recepción de información.", 
        type: "stats", 
        data: [
            { label: "Total Nacional", value: "85.4%" },
            { label: "Zona Urbana", value: "92.1%" },
            { label: "Zona Rural", value: "65.3%" },
            { label: "Consulados", value: "45.0%" },
        ] 
    },
    
    // GENERAL
    "actas": { 
        title: "Buscador Público de Actas E-14", 
        description: "Últimas actas digitalizadas disponibles para consulta pública.", 
        type: "table", 
        columns: ["Código Mesa", "Departamento", "Municipio", "Zona", "Hora Digitalización", "Enlace"],
        data: [
            { cod: "11001-01-001", dep: "Bogotá D.C.", mun: "Bogotá", zon: "Urbana", hora: "18:45:12", link: "Ver PDF" },
            { cod: "05001-02-014", dep: "Antioquia", mun: "Medellín", zon: "Urbana", hora: "18:44:55", link: "Ver PDF" },
            { cod: "76001-01-099", dep: "Valle", mun: "Cali", zon: "Urbana", hora: "18:44:30", link: "Ver PDF" },
            { cod: "08001-01-005", dep: "Atlántico", mun: "Barranquilla", zon: "Urbana", hora: "18:44:10", link: "Ver PDF" },
            { cod: "13001-03-022", dep: "Bolívar", mun: "Cartagena", zon: "Rural", hora: "18:43:45", link: "Ver PDF" },
        ] 
    },
    "documentacion": { title: "Documentación del Sistema", description: "Manuales técnicos y guías operativas.", type: "grid", data: [ {title: "Manual Usuario v2", status: "PDF", img: "https://placehold.co/200x250/eee/333?text=Manual"}, {title: "Guía Técnica API", status: "HTML", img: "https://placehold.co/200x250/eee/333?text=API+Docs"}, {title: "Protocolo de Contingencia", status: "DOCX", img: "https://placehold.co/200x250/eee/333?text=Protocolo"} ] },
    "reportes": { 
        title: "Centro de Reportes", 
        description: "Historial de informes generados y disponibles para descarga.", 
        type: "table", 
        columns: ["ID Reporte", "Tipo de Informe", "Formato", "Solicitado Por", "Fecha Generación", "Tamaño"], 
        data: [
            { id: "REP-2026-001", tipo: "Boletín Parcial #14", fmt: "PDF", by: "Automático", date: "18:00", size: "1.2 MB" },
            { id: "REP-2026-002", tipo: "Consolidado Dept.", fmt: "Excel", by: "Admin Central", date: "17:30", size: "4.5 MB" },
            { id: "REP-2026-003", tipo: "Log de Auditoría", fmt: "CSV", by: "Auditor Ext.", date: "17:00", size: "125 MB" },
            { id: "REP-2026-004", tipo: "Alertas de Seguridad", fmt: "PDF", by: "Monitor Red", date: "16:45", size: "0.8 MB" },
        ] 
    },
    "soporte": { 
        title: "Mesa de Ayuda - Tickets Recientes", 
        description: "Estado de las solicitudes de soporte técnico.", 
        type: "table",
        columns: ["# Ticket", "Asunto", "Prioridad", "Reportado Por", "Tiempo Resp.", "Estado"],
        data: [
            { id: "TCK-9281", asu: "Error login biométrico", prio: "Alta", por: "Mesa 104", tiempo: "5 min", est: "En Proceso" },
            { id: "TCK-9280", asu: "Solicitud papel extra", prio: "Baja", por: "Mesa 88", tiempo: "1 hora", est: "Resuelto" },
            { id: "TCK-9279", asu: "Fallo conectividad", prio: "Media", por: "Mesa 12", tiempo: "20 min", est: "Cerrado" },
        ]
    },
    "transmision": { 
        title: "Salud de la Red de Transmisión", 
        description: "Monitor de infraestructura de comunicaciones.", 
        type: "stats", 
        data: [
            { label: "Gateway Principal", value: "ONLINE" },
            { label: "Gateway Respaldo", value: "STANDBY" },
            { label: "Latencia Promedio", value: "45ms" },
            { label: "Paquetes/Seg", value: "15k" },
            { label: "Encriptación", value: "AES-256" },
            { label: "Intentos Fallidos", value: "0.01%" },
        ] 
    },
    "testigos": {
        title: "Base de Datos - Testigos Electorales",
        description: "Gestión y monitoreo de la red de testigos en tiempo real.",
        type: "witness-database",
        data: {
            stats: {
                total: 512,
                connected: 29,
                highRisk: 6,
                withAlert: 20
            },
            witnesses: [
                {
                    id: "96.452.987",
                    name: "Ramón Lozano",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    email: "ramon.lozano@email.com",
                    phone: "302 456 8912",
                    leader: "Andrea Cárdenas",
                    department: "Bogotá",
                    municipio: "Bogotá, D.C.",
                    lugar: "01",
                    zona: "44",
                    puesto: "44",
                    mesa: "02",
                    status: "Conectado",
                    isExpanded: true
                },
                {
                    id: "1.090.543.826",
                    name: "Diana Cáceres",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    email: "diana.c@email.com",
                    phone: "315 678 9012",
                    leader: "Luis Torres",
                    department: "Cundinamarca",
                    municipio: "Soacha",
                    lugar: "02",
                    zona: "10",
                    puesto: "05",
                    mesa: "12",
                    status: "Conectado"
                },
                {
                    id: "79.384.651",
                    name: "Carlos Marín",
                    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
                    email: "carlos.m@email.com",
                    phone: "316 567 8901",
                    leader: "Andrea Cárdenas",
                    department: "Valle del Cauca",
                    municipio: "Cali",
                    lugar: "05",
                    zona: "03",
                    puesto: "21",
                    mesa: "08",
                    status: "Desconectado"
                },
                {
                    id: "1.116.741.528",
                    name: "Gabriela León",
                    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
                    email: "gabriela.l@email.com",
                    phone: "319 678 2010",
                    leader: "Carlos Perez",
                    department: "Boyacá",
                    municipio: "Tunja",
                    lugar: "01",
                    zona: "01",
                    puesto: "02",
                    mesa: "15",
                    status: "Pendiente"
                }
            ]
        }
    }
};

export const REGIONAL_RESULTS = [
    {
        name: "ANDINA",
        img: "/images/regiones/andina.png",
        color: "#4318FF",
        candidates: [
            { name: "IVAN CEPEDA", pct: "42.15%", color: "#E31A1C" },
            { name: "ABELARDO DE LA E.", pct: "38.40%", color: "#4318FF" },
            { name: "PALOMA VALENCIA", pct: "12.10%", color: "#FFB547" },
            { name: "SERGIO FAJARDO", pct: "7.35%", color: "#7551FF" }
        ]
    },
    {
        name: "CARIBE",
        img: "/images/regiones/caribe.png",
        color: "#05CD99",
        candidates: [
            { name: "IVAN CEPEDA", pct: "48.20%", color: "#E31A1C" },
            { name: "ABELARDO DE LA E.", pct: "32.15%", color: "#4318FF" },
            { name: "PALOMA VALENCIA", pct: "10.45%", color: "#FFB547" },
            { name: "SERGIO FAJARDO", pct: "9.20%", color: "#7551FF" }
        ]
    },
    {
        name: "PACÍFICA",
        img: "/images/regiones/pacifica.png",
        color: "#FFB547",
        candidates: [
            { name: "IVAN CEPEDA", pct: "52.40%", color: "#E31A1C" },
            { name: "ABELARDO DE LA E.", pct: "25.30%", color: "#4318FF" },
            { name: "PALOMA VALENCIA", pct: "12.15%", color: "#FFB547" },
            { name: "SERGIO FAJARDO", pct: "10.15%", color: "#7551FF" }
        ]
    },
    {
        name: "ORINOQUÍA",
        img: "/images/regiones/arionoquia.png",
        color: "#EE5D50",
        candidates: [
            { name: "IVAN CEPEDA", pct: "31.15%", color: "#E31A1C" },
            { name: "ABELARDO DE LA E.", pct: "45.10%", color: "#4318FF" },
            { name: "PALOMA VALENCIA", pct: "15.40%", color: "#FFB547" },
            { name: "SERGIO FAJARDO", pct: "8.35%", color: "#7551FF" }
        ]
    },
    {
        name: "AMAZONÍA",
        img: "/images/regiones/amazonia.png",
        color: "#E31A1C",
        candidates: [
            { name: "IVAN CEPEDA", pct: "55.15%", color: "#E31A1C" },
            { name: "ABELARDO DE LA E.", pct: "22.40%", color: "#4318FF" },
            { name: "PALOMA VALENCIA", pct: "12.30%", color: "#FFB547" },
            { name: "SERGIO FAJARDO", pct: "10.15%", color: "#7551FF" }
        ]
    }
];

export const DEPARTMENT_ANALYSIS = [
    {
        name: "ANTIOQUIA",
        winner: { name: "IVAN CEPEDA", pct: "35.15%", profit: "685.00" },
        second: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "685.00" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "685.00" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "685.00" },
        others: { name: "OTROS", pct: "35.15%", profit: "685.00" }
    },
    {
        name: "SANTANDER",
        winner: { name: "IVAN CEPEDA", pct: "35.15%", profit: "685.00" },
        second: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "685.00" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "685.00" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "685.00" },
        others: { name: "OTROS", pct: "35.15%", profit: "685.00" }
    },
    {
        name: "BOYACA",
        winner: { name: "IVAN CEPEDA", pct: "35.15%", profit: "685.00" },
        second: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "685.00" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "685.00" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "685.00" },
        others: { name: "OTROS", pct: "35.15%", profit: "685.00" }
    }
];
