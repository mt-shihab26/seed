import { create } from 'zustand';

export const useApplicationStore = create<{
    openAccordionItems: string[];
    setOpenAccordionItems: (items: string[]) => void;
}>((set) => ({
    openAccordionItems: [],
    setOpenAccordionItems: (items) => set({ openAccordionItems: items }),
}));
