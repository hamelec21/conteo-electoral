export const ELECTION_DATA = {
    header: {
        electionName: "Elecciones Presidenciales 2026",
        date: "29 Oct 2026",
        time: "18:42",
        status: "Operativo", // Operativo, Parcial, Incidencias
        progress: 62
    },
    kpis: {
        tablesReported: 12345,
        totalTables: 19800,
        votesCounted: 1234567,
        leader: "Iván Cepeda",
        trustIndex: 98.4,
        voteDifference: 8.4
    },
    candidates: [
        { 
            name: "Iván Cepeda", 
            votes: 480200, 
            color: "#E31A1C", 
            percent: 36,
            profession: "Senador de Colombia",
            photo: "/images/candidatos/Ivan_cepeda.png" 
        },
        { 
            name: "Abelardo de la Espriella", 
            votes: 420300, 
            color: "#4318FF", 
            percent: 32,
            profession: "Abogado",
            photo: "/images/candidatos/Abelardo_de _la_Espriella.png" 
        },
        { 
            name: "Paloma Valencia", 
            votes: 210100, 
            color: "#2563EB", 
            percent: 16,
            profession: "Senadora de la República",
            photo: "/images/candidatos/paloma_valencia.png" 
        },
        { 
            name: "Sergio Fajardo", 
            votes: 150500, 
            color: "#10B981", 
            percent: 11,
            profession: "Matemático y ex Gobernador",
            photo: "/images/candidatos/sergio_fajardo.png" 
        },
        { 
            name: "Juan Carlos Pinzón", 
            votes: 80600, 
            color: "#F59E0B", 
            percent: 6,
            profession: "Candidato",
            photo: "/images/candidatos/juan_carlos_pinzon.png" 
        }
    ],
    timeSeries: [
        { time: "16:00", votesA: 50000, votesB: 40000, votesC: 20000 },
        { time: "16:30", votesA: 120000, votesB: 100000, votesC: 50000 },
        { time: "17:00", votesA: 250000, votesB: 210000, votesC: 90000 },
        { time: "17:30", votesA: 350000, votesB: 300000, votesC: 140000 },
        { time: "18:00", votesA: 400000, votesB: 350000, votesC: 180000 },
        { time: "18:30", votesA: 450300, votesB: 380200, votesC: 210100 }
    ],
    regions: [
        { name: "Andina", tables: 52000, reported: 46800, status: "rapid", percentage: "90.0%", votes: "14.25M", trend: "Alta – zonas urbanas" },
        { name: "Caribe", tables: 26500, reported: 17600, status: "medium", percentage: "66.4%", votes: "6.10M", trend: "Media – transmisión tardía rural" },
        { name: "Pacífico", tables: 18200, reported: 9800, status: "slow", percentage: "53.8%", votes: "3.20M", trend: "Baja – conectividad limitada" },
        { name: "Orinoquía", tables: 6400, reported: 5980, status: "rapid", percentage: "93.4%", votes: "1.25M", trend: "Alta – pocas mesas, rápido cierre" },
        { name: "Amazonía", tables: 3100, reported: 820, status: "slow", percentage: "26.4%", votes: "210K", trend: "Muy baja – acceso fluvial" }
    ],
    integrity: {
        hashValid: 99.8,
        signatureValid: 99.5,
        timestampValid: 98.9,
        geoValid: 96.2,
        validations: [
            { name: "Hash", ok: 12320, fail: 25 },
            { name: "Firma", ok: 12300, fail: 45 },
            { name: "Tiempo", ok: 12200, fail: 145 },
            { name: "Geo", ok: 11800, fail: 545 }
        ]
    },
    alerts: {
        high: 12,
        medium: 34,
        low: 120,
        byType: [
            { name: "Dif. Imagen/Dato", value: 30, color: "#EF4444" },
            { name: "Hora anómala", value: 45, color: "#F59E0B" },
            { name: "Geo inconsistente", value: 25, color: "#10B981" }
        ]
    },
    pollingStations: [
        { id: "0234", place: "Col A", municipality: "Bogotá", state: "OK", risk: "Bajo", winner: "Iván Cepeda", votes: { abelardo: 156, ivan: 120 }, evidence: { hash: "9f2a...c91", signature: "VALID", time: "18:02:14", device: "DEV-00123" } },
        { id: "0235", place: "Col B", municipality: "Medellín", state: "Alerta", risk: "Media", winner: "Iván Cepeda", votes: { abelardo: 98, ivan: 145 }, evidence: { hash: "3b1c...d22", signature: "INVALID", time: "18:05:00", device: "DEV-00124" } },
        { id: "0236", place: "Escuela 5", municipality: "Cali", state: "OK", risk: "Bajo", winner: "Iván Cepeda", votes: { abelardo: 210, ivan: 90 }, evidence: { hash: "7a8b...e11", signature: "VALID", time: "17:55:22", device: "DEV-00125" } },
        { id: "0237", place: "Col Mayor", municipality: "Barranquilla", state: "OK", risk: "Bajo", winner: "Iván Cepeda", votes: { abelardo: 85, ivan: 190 }, evidence: { hash: "1d4f...a99", signature: "VALID", time: "18:10:45", device: "DEV-00126" } },
        { id: "0238", place: "Rural 1", municipality: "Quibdó", state: "Incidencia", risk: "Alta", winner: "N/A", votes: { abelardo: 45, ivan: 42 }, evidence: { hash: "MISSING", signature: "MISSING", time: "N/A", device: "DEV-00127" } },
    ]
};
