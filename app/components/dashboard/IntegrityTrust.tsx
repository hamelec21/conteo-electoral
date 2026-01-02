"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { ELECTION_DATA } from "@/app/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldCheck, Fingerprint, Clock, MapPin } from "lucide-react";

export default function IntegrityTrust() {
    const { integrity } = ELECTION_DATA;

    // Data for Trust Gauge (Partial Pie)
    const gaugeData = [
        { name: 'Confianza', value: integrity.hashValid, color: '#10B981' },
        { name: 'Riesgo', value: 100 - integrity.hashValid, color: '#374151' },
    ];

    const validationIcons = {
        "Hash": <ShieldCheck className="w-4 h-4" />,
        "Firma": <Fingerprint className="w-4 h-4" />,
        "Tiempo": <Clock className="w-4 h-4" />,
        "Geo": <MapPin className="w-4 h-4" />
    };

    return (
        <Card className="bg-white text-[#2B3674] h-full">
            <CardHeader>
                <CardTitle>Integridad y Confianza</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                
                {/* Gauge Section */}
                <div className="flex flex-col items-center justify-center relative h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={gaugeData}
                                cx="50%"
                                cy="70%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                <Cell key="cell-0" fill="#05CD99" />
                                <Cell key="cell-1" fill="#E5E7EB" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-8 text-center">
                        <p className="text-3xl font-bold">{integrity.hashValid}%</p>
                        <p className="text-xs text-[#A3AED0]">Índice Global</p>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F4F7FE] p-3 rounded-lg min-w-0">
                        <div className="flex items-center gap-2 text-[#05CD99] mb-1">
                            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-bold text-[#A3AED0]">Hash Válido</span>
                        </div>
                        <p className="text-lg font-bold">{integrity.hashValid}%</p>
                    </div>
                    <div className="bg-[#F4F7FE] p-3 rounded-lg min-w-0">
                        <div className="flex items-center gap-2 text-[#4318FF] mb-1">
                            <Fingerprint className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-bold text-[#A3AED0]">Firma Digital</span>
                        </div>
                        <p className="text-lg font-bold">{integrity.signatureValid}%</p>
                    </div>
                     <div className="bg-[#F4F7FE] p-3 rounded-lg min-w-0">
                        <div className="flex items-center gap-2 text-[#FFB547] mb-1">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-bold text-[#A3AED0]">Sello Tiempo</span>
                        </div>
                        <p className="text-lg font-bold">{integrity.timestampValid}%</p>
                    </div>
                     <div className="bg-[#F4F7FE] p-3 rounded-lg min-w-0">
                        <div className="flex items-center gap-2 text-[#E5E7EB] mb-1">
                            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs font-bold text-[#A3AED0]">Geolocalización</span>
                        </div>
                         <p className="text-lg font-bold">{integrity.geoValid}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
