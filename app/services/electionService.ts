import { ELECTION_DATA } from "../lib/mockData";

// Tipos basados en la estructura actual (se pueden expandir)
export interface ElectionData {
    candidates: any[];
    timeSeries: any[];
    kpis: any;
    regions: any[];
    integrity: any;
    alerts: any;
    pollingStations: any[];
}

// Simula una llamada a API Real
export const getElectionData = async (): Promise<ElectionData> => {
    // En el futuro, esto será:
    // const res = await fetch('https://api.registraduria.gov.co/boletin');
    // return res.json();
    
    // Por ahora, devolvemos los datos simulados inmediatamente
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ELECTION_DATA);
        }, 500); // Pequeña latencia para realismo
    });
};

// Hook para componentes cliente (si se decide usar SWR/React Query más adelante)
// Por ahora mantendremos el fetch simple.
