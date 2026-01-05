"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { MapContainer, TileLayer, Polygon, Tooltip, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet"; 

// Placeholder coordinates for a generic polygon representing a region (Stylized Colombia-ish shape or Region)
// In a real app, this would be GeoJSON.
const REGION_COORDS: [number, number][][] = [
    [
        [4.6, -74.0], [5.0, -73.5], [5.5, -74.0], [5.0, -75.0], [4.6, -74.0] // Center/Bogota area
    ],
    [
        [6.0, -75.5], [7.0, -75.0], [7.0, -76.0], [6.0, -76.0], [6.0, -75.5] // Antioquia area
    ],
    [
        [3.0, -76.5], [4.0, -76.0], [4.0, -77.0], [3.0, -77.0], [3.0, -76.5] // Valle area
    ],
     [
        [10.0, -74.0], [11.0, -74.0], [11.0, -75.0], [10.0, -75.0], [10.0, -74.0] // Atlantico area
    ]
];

const MOCK_REGIONS = [
    { name: "Bogotá", color: "#4318FF", coords: REGION_COORDS[0], votes: 450000, leader: "Abelardo de la Espriella", center: [4.8, -74.25] },
    { name: "Antioquia", color: "#E31A1C", coords: REGION_COORDS[1], votes: 380000, leader: "Iván Cepeda", center: [6.5, -75.5] },
    { name: "Valle", color: "#4318FF", coords: REGION_COORDS[2], votes: 210000, leader: "Abelardo de la Espriella", center: [3.5, -76.7] },
    { name: "Atlántico", color: "#E31A1C", coords: REGION_COORDS[3], votes: 150000, leader: "Iván Cepeda", center: [10.5, -74.5] }
];

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function ElectoralMap({ height = "400px", showHeader = false }: { height?: string, showHeader?: boolean }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
             <div className="bg-[#F4F7FE] border-gray-100 text-[#2B3674] flex items-center justify-center rounded-2xl" style={{ height }}>
                <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">Cargando mapa...</p>
             </div>
        );
    }

    const MapContent = (
        <div className="relative z-0 overflow-hidden rounded-2xl" style={{ height }}>
             <MapContainer 
                center={[4.5, -73.0]} 
                zoom={6} 
                scrollWheelZoom={false} 
                className="h-full w-full"
                style={{ background: '#F4F7FE' }}
                maxBounds={[[-5, -85], [15, -65]]}
                maxBoundsViscosity={1.0}
            >
                <MapController />
                 <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {MOCK_REGIONS.map((region, idx) => {
                    // @ts-ignore
                    const L = typeof window !== 'undefined' ? window.L : null;
                    const customIcon = L ? L.divIcon({
                        className: 'custom-region-icon',
                        html: `
                          <div class="relative flex items-center justify-center">
                            <div class="absolute w-8 h-8 rounded-full opacity-30 animate-ping" style="background-color: ${region.color}"></div>
                            <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-lg" style="background-color: ${region.color}"></div>
                          </div>
                        `,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    }) : null;

                    return (
                        <React.Fragment key={idx}>
                            <Polygon 
                                positions={region.coords}
                                pathOptions={{ 
                                    color: region.color, 
                                    fillColor: region.color, 
                                    fillOpacity: 0.1, 
                                    weight: 1.5,
                                    dashArray: '3, 6'
                                }}
                            />
                            {customIcon && (
                                <Marker position={region.center as any} icon={customIcon}>
                                    <Tooltip sticky>
                                        <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 min-w-[150px]">
                                            <h4 className="text-[#2B3674] font-black text-[10px] uppercase tracking-widest mb-1">{region.name}</h4>
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center text-[9px]">
                                                    <span className="text-[#A3AED0] font-black uppercase tracking-widest">Líder:</span>
                                                    <span className="text-[#2B3674] font-black">{region.leader}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[9px]">
                                                    <span className="text-[#A3AED0] font-black uppercase tracking-widest">Votos:</span>
                                                    <span className="text-[#05CD99] font-black">{region.votes.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#4318FF]" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>
                                    </Tooltip>
                                </Marker>
                            )}
                        </React.Fragment>
                    );
                })}
            </MapContainer>
        </div>
    );

    if (showHeader) {
        return (
            <Card className="bg-white border-0 shadow-lg rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between border-b border-gray-50">
                    <div>
                        <CardTitle className="text-xl font-black text-[#2B3674] tracking-tight">Mapa Electoral Interactivo</CardTitle>
                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest mt-1">Simulación de Tendencias Geográficas</p>
                    </div>
                    <div className="flex gap-4">
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 border border-blue-100/50">
                            <span className="w-2.5 h-2.5 bg-[#4318FF] rounded-full shadow-[0_0_8px_rgba(67,24,255,0.4)]"></span>
                            <span className="text-[10px] font-black text-[#2B3674] uppercase tracking-tight">De la Espriella</span>
                         </div>
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50/50 border border-red-100/50">
                            <span className="w-2.5 h-2.5 bg-[#E31A1C] rounded-full shadow-[0_0_8px_rgba(227,26,28,0.4)]"></span>
                            <span className="text-[10px] font-black text-[#2B3674] uppercase tracking-tight">Iván Cepeda</span>
                         </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {MapContent}
                </CardContent>
            </Card>
        );
    }

    return MapContent;
}
