"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui-blocks";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar } from "recharts";
import { AlertTriangle, CheckCircle, CheckCircle2, FileText, TrendingUp, X, User, MessageCircle, Activity, ShieldCheck, PieChart as PieIcon } from "lucide-react";

// --- Sub-Components ---

const StatCard = ({ label, value, icon: Icon, subValue, highlight = false, color }: any) => (
    <Card className={`border-0 shadow-sm relative h-full flex flex-col justify-center ${highlight ? 'bg-[#4318FF] text-white' : 'bg-white text-[#2B3674]'}`}>
        <CardContent className="p-5 flex items-center justify-between">
            <div>
                {Icon && !highlight && (
                    <div className="mb-2 p-2 w-fit rounded-full bg-[#F4F7FE]">
                         <Icon className="w-5 h-5 text-[#4318FF]" />
                    </div>
                )}
                <p className={`text-xs font-black uppercase tracking-widest opacity-70 ${highlight ? 'text-white' : 'text-[#A3AED0]'}`}>{label}</p>
                <h3 className="text-xl font-black mt-1 tracking-tight">{value}</h3>
                {subValue && <p className={`text-sm mt-1 font-black uppercase tracking-widest ${highlight ? 'text-blue-100' : 'text-[#A3AED0]'}`}>{subValue}</p>}
            </div>
            {Icon && highlight && (
                 <div className="p-3 rounded-full bg-white/20">
                     <Icon className="w-6 h-6 text-white" />
                 </div>
            )}
        </CardContent>
    </Card>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2B3674] tracking-tight">{title}</h2>
        {subtitle && <p className="text-[#A3AED0]">{subtitle}</p>}
    </div>
);

import RiskMap from "./RiskMap";
import IntegrityTrust from "./IntegrityTrust";
import AlertsRisk from "./AlertsRisk";
import KPICards from "./KPICards";


// Status Lists
const StatusList = ({ title, items, type }: any) => (
    <Card className="bg-white border-0 shadow-sm overflow-hidden h-full rounded-2xl flex flex-col">
        <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-50">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'alert' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {type === 'alert' ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
            </div>
            <h4 className="text-[10px] font-black text-[#2B3674] uppercase tracking-widest">{title}</h4>
        </div>
        <div className="flex-1 px-6 py-6 overflow-hidden">
            <div className="space-y-6">
                {items?.map((item: any, i: number) => {
                    const isPositive = !item.change?.startsWith('-');
                    return (
                        <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-[#F4F7FE] flex items-center justify-center text-[#2B3674] shadow-sm group-hover:bg-[#E0E5F2] transition-colors">
                                    {i % 4 === 0 ? <Activity size={20} /> : 
                                     i % 4 === 1 ? <ShieldCheck size={20} /> :
                                     i % 4 === 2 ? <div className="text-xs font-black">%</div> :
                                     <FileText size={20} />}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-[#2B3674] tracking-tight group-hover:text-[#4318FF] transition-colors">{item.name}</p>
                                    <p className="text-[10px] font-bold text-[#A3AED0]">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-5">
                                {item.status === 'ver' ? (
                                    <button className="bg-[#05CD99] text-white px-4 py-1 rounded-lg text-xs font-black hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-green-200">
                                        ver
                                    </button>
                                ) : (
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm ${
                                        item.status === 'Resuelta' || item.status === 'Válido' ? 'bg-[#05CD99] text-white' :
                                        item.status === 'en proceso' || item.status === 'pendiente' ? 'bg-[#FFB547] text-white' :
                                        item.status === 'Riesgo' ? 'bg-[#E31A1C] text-white' :
                                        'bg-[#FFB547] text-white'
                                    }`}>
                                        {item.status}
                                    </span>
                                )}

                                <div className="flex flex-col items-end w-24">
                                    <p className="text-sm font-black text-[#2B3674] whitespace-nowrap">
                                        {item.count || Math.floor(Math.random() * 5000 + 1000).toLocaleString()}
                                    </p>
                                    <div className={`text-[10px] font-bold flex items-center gap-0.5 ${isPositive ? 'text-[#05CD99]' : 'text-[#E31A1C]'}`}>
                                        {isPositive ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />} 
                                        {item.trend || (Math.random() * 5 + 1).toFixed(2) + '%'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </Card>
)

// Enhanced Gauge Scorecard (from reference)
const Riskometer = ({ value, label, percentage }: any) => {
    return (
        <Card className="bg-white border-0 shadow-sm h-full flex flex-col items-center justify-between p-10 text-center rounded-2xl relative overflow-hidden group">
            {/* Contextual Header */}
            <div className="w-full flex justify-between items-center mb-10">
                <div className="flex flex-col items-start border-l-4 border-[#4318FF] pl-4">
                    <h3 className="text-[#A3AED0] font-black text-[10px] uppercase tracking-widest leading-none mb-1">
                        Índice de Confianza
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-2 h-2 rounded-full bg-[#05CD99] animate-pulse"></div>
                        <span className="text-[10px] font-bold text-[#2B3674] uppercase tracking-tighter">Validación en Tiempo Real</span>
                    </div>
                </div>
                <div className="bg-green-600 px-4 py-2 rounded-2xl border border-green-500 group-hover:bg-green-700 group-hover:shadow-md transition-all">
                    <span className="text-xl font-black text-white">98.2%</span>
                </div>
            </div>

            <div className="flex flex-col items-center flex-1 justify-center w-full px-4">
                <div className="mb-4">
                    <h2 className="text-5xl font-black text-[#2B3674] tracking-tighter mb-2">
                         {label || "CONFIABLE"}
                    </h2>
                    
                </div>

                {/* Horizontal Confidence Scale */}
                <div className="w-full mt-12 mb-10">
                    <div className="relative h-4 w-full bg-[#F4F7FE] rounded-full overflow-hidden flex shadow-inner">
                        <div className="h-full w-[25%] bg-[#05CD99] relative">
                             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                        <div className="h-full w-[15%] bg-[#FFD95A]"></div>
                        <div className="h-full w-[60%] bg-[#E31A1C] opacity-20"></div>
                        
                        {/* Selector / Marker */}
                        <div 
                            className="absolute top-0 h-full w-1.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-10 transition-all duration-1000 ease-out"
                            style={{ left: `${value}%` }}
                        ></div>
                    </div>
                    
                     <div className="flex justify-between mt-4 px-1">
                        <div className="flex flex-col items-start gap-1">
                             <span className="text-xs font-black text-[#05CD99] uppercase tracking-widest">ALTA</span>
                             <div className="w-8 h-1 bg-[#05CD99] rounded-full"></div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                             <span className="text-xs font-black text-[#FFD95A] uppercase tracking-widest opacity-50">MEDIA</span>
                             <div className="w-8 h-1 bg-[#FFD95A] rounded-full opacity-30"></div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                             <span className="text-xs font-black text-[#E31A1C] uppercase tracking-widest opacity-50">CRÍTICA</span>
                             <div className="w-8 h-1 bg-[#E31A1C] rounded-full opacity-30"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 flex flex-col items-center w-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center">
                         <span className="text-3xl font-black text-[#2B3674] tracking-tight">15.51M</span>
                         <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Votos Auditados</span>
                    </div>
                    <div className="h-10 w-px bg-gray-100 mx-2"></div>
                    <div className="flex flex-col items-center">
                         <div className="flex items-center gap-1 bg-[#05CD99]/10 px-3 py-1 rounded-full">
                            <TrendingUp size={14} className="text-[#05CD99]" />
                            <span className="text-sm font-black text-[#05CD99]">11.5%</span>
                         </div>
                         <span className="text-[9px] font-black text-gray-400 mt-1">VAR. MENSUAL</span>
                    </div>
                </div>
                <div className="w-full max-w-[200px] h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4318FF] to-[#707EAE] w-[88%]"></div>
                </div>
            </div>
        </Card>
    );
};



// Witness Modal Component
const WitnessModal = ({ witness, onClose }: { witness: any, onClose: () => void }) => {
    if (!witness) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[600px] overflow-hidden animate-in zoom-in-50 duration-300">
                <div className="p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                    
                    <div className="flex gap-6">
                        <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md shrink-0">
                             {/* Placeholder generic avatar if no image provided */}
                            <img 
                                src={witness.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                                alt={witness.name} 
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        <div className="flex-1 space-y-1">
                            <h2 className="text-2xl font-bold text-[#2B3674]">{witness.name}</h2>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg mb-4 flex items-center gap-1 w-fit">
                                <User className="w-3 h-3" />
                                {witness.role}
                            </span>

                            <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                <span className="font-bold text-[#A3AED0]">Cédula</span>
                                <span className="font-bold text-[#2B3674]">{witness.id}</span>

                                <span className="font-bold text-[#A3AED0]">Correo</span>
                                <span className="font-bold text-[#2B3674]">{witness.email}</span>

                                <span className="font-bold text-[#A3AED0]">Teléfono</span>
                                <span className="font-bold text-[#2B3674]">{witness.phone}</span>

                                <span className="font-bold text-[#A3AED0]">Líder</span>
                                <span className="font-bold text-[#2B3674]">{witness.leader}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 mb-6">
                        <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                             <span className="font-bold text-[#A3AED0]">Departamento</span>
                             <span className="font-bold text-[#2B3674]">{witness.department}</span>

                             <span className="font-bold text-[#A3AED0]">Municipio</span>
                             <span className="font-bold text-[#2B3674]">{witness.municipio}</span>

                             <span className="font-bold text-[#A3AED0]">Lugar</span>
                             <span className="font-bold text-[#2B3674] font-black uppercase">{witness.lugar}</span>

                             <span className="font-bold text-[#A3AED0]">Zona</span>
                             <span className="font-bold text-[#2B3674]">{witness.zona}</span>

                             <span className="font-bold text-[#A3AED0]">Puesto</span>
                             <span className="font-bold text-[#2B3674]">{witness.puesto}</span>

                             <span className="font-bold text-[#A3AED0]">Mesa</span>
                             <span className="font-bold text-[#2B3674]">{witness.mesa}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="space-y-1">
                             {witness.confirmed && (
                                 <div className="flex items-center gap-2 text-green-600">
                                     <CheckCircle2 className="w-4 h-4 fill-green-100" />
                                     <span className="text-xs font-bold">Mesa asignada confirmada y validada</span>
                                 </div>
                             )}
                             <div className="flex items-center gap-2 text-green-700">
                                  <User className="w-4 h-4" />
                                  <span className="text-xs font-bold">{witness.status}</span>
                             </div>
                        </div>
                        
                        <button className="flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            Contactar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

// ... (existing charts) ...

export default function ValidationDashboard({ data }: { data: any }) {
    const [selectedWitness, setSelectedWitness] = React.useState<any>(null);

    if (!data) return null;

    const { kpis, mainCard, candidate, integrity, alerts, riskometer, detailedTable, auditList, resolvedList, processedE14, validVotes, alertsMetric, highRiskMetric } = data;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 font-sans relative">
           
            {/* Header / Global KPIs */}
            
            {/* ... (existing header) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="bg-white border-0 shadow-sm border-l-4 border-[#4318FF] p-6 flex flex-col justify-center">
                     <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-wider mb-2">Reglas Ejecutadas</p>
                     <h2 className="text-4xl font-black text-[#2B3674]">{kpis.executedRules}</h2>
                 </Card>
                 <Card className="bg-white border-0 shadow-sm border-l-4 border-[#FFB547] p-6 flex flex-col justify-center">
                     <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-wider mb-2">Fallos</p>
                     <h2 className="text-4xl font-black text-[#2B3674]">{kpis.failures}</h2>
                 </Card>
            </div>
            {/* BLOCK 1: KPIs */}
            <section>
                <KPICards />
            </section>
            {/* Modal */}
            {selectedWitness && (
                <WitnessModal witness={selectedWitness} onClose={() => setSelectedWitness(null)} />
            )}

            {/* 3-Column Grid: Integrity + Alerts + Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Integrity Card */}
                
                <div className="p-6 flex flex-col h-full rounded-2xl">
                    <IntegrityTrust />
                </div>

                {/* Alerts Card */}
                <div className=" p-6 flex flex-col h-full rounded-2xl">
                    <AlertsRisk />
                    
                    
                </div>

                {/* Map Card */}
                <div className="h-full">
                    <RiskMap data={data} />
                </div>
            </div>

            {/* PART 2 */}
            
            
            {/* PART 2: Detailed Table & Final Grid */}
            <div className="space-y-6">
                {/* 2-Column Chart & Table Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Advanced Audit Integrity Gauge (Left 1/3) */}
                    <Card className="bg-white border-0 shadow-sm p-6 flex flex-col rounded-2xl">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md mb-4 w-fit">
                                    <Activity size={16} className="text-[#E31A1C]" />
                                </div>
                                <h4 className="text-sm font-black text-[#2B3674] uppercase tracking-wider">Integridad de Proceso</h4>
                            </div>
                            <p className="text-xs font-bold text-[#A3AED0] uppercase">Métricas de validación avanzada</p>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                            {/* Semi-circle Gauge for Global Score */}
                            <div className="relative w-full h-[180px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { value: 82, fill: '#05CD99' },
                                                { value: 18, fill: '#F4F7FE' },
                                            ]}
                                            cx="50%"
                                            cy="100%"
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={0}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            <Cell fill="#05CD99" />
                                            <Cell fill="#F4F7FE" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute top-[60%] flex flex-col items-center">
                                    <span className="text-4xl font-black text-[#2B3674]">82.5</span>
                                    <span className="text-[10px] font-black text-[#05CD99] uppercase tracking-widest">Score Global</span>
                                </div>
                            </div>

                            {/* Category Performance Bars */}
                            <div className="w-full space-y-3 mt-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span className="text-[#707EAE]">Consistencia de Actas</span>
                                        <span className="text-[#2B3674]">94%</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#F4F7FE] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#4318FF] w-[94%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span className="text-[#707EAE]">Velocidad de Escrutinio</span>
                                        <span className="text-[#2B3674]">68%</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#F4F7FE] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#FFB547] w-[68%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-End Legend Grid */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-x-4 gap-y-6">
                             {/* Items will follow here */}
                             <div className="flex flex-col gap-1.5">
                                 <div className="flex items-center gap-2">
                                     <CheckCircle size={14} className="text-[#05CD99]" />
                                     <span className="text-[9px] font-bold text-[#A3AED0] uppercase tracking-tighter line-clamp-1">Mesas Válidas</span>
                                 </div>
                                 <div className="flex flex-col pl-5">
                                     <span className="text-lg font-black text-[#2B3674]">265.8k</span>
                                     <div className="flex items-center gap-1 text-[#05CD99] mt-0.5">
                                         <TrendingUp size={10} />
                                         <span className="text-[9px] font-bold">21.4%</span>
                                     </div>
                                 </div>
                             </div>

                             <div className="flex flex-col gap-1.5">
                                 <div className="flex items-center gap-2">
                                     <AlertTriangle size={14} className="text-[#FFB547]" />
                                     <span className="text-[9px] font-bold text-[#A3AED0] uppercase tracking-tighter line-clamp-1">Riesgo Medio</span>
                                 </div>
                                 <div className="flex flex-col pl-5">
                                     <span className="text-lg font-black text-[#2B3674]">356.2k</span>
                                     <div className="flex items-center gap-1 text-[#05CD99] mt-0.5">
                                         <TrendingUp size={10} />
                                         <span className="text-[9px] font-bold">20.1%</span>
                                     </div>
                                 </div>
                             </div>

                             <div className="flex flex-col gap-1.5">
                                 <div className="flex items-center gap-2">
                                     <Activity size={14} className="text-[#E31A1C]" />
                                     <span className="text-[9px] font-bold text-[#A3AED0] uppercase tracking-tighter line-clamp-1">Riesgo Alto</span>
                                 </div>
                                 <div className="flex flex-col pl-5">
                                     <span className="text-lg font-black text-[#2B3674]">18.5k</span>
                                     <div className="flex items-center gap-1 text-[#05CD99] mt-0.5">
                                         <TrendingUp size={10} />
                                         <span className="text-[9px] font-bold">15.6%</span>
                                     </div>
                                 </div>
                             </div>

                             <div className="flex flex-col gap-1.5">
                                 <div className="flex items-center gap-2">
                                     <ShieldCheck size={14} className="text-[#4318FF]" />
                                     <span className="text-xs font-bold text-[#A3AED0] uppercase tracking-tighter line-clamp-1">Pendientes</span>
                                 </div>
                                 <div className="flex flex-col pl-5">
                                     <span className="text-lg font-black text-[#2B3674]">190.4k</span>
                                     <div className="flex items-center gap-1 text-[#05CD99] mt-0.5">
                                         <TrendingUp size={10} />
                                         <span className="text-xs font-bold">18.5%</span>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </Card>

                    {/* Detailed Table (Right 2/3) */}
                    <Card className="lg:col-span-2 bg-white border-0 shadow-sm p-6 overflow-hidden rounded-2xl flex flex-col">
                        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500"/> 
                                    <span className="text-xs font-black text-green-700 tracking-tight">82% Válidos</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500"/> 
                                    <span className="text-xs font-black text-red-700 tracking-tight">4% Alto riesgo</span>
                                </div>
                            </div>
                            <div className="text-[10px] text-[#A3AED0] font-black uppercase tracking-widest">Showing {detailedTable?.length || 0} entries</div>
                        </div>
                        
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="text-xs text-[#A3AED0] uppercase bg-gray-50/50">
                                    <tr>
                                        <th className="px-4 py-4 font-black rounded-l-xl">Seleccionar</th>
                                        <th className="px-4 py-4 font-black">Mesa</th>
                                        <th className="px-4 py-4 font-black">Municipio</th>
                                        <th className="px-4 py-4 font-black">Score</th>
                                        <th className="px-4 py-4 font-black">Estado</th>
                                        <th className="px-4 py-4 font-black">Alertas</th>
                                        <th className="px-4 py-4 font-black rounded-r-xl">Ver</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {detailedTable?.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-4 py-4">
                                                <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300 text-[#4318FF] focus:ring-[#4318FF]" />
                                            </td>
                                            <td className="px-4 py-4 font-black text-[#2B3674] text-sm">{item.mesa}</td>
                                            <td className="px-4 py-4 font-bold text-[#707EAE] text-sm">{item.municipio}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-[#2B3674] text-sm">{item.score}</span>
                                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${
                                                                parseInt(item.score) > 80 ? 'bg-[#05CD99]' : 
                                                                parseInt(item.score) > 50 ? 'bg-[#FFB547]' : 
                                                                'bg-[#E31A1C]'
                                                            }`} 
                                                            style={{ width: `${parseInt(item.score)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                             <td className="px-4 py-4">
                                                 <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit ${
                                                    item.estado === 'Válido' ? 'bg-green-50' :
                                                    item.estado === 'Riesgo Alto' ? 'bg-red-50' :
                                                    'bg-orange-50'
                                                }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                                        item.estado === 'Válido' ? 'bg-[#05CD99]' :
                                                        item.estado === 'Riesgo Alto' ? 'bg-[#E31A1C]' :
                                                        'bg-[#FFB547]'
                                                    }`}></div>
                                                    <span className={`text-xs font-black uppercase ${
                                                        item.estado === 'Válido' ? 'text-[#05CD99]' :
                                                        item.estado === 'Riesgo Alto' ? 'text-[#E31A1C]' :
                                                        'text-[#FFB547]'
                                                    }`}>{item.estado}</span>
                                                </div>
                                            </td>
                                            <td className={`px-4 py-4 font-black text-xs uppercase ${
                                                item.alertas === 'Sin alertas' ? 'text-[#A3AED0]' : 'text-[#E31A1C]'
                                            }`}>{item.alertas}</td>
                                            <td 
                                                className="px-4 py-4 font-black text-[#4318FF] text-xs uppercase cursor-pointer hover:underline"
                                                onClick={() => setSelectedWitness(item.witness)}
                                            >
                                                Ver Testigo
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Bar */}
                        <div className="flex items-center justify-between mt-6 px-2">
                            <div className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">
                                Mostrando 1-{detailedTable?.length || 0} de {detailedTable?.length || 0} registros
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2.5 rounded-full bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100 transition-colors">
                                    <TrendingUp size={16} className="rotate-[270deg]" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-[#4318FF] text-white text-xs font-black shadow-lg shadow-blue-200 transition-all hover:translate-y-[-2px]">1</button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#2B3674] text-xs font-black hover:bg-gray-50 transition-all hover:translate-y-[-2px] shadow-sm">2</button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#2B3674] text-xs font-black hover:bg-gray-50 transition-all hover:translate-y-[-2px] shadow-sm">3</button>
                                <span className="text-gray-300 px-2 font-black">...</span>
                                <button className="p-2.5 rounded-full bg-white border border-gray-100 text-[#4318FF] hover:bg-gray-50 shadow-sm transition-all hover:translate-y-[-2px]">
                                    <TrendingUp size={16} className="rotate-90" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button className="px-6 py-2.5 bg-[#4318FF] text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-xl hover:bg-[#3311CC] flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95">
                                <FileText className="w-4 h-4"/> Ver imágenes completas
                            </button>
                            <button className="px-6 py-2.5 bg-white border border-gray-200 text-[#2B3674] text-[10px] font-black uppercase tracking-[0.1em] rounded-xl hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-all active:scale-95">
                                Exportar informe PDF
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Final 3-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <StatusList title="Marcadas Para Auditoria" items={auditList} type="alert" />
                    <StatusList title="Auditadas y resueltas" items={resolvedList} type="check" />
                    <Riskometer value={riskometer.value} label={riskometer.label} percentage={riskometer.percentage} />
                </div>
            </div>

        </div>
    );
}
