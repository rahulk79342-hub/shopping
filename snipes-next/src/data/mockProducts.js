export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Classic Linen Shirt",
    price: 3500,
    originalPrice: null,
    sale: false,
    category: "shirts",
    size: "M",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 10,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Gurkha Trousers",
    price: 4500,
    originalPrice: 5500,
    sale: true,
    category: "bottoms",
    size: "L",
    color: "beige",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
    ],
    type: "tall",
    stock: 5,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    name: "Cotton Cuban Collar Shirt",
    price: 2800,
    originalPrice: null,
    sale: false,
    category: "shirts",
    size: "L",
    color: "black",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 12,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 4,
    name: "Pleated Chinos",
    price: 3200,
    originalPrice: null,
    sale: false,
    category: "bottoms",
    size: "M",
    color: "blue",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 8,
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 5,
    name: "Leather Belt",
    price: 1500,
    originalPrice: null,
    sale: false,
    category: "accessories",
    size: "M",
    color: "black",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 20,
    createdAt: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 6,
    name: "Oversized Silk Shirt",
    price: 4200,
    originalPrice: 5000,
    sale: true,
    category: "shirts",
    size: "S",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1588099768531-a72d4a198538?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 3,
    createdAt: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 7,
    name: "Slim Fit Jeans",
    price: 3800,
    originalPrice: null,
    sale: false,
    category: "bottoms",
    size: "M",
    color: "blue",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 15,
    createdAt: new Date(Date.now() - 518400000).toISOString()
  },
  {
    id: 8,
    name: "Knit Polo",
    price: 2900,
    originalPrice: null,
    sale: false,
    category: "shirts",
    size: "L",
    color: "beige",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80"
    ],
    type: "normal",
    stock: 11,
    createdAt: new Date(Date.now() - 604800000).toISOString()
  }
];
