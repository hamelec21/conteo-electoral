"use client";

import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { Box, Building, Percent, Grid } from "lucide-react";

const REGIONS = [
    {
        name: "ANDINA",
        icon: Box,
        color: "#4318FF",
        bgColor: "bg-[#4318FF]",
        candidates: [
            { name: "ABELARDO DE LA E.", pct: "35.15%", color: "bg-[#05CD99]" },
            { name: "PALOMA VALENCIA", pct: "35.15%", color: "bg-[#FFB547]" },
            { name: "SERGIO FAJARDO", pct: "35.15%", color: "bg-[#7551FF]" },
            { name: "IVAN CEPEDA", pct: "35.15%", color: "bg-[#EE5D50]" }
        ]
    },
    {
        name: "CARIBE",
        icon: Building,
        color: "#05CD99",
        bgColor: "bg-[#05CD99]",
        candidates: [
            { name: "ABELARDO DE LA E.", pct: "35.15%", color: "bg-[#05CD99]" },
            { name: "PALOMA VALENCIA", pct: "35.15%", color: "bg-[#FFB547]" },
            { name: "SERGIO FAJARDO", pct: "35.15%", color: "bg-[#7551FF]" },
            { name: "IVAN CEPEDA", pct: "35.15%", color: "bg-[#EE5D50]" }
        ]
    },
    {
        name: "PACÍFICA",
        icon: Percent,
        color: "#FFB547",
        bgColor: "bg-[#FFB547]",
        candidates: [
            { name: "ABELARDO DE LA E.", pct: "35.15%", color: "bg-[#05CD99]" },
            { name: "PALOMA VALENCIA", pct: "35.15%", color: "bg-[#FFB547]" },
            { name: "SERGIO FAJARDO", pct: "35.15%", color: "bg-[#7551FF]" },
            { name: "IVAN CEPEDA", pct: "35.15%", color: "bg-[#EE5D50]" }
        ]
    },
    {
        name: "ORINOQUÍA",
        icon: Grid,
        color: "#EE5D50",
        bgColor: "bg-[#EE5D50]",
        candidates: [
            { name: "ABELARDO DE LA E.", pct: "35.15%", color: "bg-[#05CD99]" },
            { name: "PALOMA VALENCIA", pct: "35.15%", color: "bg-[#FFB547]" },
            { name: "SERGIO FAJARDO", pct: "35.15%", color: "bg-[#7551FF]" },
            { name: "IVAN CEPEDA", pct: "35.15%", color: "bg-[#EE5D50]" }
        ]
    },
    {
        name: "AMAZONÍA",
        icon: Grid,
        color: "#E31A1C",
        bgColor: "bg-[#E31A1C]",
        candidates: [
            { name: "ABELARDO DE LA E.", pct: "35.15%", color: "bg-[#05CD99]" },
            { name: "PALOMA VALENCIA", pct: "35.15%", color: "bg-[#FFB547]" },
            { name: "SERGIO FAJARDO", pct: "35.15%", color: "bg-[#7551FF]" },
            { name: "IVAN CEPEDA", pct: "35.15%", color: "bg-[#EE5D50]" }
        ]
    }
];

export default function RegionalResultsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {REGIONS.map((region, idx) => (
                <Card key={idx} className="border-0 shadow-lg relative overflow-hidden bg-white rounded-3xl group cursor-pointer hover:translate-y-[-4px] transition-all duration-300">
                    <CardContent className="p-6 relative z-10">
                        {/* Header: Icon + Name */}
                        <div className="flex flex-col items-center mb-6">
                            <div className={`w-14 h-14 ${region.bgColor} rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                                <region.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-[#2B3674] font-black text-sm tracking-widest">{region.name}</h3>
                        </div>

                        <div className="space-y-3">
                            {region.candidates.map((candidate, cIdx) => (
                                <div key={cIdx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${candidate.color}`} />
                                        <span className="text-[10px] font-black text-[#2B3674] tracking-widest uppercase truncate max-w-[90px]">
                                            {candidate.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black text-[#A3AED0] tracking-widest">{candidate.pct}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    {/* Decorative Wave Background */}
                    <div className="absolute bottom-0 left-0 w-full opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 150C60 120 120 180 180 150C240 120 300 180 360 150C380 140 400 140 400 140V150H0V150Z" fill="currentColor" />
                        </svg>
                    </div>
                </Card>
            ))}
        </div>
    );
}
