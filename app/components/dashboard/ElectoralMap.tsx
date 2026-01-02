"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui-blocks";
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet"; // Removed as per lint suggestion if not strictly needed or handle types

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
    { name: "Bogotá", color: "#2563EB", coords: REGION_COORDS[0], votes: 450000, leader: " Abelardo de la Espriella" },
    { name: "Antioquia", color: "#DC2626", coords: REGION_COORDS[1], votes: 380000, leader: "Iván Cepeda" },
    { name: "Valle", color: "#2563EB", coords: REGION_COORDS[2], votes: 210000, leader: " Abelardo de la Espriella" },
    { name: "Atlántico", color: "#DC2626", coords: REGION_COORDS[3], votes: 150000, leader: "Iván Cepeda" }
];

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function ElectoralMap() {
    // We need to ensure window is defined (client-side only for Leaflet)
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
             <Card className="bg-[#111827] border-gray-800 text-white h-[500px] flex items-center justify-center">
                <p>Cargando mapa...</p>
             </Card>
        );
    }

    return (
        <Card className="bg-white text-[#2B3674] h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mapa Electoral Interactivo</CardTitle>
                <div className="flex gap-2 text-xs">
                     <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-600 rounded-full"></span>Abelardo de la Espriella</span>
                     <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 rounded-full"></span> Iván Cepeda</span>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[500px] relative z-0">
                 <MapContainer 
                    center={[4.0, -72.0]} 
                    zoom={6} 
                    scrollWheelZoom={false} 
                    className="h-full w-full rounded-b-xl"
                    style={{ background: '#1F2937' }}
                    maxBounds={[[-5, -82], [13, -66]]}
                    maxBoundsViscosity={1.0}
                >
                    <MapController />
                     <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    {MOCK_REGIONS.map((region, idx) => (
                        <Polygon 
                            key={idx} 
                            positions={region.coords}
                            pathOptions={{ color: region.color, fillColor: region.color, fillOpacity: 0.5, weight: 1 }}
                        >
                            <Tooltip sticky>
                                <div className="text-slate-900 bg-white p-2 rounded shadow text-xs">
                                    <strong>{region.name}</strong><br/>
                                    Líder: {region.leader}<br/>
                                    Votos: {region.votes.toLocaleString()}
                                </div>
                            </Tooltip>
                        </Polygon>
                    ))}
                </MapContainer>
            </CardContent>
        </Card>
    );
}
