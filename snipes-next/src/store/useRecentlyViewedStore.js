import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Seed with some mock data for development purposes
const MOCK_INITIAL_DATA = [
  {
    id: 'rv1',
    name: "Vintage Wash Tee",
    price: "₹899",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW"
  },
  {
    id: 'rv2',
    name: "Classic Chinos",
    price: "₹1499",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN"
  },
  {
    id: 'rv3',
    name: "Linen Blend Shirt",
    price: "₹1299",
    img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"
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
