"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function RegionCoverageChart({ data }: { data: any[] }) {
    // Parse data: Avance string "96%" -> 96
    const chartData = data.map(item => ({
        name: item.region,
        avance: parseFloat(item.avance.replace("%", "")),
        total: parseInt(item.total.replace(",", "")),
        color: parseFloat(item.avance.replace("%", "")) > 90 ? "#05CD99" : 
               parseFloat(item.avance.replace("%", "")) > 60 ? "#4318FF" : "#FFB547"
    }));

    return (
        <Card className="bg-white text-[#2B3674] mt-8">
            <CardHeader>
                <CardTitle>Avance de Transmisión por Región</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient id="coverageHigh" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#05CD99" />
                                    <stop offset="100%" stopColor="#02966E" />
                                </linearGradient>
                                <linearGradient id="coverageMed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4318FF" />
                                    <stop offset="100%" stopColor="#2E10B3" />
                                </linearGradient>
                                <linearGradient id="coverageLow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FFB547" />
                                    <stop offset="100%" stopColor="#E59424" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis dataKey="name" stroke="#A3AED0" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#A3AED0" fontSize={12} unit="%" tickLine={false} axisLine={false} />
                            <Tooltip 
                                cursor={{fill: '#F8FAFC', radius: 8}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="avance" radius={[6, 6, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={
                                        entry.avance > 90 ? "url(#coverageHigh)" : 
                                        entry.avance > 60 ? "url(#coverageMed)" : "url(#coverageLow)"
                                    } />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
