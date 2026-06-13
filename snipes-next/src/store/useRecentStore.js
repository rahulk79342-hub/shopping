import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecentStore = create(
  persist(
    (set) => ({
      recentProducts: [],
      addRecent: (product) => set((state) => {
        // Prevent duplicates, move to front if it exists
        const filtered = state.recentProducts.filter(p => p.id !== product.id);
        
        // Strip down the product object to save localStorage space (just need basics for cards)
        const strippedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          sale: product.sale,
          image: product.image || (product.media && product.media[0]?.url),
        };

        return {
          recentProducts: [strippedProduct, ...filtered].slice(0, 10) // Keep max 10
        };
      }),
      clearRecent: () => set({ recentProducts: [] }),
    }),
    {
      name: 'recent-products-storage', // key in localStorage
    }
  )
);
