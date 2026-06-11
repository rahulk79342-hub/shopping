import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  isMobileFilterOpen: false,
  openMobileFilter: () => set({ isMobileFilterOpen: true }),
  closeMobileFilter: () => set({ isMobileFilterOpen: false }),
  
  viewLayout: 'dense', // 'dense' or 'normal'
  setViewLayout: (layout) => set({ viewLayout: layout }),
}));
