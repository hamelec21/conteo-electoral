import { cn } from "@/app/lib/utils";
import React from "react";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("rounded-[20px] bg-white dark:bg-gray-900 text-[#2B3674] dark:text-white shadow-sm shadow-gray-100 dark:shadow-gray-800 border-none transition-colors", className)}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
    return <h3 className={cn("font-semibold leading-none tracking-tight text-[#2B3674] dark:text-white", className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function Badge({ className, variant = "default", children }: { className?: string, variant?: "default" | "success" | "warning" | "destructive", children: React.ReactNode }) {
    const variants = {
        default: "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        success: "border-transparent bg-green-500 text-white shadow hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600",
        destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    };
    
    return (
        <div className={cn("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300", variants[variant], className)}>
            {children}
        </div>
    );
}
