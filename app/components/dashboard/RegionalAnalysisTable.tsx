"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { Search, Filter, Map as MapIcon, ChevronDown, Download } from "lucide-react";

const DEPARTMENTS = [
    {
        name: "ANTIOQUIA",
        winner: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" },
        second: { name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" },
        others: { name: "OTROS", pct: "35.15%", profit: "485,000" }
    },
    {
        name: "SANTANDER",
        winner: { name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" },
        second: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" },
        others: { name: "OTROS", pct: "35.15%", profit: "485,000" }
    },
    {
        name: "BOYACÁ",
        winner: { name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" },
        second: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" },
        others: { name: "OTROS", pct: "35.15%", profit: "485,000" }
    },
    {
        name: "VALLE DEL CAUCA",
        winner: { name: "ABELARDO DE LA E.", pct: "35.15%", profit: "485,000" },
        second: { name: "IVAN CEPEDA", pct: "35.15%", profit: "485,000" },
        third: { name: "PALOMA VALENCIA", pct: "35.15%", profit: "485,000" },
        fourth: { name: "SERGIO FAJARDO", pct: "35.15%", profit: "485,000" },
        others: { name: "OTROS", pct: "35.15%", profit: "485,000" }
    }
];

import GeographicConfidenceAnalysis from "./GeographicConfidenceAnalysis";

const CandidateCell = ({ data }: { data: any }) => (
    <div className="flex flex-col py-1">
        <span className="text-[11px] font-black text-[#2B3674] tracking-tight">{data.name}</span>
        <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold text-[#707EAE]">{data.pct}</span>
            <span className="text-[9px] font-black text-[#05CD99] bg-[#05CD99]/10 px-2.5 py-0.5 rounded-full uppercase tracking-widest">Votos: {data.profit}</span>
        </div>
    </div>
);

export default function RegionalAnalysisTable() {
    const [selectedRegion, setSelectedRegion] = useState("Andina");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Table Area (Left 3/4) */}
            <Card className="lg:col-span-3 border-0 shadow-lg rounded-3xl bg-white overflow-hidden flex flex-col">
                <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-black text-[#2B3674] tracking-tight">Análisis por Departamento</CardTitle>
                        <p className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mt-1">Desglose técnico avanzado</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#F4F7FE] rounded-full px-4 py-2 border border-gray-100">
                            <Search className="w-4 h-4 text-[#2B3674] mr-2" />
                            <input type="text" placeholder="Buscar..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-[#2B3674] focus:ring-0 placeholder-[#A3AED0] w-32" />
                        </div>
                        <button className="p-3 bg-white border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4 text-[#2B3674]" />
                        </button>
                    </div>
                </CardHeader>
                
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F4F7FE]/50 text-[10px] uppercase font-black text-[#A3AED0] tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Departamento</th>
                                <th className="px-5 py-5 text-center">Gráfico</th>
                                <th className="px-5 py-5">Ganador</th>
                                <th className="px-5 py-5">Segundo</th>
                                <th className="px-5 py-5">Tercero</th>
                                <th className="px-5 py-5">Cuarto</th>
                                <th className="px-5 py-5">Otros</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {DEPARTMENTS.map((dept, idx) => (
                                <tr key={idx} className="hover:bg-[#F4F7FE]/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[#2B3674]">{dept.name}</span>
                                            <span className="text-[10px] font-bold text-[#A3AED0]">Simulación Realista</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-center">
                                        <div className="flex items-center justify-center gap-0.5 h-8">
                                            {[40, 70, 45, 90, 65].map((h, i) => (
                                                <div key={i} className="w-1.5 bg-[#4318FF] rounded-full opacity-20 group-hover:opacity-100 transition-all duration-500" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5"><CandidateCell data={dept.winner} /></td>
                                    <td className="px-5 py-5"><CandidateCell data={dept.second} /></td>
                                    <td className="px-5 py-5"><CandidateCell data={dept.third} /></td>
                                    <td className="px-5 py-5"><CandidateCell data={dept.fourth} /></td>
                                    <td className="px-5 py-5"><CandidateCell data={dept.others} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
                
                <div className="p-8 border-t border-gray-50 bg-[#F4F7FE]/20">
                    <button className="flex items-center gap-2 bg-[#4318FF] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-[#3311CC] transition-all active:scale-95">
                        <Download className="w-4 h-4" /> Descargar Auditoría Completa
                    </button>
                </div>
            </Card>

            {/* Regional Analysis Dashboard (Right 1/4) */}
            <div className="lg:col-span-1">
                <GeographicConfidenceAnalysis />
            </div>
        </div>
    );
}
