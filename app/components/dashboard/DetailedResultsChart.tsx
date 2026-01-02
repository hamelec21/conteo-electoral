"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DetailedResultsChart({ data }: { data: any[] }) {
    // Parser helper: "3.1M" -> 3.1, "200K" -> 0.2 (scale to Millions for readability)
    const parseToMillions = (str: string) => {
        if (!str) return 0;
        if (str.includes("M")) return parseFloat(str.replace("M", ""));
        if (str.includes("K")) return parseFloat(str.replace("K", "")) / 1000;
        return 0;
    };

    const chartData = data.map(item => ({
        name: item.can,
        Urbano: parseToMillions(item.urb),
        Rural: parseToMillions(item.rur),
        Total: item.tot
    })).filter(item => item.name); // Filter out empty rows if any

    return (
        <Card className="bg-white text-[#2B3674] mt-8">
            <CardHeader>
                <CardTitle>Distribución de Votos: Urbano vs Rural (Millones)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient id="gradUrbano" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4318FF" />
                                    <stop offset="100%" stopColor="#2E10B3" />
                                </linearGradient>
                                <linearGradient id="gradRural" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#05CD99" />
                                    <stop offset="100%" stopColor="#02966E" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#A3AED0" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#A3AED0" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                cursor={{fill: '#F4F7FE', radius: 8}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                formatter={(value: any) => [`${value.toFixed(2)}M`, undefined]}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                            <Bar dataKey="Urbano" stackId="a" fill="url(#gradUrbano)" radius={[0, 0, 4, 4]} barSize={50} />
                            <Bar dataKey="Rural" stackId="a" fill="url(#gradRural)" radius={[4, 4, 0, 0]} barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
