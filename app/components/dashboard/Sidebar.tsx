"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Users, Shield, Smartphone, Lock, 
    FileText, Map, BarChart, Globe, 
    History, AlertTriangle, PieChart, 
    CheckCircle, Signal, Home, Book, 
    LifeBuoy, Send, X
} from "lucide-react";

const MENU_ITEMS = [
    { name: "Dashboard", slug: "", icon: Home },
    { name: "Control Permisos", slug: "administracion/control-permisos", icon: Shield },
    { name: "Dispositivos", slug: "administracion/dispositivos", icon: Smartphone },
    { name: "Gestión Usuarios", slug: "administracion/gestion-usuarios", icon: Users },
    { name: "Actas Escaneadas", slug: "gestion/actas-escaneadas", icon: FileText },
    { name: "Cobertura Región", slug: "gestion/cobertura-region", icon: Map },
    { name: "Estadísticas", slug: "gestion/estadisticas", icon: BarChart },
    { name: "Mapa Electoral", slug: "gestion/mapa-electoral", icon: Globe },
    { name: "Resultados", slug: "gestion/resultados", icon: PieChart },
    { name: "Validación Datos", slug: "gestion/validacion-datos", icon: CheckCircle },
    { name: "Cobertura", slug: "monitoreo/cobertura", icon: Signal },
    { name: "Documentación", slug: "general/documentacion", icon: Book },
    { name: "Reportes", slug: "general/reportes", icon: FileText },
    { name: "Soporte", slug: "general/soporte", icon: LifeBuoy },
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    
    const isActive = (slug: string) => {
        if (slug === "") return pathname === "/";
        return pathname === `/${slug}`;
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:sticky top-0 h-screen
                w-[280px] md:w-[240px] 
                bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800
                flex flex-col flex-shrink-0 
                transition-all duration-300 ease-in-out
                z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50 dark:border-gray-800 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#4318FF] to-[#7551FF] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <h1 className="text-lg font-bold text-[#2B3674] dark:text-white">
                            Electoral<span className="text-[#4318FF]">UX</span>
                        </h1>
                    </div>

                    {/* Mobile Close Button */}
                    <button 
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-[#F4F7FE] dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-[#A3AED0] dark:text-gray-400" />
                    </button>
                </div>

                {/* Quick Links Label */}
                <div className="px-6 pt-6 pb-2">
                    <p className="text-xs font-semibold text-[#A3AED0] dark:text-gray-500 uppercase tracking-wider">Quick Links</p>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {MENU_ITEMS.map((item, idx) => {
                        const active = isActive(item.slug);
                        const Icon = item.icon;
                        
                        return (
                            <Link 
                                key={idx}
                                href={item.slug === "" ? "/" : `/${item.slug}`}
                                onClick={onClose}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                                    ${active
                                        ? "bg-[#F4F7FE] dark:bg-gray-800 text-[#4318FF]" 
                                        : "hover:bg-[#F4F7FE] dark:hover:bg-gray-800 text-[#A3AED0] dark:text-gray-400 hover:text-[#2B3674] dark:hover:text-white"
                                    }
                                `}
                            >
                                <Icon className={`w-4 h-4 ${active ? "text-[#4318FF]" : "text-[#A3AED0] dark:text-gray-400 group-hover:text-[#4318FF]"}`} />
                                <span className={`font-medium text-sm ${active ? "font-semibold" : ""}`}>{item.name}</span>
                                {active && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-[#4318FF] rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer / User Info */}
                <div className="p-4 border-t border-gray-50 dark:border-gray-800 flex-shrink-0">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4318FF] to-[#7551FF] text-white flex items-center justify-center font-semibold text-xs shadow-md">
                            OE
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2B3674] dark:text-white truncate">Operador</p>
                            <p className="text-xs text-[#A3AED0] dark:text-gray-500 truncate">Sistema Central</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
