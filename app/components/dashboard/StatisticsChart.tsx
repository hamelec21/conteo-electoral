"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";

interface StatsItem {
    label: string;
    value: string;
    color: string;
}

export default function StatisticsChart({ data }: { data: StatsItem[] }) {
    // Helper to extract number from "62.4%" string
    const parseVal = (str: string) => parseFloat(str.replace("%", ""));

    // Prepare Data for Participation Chart (Participation vs Abstention)
    const participationItem = data.find(d => d.label === "Participación Total");
    const abstentionItem = data.find(d => d.label === "Abstención");
    
    const participationData = [
        { name: "Participación", value: participationItem ? parseVal(participationItem.value) : 0, color: "#05CD99" },
        { name: "Abstención", value: abstentionItem ? parseVal(abstentionItem.value) : 0, color: "#FFB547" },
    ];

    // Prepare Data for Vote Distribution (Valid, Blank, Null)
    // We normalize this relative to Total Votes Cast (sum of Valid + Null? Actually usually Valid includes Blank? 
    // Usually Total Votes = Valid + Null + Unmarked. 
    // Here we have Valid (97.1), Null (0.8), Blank (2.1). Sum = 100%. Perfect.
    const validItem = data.find(d => d.label === "Votos Válidos");
    const blankItem = data.find(d => d.label === "Votos en Blanco");
    const nullItem = data.find(d => d.label === "Votos Nulos");

    const votesData = [
        { name: "Votos Válidos", value: validItem ? parseVal(validItem.value) : 0, color: "#4318FF" },
        { name: "Votos en Blanco", value: blankItem ? parseVal(blankItem.value) : 0, color: "#A3AED0" },
        { name: "Votos Nulos", value: nullItem ? parseVal(nullItem.value) : 0, color: "#E31A1C" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Participation Chart */}
            <Card className="bg-white text-[#2B3674] border-0 shadow-sm ring-1 ring-gray-100">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Participación Ciudadana</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#05CD99" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#02966E" stopOpacity={1}/>
                                    </linearGradient>
                                    <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FFB547" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#E59424" stopOpacity={1}/>
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={participationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    cornerRadius={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {participationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color === "#05CD99" ? "url(#gradGreen)" : "url(#gradOrange)"} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value: any) => [`${value}%`, undefined]}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <span className="text-3xl font-black text-[#2B3674]">{participationItem ? participationItem.value : "0%"}</span>
                            <span className="text-xs text-[#A3AED0] font-bold uppercase tracking-wider">Total</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Vote Distribution Chart */}
            <Card className="bg-white text-[#2B3674] border-0 shadow-sm ring-1 ring-gray-100">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Distribución de Votos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={votesData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                barSize={20}
                            >
                                <defs>
                                    <linearGradient id="gradBlue" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#4318FF" />
                                        <stop offset="100%" stopColor="#7B5CFF" />
                                    </linearGradient>
                                    <linearGradient id="gradGray" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#A3AED0" />
                                        <stop offset="100%" stopColor="#CBD5E1" />
                                    </linearGradient>
                                    <linearGradient id="gradRed" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#E31A1C" />
                                        <stop offset="100%" stopColor="#FB7185" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F1F5F9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={110} stroke="#2B3674" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#F8FAFC', radius: 4}} 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value: any) => [`${value}%`, undefined]} 
                                />
                                <Bar dataKey="value" radius={[0, 10, 10, 0]} background={{ fill: '#F8FAFC', radius: 10 }}>
                                    {votesData.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={
                                             entry.name.includes("Válidos") ? "url(#gradBlue)" :
                                             entry.name.includes("Blanco") ? "url(#gradGray)" : "url(#gradRed)"
                                         } />
                                    ))}
                                    <LabelList 
                                        dataKey="value" 
                                        position="right" 
                                        formatter={(val: any) => `${val}%`}
                                        style={{ fill: '#2B3674', fontSize: '10px', fontWeight: '900' }} 
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
