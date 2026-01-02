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
        ]
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
            { can: "Abelardo de la Espriella", tot: "4,520,100", pct: "45.2%", urb: "3.1M", rur: "1.4M", var: "+12%" },
            { can: "Iván Cepeda", tot: "3,890,200", pct: "38.9%", urb: "2.8M", rur: "1.0M", var: "+5%" },
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
    "validacion-datos": { title: "Motor de Validación", description: "Estado de las reglas de negocio.", type: "stats", data: [{label: "Reglas Ejecutadas", value: "1.5M"}, {label: "Fallos", value: "0"}] },
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
};
