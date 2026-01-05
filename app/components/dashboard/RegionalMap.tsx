"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Map as MapIcon, ChevronRight } from 'lucide-react';

const RegionalMap = ({ onSelectRegion }: { onSelectRegion?: (region: string) => void }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  // Simplified Colombian regions for this specific dashboard
  const regions = [
    { name: "Andina", lat: 4.5709, lng: -74.2973, color: "#4318FF", leader: "Abelardo de la Espriella", votes: "485,000" },
    { name: "Caribe", lat: 10.391, lng: -75.479, color: "#05CD99", leader: "Abelardo de la Espriella", votes: "320,500" },
    { name: "Pacífica", lat: 3.4516, lng: -76.5320, color: "#FFB547", leader: "Iván Cepeda", votes: "290,000" },
    { name: "Orinoquía", lat: 4.142, lng: -71.553, color: "#EE5D50", leader: "Iván Cepeda", votes: "115,200" },
    { name: "Amazonía", lat: -1.031, lng: -71.745, color: "#E31A1C", leader: "Iván Cepeda", votes: "45,800" }
  ];

  useEffect(() => {
    // Dynamic loading of Leaflet
    if (typeof window === 'undefined') return;

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
        minZoom: 4,
        attributionControl: false
      }).setView([4.5709, -74.2973], 5);

      mapInstance.current = map;

      // Light Theme Tile Layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        bounds: bounds
      }).addTo(map);

      // Add Markers/Regions
      regions.forEach((reg: any) => {
        const customIcon = L.divIcon({
          className: 'custom-region-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="absolute w-6 h-6 rounded-full opacity-40 animate-ping" style="background-color: ${reg.color}"></div>
              <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-lg" style="background-color: ${reg.color}"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([reg.lat, reg.lng], { icon: customIcon }).addTo(map);
        
        marker.on('click', () => {
          if (onSelectRegion) onSelectRegion(reg.name);
          map.setView([reg.lat, reg.lng], 6);
        });

        marker.bindTooltip(`
          <div class="bg-white p-3 rounded-xl shadow-xl min-w-[140px]">
            <h4 class="text-[#2B3674] font-black text-sm uppercase tracking-tight mb-1">${reg.name}</h4>
            <div class="space-y-1">
                <div class="flex justify-between items-center text-[10px]">
                    <span class="text-[#A3AED0] font-bold uppercase tracking-tighter">Líder:</span>
                    <span class="text-[#2B3674] font-black">${reg.leader}</span>
                </div>
                <div class="flex justify-between items-center text-[10px]">
                    <span class="text-[#A3AED0] font-bold uppercase tracking-tighter">Votos:</span>
                    <span class="text-[#05CD99] font-black">${reg.votes}</span>
                </div>
            </div>
            <div class="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#4318FF]" style="width: 65%"></div>
            </div>
          </div>
        `, {
          direction: 'top',
          offset: [0, -10],
          className: 'custom-tooltip-wrapper'
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
    <div className="relative w-full h-full bg-[#F4F7FE]">
      <style>{`
        .custom-tooltip-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-tooltip-wrapper::before {
          display: none !important;
        }
        .leaflet-container {
            background: #F4F7FE !important;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Overlay Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
         <button className="p-2.5 bg-white rounded-full border border-gray-100 text-[#2B3674] shadow-sm hover:bg-gray-50 transition-colors">
            <PlusIconSM />
         </button>
         <button className="p-2.5 bg-white rounded-full border border-gray-100 text-[#2B3674] shadow-sm hover:bg-gray-50 transition-colors">
            <MinusIconSM />
         </button>
      </div>
    </div>
  );
};

const PlusIconSM = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const MinusIconSM = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default RegionalMap;
