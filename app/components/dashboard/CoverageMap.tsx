import React, { useEffect, useRef, useState } from 'react';
import { Info, Map as MapIcon } from 'lucide-react';
import { Card } from "../ui-blocks";

const CoverageMap = ({ data }: { data: any }) => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Colombian regions with their colors and coverage data
  const regions = [
    { 
      id: 1, 
      name: "ANDINA", 
      color: "#4318FF", // Blue
      coverage: 95,
      mesas: 8500,
      reportadas: 8075,
      coords: [
        { lat: 4.609, lng: -74.081 }, // Bogotá
        { lat: 6.244, lng: -75.581 }, // Medellín
        { lat: 7.119, lng: -73.122 }, // Bucaramanga
        { lat: 5.069, lng: -75.517 }  // Manizales
      ]
    },
    { 
      id: 2, 
      name: "CARIBE", 
      color: "#E31A1C", // Red
      coverage: 88,
      mesas: 4200,
      reportadas: 3696,
      coords: [
        { lat: 10.391, lng: -75.479 }, // Cartagena
        { lat: 11.004, lng: -74.807 }, // Barranquilla
        { lat: 10.463, lng: -73.254 }, // Santa Marta
        { lat: 8.748, lng: -75.881 }   // Montería
      ]
    },
    { 
      id: 3, 
      name: "PACÍFICO", 
      color: "#F97316", // Orange
      coverage: 82,
      mesas: 2800,
      reportadas: 2296,
      coords: [
        { lat: 3.451, lng: -76.532 }, // Cali
        { lat: 1.214, lng: -77.278 }, // Pasto
        { lat: 5.692, lng: -76.658 }, // Quibdó
        { lat: 2.442, lng: -76.606 }  // Popayán
      ]
    },
    { 
      id: 4, 
      name: "ORINOQUÍA", 
      color: "#FFB547", // Yellow
      coverage: 78,
      mesas: 1500,
      reportadas: 1170,
      coords: [
        { lat: 4.142, lng: -73.626 }, // Villavicencio
        { lat: 5.335, lng: -72.395 }, // Yopal
        { lat: 6.187, lng: -67.493 }, // Puerto Carreño
        { lat: 4.885, lng: -69.941 }  // Puerto Inírida
      ]
    },
    { 
      id: 5, 
      name: "AMAZONÍA", 
      color: "#05CD99", // Green
      coverage: 72,
      mesas: 800,
      reportadas: 576,
      coords: [
        { lat: -4.215, lng: -69.940 }, // Leticia
        { lat: 0.472, lng: -76.359 },  // Mocoa
        { lat: -1.614, lng: -75.606 }, // Florencia
        { lat: 2.927, lng: -75.282 }   // Neiva
      ]
    }
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
      
      const southWest = L.latLng(-5.0, -83.0);
      const northEast = L.latLng(14.0, -66.0);
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

      // Add markers for each region
      regions.forEach((region: any) => {
        region.coords.forEach((coord: any, idx: number) => {
          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="position: relative; width: 16px; height: 16px;">
                <div class="pulse-ring-base pulse-ring-1" style="background-color: ${region.color};"></div>
                <div class="pulse-ring-base pulse-ring-2" style="background-color: ${region.color};"></div>
                <div style="background-color: ${region.color}; width: 16px; height: 16px; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px ${region.color}; position: relative; z-index: 2;"></div>
              </div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          const marker = L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);
          
          if (idx === 0) {
            marker.on('click', () => {
              setSelectedRegion(region);
            });

            marker.bindTooltip(`<b>${region.name}</b><br>Cobertura: ${region.coverage}%`, {
              direction: 'top',
              offset: [0, -8]
            });
          }
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="flex h-[600px] w-full bg-slate-50 overflow-hidden font-sans text-slate-900 border-0 shadow-sm p-0 rounded-2xl">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: scale(5); opacity: 0; }
        }
        .pulse-ring-base {
          position: absolute;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          z-index: 1;
        }
        .pulse-ring-1 { animation-delay: 0s; }
        .pulse-ring-2 { animation-delay: 1.5s; }
      `}</style>
      
      <main className="flex-1 flex flex-col relative rounded-xl overflow-hidden">
        {/* HEADER */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-800">Cobertura por Región</h1>
            <p className="text-xs text-slate-500 font-medium">Monitoreo de cobertura electoral nacional</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Legend */}
            <div className="flex items-center gap-4">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }}></div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase">{region.name}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* MAPA Y SIDEBAR */}
        <div className="flex-1 flex relative bg-slate-200 overflow-hidden">
          {/* Sidebar de Métricas */}
          <div className="w-[220px] bg-white border-r flex flex-col p-4 gap-4 shrink-0 z-10 overflow-y-auto">
            <h3 className="text-xs font-black text-[#A3AED0] uppercase tracking-widest mb-2">Resumen Nacional</h3>
            
            {regions.map((region) => (
              <div 
                key={region.id}
                className="flex flex-col gap-1 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedRegion(region)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{region.name}</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }}></div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#2B3674]">{region.coverage}%</span>
                  <span className="text-[9px] font-bold text-[#A3AED0] uppercase">Cobertura</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-slate-600">
                    <span className="font-black">{region.reportadas.toLocaleString()}</span> / {region.mesas.toLocaleString()} mesas
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mapa Principal */}
          <div ref={mapRef} className="flex-1 h-full z-0" style={{ minHeight: '400px' }} />

          {/* Info Box - Moved to the right to avoid covering sidebar information */}
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white z-[400] max-w-xs">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Info size={18} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">Cobertura Nacional</h3>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-black uppercase tracking-widest opacity-70">
                  Monitoreo en tiempo real de la cobertura electoral por región geográfica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PANEL DE DETALLES */}
      <aside className={`transition-all duration-500 ease-in-out bg-white border-l shadow-2xl z-[500] flex flex-col ${selectedRegion ? 'w-[400px]' : 'w-0 overflow-hidden border-none'}`}>
        {selectedRegion && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedRegion.color }}></div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-600 uppercase tracking-widest">
                      Región
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-800">{selectedRegion.name}</h2>
                </div>
                <button onClick={() => setSelectedRegion(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between h-[140px]" style={{ backgroundColor: selectedRegion.color }}>
                <div>
                   <div className="flex items-center gap-2 mb-2">
                       <div className="p-2 rounded-full bg-white/20 w-fit">
                           <MapIcon className="w-5 h-5 text-white" />
                       </div>
                       <p className="text-sm font-medium text-white/80">Cobertura Regional</p>
                   </div>
                   <div className="flex items-end gap-3">
                      <span className="text-4xl font-black tracking-tight">{selectedRegion.coverage}%</span>
                      <span className="text-white/80 text-xs font-bold mb-1.5">
                        Completado
                      </span>
                   </div>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-auto">
                    <div className="bg-white h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000" style={{ width: `${selectedRegion.coverage}%` }}></div>
                </div>
              </div>

              <section>
                <h3 className="text-xs font-bold text-[#A3AED0] uppercase tracking-widest mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-[100px]">
                     <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Total Mesas</p>
                     <p className="text-2xl font-black text-[#2B3674]">{selectedRegion.mesas.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-[100px]">
                     <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Reportadas</p>
                     <p className="text-2xl font-black text-[#2B3674]">{selectedRegion.reportadas.toLocaleString()}</p>
                  </div>
                </div>
              </section>

              <button className="w-full py-4 bg-[#4318FF] text-white rounded-xl font-bold hover:bg-[#3311CC] transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                VER DETALLES COMPLETOS
              </button>
            </div>
          </div>
        )}
      </aside>
    </Card>
  );
};

export default CoverageMap;
