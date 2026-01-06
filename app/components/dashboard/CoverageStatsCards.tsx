"use client";

import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { PAGE_CONTENT } from "@/app/lib/mockPageContent";

export default function CoverageStatsCards() {
    const { data } = PAGE_CONTENT.cobertura;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {data.map((item: any, idx: number) => (
                <Card key={idx} className="border-0 shadow-sm relative overflow-hidden bg-white rounded-2xl">
                    {/* Blue side indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4318FF]" />
                    
                    <CardContent className="p-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#A3AED0] mb-2">
                            {item.label}
                        </p>
                        <p className="text-3xl font-black text-[#2B3674] tracking-tight">
                            {item.value}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
