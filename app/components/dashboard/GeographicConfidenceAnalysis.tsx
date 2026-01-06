import React, { useState } from "react";
import { Card, CardContent } from "../ui-blocks";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { 
    FileText, CheckCircle, AlertTriangle, 
    Flame, Clock, TrendingUp, MapPin, ChevronDown 
} from "lucide-react";

const GAUGE_COLORS = ["#05CD99", "#05CD99", "#FFD95A", "#FFB547", "#EE5D50", "#E31A1C"];

const REGIONS = [
    "Nacional", "Bogotá", "Antioquia", "Valle del Cauca", "Atlántico", "Santander", "Bolívar"
];

const MetricItem = ({ icon: Icon, label, value, trend, color, iconColor }: any) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg bg-gray-50`}>
                <Icon size={14} className={iconColor || "text-[#A3AED0]"} />
            </div>
            <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-[#2B3674] tracking-tight">{value}</span>
            {trend && (
                <div className="flex items-center gap-0.5">
                    <TrendingUp size={10} className="text-[#05CD99]" />
                    <span className="text-[10px] font-black text-[#05CD99]">{trend}</span>
                </div>
            )}
        </div>
    </div>
);

export default function GeographicConfidenceAnalysis() {
    const [selectedRegion, setSelectedRegion] = useState("Nacional");

    // Gauge Data (Semi-circle)
    const data = [
        { value: 16.6 }, { value: 16.6 }, { value: 16.6 },
        { value: 16.6 }, { value: 16.6 }, { value: 17 },
    ];

    return (
        <div className="h-full flex flex-col p-6 bg-white rounded-3xl">
            {/* Header with Selector */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <h3 className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">INDICE DE CONFIANZA</h3>
                </div>
                <div className="relative group">
                    <button className="flex items-center gap-2 bg-[#F4F7FE] px-4 py-2 rounded-xl text-[10px] font-black text-[#2B3674] uppercase tracking-widest hover:bg-gray-100 transition-all">
                        {selectedRegion} <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-10 items-center justify-center flex-1">
                {/* Gauge Container */}
                <div className="flex flex-col items-center justify-center relative w-full max-w-[280px]">
                    <div className="w-full aspect-[2/1] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius="60%"
                                    outerRadius="90%"
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={GAUGE_COLORS[index % GAUGE_COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Gauge Needle */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-[42%] bg-[#4318FF] origin-bottom transition-all duration-1000 ease-out z-20" 
                             style={{ transform: 'translateX(-50%) rotate(30deg)' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4318FF] rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4318FF] rounded-full border-2 border-white shadow-lg"></div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-1 w-8 bg-[#05CD99] rounded-full"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-[#2B3674] tracking-tight">15.51M</span>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <TrendingUp size={14} className="text-[#05CD99]" />
                                    <span className="text-xs font-black text-[#05CD99]">11.5%</span>
                                </div>
                            </div>
                            <div className="h-1 w-8 bg-[#E5E7EB] rounded-full"></div>
                        </div>
                        <p className="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-2 font-black">Votos Auditados</p>
                    </div>
                </div>

                {/* Metrics List (Stacked) */}
                <div className="w-full flex flex-col gap-8 px-4">
                    <MetricItem 
                        icon={FileText} 
                        label="E-14 procesados" 
                        value="165.52k" 
                        trend="25.30%" 
                    />
                    <MetricItem 
                        icon={CheckCircle} 
                        label="% Validos" 
                        value="265.85k" 
                        trend="21.42%" 
                        iconColor="text-[#05CD99]"
                    />
                    <MetricItem 
                        icon={AlertTriangle} 
                        label="Con alertas" 
                        value="356.26k" 
                        trend="20.18%" 
                        iconColor="text-[#FFB547]"
                    />
                    <MetricItem 
                        icon={Flame} 
                        label="Con alto Riesgo" 
                        value="185.65k" 
                        trend="15.65%" 
                        iconColor="text-[#EE5D50]"
                    />
                    <div className="pt-8 border-t border-gray-100">
                        <MetricItem 
                            icon={Clock} 
                            label="pendientes por auditar" 
                            value="190.45k" 
                            trend="18.50%" 
                            iconColor="text-[#FFB547]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
