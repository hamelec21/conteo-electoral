import React, { useEffect, useRef, useState } from 'react';
import { Info, AlertTriangle, Activity, CheckCircle2, Users } from 'lucide-react';
import { Card } from "../ui-blocks";

const HistoricalRiskMap = ({ data }: { data: any }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Historical risk zones with color coding
  const zones = data?.zones || [
    { id: 1, name: "Quibdó", depto: "Chocó", lat: 5.692, lng: -76.658, level: "extreme", color: "#E31A1C", mesas: 120, validos: 45, alertas: 30, riesgo: 45 },
    { id: 2, name: "Medellín", depto: "Antioquia", lat: 6.244, lng: -75.581, level: "high", color: "#F97316", mesas: 450, validos: 60, alertas: 30, riesgo: 10 },
    { id: 3, name: "Bogotá", depto: "Cundinamarca", lat: 4.609, lng: -74.081, level: "medium", color: "#FFB547", mesas: 980, validos: 75, alertas: 20, riesgo: 5 },
    { id: 4, name: "Cali", depto: "Valle del Cauca", lat: 3.451, lng: -76.532, level: "high", color: "#F97316", mesas: 340, validos: 55, alertas: 35, riesgo: 10 },
    { id: 5, name: "Bucaramanga", depto: "Santander", lat: 7.119, lng: -73.122, level: "medium", color: "#FFB547", mesas: 280, validos: 70, alertas: 25, riesgo: 5 },
  ];

  // Calculate totals
  const totals = zones.reduce((acc: { mesas: number; validos: number; alertas: number; riesgo: number }, zone: any) => ({
    mesas: acc.mesas + zone.mesas,
    validos: acc.validos + zone.validos,
    alertas: acc.alertas + zone.alertas,
    riesgo: acc.riesgo + zone.riesgo
  }), { mesas: 0, validos: 0, alertas: 0, riesgo: 0 });

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

      // Add Markers with color coding
      zones.forEach((loc: any) => {
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="position: relative; width: 14px; height: 14px;">
              ${loc.level === 'extreme' ? `
                <div class="pulse-ring-base pulse-ring-1" style="background-color: ${loc.color};"></div>
                <div class="pulse-ring-base pulse-ring-2" style="background-color: ${loc.color};"></div>
                <div class="pulse-ring-base pulse-ring-3" style="background-color: ${loc.color};"></div>
              ` : ''}
              <div style="background-color: ${loc.color}; width: 14px; height: 14px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 8px ${loc.color}; position: relative; z-index: 2;"></div>
            </div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([loc.lat || 4.5, loc.lng || -74.3], { icon: customIcon }).addTo(map);
        
        marker.on('click', () => {
          setSelectedItem({ type: 'localidad', ...loc });
        });

        const levelText = loc.level === 'extreme' ? 'Extremo' : loc.level === 'high' ? 'Alto' : 'Medio';
        marker.bindTooltip(`<b>${loc.name}</b><br>Riesgo: ${levelText}<br>Mesas: ${loc.mesas}`, {
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
  }, [zones]);

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
            <h1 className="text-lg font-bold text-slate-800">Riesgo Electoral Histórico</h1>
            <p className="text-xs text-slate-500 font-medium">Análisis de niveles de riesgo por zona</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFB547' }}></div>
                <span className="text-[10px] font-bold text-slate-600">MEDIO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }}></div>
                <span className="text-[10px] font-bold text-slate-600">ALTO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E31A1C' }}></div>
                <span className="text-[10px] font-bold text-slate-600">EXTREMO</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAPA Y SIDEBAR METRICAS */}
        <div className="flex-1 flex relative bg-slate-200 overflow-hidden">
          {/* Sidebar de Métricas - LEFT */}
          <div className="w-[200px] bg-white border-r flex flex-col p-4 gap-6 shrink-0 z-10 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-yellow-50">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Válidos (Medio)</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">{totals.validos}%</p>
              <span className="text-[9px] font-black text-yellow-500 flex items-center ml-1 uppercase tracking-widest">● AMARILLO</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-orange-50">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Con Alertas (Alto)</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">{totals.alertas}%</p>
              <span className="text-[9px] font-black text-orange-500 flex items-center ml-1 uppercase tracking-widest">● NARANJA</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-red-50">
                  <Activity className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alto Riesgo (Extremo)</span>
              </div>
              <p className="text-xl font-black text-[#2B3674] ml-1">{totals.riesgo}%</p>
              <span className="text-[9px] font-black text-red-500 flex items-center ml-1 uppercase tracking-widest">● ROJO</span>
            </div>

            <div className="flex flex-col gap-1 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-50">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Mesas</span>
              </div>
              <p className="text-2xl font-black text-[#4318FF] ml-1">{totals.mesas.toLocaleString()}</p>
              <span className="text-[9px] font-black text-slate-400 flex items-center ml-1 uppercase tracking-widest">NACIONAL</span>
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
                <h3 className="text-xs font-black uppercase tracking-widest">Análisis Histórico</h3>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-black uppercase tracking-widest opacity-70">
                  Datos históricos de riesgo electoral por zona geográfica.
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
                      selectedItem.level === 'extreme' ? 'bg-red-100 text-red-600' : 
                      selectedItem.level === 'high' ? 'bg-orange-100 text-orange-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      Riesgo {selectedItem.level === 'extreme' ? 'Extremo' : selectedItem.level === 'high' ? 'Alto' : 'Medio'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mt-2">{selectedItem.name}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-[#4318FF] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-[140px]">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                       <div className="p-2 rounded-full bg-white/20 w-fit">
                           <Users className="w-5 h-5 text-white" />
                       </div>
                       <p className="text-sm font-medium text-white/80">Total Mesas</p>
                   </div>
                   <div className="flex items-end gap-3">
                      <span className="text-4xl font-black tracking-tight">{selectedItem.mesas || 0}</span>
                      <span className="text-blue-200 text-xs font-bold mb-1.5 flex items-center">
                        Registradas
                      </span>
                   </div>
                </div>
              </div>

              <section>
                <h3 className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-4">Distribución de Riesgo</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Válidos</p>
                         <div className="px-2 py-1 rounded-full bg-yellow-50">
                             <span className="text-xs font-black text-yellow-600">{selectedItem.validos}%</span>
                         </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Con Alertas</p>
                         <div className="px-2 py-1 rounded-full bg-orange-50">
                             <span className="text-xs font-black text-orange-600">{selectedItem.alertas}%</span>
                         </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                     <div className="flex justify-between items-center">
                         <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Alto Riesgo</p>
                         <div className="px-2 py-1 rounded-full bg-red-50">
                             <span className="text-xs font-black text-red-600">{selectedItem.riesgo}%</span>
                         </div>
                     </div>
                  </div>
                </div>
              </section>

              <button className="w-full py-4 bg-[#4318FF] text-white rounded-xl font-bold hover:bg-[#3311CC] transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                VER DETALLES HISTÓRICOS
              </button>
            </div>
          </div>
        )}
      </aside>
    </Card>
  );
};

export default HistoricalRiskMap;
