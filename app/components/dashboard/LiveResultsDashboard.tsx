"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { 
    Download, FileText, Users, Percent, 
    Box, CheckCircle, AlertTriangle, 
    Eye, UserCheck, TrendingUp, Info
} from "lucide-react";
import { 
    AreaChart, Area, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import RegionalResultsCards from "./RegionalResultsCards";
import RegionalAnalysisTable from "./RegionalAnalysisTable";
import dynamic from "next/dynamic";
// Removed html2canvas and jspdf as we now use a static template

const ElectoralMap = dynamic(() => import("./ElectoralMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-slate-50 animate-pulse rounded-2xl" />
});

// Mock data for the specific charts in the design
const EVOLUTION_DATA = [
    { time: "10:30", value: 10 },
    { time: "11:00", value: 15 },
    { time: "11:30", value: 12 },
    { time: "12:00", value: 18 },
    { time: "12:30", value: 14 },
    { time: "01:00", value: 16 },
    { time: "01:30", value: 20 },
];

const DONUT_DATA = [
    { name: "Abelardo de la E.", value: 35, color: "#4318FF" },
    { name: "Iván Cepeda", value: 29, color: "#E31A1C" },
    { name: "Paloma Valencia", value: 16, color: "#2563EB" },
    { name: "Sergio Fajardo", value: 11, color: "#05CD99" },
    { name: "Juan Carlos Pinzón", value: 9, color: "#FFB547" },
];

export default function LiveResultsDashboard() {
    const handleDownloadTemplate = () => {
        const link = document.createElement('a');
        link.href = '/pdf/template.pdf';
        link.download = 'Boletin_Electoral_Oficial.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="dashboard-container" className="space-y-6 p-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-[#2B3674] tracking-tight">Resultados Electorales Detallados</h1>
                    <p className="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Consolidado nacional por agrupación política</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#4318FF] text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-[#3311CC] transition-all">
                        <FileText className="w-4 h-4" /> Boletín 12
                    </button>
                     <button 
                        onClick={handleDownloadTemplate}
                        className="flex items-center gap-2 bg-[#4318FF] text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-[#3311CC] transition-all"
                    >
                        <Download className="w-4 h-4" />
                        Exportar PDF
                    </button>
                </div>
            </div>

            {/* Top Row: Mini Metrics (9 Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-4">
                {[
                    { label: "Participación Total", value: "63.1%", trend: "+2.5% vs elección anterior", color: "#05CD99" },
                    { label: "Abstención", value: "36.9%", trend: "3.5%", color: "#FFB547" },
                    { label: "Votos en Blanco", value: "2.4%", trend: "Lenta alza urbana", color: "#4318FF" },
                    { label: "Votos Nulos", value: "0.9%", trend: "+0.1%", color: "#EE5D50" },
                    { label: "Votos Válidos", value: "96.7%", trend: "Alta confiabilidad", color: "#4318FF" },
                    { label: "Preconteo Cierre", value: "19:20", trend: "Estimado en tiempo real", color: "#7551FF" },
                    { label: "Espectadores", value: "1,234", trend: "Conectados ahora", icon: Eye },
                    { label: "Testigos", value: "1,234", trend: "Reportando ahora", icon: UserCheck },
                ].map((item: any, idx) => (
                    <Card key={idx} className="border-0 shadow-sm bg-white p-4 flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-wider mb-1 leading-tight">{item.label}</p>
                            <p className="text-lg font-black text-[#2B3674]">{item.value}</p>
                        </div>
                        {item.trend && (
                            <p className={`text-[8px] font-bold mt-2 ${item.color ? '' : 'text-[#A3AED0]'}`} style={{ color: item.color }}>
                                {item.trend}
                            </p>
                        )}
                        {item.icon && <item.icon className="w-3 h-3 text-[#A3AED0] absolute top-4 right-4" />}
                    </Card>
                ))}
                
                {/* Gauge Card (Incidencias) */}
                <Card className="border-0 shadow-sm bg-white p-4 relative overflow-hidden flex flex-col justify-between">
                    <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest mb-1 leading-tight text-center">Incidencias</p>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="relative w-16 h-10 overflow-hidden flex items-end justify-center">
                            {/* SVG Gauge */}
                            <svg className="w-16 h-16 transform -translate-y-2">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#F4F7FE" strokeWidth="6" strokeDasharray="88 100" strokeDashoffset="44" strokeLinecap="round" />
                                <circle cx="32" cy="32" r="28" fill="none" stroke="#05CD99" strokeWidth="6" strokeDasharray="44 100" strokeDashoffset="44" strokeLinecap="round" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2">
                                <AlertTriangle className="w-3 h-3 text-[#FFB547]" />
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-[#2B3674] mt-1 tracking-widest text-center">15.51K</p>
                    </div>
                </Card>
            </div>

            {/* Middle Row: Summary Metrics (5 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="bg-[#4318FF] border-0 shadow-lg p-5 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Box size={40} />
                    </div>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">Mesas Informadas</p>
                    <p className="text-2xl font-black mb-1">12.345</p>
                    <p className="text-[10px] font-bold text-white/50">/ 19.800 Totales</p>
                </Card>
                {[
                    { label: "Votos Contabilizados", value: "1.234.567", sub: "Total nacional" },
                    { label: "Candidato Líder", value: "Abelardo de la Espriella", sub: "Tendencia clave" },
                    { label: "Diferencia Votos", value: "+ 6.2%", sub: "Margen de victoria", color: "#05CD99" },
                    { label: "Índice de Confianza", value: "98.4%", sub: "Alta seguridad" },
                ].map((item, idx) => (
                    <Card key={idx} className="bg-white border-0 shadow-sm p-5 relative group overflow-hidden">
                        <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-1">{item.label}</p>
                        <p className={`text-xl font-black ${item.color ? '' : 'text-[#2B3674]'}`} style={{ color: item.color }}>{item.value}</p>
                        <p className="text-[10px] font-bold text-[#707EAE] mt-1">{item.sub}</p>
                    </Card>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Resultados Generales (Candidate Photos) */}
                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="px-6 py-4 border-b border-gray-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black text-[#2B3674] uppercase tracking-widest leading-none">Resultados Generales</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {[
                                    { name: "Abelardo de la Espriella", votes: "450.300", pct: "35%", img: "/images/candidatos/Abelardo_de _la_Espriella.png" },
                                    { name: "Iván Cepeda", votes: "380.200", pct: "29%", img: "/images/candidatos/Ivan_cepeda.png" },
                                    { name: "Paloma Valencia", votes: "210.100", pct: "16%", img: "/images/candidatos/paloma_valencia.png" },
                                    { name: "Sergio Fajardo", votes: "150.500", pct: "11%", img: "/images/candidatos/sergio_fajardo.png" },
                                    { name: "Juan Carlos Pinzón", votes: "80.600", pct: "6%", img: "/images/candidatos/juan_carlos_pinzon.png" },
                                ].map((cand, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex-shrink-0 shadow-sm">
                                            <img src={cand.img} className="w-full h-full object-cover" alt={cand.name} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[11px] font-black text-[#2B3674] truncate tracking-tight">{cand.name}</span>
                                                <span className="text-[10px] font-black text-[#A3AED0]">{cand.votes}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-[#F4F7FE] rounded-full overflow-hidden">
                                                <div className="h-full bg-[#4318FF] rounded-full" style={{ width: cand.pct }}></div>
                                            </div>
                                        </div>
                                        <div className="w-10 text-right">
                                            <span className="text-[10px] font-black text-[#05CD99]">{cand.pct}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary (AI Analysis + Line Chart) */}
                    <Card className="border-0 shadow-sm bg-white overflow-hidden flex flex-col">
                        <CardHeader className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                            <CardTitle className="text-sm font-black text-[#2B3674] uppercase tracking-widest leading-none">Summary</CardTitle>
                            <div className="flex items-center gap-2 bg-[#F4F7FE] px-2 py-1 rounded-lg">
                                <span className="text-[8px] font-bold text-[#2B3674]">19/03/2024 - 25/03/2024</span>
                                <TrendingUp size={10} className="text-[#A3AED0]" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col md:flex-row gap-6 flex-1">
                            <div className="w-full md:w-1/3 space-y-3">
                                <div className="p-4 bg-[#4318FF] rounded-xl text-white">
                                    <p className="text-[8px] font-black uppercase tracking-widest text-white/70 mb-1">Datos analizados por IA</p>
                                    <p className="text-lg font-black truncate">65.52k <span className="text-[10px] text-white/60 ml-1">+ 18.5%</span></p>
                                </div>
                                <div className="space-y-4 pt-2">
                                    {[
                                        { label: "Procesados", value: "15.51k", pct: "+ 11.5%", color: "text-[#05CD99]" },
                                        { label: "Válidos", value: "45.00k", pct: "", color: "text-[#2B3674]" },
                                        { label: "Con Alertas", value: "45.00k", pct: "", color: "text-[#2B3674]" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]"></div>
                                                <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-wider">{item.label}</span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm font-black text-[#2B3674]">{item.value}</span>
                                                {item.pct && <span className={`text-[10px] font-black ${item.color}`}>{item.pct}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 h-64 md:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={EVOLUTION_DATA}>
                                        <defs>
                                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F7FE" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            labelStyle={{ display: 'none' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#4318FF" fillOpacity={1} fill="url(#chartGrad)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Evolución del Preconteo (Donut + Names) */}
                    <Card className="border-0 shadow-sm bg-white overflow-hidden flex flex-col">
                        <CardHeader className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                            <CardTitle className="text-xs font-black text-[#2B3674] uppercase tracking-widest leading-none">Evolución del Preconteo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col items-center flex-1">
                            <div className="relative w-44 h-44 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={DONUT_DATA}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {DONUT_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <p className="text-lg font-black text-[#2B3674]">1,165.30k</p>
                                    <p className="text-[8px] font-black text-[#A3AED0] uppercase tracking-widest">Portfolio Value</p>
                                </div>
                            </div>
                            <div className="w-full space-y-4">
                                {DONUT_DATA.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-wider truncate max-w-[120px]">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-[#2B3674]">{item.value * 5.4}k</p>
                                            <p className="text-[8px] font-bold text-[#05CD99]">▲ 20.16%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[8px] font-medium text-[#A3AED0] mt-6 text-center italic">You have invested in different types of categories shown as above and summary of each category.</p>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        {/* Tendencia Line Chart */}
                        <Card className="border-0 shadow-sm bg-white overflow-hidden">
                            <CardHeader className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={14} className="text-[#4318FF]" />
                                    <CardTitle className="text-xs font-black text-[#2B3674] uppercase tracking-widest leading-none">Tendencia</CardTitle>
                                </div>
                                <div className="flex items-center gap-1">
                                     <div className="w-1.5 h-1.5 rounded-full bg-blue-100"></div>
                                     <div className="w-1.5 h-1.5 rounded-full bg-blue-50"></div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-xs font-black text-[#2B3674] mb-4">GANA <span className="text-[#A3AED0] font-bold uppercase ml-2 text-[10px]">Abelardo de la Espriella</span> <span className="text-[#4318FF] ml-1">63%</span></p>
                                <div className="h-32 w-full bg-[#111C44] rounded-xl overflow-hidden relative shadow-inner">
                                    {/* Mock small chart in black background */}
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={EVOLUTION_DATA}>
                                            <Area type="monotone" dataKey="value" stroke="#4318FF" fill="#4318FF" fillOpacity={0.2} strokeWidth={2} dot={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col items-center">
                                    <p className="text-[8px] font-black text-[#A3AED0] uppercase tracking-widest mb-3">% de Confiabilidad de la Elección</p>
                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                        <div className="absolute inset-0 border-4 border-[#F4F7FE] rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-[#05CD99] rounded-full border-t-transparent border-r-transparent rotate-[135deg]"></div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-[#05CD99]"></div>
                                                <span className="text-lg font-black text-[#2B3674]">94%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interactive Map Block */}
                        <Card className="border-0 shadow-sm bg-white overflow-hidden h-[240px] relative">
                             <ElectoralMap height="240px" />
                             {/* Floating Legend Overlay */}
                             <div className="absolute top-4 left-6 z-10 flex flex-col pointer-events-none">
                                <h3 className="text-[10px] font-black text-[#2B3674] uppercase tracking-widest mb-1">Mapa Electoral Interactivo</h3>
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#4318FF]"></div>
                                        <span className="text-[8px] font-black text-[#A3AED0] uppercase tracking-widest">De la Espriella</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#E31A1C]"></div>
                                        <span className="text-[8px] font-black text-[#A3AED0] uppercase tracking-widest">Iván Cepeda</span>
                                    </div>
                                </div>
                             </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Bottom Sections Area */}
            <div className="space-y-12">
                {/* Bottom Row: Regional Results Cardinals (Reusing component) */}
                <div className="pt-6">
                    <h2 className="text-[10px] font-black text-[#2B3674] uppercase tracking-widest mb-6">Resultados por Region</h2>
                    <RegionalResultsCards />
                </div>

                {/* Bottom Section: Department Table (Reusing component) */}
                <div className="pb-12">
                    <RegionalAnalysisTable />
                </div>
            </div>
        </div>
    );
}
