import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { ELECTION_DATA } from "@/app/lib/mockData";
import { formatNumber, formatPercent } from "@/app/lib/utils";
import { Vote, FileText, BarChart3, Trophy, Lock, TrendingDown } from "lucide-react";

export default function KPICards() {
    const { kpis } = ELECTION_DATA;

    const cards = [
        { 
            label: "Mesas Informadas", 
            value: `${formatNumber(kpis.tablesReported)}`, 
            sub: `/ ${formatNumber(kpis.totalTables)} Totales`,
            icon: <FileText className="w-6 h-6 text-white" />,
            featured: true
        },
        { 
            label: "Votos Contabilizados", 
            value: formatNumber(kpis.votesCounted), 
            sub: "Total nacional",
            icon: <Vote className="w-6 h-6 text-[#4318FF]" />
        },
        { 
            label: "Candidato Líder", 
            value: kpis.leader, 
            sub: "Tendencia clara",
            icon: <Trophy className="w-6 h-6 text-[#FFB547]" />
        },
        { 
            label: "Diferencia Votos", 
            value: `+ ${kpis.voteDifference}%`, 
            sub: "Margen victoria",
            icon: <TrendingDown className="w-6 h-6 text-[#05CD99]" />
        },
        { 
            label: "Índice de Confianza", 
            value: `${kpis.trustIndex}%`, 
            sub: "Alta seguridad",
            icon: <Lock className="w-6 h-6 text-[#4318FF]" />
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {cards.map((card, idx) => (
                <Card key={idx} className={card.featured ? "bg-[#4318FF] text-white border-transparent" : "bg-white dark:bg-gray-900 text-[#2B3674] dark:text-white border-gray-100 dark:border-gray-800"}>
                    <CardContent className="p-4 flex flex-col justify-between h-full"> 
                        <div className="flex items-center gap-3 mb-2">
                             <div className={`p-2 rounded-full ${card.featured ? 'bg-white/20' : 'bg-[#F4F7FE] dark:bg-gray-800'}`}>
                                {card.icon}
                             </div>
                             {!card.featured && <p className="text-[#A3AED0] dark:text-gray-400 text-sm font-medium">{card.label}</p>}
                             {card.featured && <p className="text-gray-100 text-sm font-medium">{card.label}</p>}
                        </div>
                        <div>
                            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
                            <p className={`text-xs mt-1 ${card.featured ? 'text-gray-200' : 'text-[#A3AED0] dark:text-gray-400'}`}>{card.sub}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
