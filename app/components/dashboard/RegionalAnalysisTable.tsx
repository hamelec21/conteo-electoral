"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { 
    Search, Filter, ChevronRight, ChevronDown, Download, 
    ArrowLeft, Info, User, CheckCircle2, MessageSquare, 
    AlertTriangle, MapPin, Building2, LayoutGrid, ClipboardList 
} from "lucide-react";

// --- Mock Hierarchical Data ---

const HIERARCHY_DATA: any = {
    "root": [
        { 
            id: "antioquia", name: "ANTIOQUIA", type: "dept", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { 
            id: "santander", name: "SANTANDER", type: "dept", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { 
            id: "boyaca", name: "BOYACÁ", type: "dept", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { 
            id: "valle", name: "VALLE DEL CAUCA", type: "dept", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        }
    ],
    "santander": [
        { 
            id: "bucaramanga", name: "BUCARAMANGA", type: "mun", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { id: "floridablanca", name: "FLORIDABLANCA", type: "mun", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] },
        { id: "giron", name: "GIRÓN", type: "mun", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] },
        { id: "barrancabermeja", name: "BARRANCABERMEJA", type: "mun", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] }
    ],
    "bucaramanga": [
        { 
            id: "zona01_buc", name: "ZONA 01", type: "zone", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { id: "zona02_buc", name: "ZONA 02", type: "zone", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] }
    ],
    "zona01_buc": [
        { 
            id: "puesto01_z1_buc", name: "COL. SANTANDER", type: "post", 
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        }
    ],
    "puesto01_z1_buc": [
        { 
            id: "mesa01_p1_buc", name: "MESA 01", type: "table", status: "Validada", alerts: "Sin alertas",
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { 
            id: "mesa02_p1_buc", name: "MESA 02", type: "table", status: "Riesgo Medio", alerts: "Incidencia detectada",
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        },
        { 
            id: "mesa03_p1_buc", name: "MESA 03", type: "table", status: "Riesgo Alto", alerts: "Discrepancia persistente",
            results: [
                { id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000", color: "#4318FF" },
                { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000", color: "#E31A1C" },
                { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000", color: "#00BAAD" },
                { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000", color: "#FFB547" },
                { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000", color: "#A3AED0" }
            ]
        }
    ],
    "antioquia": [
        { id: "medellin", name: "MEDELLÍN", type: "mun", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] },
        { id: "envigado", name: "ENVIGADO", type: "mun", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] }
    ],
    "medellin": [
        { id: "zona12_med", name: "ZONA 12 (POBLADO)", type: "zone", results: [{ id: "abe", name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" }, { id: "iva", name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" }, { id: "pal", name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" }, { id: "faj", name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" }, { id: "otr", name: "OTROS", pct: "35.15%", profit: "485,000" }] }
    ]
};

// --- Sub-Components ---

const CandidateResultsHeader = () => (
    <div className="grid grid-cols-5 gap-4">
        {["ABELARDO", "IVÁN C.", "PALOMA", "SERGIO F.", "OTROS"].map((name, i) => (
            <div key={i} className="text-center">
                <p className="text-[8px] font-black opacity-60 truncate">{name}</p>
            </div>
        ))}
    </div>
);

const CandidateResultsRow = ({ results }: { results: any[] }) => (
    <div className="grid grid-cols-5 gap-2 lg:gap-4 h-full items-center">
        {results?.slice(0, 5).map((can, i) => (
            <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] font-black text-[#2B3674]">{can.pct}</span>
                <span className="text-[8px] font-bold text-[#A3AED0] uppercase truncate">Votos: {can.profit}</span>
            </div>
        )) || (
            <div className="col-span-5 text-center text-[8px] text-[#A3AED0] uppercase font-black">Sin datos</div>
        )}
    </div>
);

const MesaDetailContent = ({ item }: { item: any }) => {
    const [activeTab, setActiveTab] = useState<'acta' | 'testigo'>('acta');

    return (
        <div className="p-8 bg-white rounded-3xl mt-4 shadow-inner border border-gray-100 animate-in zoom-in-95 duration-300">
            {/* Tab Switcher */}
            <div className="flex bg-[#F4F7FE] p-1 rounded-2xl mb-8 w-fit mx-auto border border-gray-100">
                <button 
                    onClick={() => setActiveTab('acta')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === 'acta' ? 'bg-white text-[#4318FF] shadow-sm' : 'text-[#A3AED0] hover:text-[#2B3674]'
                    }`}
                >
                    Acta E-14
                </button>
                <button 
                    onClick={() => setActiveTab('testigo')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === 'testigo' ? 'bg-white text-[#4318FF] shadow-sm' : 'text-[#A3AED0] hover:text-[#2B3674]'
                    }`}
                >
                    Información Testigo
                </button>
            </div>

            {activeTab === 'acta' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-[#2B3674] uppercase tracking-widest flex items-center gap-2">
                            <ClipboardList size={16} className="text-[#4318FF]" /> Imagen del Acta
                        </h3>
                        <div className="aspect-[3/4] bg-gray-50 rounded-2xl border-4 border-white shadow-xl overflow-hidden relative group cursor-pointer">
                            <img src="/images/acta-sample.jpeg" alt="Acta E-14" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-all">
                                <Search className="text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#F4F7FE] p-8 rounded-3xl space-y-4 border border-white">
                            <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Resumen de Validación</p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-[#2B3674]">Legibilidad</span>
                                    <span className="text-xs font-black text-[#05CD99]">Alta (98%)</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                     <div className="h-full bg-[#05CD99] rounded-full w-[98%]"></div>
                                </div>
                                <p className="text-[9px] font-medium text-[#707EAE]">El acta ha sido procesada por OCR y validada por 2 auditores humanos sin discrepancias.</p>
                            </div>
                        </div>

                        {/* Alerts & Risks Section */}
                        <div className={`p-6 rounded-3xl border space-y-3 ${
                            item.status === 'Validada' ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100'
                        }`}>
                            <h4 className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                item.status === 'Validada' ? 'text-green-600' : 'text-red-500'
                            }`}>
                                <AlertTriangle size={14} /> Alertas de Mesa
                            </h4>
                            <p className="text-xs font-black text-[#2B3674]">{item.alerts || "Sin alertas registradas"}</p>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                    item.status === 'Validada' ? 'bg-[#05CD99]/10 text-[#05CD99]' : 'bg-orange-100 text-orange-600'
                                }`}>
                                    Status: {item.status}
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-[#4318FF] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-[#3311CC] transition-all">
                            Descargar Acta Original
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-6">
                        <div className="bg-[#F4F7FE] p-8 rounded-3xl border border-white flex flex-col items-center text-center">
                            <div className="relative">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Testigo" className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg mb-4" />
                                <div className="absolute bottom-6 right-0 w-6 h-6 bg-[#05CD99] border-4 border-[#F4F7FE] rounded-full"></div>
                            </div>
                            <h4 className="text-lg font-black text-[#2B3674]">Mario Alberto Gómez</h4>
                            <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">ID: V-19.234.XXX • 8 Años Exp.</p>
                            
                            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <p className="text-[8px] font-black text-[#A3AED0] uppercase mb-1">Reportes</p>
                                    <p className="text-sm font-black text-[#2B3674]">12</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <p className="text-[8px] font-black text-[#A3AED0] uppercase mb-1">Estado</p>
                                    <p className="text-xs font-black text-[#05CD99]">Activo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                             <div className="space-y-1">
                                 <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-widest">Última Actividad</p>
                                 <p className="text-xs font-bold text-[#2B3674]">Sincronización de resultados hace 4 min</p>
                             </div>
                             <div className="space-y-1">
                                 <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-widest">Capacitación</p>
                                 <div className="flex items-center gap-2">
                                     <CheckCircle2 size={14} className="text-[#05CD99]" />
                                     <span className="text-xs font-bold text-[#2B3674]">Certificación Completa 2026</span>
                                 </div>
                             </div>
                             <button className="w-full flex items-center justify-center gap-3 bg-[#128C7E] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100/50 hover:bg-[#075E54] transition-all">
                                 <MessageSquare size={18} /> Contactar vía WhatsApp
                             </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AccordionRow = ({ item, level, isExpanded, onToggle, filterStatus }: { item: any, level: number, isExpanded: boolean, onToggle: () => void, filterStatus: string }) => {
    const children = HIERARCHY_DATA[item.id] || [];
    
    // Recursive visibility check for parents
    const hasVisibleChildren = () => {
        if (filterStatus === 'all') return true;
        if (item.type === 'table') {
            if (filterStatus === 'valid') return item.status === 'Validada';
            if (filterStatus === 'alert') return item.status === 'Riesgo Medio' || item.status === 'Riesgo Alto' || item.alerts !== 'Sin alertas';
            return true;
        }

        const checkChildren = (nodeId: string): boolean => {
            const nodeChildren = HIERARCHY_DATA[nodeId] || [];
            return nodeChildren.some((child: any) => {
                if (child.type === 'table') {
                    if (filterStatus === 'valid') return child.status === 'Validada';
                    if (filterStatus === 'alert') return child.status !== 'Validada';
                    return true;
                }
                return checkChildren(child.id);
            });
        };
        return checkChildren(item.id);
    };

    if (!hasVisibleChildren()) return null;

    const getIcon = () => {
        switch (item.type) {
            case 'dept': return <MapPin size={14} className="text-[#4318FF]" />;
            case 'mun': return <Building2 size={14} className="text-[#05CD99]" />;
            case 'zone': return <LayoutGrid size={14} className="text-[#FFB547]" />;
            case 'post': return <ClipboardList size={14} className="text-[#7551FF]" />;
            case 'table': return (
                <div className={`w-1.5 h-1.5 rounded-full ml-1.5 mr-1 ${
                    item.status === 'Validada' ? 'bg-[#05CD99]' : 'bg-[#E31A1C]'
                }`} title={item.status} />
            );
            default: return null;
        }
    };

    return (
        <React.Fragment>
            <tr 
                className={`transition-all group cursor-pointer ${isExpanded ? 'bg-[#F4F7FE]/50' : 'hover:bg-[#F4F7FE]/20'}`}
                onClick={onToggle}
            >
                <td className="px-8 py-5" style={{ paddingLeft: `${level * 24 + 32}px` }}>
                    <div className="flex items-center gap-3">
                        {item.type !== 'table' && (
                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                <ChevronRight size={14} className="text-[#A3AED0]" />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            {getIcon()}
                            <span className={`text-sm font-black transition-colors ${isExpanded ? 'text-[#4318FF]' : 'text-[#2B3674]'}`}>
                                {item.name}
                            </span>
                        </div>
                    </div>
                </td>
                <td colSpan={2} className="px-5 py-5">
                    <CandidateResultsRow results={item.results} />
                </td>
                <td className="px-8 py-5 text-center">
                    <button className="px-4 py-1.5 rounded-lg bg-[#F4F7FE] text-[#4318FF] text-[9px] font-black uppercase tracking-widest hover:bg-[#4318FF] hover:text-white transition-all border border-[#4318FF]/20 shadow-sm">
                        Ver
                    </button>
                </td>
            </tr>
            
            {/* Expanded Content */}
            {isExpanded && (
                <tr>
                    <td colSpan={4} className="p-0 border-b border-gray-100">
                        {item.type === 'table' ? (
                            <div className="px-8 pb-8 pt-2">
                                <MesaDetailContent item={item} />
                            </div>
                        ) : (
                            <div className="overflow-hidden animate-in slide-in-from-top-4 duration-500">
                                <table className="w-full">
                                    <tbody>
                                        {children.length > 0 ? children.map((child: any) => (
                                            <NestedRows key={child.id} item={child} level={level + 1} filterStatus={filterStatus} />
                                        )) : (
                                            <tr>
                                                <td className="px-8 py-10 text-center" style={{ paddingLeft: `${(level + 1) * 24 + 32}px` }}>
                                                    <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest italic">
                                                        Cargando desglose de {item.name}...
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

const NestedRows = ({ item, level, filterStatus }: { item: any, level: number, filterStatus: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return <AccordionRow item={item} level={level} isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} filterStatus={filterStatus} />;
};

import GeographicConfidenceAnalysis from "./GeographicConfidenceAnalysis";

export default function RegionalAnalysisTable() {
    const [filterStatus, setFilterStatus] = useState<'all' | 'valid' | 'alert'>('all');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Column: Table & Audit summary */}
            <div className="lg:col-span-3 space-y-6">
                {/* Summary stats standalone card */}
                <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden border border-gray-50 bg-sky-200">
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Avance Nacional</p>
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-black text-[#2B3674]">82.4%</span>
                                <div className="h-2 w-20 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#4318FF] rounded-full" style={{ width: '82.4%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Testigos Reportando</p>
                            <p className="text-xl font-black text-[#2B3674]">12.4K <span className="text-xs text-[#A3AED0] font-bold">/ 19.8K</span></p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Tendencia Líder</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#E31A1C]"></div>
                                <span className="text-xs font-black text-[#2B3674] uppercase">Iván Cepeda</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Integridad</p>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-[#05CD99]" />
                                <span className="text-xs font-black text-[#05CD99]">100% Validado</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden flex flex-col border border-gray-50">
                    <CardHeader className="p-8 border-b border-gray-50 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#F4F7FE] flex items-center justify-center p-2 shadow-inner border border-white">
                                <img src="/images/regiones/andina.png" alt="Región Andina" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <CardTitle className="text-xl font-black text-[#2B3674] tracking-tight">Región Andina</CardTitle>
                                <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">Desglose Técnico Avanzado</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Status Filters */}
                            <div className="flex bg-[#F4F7FE] p-1 rounded-2xl border border-gray-100">
                                {[
                                    { id: 'all', label: 'Todos', color: '#4318FF' },
                                    { id: 'valid', label: 'Válidos', color: '#05CD99' },
                                    { id: 'alert', label: 'Con Alertas', color: '#E31A1C' }
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFilterStatus(f.id as any)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                            filterStatus === f.id 
                                                ? 'bg-white text-[#2B3674] shadow-sm' 
                                                : 'text-[#A3AED0] hover:text-[#2B3674]'
                                        }`}
                                    >
                                        {filterStatus === f.id && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.color }} />}
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center bg-[#F4F7FE] rounded-full px-4 py-2 border border-gray-100">
                                    <Search className="w-4 h-4 text-[#2B3674] mr-2" />
                                    <input type="text" placeholder="Buscar..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-[#2B3674] focus:ring-0 placeholder-[#A3AED0] w-24" />
                                </div>
                                <button className="p-3 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                                    <Filter className="w-4 h-4 text-[#2B3674]" />
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-0 flex-1 flex flex-col min-h-[300px] overflow-hidden">
                        <div className="flex-1 overflow-y-auto overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead className="bg-[#F4F7FE]/30 text-[9px] uppercase font-black text-[#A3AED0] tracking-[0.15em] sticky top-0 z-10 backdrop-blur-md">
                                    <tr>
                                        <th className="px-8 py-3 border-b border-gray-50 w-1/4">Localización / Jerarquía</th>
                                        <th colSpan={2} className="px-5 py-3 border-b border-gray-50">
                                            <CandidateResultsHeader />
                                        </th>
                                        <th className="px-5 py-3 border-b border-gray-50 text-center">Actividad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HIERARCHY_DATA.root.map((item: any) => (
                                        <NestedRows key={item.id} item={item} level={0} filterStatus={filterStatus} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    
                    <div className="px-8 py-3 border-t border-gray-50 bg-[#F4F7FE]/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-[8px] font-black text-[#A3AED0] uppercase tracking-[0.15em]">Sincronizado hace 12s</span>
                        </div>
                    </div>
                </Card>

                <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden border border-gray-50">
                    <AuditRiskAnalysisFooter />
                </Card>
            </div>

            {/* Right Column: Confidence & Help */}
            <div className="lg:col-span-1 space-y-6 h-full">
                <GeographicConfidenceAnalysis />
            </div>
        </div>
    );
}

// --- Footer Components ---

const AuditRiskAnalysisFooter = () => (
    <div className="p-6 bg-white grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Left: Audit Metrics */}
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <p className="text-[9px] font-black text-[#2B3674] uppercase tracking-[0.2em]">Validación de Integridad</p>
                <button className="w-fit flex items-center gap-2.5 bg-[#4318FF] text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-[#3311CC] transition-all">
                    <Download size={14} /> Descargar Auditoría Completa
                </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Hash Válido', val: '99.8%', icon: <CheckCircle2 size={14} />, color: '#05CD99' },
                    { label: 'Firma Digital', val: '99.5%', icon: <User size={14} />, color: '#7551FF' },
                    { label: 'Sello Tiempo', val: '98.9%', icon: <LayoutGrid size={14} />, color: '#FFB547' },
                    { label: 'Geolocalización', val: '96.2%', icon: <MapPin size={14} />, color: '#2B3674' }
                ].map((m, i) => (
                    <div key={i} className="bg-[#F4F7FE]/40 p-4 rounded-2xl border border-white shadow-sm space-y-3">
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm" style={{ color: m.color }}>
                            {m.icon}
                        </div>
                        <div>
                            <p className="text-[7px] font-black text-[#A3AED0] uppercase tracking-widest mb-0.5">{m.label}</p>
                            <p className="text-lg font-black text-[#2B3674]">{m.val}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right: Risk Analysis */}
        <div className="space-y-4">
            <h4 className="text-[9px] font-black text-[#2B3674] uppercase tracking-[0.15em] flex items-center gap-2">
                <AlertTriangle size={14} className="text-[#FFB547]" /> Alertas y Riesgos de Consolidación
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#F4F7FE]/30 p-5 rounded-[30px] border border-white">
                {/* Donut Chart Simulation */}
                <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#05CD99" strokeWidth="3.5" strokeDasharray="60 40" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FFB547" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-60" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E31A1C" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="-85" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-full m-3 border border-white shadow-sm">
                        <span className="text-2xl font-black text-[#2B3674]">166</span>
                        <span className="text-[7px] font-black text-[#A3AED0] uppercase tracking-widest">Incidentes</span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 gap-1.5">
                        {[
                            { label: 'Altas', count: 12, color: '#E31A1C', bg: 'bg-red-50/50' },
                            { label: 'Medias', count: 34, color: '#FFB547', bg: 'bg-orange-50/50' },
                            { label: 'Bajas', count: 120, color: '#05CD99', bg: 'bg-green-50/50' }
                        ].map((r, i) => (
                            <div key={i} className={`flex items-center justify-between p-2 px-3 rounded-xl ${r.bg} border border-white shadow-sm`}>
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: r.color }} />
                                    <span className="text-[9px] font-black uppercase text-[#2B3674] tracking-widest">{r.label}</span>
                                </div>
                                <span className="text-xs font-black" style={{ color: r.color }}>{r.count}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 border-t border-gray-100">
                        {[
                            { label: 'Dif. Imagen/Dato', color: '#E31A1C' },
                            { label: 'Geo Inconsistente', color: '#FFB547' },
                            { label: 'Hora Anómala', color: '#4318FF' }
                        ].map((l, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: l.color }} />
                                <span className="text-[7px] font-bold text-[#A3AED0] uppercase tracking-widest">{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
