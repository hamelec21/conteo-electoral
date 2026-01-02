"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { formatNumber } from "@/app/lib/utils";
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";

export function CandidateList({ data }: { data: any[] }) {
    // If no data or empty, handle gracefully
    if (!data) return null;

    // Sort candidates by votes for better visual
    const sortedCandidates = [...data].sort((a, b) => b.votes - a.votes);

    return (
        <Card className="bg-white text-[#2B3674] h-full shadow-sm">
            <CardHeader>
                <CardTitle>Resultados Generales</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {sortedCandidates.map((candidate, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 shadow-sm hover:shadow-md">
                            {/* Photo & Rank */}
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4318FF] text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                                    {idx + 1}
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="min-w-0 pr-4">
                                        <h4 className="text-[#2B3674] font-bold text-sm truncate" title={candidate.name}>{candidate.name}</h4>
                                        <p className="text-[#A3AED0] text-xs truncate" title={candidate.profession}>{candidate.profession}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-[#2B3674] font-bold text-sm">{formatNumber(candidate.votes)}</p>
                                        <p className="text-[#05CD99] text-xs font-bold">{candidate.percent}%</p>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-[#F4F7FE] rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full transition-all duration-500" 
                                        style={{ width: `${candidate.percent}%`, backgroundColor: candidate.color }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function EvolutionChart({ data }: { data: any[] }) {
    if (!data) return null;

    const formatYAxis = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
    };

    return (
        <Card className="bg-white text-[#2B3674] shadow-sm h-full">
            <CardHeader>
                <CardTitle>Evolución del Preconteo</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorVotesA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorVotesB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E31A1C" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#E31A1C" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorVotesC" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" stroke="#A3AED0" tickLine={false} axisLine={false} />
                            <YAxis stroke="#A3AED0" tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                                formatter={(value: any) => new Intl.NumberFormat('es-CO').format(value)}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                            <Area 
                                type="monotone" 
                                dataKey="votesA" 
                                name="Abelardo de la Espriella"
                                stroke="#4318FF" 
                                fillOpacity={1} 
                                fill="url(#colorVotesA)" 
                                strokeWidth={2}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="votesB" 
                                name="Iván Cepeda"
                                stroke="#E31A1C" 
                                fillOpacity={1} 
                                fill="url(#colorVotesB)" 
                                strokeWidth={2}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="votesC" 
                                name="Paloma Valencia"
                                stroke="#2563EB" 
                                fillOpacity={1} 
                                fill="url(#colorVotesC)" 
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
