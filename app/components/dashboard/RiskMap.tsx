import React, { useEffect, useRef, useState } from 'react';
import { Info, Map as MapIcon, AlertTriangle, BarChart3, X, User, Activity } from 'lucide-react';
import { Card } from "../ui-blocks";

const RiskMap = ({ data }: { data: any }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Use zones from data if available, otherwise fallback to sample
  const zones = data?.zones || [
    { id: 1, name: "Quibdó", depto: "Chocó", lat: 5.692, lng: -76.658, level: "extreme", color: "#ef4444", alert: 85, personal: 120 },
    { id: 2, name: "Medellín", depto: "Antioquia", lat: 6.244, lng: -75.581, level: "high", color: "#f97316", alert: 62, personal: 450 },
    { id: 3, name: "Bogotá", depto: "Cundinamarca", lat: 4.609, lng: -74.081, level: "medium", color: "#eab308", alert: 34, personal: 980 },
    { id: 4, name: "Cali", depto: "Valle del Cauca", lat: 3.451, lng: -76.532, level: "high", color: "#f97316", alert: 71, personal: 340 },
  ];

  useEffect(() => {
    // Dynamic loading of Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    function initMap() {
      if (!mapRef.current || mapInstance.current) return;
      // @ts-ignore
      const L = window.L;
      
      const southWest = L.latLng(-4.5, -83.0);
      const northEast = L.latLng(13.5, -66.0);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapRef.current, { 
        zoomControl: false,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        minZoom: 5
      }).setView([4.5709, -74.2973], 5.5);

      mapInstance.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap',
        bounds: bounds
      }).addTo(map);

      // Add Markers
      zones.forEach((loc: any) => {
        const color = loc.level === 'extreme' ? '#ef4444' : loc.level === 'high' ? '#f97316' : '#eab308';
        const isRed = loc.level === 'extreme';
        
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="position: relative; width: 14px; height: 14px;">
              ${isRed ? `
                <div class="pulse-ring-base pulse-ring-1" style="background-color: ${color};"></div>
                <div class="pulse-ring-base pulse-ring-2" style="background-color: ${color};"></div>
                <div class="pulse-ring-base pulse-ring-3" style="background-color: ${color};"></div>
              ` : ''}
              <div style="background-color: ${color}; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 8px ${color}; position: relative; z-index: 2;"></div>
            </div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([loc.lat || 4.5, loc.lng || -74.3], { icon: customIcon }).addTo(map);
        
        marker.on('click', () => {
          setSelectedItem({ type: 'localidad', ...loc, color });
        });

        marker.bindTooltip(`<b>${loc.name}</b><br>Riesgo: ${loc.level === 'extreme' ? 'Extremo' : loc.level === 'high' ? 'Alto' : 'Medio'}`, {
          direction: 'top',
          offset: [0, -5]
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [zones]); // Re-init Map if zones change

  return (
    <Card className="flex h-[600px] w-full bg-slate-50 overflow-hidden font-sans text-slate-900 border-0 shadow-sm p-0 rounded-2xl">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(4.5); opacity: 0; }
        }
        .pulse-ring-base {
          position: absolute;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          z-index: 1;
          box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
        }
        .pulse-ring-1 { animation-delay: 0s; }
        .pulse-ring-2 { animation-delay: 0.8s; }
        .pulse-ring-3 { animation-delay: 1.6s; }
      `}</style>
      
      <main className="flex-1 flex flex-col relative rounded-xl overflow-hidden">
        {/* HEADER */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Georreferenciación Electoral</h1>
            <p className="text-xs text-slate-500 font-medium">Monitoreo de Incidentes y Cobertura Nacional</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-600">EN VIVO</span>
            </div>
          </div>
        </header>

        {/* MAPA Y SIDEBAR METRICAS */}
        <div className="flex-1 flex relative bg-slate-200 overflow-hidden">
          {/* Sidebar de Métricas (Electoral Context) - NOW ON LEFT */}
          <div className="w-[180px] bg-white border-r flex flex-col p-4 gap-6 shrink-0 z-10 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">E-14 procesados</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">165.520</p>
              <span className="text-[9px] font-black text-emerald-500 flex items-center ml-1 uppercase tracking-widest">▲ 25.30%</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-50">
                   <div className="w-4 h-4 border-2 border-emerald-500 rounded flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm"></div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">% Válidos</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">356.260</p>
              <span className="text-[9px] font-black text-emerald-500 flex items-center ml-1 uppercase tracking-widest">▲ 20.18%</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-orange-50">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">% con alertas</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">190.450</p>
              <span className="text-[9px] font-black text-emerald-500 flex items-center ml-1 uppercase tracking-widest">▲ 18.50%</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-red-50">
                  <Activity className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">% alto riesgo</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">15.450</p>
              <span className="text-[9px] font-black text-emerald-500 flex items-center ml-1 uppercase tracking-widest">▲ 18.50%</span>
            </div>
          </div>

          {/* Mapa Principal */}
          <div ref={mapRef} className="flex-1 h-full z-0" style={{ minHeight: '400px' }} />

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white z-[400] max-w-xs">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Info size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">Consolidado Nacional</h3>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-black uppercase tracking-widest opacity-70">
                  Visualización georreferenciada de la integridad del proceso en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PANEL DE DETALLES */}
      <aside className={`transition-all duration-500 ease-in-out bg-white border-l shadow-2xl z-[500] flex flex-col ${selectedItem ? 'w-[400px]' : 'w-0 overflow-hidden border-none'}`}>
        {selectedItem && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-600 uppercase tracking-widest">
                      {selectedItem.depto || 'Departamento'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                      selectedItem.level === 'extreme' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      Riesgo {selectedItem.level === 'extreme' ? 'Extremo' : 'Alto'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mt-2">{selectedItem.name}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-[#4318FF] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-[140px]">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                       <div className="p-2 rounded-full bg-white/20 w-fit">
                           <Activity className="w-5 h-5 text-white" />
                       </div>
                       <p className="text-sm font-medium text-white/80">Confiabilidad Local</p>
                   </div>
                   <div className="flex items-end gap-3">
                      <span className="text-4xl font-black tracking-tight">{selectedItem.alert || 98}%</span>
                      <span className="text-blue-200 text-xs font-bold mb-1.5 flex items-center">
                        Consolidado
                      </span>
                   </div>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-auto">
                    <div className="bg-white h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: `${selectedItem.alert || 98}%` }}></div>
                </div>
              </div>

              <section>
                <h3 className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-4">Métricas Electorales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-[100px]">
                     <div className="flex justify-between items-start">
                         <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Mesas</p>
                         <div className="p-1.5 rounded-full bg-[#F4F7FE]">
                             <User className="w-4 h-4 text-[#4318FF]" />
                         </div>
                     </div>
                     <p className="text-2xl font-black text-[#2B3674]">{selectedItem.personal || 0}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-[100px]">
                     <div className="flex justify-between items-start">
                         <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Alerta</p>
                         <div className="p-1.5 rounded-full bg-[#FEE2E2]">
                             <AlertTriangle className="w-4 h-4 text-[#E31A1C]" />
                         </div>
                     </div>
                     <p className="text-xl font-black text-[#2B3674] truncate">{selectedItem.level === 'extreme' ? 'CRÍTICO' : 'ELEVADO'}</p>
                  </div>
                </div>
              </section>

              <button className="w-full py-4 bg-[#4318FF] text-white rounded-xl font-bold hover:bg-[#3311CC] transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                AUDITAR ZONA
              </button>
            </div>
          </div>
        )}
      </aside>
    </Card>
  );
};

export default RiskMap;
