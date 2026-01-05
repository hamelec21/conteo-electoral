"use client";

import React from "react";
import { Card, CardContent } from "../ui-blocks";
import { 
    Search, FileText, ChevronDown, ChevronUp, 
    Mail, Phone, ArrowRight, AlertTriangle, 
    CheckCircle2, Clock, MessageSquare, User,
    Download, ExternalLink, Send
} from "lucide-react";

// WhatsApp icon is not in lucide-react standard, using a custom SVG or just MessageCircle
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.172.198-.813.794-.813 1.933 0 1.14.832 2.241.948 2.39.116.15 1.636 2.498 3.963 3.502.553.239 1.011.381 1.36.492.57.172 1.05.148 1.444.089.444-.066 1.758-.718 2.03-1.411.272-.693.272-1.29.191-1.411-.081-.122-.298-.198-.595-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.857L.044 23.518l5.858-1.536C7.575 23.36 9.68 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.84c-1.92 0-3.8-.514-5.46-1.493l-.391-.231-3.665.96.977-3.574-.254-.403C2.19 15.42 1.636 13.74 1.636 12c0-5.714 4.65-10.364 10.364-10.364S22.364 6.286 22.364 12c0 5.714-4.65 10.364-10.364 10.364z"/>
    </svg>
);

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "Conectado":
            return (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 border border-green-100 shadow-sm w-fit">
                    <CheckCircle2 size={12} className="text-[#05CD99]" />
                    <span className="text-[9px] font-black text-[#05CD99] uppercase">Conectado</span>
                </div>
            );
        case "Desconectado":
            return (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-50 border border-orange-100 shadow-sm w-fit">
                    <AlertTriangle size={12} className="text-[#FFB547]" />
                    <span className="text-[9px] font-black text-[#FFB547] uppercase">Desconectado</span>
                </div>
            );
        case "Pendiente":
            return (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 border border-gray-100 shadow-sm w-fit">
                    <Clock size={12} className="text-[#A3AED0]" />
                    <span className="text-[9px] font-black text-[#A3AED0] uppercase">Pendiente</span>
                </div>
            );
        default:
            return null;
    }
};

export default function WitnessDatabase({ data }: { data: any }) {
    const { stats, witnesses } = data;
    const [expandedRow, setExpandedRow] = React.useState<string | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("Todos");

    const filteredWitnesses = React.useMemo(() => {
        let result = witnesses;

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter((w: any) => 
                w.name.toLowerCase().includes(term) || 
                w.id.toLowerCase().includes(term) || 
                w.municipio.toLowerCase().includes(term) ||
                w.department.toLowerCase().includes(term)
            );
        }

        // Filter by status
        if (statusFilter !== "Todos") {
            result = result.filter((w: any) => w.status === statusFilter);
        }

        return result;
    }, [witnesses, searchTerm, statusFilter]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Main Container */}
            <Card className="bg-white border-0 shadow-sm rounded-[24px] overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search Bar */}
                <div className="relative flex-1 group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A3AED0] group-focus-within:text-[#4318FF] transition-colors">
                            <Search size={18} />
                        </div>
                        <input 
                        type="text" 
                        placeholder="Buscar por nombre, cédula o municipio..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-10 py-4 bg-[#F4F7FE] border-2 border-transparent focus:border-[#4318FF] focus:bg-white rounded-2xl text-sm font-bold text-[#2B3674] outline-none transition-all placeholder:text-[#A3AED0]"
                        />
                </div>

                {/* Status Filter */}
                <div className="relative min-w-[200px]">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full appearance-none pl-5 pr-12 py-4 bg-[#F4F7FE] border-2 border-transparent focus:border-[#4318FF] focus:bg-white rounded-2xl text-sm font-bold text-[#2B3674] outline-none transition-all cursor-pointer"
                    >
                        <option value="Todos">Todos los estatus</option>
                        <option value="Conectado">Conectado</option>
                        <option value="Desconectado">Desconectado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                        <ChevronDown size={18} />
                    </div>
                </div>

                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[#2B3674] text-sm font-black shadow-sm hover:shadow-md transition-all active:scale-95">
                    <FileText size={18} className="text-green-600" />
                    Exportar Excel
                </button>
            </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-6 -mt-6">
                            <thead>
                                <tr className="text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.15em] text-left">
                                    <th className="px-6 pb-2"><input type="checkbox" className="w-4 h-4 rounded-md border-gray-300" /></th>
                                    <th className="px-6 pb-2">Nombre / Cédula</th>
                                    <th className="px-6 pb-2">Teléfono</th>
                                    <th className="px-6 pb-2">Departamento</th>
                                    <th className="px-4 pb-2 w-[110px]">Estatus</th>
                                    <th className="px-6 pb-2 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWitnesses.map((witness: any, idx: number) => {
                                    const isExpanded = expandedRow === witness.id;
                                    return (
                                        <React.Fragment key={witness.id}>
                                            <tr className={` group transition-all duration-300 ${isExpanded ? 'ring-2 ring-[#4318FF]/10 z-10 relative bg-[#F9FBFF]' : 'hover:bg-[#F4F7FE]'}`}>
                                                <td className={`px-6 py-6 rounded-l-2xl ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-l border-gray-50'}`}>
                                                    <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300" defaultChecked={isExpanded} />
                                                </td>
                                                <td className={`px-6 py-6 ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-gray-50'}`}>
                                                    <div className="flex items-center gap-4">
                                                         {isExpanded && (
                                                             <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md">
                                                                 <img src={witness.avatar} alt="" className="w-full h-full object-cover" />
                                                             </div>
                                                         )}
                                                         <div className="flex flex-col">
                                                             <span className="text-sm font-black text-[#2B3674]">{witness.name}</span>
                                                             <span className="text-[10px] font-bold text-[#707EAE] mt-0.5">{witness.id}</span>
                                                             {isExpanded && (
                                                                 <div className="flex items-center gap-1 mt-1 text-[#05CD99] text-[10px] font-bold">
                                                                     <User size={10} />
                                                                     Testigo {witness.name.split(' ')[1]}
                                                                 </div>
                                                             )}
                                                         </div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-6 ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-gray-50'}`}>
                                                     <span className="text-sm font-bold text-[#707EAE]">{witness.phone}</span>
                                                </td>
                                                <td className={`px-6 py-6 ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-gray-50'}`}>
                                                     <span className="text-sm font-black text-[#2B3674]">{witness.department}</span>
                                                </td>
                                                <td className={`px-4 py-6 ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-gray-50'}`}>
                                                     <StatusBadge status={witness.status} />
                                                </td>
                                                <td className={`px-8 py-6 rounded-r-2xl ${isExpanded ? 'bg-[#F9FBFF]' : 'bg-white border-y border-r border-gray-50'} text-right`}>
                                                     <div className="flex items-center justify-end gap-3">
                                                         <button 
                                                            className="p-2.5 rounded-xl transition-all flex items-center justify-center border bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E] shadow-lg shadow-green-100/50 hover:-translate-y-0.5"
                                                            title="Contactar vía WhatsApp"
                                                         >
                                                             <WhatsAppIcon className="w-5 h-5" />
                                                         </button>
                                                         
                                                         <button 
                                                            onClick={() => setExpandedRow(isExpanded ? null : witness.id)}
                                                            className={`p-2.5 rounded-xl transition-all flex items-center justify-center border ${
                                                                isExpanded 
                                                                ? 'bg-[#4318FF] border-[#4318FF] text-white shadow-lg shadow-blue-100 hover:-translate-y-0.5' 
                                                                : 'bg-[#EEF2FF] border-[#4318FF]/20 text-[#4318FF] hover:bg-[#4318FF] hover:text-white hover:-translate-y-0.5'
                                                            }`}
                                                            title={isExpanded ? "Contraer" : "Ver detalles"}
                                                         >
                                                             {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                         </button>
                                                     </div>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={6} className="px-6 pb-6 -mt-4">
                                                        <div className="bg-[#F9FBFF] rounded-b-2xl border-x border-b border-[#4318FF]/10 p-6 animate-in slide-in-from-top-2 duration-300">
                                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                                                <div className="md:col-span-2 grid grid-cols-2 gap-y-4 gap-x-12">
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Correo Electrónico</p>
                                                                        <p className="text-sm font-black text-[#2B3674] truncate">{witness.email || 'N/A'}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Líder Asignado</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.leader}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Departamento</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.department}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Municipio</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.municipio}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Lugar</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.lugar}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Zona</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.zona}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Puesto</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.puesto}</p>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <p className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">Mesa</p>
                                                                        <p className="text-sm font-black text-[#2B3674]">{witness.mesa}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col justify-between gap-4">
                                                                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                                                         <div className="flex items-center gap-3">
                                                                             <div className="w-2 h-2 rounded-full bg-[#05CD99]"></div>
                                                                             <span className="text-sm font-bold text-[#2B3674]">Conectado</span>
                                                                         </div>
                                                                    </div>
                                                                    <button className="w-full py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black text-[#2B3674] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                                                        <Clock size={16} className="text-[#A3AED0]" />
                                                                        Abrir historial
                                                                        <ChevronDown size={14} />
                                                                    </button>
                                                                </div>

                                                                <div className="flex flex-col justify-between gap-4">
                                                                    <button className="w-full py-4 bg-[#05CD99] text-white rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-green-100 hover:opacity-90 transition-all active:scale-95">
                                                                        <WhatsAppIcon />
                                                                        Contactar vía WhatsApp
                                                                    </button>
                                                                    <div className="flex gap-2">
                                                                        <button className="flex-1 py-3 bg-red-50 text-[#E31A1C] border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                                                                            <AlertTriangle size={14} /> Alto riesgo
                                                                        </button>
                                                                        <button className="flex-1 py-3 bg-orange-50 text-[#FFB547] border border-orange-100 rounded-2xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-orange-100 transition-colors">
                                                                             <AlertTriangle size={14} /> Con alerta
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6">
                        <div className="text-[11px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">
                             Showing 1 to 4 of <span className="text-[#2B3674]">{stats.total}</span> entries
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 rounded-xl bg-gray-50 text-gray-300">
                                <ChevronDown size={18} className="rotate-90" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-gray-50 text-gray-300">
                                <ChevronDown size={18} className="rotate-[180deg]" />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-[#4318FF] text-white text-[11px] font-black shadow-lg shadow-blue-200">1</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-[#2B3674] text-[11px] font-black hover:bg-gray-50">2</button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 text-[#2B3674] text-[11px] font-black hover:bg-gray-50">3</button>
                            <span className="px-2 text-gray-300 font-bold">...</span>
                            <button className="p-2.5 rounded-xl bg-white border border-gray-100 text-[#4318FF] hover:bg-gray-50">
                                <ChevronDown size={18} className="-rotate-90" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-white border border-gray-100 text-[#4318FF] hover:bg-gray-50">
                                <ChevronDown size={18} className="rotate-0" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4">
                 <button className="px-5 py-3 bg-white border border-gray-100 rounded-[15px] shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
                      <div className="p-2 bg-green-50 rounded-lg">
                          <Mail size={16} className="text-[#05CD99]" />
                      </div>
                      <span className="text-[10px] font-black text-[#2B3674] uppercase tracking-widest">Enviar Mensaje</span>
                 </button>

                 <div className="px-5 py-3 bg-[#05CD99] rounded-[15px] shadow-lg shadow-green-100 flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg text-white">
                          <User size={18} />
                      </div>
                      <div className="flex flex-col">
                           <span className="text-white text-base font-black leading-tight">Conectados / {stats.connected}</span>
                           <span className="text-white/70 text-[9px] font-bold uppercase tracking-wider leading-none">Disponibles Ahora</span>
                      </div>
                 </div>

                 <div className="px-5 py-3 bg-[#E31A1C] rounded-[15px] shadow-lg shadow-red-100 flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg text-white">
                          <AlertTriangle size={18} />
                      </div>
                      <div className="flex flex-col">
                           <span className="text-white text-base font-black leading-tight">Alto riesgo / {stats.highRisk}</span>
                           <span className="text-white/70 text-[9px] font-bold uppercase tracking-wider leading-none">Atención Inmediata</span>
                      </div>
                 </div>

                 <div className="px-5 py-3 bg-[#FFB547]/10 border border-[#FFB547]/20 rounded-[15px] flex items-center gap-4">
                      <div className="p-2 bg-[#FFB547] rounded-lg text-white">
                          <AlertTriangle size={18} />
                      </div>
                      <div className="flex flex-col">
                           <span className="text-[#2B3674] text-base font-black leading-tight">Con alerta / {stats.withAlert}</span>
                           <span className="text-[#FFB547] text-[9px] font-black uppercase tracking-wider leading-none text-nowrap">Reportes Pendientes</span>
                      </div>
                 </div>

                 <button className="ml-auto px-6 py-3 bg-white border border-gray-100 rounded-[15px] shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-all text-[#2B3674] font-black text-xs uppercase tracking-wider">
                      Ver contactor
                      <ChevronDown size={16} className="-rotate-90 text-[#4318FF]" />
                 </button>
            </div>
        </div>
    );
}
