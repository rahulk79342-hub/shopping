import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      
      toggleWishlist: (productId) => set((state) => {
        const exists = state.wishlistItems.includes(productId);
        if (exists) {
          return { wishlistItems: state.wishlistItems.filter(id => id !== productId) };
        } else {
          return { wishlistItems: [...state.wishlistItems, productId] };
        }
      }),

      isInWishlist: (productId) => {
        return get().wishlistItems.includes(productId);
      },
      
      clearWishlist: () => set({ wishlistItems: [] })
    }),
    {
      name: 'snipes-wishlist-storage',
    }
  )
);
