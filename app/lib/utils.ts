import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-CO').format(num);
};

export const formatPercent = (num: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(num / 100);
};
