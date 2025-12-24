import type { TColor } from '@/types/enums';

export type TConfig = {
    name: TColor;
    label: string;
    hex: string;
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
};

export const COLORS: Record<TColor, TConfig> = {
    blue: {
        name: 'blue',
        label: 'Blue',
        hex: '#3b82f6',
        bg: 'bg-blue-500',
        text: 'text-white',
        border: 'border-blue-500',
        hoverBg: 'hover:bg-blue-600',
    },
    red: {
        name: 'red',
        label: 'Red',
        hex: '#ef4444',
        bg: 'bg-red-500',
        text: 'text-white',
        border: 'border-red-500',
        hoverBg: 'hover:bg-red-600',
    },
    green: {
        name: 'green',
        label: 'Green',
        hex: '#22c55e',
        bg: 'bg-green-500',
        text: 'text-white',
        border: 'border-green-500',
        hoverBg: 'hover:bg-green-600',
    },
    yellow: {
        name: 'yellow',
        label: 'Yellow',
        hex: '#eab308',
        bg: 'bg-yellow-500',
        text: 'text-white',
        border: 'border-yellow-500',
        hoverBg: 'hover:bg-yellow-600',
    },
    purple: {
        name: 'purple',
        label: 'Purple',
        hex: '#a855f7',
        bg: 'bg-purple-500',
        text: 'text-white',
        border: 'border-purple-500',
        hoverBg: 'hover:bg-purple-600',
    },
    pink: {
        name: 'pink',
        label: 'Pink',
        hex: '#ec4899',
        bg: 'bg-pink-500',
        text: 'text-white',
        border: 'border-pink-500',
        hoverBg: 'hover:bg-pink-600',
    },
    indigo: {
        name: 'indigo',
        label: 'Indigo',
        hex: '#6366f1',
        bg: 'bg-indigo-500',
        text: 'text-white',
        border: 'border-indigo-500',
        hoverBg: 'hover:bg-indigo-600',
    },
    orange: {
        name: 'orange',
        label: 'Orange',
        hex: '#f97316',
        bg: 'bg-orange-500',
        text: 'text-white',
        border: 'border-orange-500',
        hoverBg: 'hover:bg-orange-600',
    },
    teal: {
        name: 'teal',
        label: 'Teal',
        hex: '#14b8a6',
        bg: 'bg-teal-500',
        text: 'text-white',
        border: 'border-teal-500',
        hoverBg: 'hover:bg-teal-600',
    },
    gray: {
        name: 'gray',
        label: 'Gray',
        hex: '#6b7280',
        bg: 'bg-gray-500',
        text: 'text-white',
        border: 'border-gray-500',
        hoverBg: 'hover:bg-gray-600',
    },
};

export const COLOR_ARRAY = Object.values(COLORS);

export const getColorClasses = (color: TColor = 'gray'): TConfig => {
    return COLORS[color] || COLORS.gray;
};
