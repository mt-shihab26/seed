import { create } from 'zustand';

export const useApplicationStore = create<{
    openAccordionItems: string[];
}>((set) => ({
    openAccordionItems: [],
}));
