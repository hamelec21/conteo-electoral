"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "../ui-blocks";
import { ELECTION_DATA } from "@/app/lib/mockData";
import { FileText, CheckCircle, AlertTriangle, XCircle, MapPin, Hash, Key } from "lucide-react";

export default function PollingStationBlock() {
    const { pollingStations } = ELECTION_DATA;
    const [selectedStation, setSelectedStation] = useState(pollingStations[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Table Section */}
            <Card className="bg-white text-[#2B3674] col-span-1 lg:col-span-3 h-full">
                <CardHeader>
                    <CardTitle>Ver las Mesas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-[#A3AED0] uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Mesa</th>
                                    <th className="px-6 py-3">Puesto</th>
                                    <th className="px-6 py-3">Municipio</th>
                                    <th className="px-6 py-3">Votos Abelardo</th>
                                    <th className="px-6 py-3">Votos Iván</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3">Riesgo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pollingStations.map((station) => (
                                    <tr 
                                        key={station.id} 
                                        onClick={() => setSelectedStation(station)}
                                        className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedStation.id === station.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 font-medium">{station.id}</td>
                                        <td className="px-6 py-4">{station.place}</td>
                                        <td className="px-6 py-4">{station.municipality}</td>
                                        <td className="px-6 py-4 text-[#4318FF] font-bold">{(station as any).votes?.abelardo || 0}</td>
                                        <td className="px-6 py-4 text-[#E31A1C] font-bold">{(station as any).votes?.ivan || 0}</td>
                                        <td className="px-6 py-4">
                                            {station.state === 'OK' && <Badge variant="success">OK</Badge>}
                                            {station.state === 'Alerta' && <Badge variant="warning">Alerta</Badge>}
                                            {station.state === 'Incidencia' && <Badge variant="destructive">Incidencia</Badge>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {station.risk === 'Bajo' && <span className="text-green-500 font-bold">Bajo</span>}
                                            {station.risk === 'Media' && <span className="text-yellow-500 font-bold">Medio</span>}
                                            {station.risk === 'Alta' && <span className="text-red-500 font-bold">Alto</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Evidence Panel */}
            <Card className="bg-white text-[#2B3674] col-span-1 lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-[#4318FF]">
                    <FileText className="w-48 h-48" />
                </div>
                <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#4318FF]" />
                        Evidencia Digital - Mesa {selectedStation.id}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {/* Mock Image Placeholder */}
                    <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 relative group">
                        <img 
                            src="https://placehold.co/600x400/f1f5f9/334155?text=ACTA+E-14" 
                            alt="Acta Digitalizada" 
                            className="w-full h-full object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <span className="bg-white/80 px-3 py-1 rounded-full text-xs text-[#2B3674] shadow-sm font-bold">Click para ampliar</span>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#F4F7FE] rounded text-[#4318FF] mt-1">
                                <Hash className="w-4 h-4" />
                            </div>
                            <div className="flex-1 break-all">
                                <p className="text-[#A3AED0] text-xs uppercase">Hash SHA-256 (Integridad)</p>
                                <p className="font-mono text-xs text-[#05CD99]">{selectedStation.evidence.hash}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-[#F4F7FE] rounded text-[#4318FF] mt-1">
                                <Key className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[#A3AED0] text-xs uppercase">Firma Digital</p>
                                <div className="flex items-center gap-2">
                                     {selectedStation.evidence.signature === 'VALID' ? (
                                         <Badge variant="success" className="bg-[#05CD99]/10 text-[#05CD99] border-none">VÁLIDA</Badge>
                                     ) : (
                                          <Badge variant="destructive">INVÁLIDA</Badge>
                                     )}
                                     <span className="text-xs text-[#A3AED0]">Certificado: ROOT-CA-COL-2026</span>
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-[#F4F7FE] rounded text-[#FFB547] mt-1">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[#A3AED0] text-xs uppercase">Device ID</p>
                                    <p className="font-mono text-[#2B3674]">{selectedStation.evidence.device}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3">
                                <div className="p-2 bg-[#F4F7FE] rounded text-[#05CD99] mt-1">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[#A3AED0] text-xs uppercase">Tiempo Registro</p>
                                    <p className="font-mono text-[#2B3674]">{selectedStation.evidence.time}</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
