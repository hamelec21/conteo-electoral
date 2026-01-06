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
        { id: "antioquia", name: "ANTIOQUIA", type: "dept", winner: { name: "ABELARDO DE LA E.", pct: "45.15%", profit: "885,000" }, second: { name: "IVAN CEPEDA", pct: "35.15%", profit: "685,000" } },
        { id: "santander", name: "SANTANDER", type: "dept", winner: { name: "IVAN CEPEDA", pct: "38.15%", profit: "485,000" }, second: { name: "ABELARDO DE LA E.", pct: "32.15%", profit: "425,000" } },
        { id: "boyaca", name: "BOYACÁ", type: "dept", winner: { name: "IVAN CEPEDA", pct: "41.20%", profit: "215,000" }, second: { name: "ABELARDO DE LA E.", pct: "28.15%", profit: "155,000" } },
        { id: "valle", name: "VALLE DEL CAUCA", type: "dept", winner: { name: "ABELARDO DE LA E.", pct: "42.15%", profit: "715,000" }, second: { name: "IVAN CEPEDA", pct: "39.15%", profit: "695,000" } }
    ],
    "santander": [
        { id: "bucaramanga", name: "BUCARAMANGA", type: "mun", winner: { name: "IVAN CEPEDA", pct: "42.1%", profit: "120,000" }, second: { name: "ABELARDO DE LA E.", pct: "38.5%", profit: "110,000" } },
        { id: "floridablanca", name: "FLORIDABLANCA", type: "mun", winner: { name: "IVAN CEPEDA", pct: "39.2%", profit: "45,000" }, second: { name: "ABELARDO DE LA E.", pct: "35.1%", profit: "40,000" } },
        { id: "giron", name: "GIRÓN", type: "mun", winner: { name: "IVAN CEPEDA", pct: "33.5%", profit: "25,000" }, second: { name: "ABELARDO DE LA E.", pct: "32.1%", profit: "24,000" } },
        { id: "barrancabermeja", name: "BARRANCABERMEJA", type: "mun", winner: { name: "IVAN CEPEDA", pct: "51.0%", profit: "65,000" }, second: { name: "ABELARDO DE LA E.", pct: "25.5%", profit: "32,000" } }
    ],
    "bucaramanga": [
        { id: "zona01_buc", name: "ZONA 01", type: "zone", winner: { name: "IVAN CEPEDA", pct: "45.2%", profit: "15,000" }, second: { name: "ABELARDO DE LA E.", pct: "30.1%", profit: "10,000" } },
        { id: "zona02_buc", name: "ZONA 02", type: "zone", winner: { name: "IVAN CEPEDA", pct: "38.5%", profit: "12,000" }, second: { name: "ABELARDO DE LA E.", pct: "35.1%", profit: "11,000" } }
    ],
    "zona01_buc": [
        { id: "puesto01_z1_buc", name: "COL. SANTANDER", type: "post", winner: { name: "IVAN CEPEDA", pct: "48.2%", profit: "2,000" }, second: { name: "ABELARDO DE LA E.", pct: "25.1%", profit: "1,100" } },
        { id: "puesto02_z1_buc", name: "ESC. NORMAL", type: "post", winner: { name: "IVAN CEPEDA", pct: "41.5%", profit: "1,800" }, second: { name: "ABELARDO DE LA E.", pct: "32.1%", profit: "1,400" } }
    ],
    "puesto01_z1_buc": [
        { id: "mesa01_p1_buc", name: "MESA 01", type: "table", winner: { name: "IVAN CEPEDA", pct: "50.0%", profit: "150" }, second: { name: "ABELARDO DE LA E.", pct: "20.0%", profit: "60" }, status: "Validada", alerts: "Sin alertas" },
        { id: "mesa02_p1_buc", name: "MESA 02", type: "table", winner: { name: "IVAN CEPEDA", pct: "45.0%", profit: "135" }, second: { name: "ABELARDO DE LA E.", pct: "35.0%", profit: "105" }, status: "Riesgo Medio", alerts: "Incidencia" }
    ],
    "antioquia": [
        { id: "medellin", name: "MEDELLÍN", type: "mun", winner: { name: "ABELARDO DE LA E.", pct: "48.5%", profit: "420,000" }, second: { name: "IVAN CEPEDA", pct: "32.1%", profit: "280,000" } },
        { id: "envigado", name: "ENVIGADO", type: "mun", winner: { name: "ABELARDO DE LA E.", pct: "55.2%", profit: "55,000" }, second: { name: "IVAN CEPEDA", pct: "25.1%", profit: "25,000" } }
    ],
    "medellin": [
        { id: "zona01_med", name: "ZONA 12 (POBLADO)", type: "zone", winner: { name: "ABELARDO DE LA E.", pct: "65.2%", profit: "45,000" }, second: { name: "IVAN CEPEDA", pct: "15.1%", profit: "10,000" } },
        { id: "zona02_med", name: "ZONA 05 (LAURELES)", type: "zone", winner: { name: "ABELARDO DE LA E.", pct: "58.5%", profit: "32,000" }, second: { name: "IVAN CEPEDA", pct: "25.1%", profit: "14,000" } }
    ],
    "zona01_med": [
        { id: "puesto01_z1_med", name: "COL. SAN JOSÉ", type: "post", winner: { name: "ABELARDO DE LA E.", pct: "68.2%", profit: "5,000" }, second: { name: "IVAN CEPEDA", pct: "12.1%", profit: "900" } }
    ],
    "puesto01_z1_med": [
        { id: "mesa01_p1_med", name: "MESA 01", type: "table", winner: { name: "ABELARDO DE LA E.", pct: "75.0%", profit: "225" }, second: { name: "IVAN CEPEDA", pct: "10.0%", profit: "30" }, status: "Validada", alerts: "Sin alertas" }
    ]
};

// --- Sub-Components ---

const CandidateCell = ({ data }: { data: any }) => (
    <div className="flex flex-col py-1">
        <span className="text-[11px] font-black text-[#2B3674] tracking-tight">{data.name}</span>
        <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold text-[#707EAE]">{data.pct}</span>
            <span className="text-[9px] font-black text-[#05CD99] bg-[#05CD99]/10 px-2.5 py-0.5 rounded-full uppercase tracking-widest">Votos: {data.profit}</span>
        </div>
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

const AccordionRow = ({ item, level, isExpanded, onToggle }: { item: any, level: number, isExpanded: boolean, onToggle: () => void }) => {
    const children = HIERARCHY_DATA[item.id] || [];
    const hasChildren = children.length > 0 || item.type === 'post'; // Post might have Mesas but in mock data it's separate
    
    const getIcon = () => {
        switch (item.type) {
            case 'dept': return <MapPin size={14} className="text-[#4318FF]" />;
            case 'mun': return <Building2 size={14} className="text-[#05CD99]" />;
            case 'zone': return <LayoutGrid size={14} className="text-[#FFB547]" />;
            case 'post': return <ClipboardList size={14} className="text-[#7551FF]" />;
            case 'table': return <div className="w-1 h-1 rounded-full bg-[#A3AED0] ml-1.5 mr-1" />;
            default: return null;
        }
    };

    return (
        <React.Fragment>
            <tr 
                className={`transition-all group cursor-pointer ${isExpanded ? 'bg-[#F4F7FE]/50' : 'hover:bg-[#F4F7FE]/20'}`}
                onClick={onToggle}
            >
                <td className="px-8 py-4" style={{ paddingLeft: `${level * 24 + 32}px` }}>
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
                <td className="px-5 py-4">
                    <CandidateCell data={item.winner} />
                </td>
                <td className="px-5 py-4">
                    <CandidateCell data={item.second} />
                </td>
                <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 h-6">
                        {[30, 60, 40, 80].map((h, i) => (
                            <div key={i} className={`w-1 rounded-full ${isExpanded ? 'bg-[#4318FF]' : 'bg-[#A3AED0] opacity-30'} transition-all`} style={{ height: `${h}%` }} />
                        ))}
                    </div>
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
                                            <NestedRows key={child.id} item={child} level={level + 1} />
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

const NestedRows = ({ item, level }: { item: any, level: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return <AccordionRow item={item} level={level} isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />;
};

import GeographicConfidenceAnalysis from "./GeographicConfidenceAnalysis";

export default function RegionalAnalysisTable() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3 border-0 shadow-lg rounded-3xl bg-white overflow-hidden flex flex-col">
                <CardHeader className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <CardTitle className="text-xl font-black text-[#2B3674] tracking-tight">Análisis Jerárquico de Resultados</CardTitle>
                        <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mt-1">Exploración multinivel por expansión</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#F4F7FE] rounded-full px-4 py-2 border border-gray-100">
                            <Search className="w-4 h-4 text-[#2B3674] mr-2" />
                            <input type="text" placeholder="Filtrar por nombre..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-[#2B3674] focus:ring-0 placeholder-[#A3AED0] w-24 sm:w-32" />
                        </div>
                        <button className="p-3 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4 text-[#2B3674]" />
                        </button>
                    </div>
                </CardHeader>

                <div className="bg-[#F4F7FE]/50 border-b border-gray-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Avance Nacional</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-[#2B3674]">82.4%</span>
                            <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#4318FF] rounded-full" style={{ width: '82.4%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Testigos Reportando</p>
                        <p className="text-lg font-black text-[#2B3674]">12.4K <span className="text-[10px] text-[#A3AED0] font-bold">/ 19.8K</span></p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Tendencia Líder</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#E31A1C]"></div>
                            <span className="text-[10px] font-black text-[#2B3674] uppercase">Iván Cepeda</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-[#A3AED0] uppercase tracking-[0.1em]">Integridad</p>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-[#05CD99]" />
                            <span className="text-[10px] font-black text-[#05CD99]">100% Validado</span>
                        </div>
                    </div>
                </div>
                
                <CardContent className="p-0 flex-1 flex flex-col min-h-[600px] overflow-y-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead className="bg-[#F4F7FE]/30 text-[10px] uppercase font-black text-[#A3AED0] tracking-[0.15em] sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="px-8 py-4 border-b border-gray-50">Localización / Jerarquía</th>
                                    <th className="px-5 py-4 border-b border-gray-50">Líder</th>
                                    <th className="px-5 py-4 border-b border-gray-50">Segundo</th>
                                    <th className="px-5 py-4 border-b border-gray-50 text-center">Actividad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HIERARCHY_DATA.root.map((item: any) => (
                                    <NestedRows key={item.id} item={item} level={0} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
                
                <div className="p-8 border-t border-gray-50 bg-[#F4F7FE]/20 flex items-center justify-between">
                    <button className="flex items-center gap-2 bg-[#4318FF] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-[#3311CC] transition-all active:scale-95">
                        <Download className="w-4 h-4" /> Exportar Auditoría Jerárquica
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black text-[#A3AED0] uppercase tracking-widest">Sincronizado hace 12s</span>
                    </div>
                </div>
            </Card>

            <div className="lg:col-span-1 space-y-6">
                <GeographicConfidenceAnalysis />
                
                <Card className="bg-[#128C7E] border-0 shadow-lg p-6 text-white relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                         <MessageSquare size={60} />
                     </div>
                     <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Mesa de Ayuda WhatsApp</p>
                     <h4 className="text-lg font-black mb-3">Soporte en vivo</h4>
                     <p className="text-xs font-medium text-white/80 mb-4">Reporta anomalías técnicas directamente a la central de monitoreo.</p>
                     <button className="w-full bg-white text-[#128C7E] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-50 transition-colors">
                         Abrir Chat de Soporte
                     </button>
                </Card>
            </div>
        </div>
    );
}
