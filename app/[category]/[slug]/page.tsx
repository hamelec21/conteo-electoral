"use client";

import React, { use } from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui-blocks";
import { PAGE_CONTENT } from "../../lib/mockPageContent";
import { AlertTriangle, FileText, Info } from "lucide-react";
import dynamic from "next/dynamic";
import StatisticsChart from "../../components/dashboard/StatisticsChart";
import RegionCoverageChart from "../../components/dashboard/RegionCoverageChart";
import DetailedResultsChart from "../../components/dashboard/DetailedResultsChart";
import DocumentGallery from "../../components/dashboard/DocumentGallery";
import CandidateEvolutionChart from "../../components/dashboard/CandidateEvolutionChart";
import DeviceInventoryCharts from "../../components/dashboard/DeviceInventoryCharts";
import ValidationDashboard from "../../components/dashboard/ValidationDashboard";
import WitnessDatabase from "../../components/dashboard/WitnessDatabase";
import LiveResultsDashboard from "../../components/dashboard/LiveResultsDashboard";

export default function MenuPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
    // ... existing code ...

    // Inside the return, finding where to inject.
    // We already have specific injection for 'estadisticas'.
    // We need to inject for 'cobertura-region' inside the 'table' block? Or strictly outside?
    // The user wants it for 'Cobertura Detallada por Región'. It is a TABLE type page.
    // So go to the TABLE block.

    const resolvedParams = use(params);
    const { slug } = resolvedParams;
    const content = PAGE_CONTENT[slug];

    // Specific override for Electoral Map
    if (slug === 'mapa-electoral') {
        const ElectoralMap = dynamic(() => import("../../components/dashboard/ElectoralMap"), {
            ssr: false,
            loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-xl" />
        });
        
        return (
            <DashboardShell>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-[#2B3674] tracking-tight">Georreferenciación Electoral</h2>
                    <p className="text-[#A3AED0]">Mapa térmico de votación a nivel municipal.</p>
                </div>
                <Card className="bg-white p-1 overflow-hidden shadow-lg border-0">
                    <ElectoralMap height="600px" />
                </Card>
            </DashboardShell>
        );
    }

    // Specific override for Live Results Dashboard (Transmisión en vivo)
    if (slug === 'resultados') {
        return (
            <DashboardShell>
                <LiveResultsDashboard />
            </DashboardShell>
        );
    }

    if (!content) {
        return (
            <DashboardShell>
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <AlertTriangle className="w-16 h-16 text-[#FFB547] mb-4" />
                    <h2 className="text-2xl font-bold text-[#2B3674]">Página no encontrada</h2>
                    <p className="text-[#A3AED0]">La sección {slug} no tiene contenido definido.</p>
                </div>
            </DashboardShell>
        );
    }

    // Helper for Table Badges
    const renderCell = (val: any) => {
        const strVal = String(val).toLowerCase();
        if (["activo", "en línea", "validada", "alta", "online", "resuelto", "sí"].some(s => strVal.includes(s))) {
            return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs">{val}</span>;
        }
        if (["inactivo", "desconectado", "baja", "ilegible", "no"].some(s => strVal.includes(s))) {
            return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs">{val}</span>;
        }
        if (["revisión", "media", "investigando", "escalado", "standby"].some(s => strVal.includes(s))) {
            return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-xs">{val}</span>;
        }
        if (["pdf", "excel", "csv", "docx"].some(s => strVal === s)) {
             return <span className="px-2 py-1 rounded bg-blue-50 text-[#4318FF] font-bold text-xs border border-blue-100">{val}</span>;
        }
        return <span className="text-[#2B3674] font-medium">{val}</span>;
    };

    return (
        <DashboardShell>
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#2B3674] tracking-tight">{content.title}</h2>
                <p className="text-[#A3AED0]">{content.description}</p>
            </div>

            {/* Content Renderer */}
            {content.type === 'table' && content.data && (
                <div className="space-y-6">
                    <Card className="bg-white text-[#2B3674] border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-[#2B3674]">Detalle de Registros</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-[#A3AED0] uppercase bg-gray-50/50 border-b border-gray-100">
                                        <tr>
                                            {content.columns?.map((col: string, idx: number) => (
                                                <th key={idx} className="px-6 py-4 font-bold tracking-wider">{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {content.data.map((row: any, rIdx: number) => (
                                            <tr key={rIdx} className="hover:bg-blue-50/30 transition-colors">
                                                {Object.values(row).map((val: any, cIdx: number) => (
                                                    <td key={cIdx} className="px-6 py-4 whitespace-nowrap">
                                                        {renderCell(val)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {slug === 'dispositivos' && content.chartData && (
                        <DeviceInventoryCharts data={content.chartData} />
                    )}

                    {slug === 'cobertura-region' && (
                        <RegionCoverageChart data={content.data} />
                    )}
                </div>
            )}

            {content.type === 'grid' && content.data && (
                slug === 'actas-escaneadas' ? (
                    <DocumentGallery data={content.data} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.data.map((item: any, idx: number) => (
                            <Card key={idx} className="bg-white overflow-hidden group hover:shadow-xl transition-all border-0 rounded-2xl ring-1 ring-gray-100">
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="preview"/>
                                    <div className="absolute top-3 right-3">
                                        {renderCell(item.status)}
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h4 className="font-bold text-lg text-[#2B3674] mb-1">{item.title}</h4>
                                    {/* Optional subtitle driven by logic or mock data could go here */}
                                    <p className="text-xs text-[#A3AED0] font-medium uppercase tracking-wider">Documento Digitalizado</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            )}

            {content.type === 'validation-dashboard' && content.data && (
                <ValidationDashboard data={content.data} />
            )}

            {content.type === 'witness-database' && content.data && (
                <WitnessDatabase data={content.data} />
            )}

            {content.type === 'stats' && content.data && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.data.map((item: any, idx: number) => (
                            <Card key={idx} className="bg-white p-6 flex flex-col justify-between border-0 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div 
                                    className="absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2"
                                    style={{ backgroundColor: item.color || '#4318FF' }}
                                ></div>
                                <div>
                                    <h3 className="text-[#A3AED0] text-xs font-bold uppercase tracking-widest mb-2">{item.label}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-black text-[#2B3674]">{item.value}</p>
                                    </div>
                                </div>
                                {item.trend && (
                                    <div className="mt-4 flex items-center text-xs font-bold">
                                        <span 
                                            className={`px-2 py-1 rounded-full ${
                                                item.trend.includes('+') ? 'bg-green-50 text-[#05CD99]' : 
                                                item.trend.includes('-') ? 'bg-orange-50 text-[#FFB547]' : 
                                                'bg-gray-50 text-[#A3AED0]'
                                            }`}
                                        >
                                            {item.trend}
                                        </span>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                
                    {slug === 'estadisticas' && (
                        <StatisticsChart data={content.data} />
                    )}
                </div>
            )}

            {content.type === 'text' && (
                <Card className="bg-white p-12 min-h-[400px] flex flex-col items-center justify-center border-0 shadow-sm relative">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
                    <div className="text-center max-w-2xl relative z-10">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Info className="w-10 h-10 text-[#4318FF]" />
                        </div>
                        <h3 className="text-3xl font-bold text-[#2B3674] mb-4">{content.title}</h3>
                        <p className="text-[#A3AED0] text-lg leading-relaxed">{content.content}</p>
                    </div>
                </Card>
            )}

        </DashboardShell>
    );
}
