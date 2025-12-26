import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useApplicationStore = create<{
    openAccordionItems: string[];
    setOpenAccordionItems: (items: string[]) => void;
}>()(
    persist(
        (set) => ({
            openAccordionItems: [],
            setOpenAccordionItems: (items) => set({ openAccordionItems: items }),
        }),
        {
            name: 'application-storage',
        },
    ),
);
