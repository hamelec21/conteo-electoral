"use client";

import { useEffect, useState } from "react";
import { getElectionData, ElectionData } from "./services/electionService";
import KPICards from "./components/dashboard/KPICards";
import { CandidateList, EvolutionChart } from "./components/dashboard/GeneralResultsCharts";
import dynamic from "next/dynamic";
import CoverageVelocity from "./components/dashboard/CoverageVelocity";
import IntegrityTrust from "./components/dashboard/IntegrityTrust";
import AlertsRisk from "./components/dashboard/AlertsRisk";
import PollingStationBlock from "./components/dashboard/PollingStationBlock";
import DashboardShell from "./components/dashboard/DashboardShell";


const ElectoralMap = dynamic(() => import("./components/dashboard/ElectoralMap"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-slate-900 animate-pulse rounded-xl" />
});

export default function Home() {
  const [data, setData] = useState<ElectionData | null>(null);

  useEffect(() => {
    // Simulating Real API Fetch
    getElectionData().then(setData);
  }, []);

  if (!data) return (
      <DashboardShell>
          <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
      </DashboardShell>
  );

  return (
    <DashboardShell>
        {/* BLOCK 1: KPIs */}
        <section>
         
          <KPICards />
        </section>

        {/* BLOCK 2 & 3: Results, Evolution & Map */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
             <div className="xl:col-span-1 flex flex-col gap-6">
                <CandidateList data={data.candidates} />
             </div>
             <div className="xl:col-span-1 flex flex-col gap-6">
                 <EvolutionChart data={data.timeSeries} />
             </div>
             <div className="xl:col-span-1 flex flex-col gap-6">
                 <ElectoralMap />
             </div>
        </section>

        {/* BLOCK 4, 5, 6: Coverage, Integrity, Alerts */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
             <div className="xl:col-span-2">
                  <CoverageVelocity />
             </div>
             <div className="xl:col-span-1">
                  <IntegrityTrust />
             </div>
             <div className="xl:col-span-1">
                  <AlertsRisk />
             </div>
        </section>

        {/* BLOCK 7: Evidence Table */}
        <section>
            <PollingStationBlock />
        </section>

    </DashboardShell>
  );
}
