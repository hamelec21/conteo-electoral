"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "../ui-blocks";
import { ELECTION_DATA } from "@/app/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Clock, Zap } from "lucide-react";

export default function CoverageVelocity() {
    const { regions } = ELECTION_DATA;

    // Helper to color bars based on reporting % (although here we map 'reported' vs 'tables' roughly)
    const getBarColor = (reported: number, total: number) => {
        const pct = reported / total;
        if (pct > 0.8) return "#10B981"; // Green
        if (pct > 0.5) return "#F59E0B"; // Yellow
        return "#EF4444"; // Red
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coverage Bars */}
            <Card className="bg-white text-[#2B3674] col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Cobertura por Región</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={regions}
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    width={100} 
                                    tick={{ fill: '#A3AED0', fontSize: 12 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#E5E7EB', color: '#1F2937', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', borderRadius: '8px', padding: '12px' }}
                                    formatter={(value: any, name: any, props: any) => {
                                        const region = props.payload;
                                        return [
                                            <div key="tooltip" className="space-y-1">
                                                <p className="font-bold text-sm">{region.name}</p>
                                                <p className="text-xs">Informadas: <span className="font-semibold">{region.reported.toLocaleString()}</span> / {region.tables.toLocaleString()}</p>
                                                <p className="text-xs">Avance: <span className="font-semibold text-blue-600">{region.percentage}</span></p>
                                                <p className="text-xs text-gray-500">{region.trend}</p>
                                            </div>,
                                            ''
                                        ];
                                    }}
                                />
                                <Bar dataKey="reported" name="Mesas Reportadas" radius={[0, 4, 4, 0]} barSize={20}>
                                    {regions.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getBarColor(entry.reported, entry.tables)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Velocity Heatmap / Status */}
            <Card className="bg-white text-[#2B3674]">
                <CardHeader>
                    <CardTitle>Velocidad de Reporte</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-[#F4F7FE] border-none">
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                             <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Tiempo Promedio</p>
                            <p className="text-xl font-bold">12 min</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <h4 className="text-sm font-semibold text-[#A3AED0]">Estado por Regiones</h4>
                         {regions.map((region, idx) => (
                             <div key={idx} className="flex items-center justify-between text-sm">
                                 <span className="text-[#2B3674] font-medium">{region.name}</span>
                                 {region.status === 'rapid' && <Badge variant="success">Rápido 🚀</Badge>}
                                 {region.status === 'medium' && <Badge variant="warning">Normal ⏱️</Badge>}
                                 {region.status === 'slow' && <Badge variant="destructive">Lento ⚠️</Badge>}
                             </div>
                         ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
