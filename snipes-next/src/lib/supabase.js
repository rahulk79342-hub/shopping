import { createClient } from '@supabase/supabase-js';

// Fallback to mock keys if environment variables are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key-12345';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const categorizedImages = {
  shirts: [
    "https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1642764873654-9eef0467b342?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605794432120-f4bb5dc9067d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1627686011747-74adda3d2343?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1642764873649-5c228ce3fe74?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552571072-0eadf8e3953c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1717724162644-75f624f413ca?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1599817620437-841f945171f7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606724003282-df6ecad297ce?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1635091984256-dc15291bb483?auto=format&fit=crop&w=800&q=80"
  ],
  bottoms: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1718252540511-e958742e4165?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601561446301-fecc99036f4b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1633963643586-1a39077623be?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1715532098304-1e81e1f42600?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552904219-f4b87efe8792?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1678222532251-2f303290c1e5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1655666730043-b3aee96aa161?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552903905-5e39e774e375?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517184828383-bdf7e82f395f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1648301558657-b55db298200a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1615877190092-5b19bd3c37b4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553247407-23251ce81f59?auto=format&fit=crop&w=800&q=80"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1629139033414-76f3c0eacf84?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543322748-33df6d3db806?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541495532687-d41ee8904943?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1724318497004-084cece3e7ae?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1637868796504-32f45a96d5a0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1775379557015-938546264440?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1631286964587-d0f26936b263?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559324945-1e44e1e8157d?auto=format&fit=crop&w=800&q=80"
  ]
};

// --- MOCK FETCHER FOR DEVELOPMENT ---
// This simulates an infinite scroll fetcher until you connect your real database
export const fetchMockProducts = async ({ pageParam = 0, filters = {}, sort = 'new', limit = 8 }) => {
  // Removed simulated network latency for performance
  
  const ITEMS_PER_PAGE = limit;
  const startIndex = pageParam * ITEMS_PER_PAGE;
  
  const productTitles = {
    shirts: ["Classic Linen Shirt", "Oversized Silk Shirt", "Cotton Cuban Collar", "Knit Polo", "Oxford Button Down", "Heavyweight Tee", "Striped Camp Collar", "Relaxed Fit Flannel", "Textured Weave Shirt", "Minimalist T-Shirt"],
    bottoms: ["Gurkha Trousers", "Pleated Chinos", "Slim Fit Jeans", "Relaxed Cargo Pants", "Tailored Shorts", "Drawstring Linen Pants", "Wide Leg Trousers", "Selvedge Denim", "Wool Blend Slacks", "Track Pants"],
    accessories: ["Leather Belt", "Canvas Tote Bag", "Silver Chain", "Classic Cap", "Sunglasses", "Minimalist Watch", "Ribbed Socks", "Silk Tie", "Cardholder", "Beanie"]
  };

  let mockData = Array.from({ length: 40 }).map((_, i) => {
    const numId = i + 1;
    const isPants = numId % 3 === 0;
    const isAccessory = numId % 5 === 0;
    let category = 'shirts';
    if (isAccessory) category = 'accessories';
    else if (isPants) category = 'bottoms';
    
    const imagePool = categorizedImages[category];
    const titles = productTitles[category];
    const basePrice = category === 'accessories' ? 1500 : (category === 'bottoms' ? 3500 : 2500);
    const priceVar = (numId * 100) % 1500;
    const price = basePrice + priceVar;
    
    return {
      id: numId,
      name: titles[i % titles.length],
      price: price,
      originalPrice: (numId % 3 === 0) ? price + 1000 : null,
      sale: (numId % 3 === 0),
      category,
      size: ['S', 'M', 'L', 'XL'][numId % 4],
      color: ['black', 'white', 'beige', 'blue'][numId % 4],
      images: [
        imagePool[i % imagePool.length],
        imagePool[(i + 1) % imagePool.length]
      ],
      type: ['normal', 'tall', 'short'][numId % 3],
      stock: (numId % 5 === 0) ? 0 : 10,
      createdAt: new Date(1700000000000 - (numId * 86400000)).toISOString()
    };
  });

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
