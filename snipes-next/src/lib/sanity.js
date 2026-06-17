import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// Mock IDs for frontend setup.
// Replace these with your actual Sanity project ID and dataset when ready.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mockProject123';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to true for production if you want edge caching
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Example query functions to be used later
export async function getBestsellers() {
  // return await client.fetch(`*[_type == "product" && isBestseller == true]`);
  
  // Return mocked data until CMS is connected
  return [
    {
      _id: '1',
      title: 'Motorsport Oversized Hoodie',
      price: 2499,
      slug: { current: 'motorsport-hoodie' },
      imageUrl: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '2',
      title: 'Charcoal Gurkha Pants',
      price: 1499,
      slug: { current: 'charcoal-gurkha' },
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '3',
      title: 'Establish Printed Tee',
      price: 699,
      slug: { current: 'establish-tee' },
      imageUrl: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '4',
      title: 'Linen Cuban Collar',
      price: 1299,
      slug: { current: 'linen-cuban' },
      imageUrl: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&w=800&q=80',
    }
  ];
}

export async function getLookbookCampaign() {
  // Mock data for Lookbook
  return {
    heroImage: 'https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=800&q=80',
    title: 'The Modern Tailoring',
    hotspots: [
      {
        id: 'hs1',
        x: 45, // percentage
        y: 35, // percentage
        product: {
          id: '1',
          name: 'Motorsport Oversized Hoodie',
          price: 2499,
          image: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'hs2',
        x: 55,
        y: 65,
        product: {
          id: '2',
          name: 'Charcoal Gurkha Pants',
          price: 1499,
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80'
        }
      }
    ],
    outfitBuilder: {
      tops: [
        { id: 't1', image: 'https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?auto=format&fit=crop&w=800&q=80', name: 'Linen Cuban Collar' },
        { id: 't2', image: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=800&q=80', name: 'Motorsport Hoodie' }
      ],
      bottoms: [
        { id: 'b1', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80', name: 'Charcoal Gurkha' },
        { id: 'b2', image: 'https://images.unsplash.com/photo-1718252540511-e958742e4165?auto=format&fit=crop&w=800&q=80', name: 'Old Money Trousers' }
      ]
    }
  };
}
