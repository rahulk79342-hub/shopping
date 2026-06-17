import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Seed with some mock data for development purposes
const MOCK_INITIAL_DATA = [
  {
    id: 'rv1',
    name: "Vintage Wash Tee",
    price: "₹899",
    img: "https://loremflickr.com/800/800/menswear,clothing?random=112"
  },
  {
    id: 'rv2',
    name: "Classic Chinos",
    price: "₹1499",
    img: "https://loremflickr.com/800/800/menswear,clothing?random=111"
  },
  {
    id: 'rv3',
    name: "Linen Blend Shirt",
    price: "₹1299",
    img: "https://loremflickr.com/800/800/menswear,clothing?random=110"
  }
];

export const useRecentlyViewedStore = create(
  persist(
    (set) => ({
      // Start with mock data so we can see the UI immediately
      viewedItems: MOCK_INITIAL_DATA,
      
      addViewedProduct: (product) => set((state) => {
        // Remove product if it already exists to move it to the front
        const filtered = state.viewedItems.filter(p => p.id !== product.id);
        
        // Add to front, keep max 6
        return { 
          viewedItems: [product, ...filtered].slice(0, 6) 
        };
      }),

      clearViewed: () => set({ viewedItems: [] })
    }),
    {
      name: 'snipes-recently-viewed',
    }
  )
);
