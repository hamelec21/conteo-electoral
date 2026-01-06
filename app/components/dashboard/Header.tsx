"use client";

import React, { useState, useEffect } from "react";
import { Bell, Settings, Calendar, Menu, Moon, Sun, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="w-full bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-6 py-3">
                {/* Left: Mobile Menu + Greeting */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={onMenuToggle}
                        className="md:hidden p-2 hover:bg-[#F4F7FE] dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-[#2B3674] dark:text-gray-300" />
                    </button>

                    {/* Greeting */}
                    <div>
                        <p className="text-[#A3AED0] dark:text-gray-400 text-xs font-medium hidden sm:block">Bienvenido</p>
                        <h2 className="text-[#2B3674] dark:text-white font-bold text-sm sm:text-base">{user?.name || 'Usuario'}</h2>
                    </div>
                </div>

                {/* Center: Navigation Tabs (Hidden on mobile) */}
                <div className="hidden lg:flex items-center gap-2 bg-[#F4F7FE] dark:bg-gray-800 rounded-full p-1">
                    <Link href="/">
                        <button className="px-6 py-2 bg-[#4318FF] text-white rounded-full text-sm font-semibold shadow-md transition-all">
                            Dashboard
                        </button>
                    </Link>
                    <Link href="/general/reportes">
                        <button className="px-6 py-2 text-[#A3AED0] dark:text-gray-400 hover:text-[#2B3674] dark:hover:text-white rounded-full text-sm font-medium transition-all">
                            Reportes
                        </button>
                    </Link>
                    <Link href="/gestion/resultados">
                        <button className="px-6 py-2 text-[#A3AED0] dark:text-gray-400 hover:text-[#2B3674] dark:hover:text-white rounded-full text-sm font-medium transition-all">
                            Monitoreo
                        </button>
                    </Link>
                </div>

                {/* Right: Date, Theme, Notifications, Settings, User */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Date Selector (Hidden on mobile) */}
                    <div className="hidden xl:flex items-center gap-2 bg-[#F4F7FE] dark:bg-gray-800 rounded-full px-4 py-2">
                        <Calendar className="w-4 h-4 text-[#A3AED0] dark:text-gray-400" />
                        <span className="text-sm text-[#2B3674] dark:text-gray-300 font-medium">19/02/26 - 25/02/26</span>
                    </div>

                    {/* Theme Toggle - Only render after mount to avoid hydration mismatch */}
                    {mounted && (
                        <button 
                            onClick={toggleTheme}
                            className="p-2 hover:bg-[#F4F7FE] dark:hover:bg-gray-800 rounded-full transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <Moon className="w-4 h-4 md:w-5 md:h-5 text-[#A3AED0] dark:text-gray-400" />
                            ) : (
                                <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                            )}
                        </button>
                    )}

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-[#F4F7FE] dark:hover:bg-gray-800 rounded-full transition-colors">
                        <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#A3AED0] dark:text-gray-400" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Settings (Hidden on small mobile) */}
                    <button className="hidden sm:block p-2 hover:bg-[#F4F7FE] dark:hover:bg-gray-800 rounded-full transition-colors">
                        <Settings className="w-4 h-4 md:w-5 md:h-5 text-[#A3AED0] dark:text-gray-400" />
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-[#4318FF] to-[#7551FF] rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all"
                        >
                            {user?.name?.charAt(0) || 'U'}
                        </button>

                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                                <div className="p-4 bg-gradient-to-r from-[#4318FF] to-[#7551FF]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm">{user?.name}</p>
                                            <p className="text-white/80 text-xs">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-left">
                                        <User className="w-4 h-4 text-[#A3AED0]" />
                                        <span className="text-sm font-medium text-[#2B3674] dark:text-gray-300">Mi Perfil</span>
                                    </button>
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4 text-red-500" />
                                        <span className="text-sm font-medium text-red-500">Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
