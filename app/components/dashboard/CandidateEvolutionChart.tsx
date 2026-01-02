"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CandidateEvolutionChart({ data }: { data: any[] }) {
    const formatYAxis = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
    };

    return (
        <Card className="bg-white text-[#2B3674] mt-8 border-0 shadow-sm ring-1 ring-gray-100">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Evolución del Preconteo</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorCan1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCan2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E31A1C" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#E31A1C" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCan3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="time" stroke="#A3AED0" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#A3AED0" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                                formatter={(value: any) => new Intl.NumberFormat('es-CO').format(value)}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                            <Area 
                                type="monotone" 
                                dataKey="candidate1" 
                                name="Abelardo de la Espriella" 
                                stroke="#4318FF" 
                                fillOpacity={1} 
                                fill="url(#colorCan1)" 
                                strokeWidth={3}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="candidate2" 
                                name="Iván Cepeda" 
                                stroke="#E31A1C" 
                                fillOpacity={1} 
                                fill="url(#colorCan2)" 
                                strokeWidth={3}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="candidate3" 
                                name="Paloma Valencia" 
                                stroke="#2563EB" 
                                fillOpacity={1} 
                                fill="url(#colorCan3)" 
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
