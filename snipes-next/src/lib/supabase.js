import { createClient } from '@supabase/supabase-js';

// Fallback to mock keys if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key-12345';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- MOCK FETCHER FOR DEVELOPMENT ---
// This simulates an infinite scroll fetcher until you connect your real database
export const fetchMockProducts = async ({ pageParam = 0, filters = {}, sort = 'new' }) => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const ITEMS_PER_PAGE = 8;
  const startIndex = pageParam * ITEMS_PER_PAGE;
  
  // Base mock data pool
  let mockData = Array.from({ length: 40 }).map((_, i) => ({
    id: i + 1,
    name: `Premium Streetwear Item ${i + 1}`,
    price: 500 + Math.floor(Math.random() * 2000),
    originalPrice: Math.random() > 0.7 ? 2500 + Math.floor(Math.random() * 1000) : null,
    sale: Math.random() > 0.7,
    category: ['shirts', 'bottoms', 'accessories'][Math.floor(Math.random() * 3)],
    size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
    color: ['black', 'white', 'beige', 'blue'][Math.floor(Math.random() * 4)],
    images: [
      "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk",
      "https://lh3.googleusercontent.com/aida/AP1WRLvdTNrLqdIbrlVcwvhf1pkicFIWpnzBFdCNmEPxGZPQWSdo5JLETjU7OD2n_HxSzocDKARWSH6316KlftpQ7TnhFoy0mGx_msvfc5QkybOjQoo3H0Dfl1ceWVKM3voQAjRKpFFhc7kJrj21ZQY6aS4zFyRINNnb8xhYILeid1pTKRLT_LG3VXqTFZKBSvir70jC-LREyJzbtBirF6QDKz9BeU13JLHCPk1fd4-MBWrPDa3Mr-u8s8tYQzA"
    ],
    type: ['normal', 'tall', 'short'][Math.floor(Math.random() * 3)],
    stock: Math.random() > 0.8 ? 0 : 10,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
  }));

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    mockData = mockData.filter(item => item.category === filters.category);
  }
  if (filters.size) {
    mockData = mockData.filter(item => item.size === filters.size);
  }
  if (filters.color) {
    mockData = mockData.filter(item => item.color === filters.color);
  }
  if (filters.sale) {
    mockData = mockData.filter(item => item.sale);
  }

  // Apply sort
  if (sort === 'price-asc') {
    mockData.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    mockData.sort((a, b) => b.price - a.price);
  } else {
    // new or default
    mockData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const paginatedData = mockData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const nextCursor = startIndex + ITEMS_PER_PAGE < mockData.length ? pageParam + 1 : undefined;

  return {
    data: paginatedData,
    nextCursor,
    totalCount: mockData.length
  };
};
