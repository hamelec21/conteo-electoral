"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { ELECTION_DATA } from "@/app/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer,  Legend } from "recharts";
import { AlertTriangle } from "lucide-react";

export default function AlertsRisk() {
    const { alerts } = ELECTION_DATA;

    return (
        <Card className="bg-white dark:bg-gray-900 text-[#2B3674] dark:text-white h-full shadow-sm border border-gray-100 dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-xl font-black text-[#2B3674] tracking-tight">Alertas y Riesgos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">

                 {/* Top: Chart */}
                 <div className="h-[220px] w-full flex items-center justify-center relative">
                     <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                             <Pie
                                 data={alerts.byType}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={50}
                                 outerRadius={70}
                                 paddingAngle={2}
                                 dataKey="value"
                             >
                                 {alerts.byType.map((entry, index) => (
                                     <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                             </Pie>
                             <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '11px', color: '#9CA3AF'}}/>
                         </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                        <p className="text-3xl font-black text-[#2B3674] dark:text-white tracking-tighter">166</p>
                        <p className="text-[10px] font-black text-[#A3AED0] dark:text-gray-400 uppercase tracking-widest">Total</p>
                    </div>
                 </div>

                 {/* Bottom: 2 Columns */}
                 <div className="grid grid-cols-2 gap-4">
                    {/* Col 1: Counts */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-red-500/10 border-l-4 border-red-500 rounded-r p-2 flex justify-between items-center">
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Altas</span>
                            <span className="text-xl font-black text-red-600 dark:text-red-500 tracking-tighter">12</span>
                        </div>
                        <div className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r p-2 flex justify-between items-center">
                            <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest">Medias</span>
                            <span className="text-xl font-black text-yellow-600 dark:text-yellow-500 tracking-tighter">34</span>
                        </div>
                        <div className="bg-green-500/10 border-l-4 border-green-500 rounded-r p-2 flex justify-between items-center">
                             <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Bajas</span>
                             <span className="text-xl font-black text-green-600 dark:text-green-500 tracking-tighter">120</span>
                        </div>
                    </div>

                    {/* Col 2: Alert Types */}
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500"></div>
                             <p className="text-[10px] text-[#2B3674] dark:text-gray-300 font-black uppercase tracking-widest leading-tight">Dif. Imagen/Dato</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                             <p className="text-[10px] text-[#2B3674] dark:text-gray-300 font-black uppercase tracking-widest leading-tight">Geo inconsistente</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <p className="text-[10px] text-[#2B3674] dark:text-gray-300 font-black uppercase tracking-widest leading-tight">Hora anómala</p>
                        </div>
                    </div>
                 </div>
            </CardContent>
        </Card>
    );
}
