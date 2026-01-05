"use client";

import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ChartData {
    value?: number;
    total?: number;
    label?: string;
    subLabel?: string;
    metrics?: { label: string; value: string; color?: string }[];
    breakdown?: { name: string; value: number; color: string }[];
}

interface DeviceInventoryChartsProps {
    data: {
        connected: ChartData;
        disconnected: ChartData;
        sentInfo: ChartData;
        pendingInfo: ChartData;
        incidents: ChartData;
    };
}

const COLORS = {
    green: "#05CD99",
    greenLight: "#E6FBF5",
    orange: "#FFB547",
    red: "#E31A1C",
    yellow: "#FACC15",
    blue: "#4318FF",
    gray: "#F4F7FE"
};

// Reusable Gauge Component (Semi-Circle)
import { ShieldCheck, Fingerprint, Clock, MapPin } from "lucide-react";

const GaugeChart = ({ value, label, subLabel, metrics }: { value: number; label: string; subLabel: string; metrics?: any[] }) => {
    const data = [
        { name: "Value", value: value, color: COLORS.green },
        { name: "Remaining", value: 100 - value, color: COLORS.gray }
    ];

    const getIcon = (label: string) => {
        if (label.includes("Hash")) return <ShieldCheck className="w-4 h-4" />;
        if (label.includes("Firma")) return <Fingerprint className="w-4 h-4" />;
        if (label.includes("Tiempo")) return <Clock className="w-4 h-4" />;
        if (label.includes("Geo")) return <MapPin className="w-4 h-4" />;
        return <ShieldCheck className="w-4 h-4" />;
    };

    const getColor = (label: string) => {
        if (label.includes("Hash")) return "#05CD99";
        if (label.includes("Firma")) return "#4318FF";
        if (label.includes("Tiempo")) return "#FFB547";
        if (label.includes("Geo")) return "#A3AED0"; // Using gray/blue for Geo as per IntegrityTrust reference usually? Or Blue. Let's use Blue or Gray.
        return "#4318FF";
    };

    return (
        <Card className="bg-white border-0 shadow-sm rounded-2xl p-4 flex flex-col h-full">
            <div className="text-center mb-2">
                <h3 className="text-[#2B3674] font-bold text-sm">{label}</h3>
            </div>
            
            <div className="h-[140px] w-full relative -mt-4 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="80%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={0}
                            cornerRadius={10}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text */}
                <div className="absolute top-[65%] left-0 right-0 flex flex-col items-center">
                    <span className="text-2xl font-black text-[#2B3674]">{value}%</span>
                    <span className="text-[10px] text-[#A3AED0] uppercase font-bold">{subLabel}</span>
                </div>
            </div>

            {/* Metrics Grid - Styled like IntegrityTrust */}
            {metrics && (
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    {metrics.map((m, idx) => (
                        <div key={idx} className="bg-[#F4F7FE] p-2 rounded-lg flex flex-col justify-center">
                            <div className="flex items-center gap-1 mb-1" style={{ color: getColor(m.label) }}>
                                {getIcon(m.label)}
                                <span className="text-[9px] text-[#A3AED0] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{m.label}</span>
                            </div>
                            <span className="text-sm font-bold text-[#2B3674] pl-5">{m.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

// Reusable Donut Chart Component
const DonutStatsChart = ({ total, breakdown, label, subLabel, metrics }: { total: number; breakdown: any[]; label: string; subLabel?: string; metrics?: any[] }) => {
    return (
        <Card className="bg-white border-0 shadow-sm rounded-2xl p-4 flex flex-col h-full">
             <div className="text-center mb-2">
                <h3 className="text-[#2B3674] font-bold text-sm leading-tight min-h-[40px] flex items-center justify-center">{label}</h3>
            </div>

            <div className="h-[140px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                         <Pie
                            data={breakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {breakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                 {/* Center Total */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-[#2B3674]">{total}</span>
                    <span className="text-[10px] text-[#A3AED0] font-bold uppercase">Total</span>
                </div>
            </div>

             {/* Legend Bubbles */}
             <div className="flex justify-center gap-2 my-2">
                 {[
                      { l: "Dif. Imagen/Dato", c: COLORS.red }, 
                      { l: "Geo inconsistente", c: COLORS.yellow }, 
                      { l: "Hora anómala", c: COLORS.orange }
                 ].map((leg, idx) => (
                     <div key={idx} className="flex items-center gap-1">
                         <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: leg.c }} />
                         <span className="text-[8px] text-[#A3AED0] font-bold whitespace-nowrap">{leg.l}</span>
                     </div>
                 ))}
             </div>

            {/* Metrics Footer (Altas / Medias / Bajas) */}
            <div className="mt-auto space-y-1">
                 {metrics && metrics.map((m, idx) => (
                     <div key={idx} className={`flex items-center justify-between px-2 py-1 rounded-md ${
                         m.label === 'ALTAS' ? 'bg-red-50 text-[#E31A1C]' :
                         m.label === 'MEDIAS' ? 'bg-orange-50 text-[#FFB547]' :
                         'bg-green-50 text-[#05CD99]'
                     }`}>
                         <span className="text-[10px] font-bold">{m.label}</span>
                         <span className="text-xs font-black">{m.value}</span>
                     </div>
                 ))}
            </div>
        </Card>
    );
}

export default function DeviceInventoryCharts({ data }: DeviceInventoryChartsProps) {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* 1. Connected Gauge */}
            <GaugeChart 
                value={data.connected.value || 0} 
                label="Dispositivos conectados" 
                subLabel="Índice Global"
                metrics={data.connected.metrics} 
            />

            {/* 2. Variation vs Disconnected Donut */}
            <DonutStatsChart
                label="% variacion vs desconectados"
                total={data.disconnected.total || 0}
                breakdown={data.disconnected.breakdown || []}
                metrics={data.disconnected.metrics}
            />

            {/* 3. Sent Info Gauge */}
            <GaugeChart 
                value={data.sentInfo.value || 0} 
                label="Dispositivos que enviaron información" 
                subLabel="Índice Global"
                metrics={data.sentInfo.metrics} 
            />

             {/* 4. Missing Info Donut */}
             <DonutStatsChart
                label="dispositivos que falta por enviar info"
                total={data.pendingInfo.total || 0}
                breakdown={data.pendingInfo.breakdown || []}
                metrics={data.pendingInfo.metrics}
            />

             {/* 5. Incidents Donut */}
             <DonutStatsChart
                label="dispositivos que reportaron incidencias"
                total={data.incidents.total || 0}
                breakdown={data.incidents.breakdown || []}
                metrics={data.incidents.metrics}
            />
        </div>
    );
}
