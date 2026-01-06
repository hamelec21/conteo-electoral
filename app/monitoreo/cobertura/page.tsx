"use client";

import React from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import CoverageStatsCards from "../../components/dashboard/CoverageStatsCards";
import dynamic from "next/dynamic";

const CoverageMap = dynamic(() => import("../../components/dashboard/CoverageMap"), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-xl" />
});

export default function CoberturaPage() {
    return (
        <DashboardShell>
            <div className="mb-8">
                <h2 className="text-3xl font-black text-[#2B3674] tracking-tight text-shadow-sm uppercase">Monitor de Cobertura en Tiempo Real</h2>
                <p className="text-[#A3AED0] font-bold uppercase tracking-widest text-xs mt-1">Seguimiento al despliegue y recepción de información.</p>
            </div>

            {/* Coverage Stats Cards - Restored Design */}
            <CoverageStatsCards />

            {/* Regional Coverage Map - Below the cards */}
            <div className="-mx-4 md:-mx-6 lg:-mx-8">
                <CoverageMap data={{}} />
            </div>
        </DashboardShell>
    );
}
