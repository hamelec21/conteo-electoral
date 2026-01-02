"use client";

import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { Eye, FileCheck, AlertCircle, Search, Download } from "lucide-react";

interface DocumentItem {
    title: string;
    status: string;
    img: string;
}

export default function DocumentGallery({ data }: { data: DocumentItem[] }) {
    // Helper for Status Look
    const getStatusStyle = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes("validada") || s.includes("legible")) return "bg-green-100 text-green-700 border-green-200";
        if (s.includes("revisión") || s.includes("pendiente")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
        if (s.includes("ilegible") || s.includes("error")) return "bg-red-100 text-red-700 border-red-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    const getStatusIcon = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes("validada")) return <FileCheck className="w-3 h-3 mr-1" />;
        if (s.includes("ilegible")) return <AlertCircle className="w-3 h-3 mr-1" />;
        return <Search className="w-3 h-3 mr-1" />;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {data.map((item, idx) => (
                <Card key={idx} className="group relative bg-white border-0 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden ring-1 ring-gray-100">
                    
                    {/* Image Area with Frame for Better Contrast */}
                    <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden p-3 flex items-center justify-center">
                        <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 shadow-md rounded-sm bg-white"
                        />
                        
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B3674]/90 via-[#2B3674]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-12">
                            <span className="text-white font-bold text-sm tracking-widest uppercase mb-2">Vista Previa</span>
                        </div>

                        {/* Status Badge - Floating */}
                        <div className="absolute top-3 right-3 z-10">
                            <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)} shadow-sm`}>
                                {getStatusIcon(item.status)}
                                {item.status}
                            </span>
                        </div>
                    </div>

                    {/* Footer Content with Actions */}
                    <CardContent className="p-4 bg-white border-t border-gray-50 relative z-10 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h4 className="font-bold text-[#2B3674] text-base line-clamp-1">{item.title}</h4>
                            <div className="flex items-center text-xs text-[#A3AED0]">
                                <span className="uppercase tracking-wider font-semibold">Mesa #8291A</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => window.open(item.img, '_blank')}
                                className="p-2 rounded-full bg-gray-50 text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-colors border border-gray-100"
                                title="Ver Detalle"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <a 
                                href={item.img} 
                                download={`Acta-${item.title}.jpg`}
                                className="p-2 rounded-full bg-gray-50 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-colors border border-gray-100"
                                title="Descargar Acta"
                            >
                                <Download className="w-4 h-4" />
                            </a>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
