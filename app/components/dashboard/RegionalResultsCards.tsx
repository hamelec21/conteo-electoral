import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { REGIONAL_RESULTS } from "@/app/lib/mockPageContent";

export default function RegionalResultsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {REGIONAL_RESULTS.map((region, idx) => (
                <Card key={idx} className="border-0 shadow-lg relative overflow-hidden bg-white rounded-3xl group cursor-pointer hover:translate-y-[-4px] transition-all duration-300">
                    <CardContent className="p-6 relative z-10">
                        {/* Header: Image + Name */}
                        <div className="flex flex-col items-center mb-6">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform bg-[#F4F7FE] overflow-hidden`}>
                                {region.img ? (
                                    <img src={region.img} alt={region.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-7 h-7 bg-slate-200 rounded-full" />
                                )}
                            </div>
                            <h3 className="text-[#2B3674] font-black text-sm tracking-widest uppercase">{region.name}</h3>
                        </div>

                        <div className="space-y-3">
                            {region.candidates.map((candidate, cIdx) => (
                                <div key={cIdx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: candidate.color }} />
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
