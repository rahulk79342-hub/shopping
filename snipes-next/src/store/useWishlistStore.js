import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Mock Supabase sync function
const mockSupabaseSync = async (items) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Synced wishlist with Supabase:', items);
      resolve({ success: true });
    }, 1000);
  });
};

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      isSyncing: false,
      
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some(item => item.id === product.id);
        
        let newWishlist;
        if (exists) {
          newWishlist = currentWishlist.filter(item => item.id !== product.id);
        } else {
          newWishlist = [...currentWishlist, product];
        }
        
        set({ wishlist: newWishlist });
        
        // Auto-sync if logged in (mocked condition)
        // if (useAuth.getState().user) get().syncWithSupabase();
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(item => item.id !== productId)
        }));
      },

      clearWishlist: () => set({ wishlist: [] }),
      
      // Called when user logs in to merge local cart with database
      syncWithSupabase: async () => {
        set({ isSyncing: true });
        try {
          const items = get().wishlist;
          await mockSupabaseSync(items);
        } catch (error) {
          console.error("Failed to sync wishlist", error);
        } finally {
          set({ isSyncing: false });
        }
      }
    }),
    {
      name: 'snipes-wishlist-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // default is localStorage
    }
  )
);
