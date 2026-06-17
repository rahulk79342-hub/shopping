import ProductDetailClient from './ProductDetailClient';

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate at most every 60 seconds

// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const { id } = unwrappedParams;

  // In production, fetch actual product data here for metadata
  // const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
  
  // Mock fallback for SEO
  const title = `Product ${id}`;
  const description = "Experience unparalleled comfort with our signature unstructured tailoring. The perfect blend of streetwear and high fashion.";
  const { categorizedImages } = await import('@/lib/supabase');
  const numId = parseInt(id) || 1;
  const isPants = numId % 3 === 0;
  const isAccessory = numId % 5 === 0;
  let categoryPool = categorizedImages.shirts;
  if (isAccessory) categoryPool = categorizedImages.accessories;
  else if (isPants) categoryPool = categorizedImages.bottoms;
  
  const image = categoryPool[numId % categoryPool.length];
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 800,
          height: 1000,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
  };
}

// generateMetadata handles the SEO info

// Generate static params for the most popular products at build time
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

// Server Component
export default async function ProductPage(props) {
  // Await params since it is a promise in newer Next.js versions
  const params = await props.params;
  const { id } = params;

  // In production, this would be a real database fetch.
  // const { data: product } = await supabase.from('products').select('*').eq('id', id).single();
  
  const { categorizedImages } = await import('@/lib/supabase');
  
  // Create a deterministic fallback based on ID
  const numId = parseInt(id) || 1;
  const isPants = numId % 3 === 0;
  const isAccessory = numId % 5 === 0;
  
  let categoryPool = categorizedImages.shirts;
  let categoryName = "shirts";
  if (isAccessory) { categoryPool = categorizedImages.accessories; categoryName = "accessories"; }
  else if (isPants) { categoryPool = categorizedImages.bottoms; categoryName = "bottoms"; }
  
  const mainImage = categoryPool[numId % categoryPool.length];
  const secondImage = categoryPool[(numId + 1) % categoryPool.length];
  const thirdImage = categoryPool[(numId + 2) % categoryPool.length];

  const defaultProduct = {
    id: id,
    name: `Premium Streetwear Item ${id}`,
    price: 899 + (numId * 10),
    originalPrice: 1499 + (numId * 10),
    description: "Experience unparalleled comfort with our signature unstructured tailoring. The perfect blend of streetwear and high fashion.",
    colors: [
      { name: 'Arctic Blue', hex: '#A3C4D9' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Off-White', hex: '#FAF9F6' }
    ],
    media: [
      { type: 'image', url: mainImage },
      { type: 'image', url: secondImage },
      { type: 'video', url: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-front-of-a-white-wall-43284-large.mp4" },
      { type: 'image', url: thirdImage }
    ]
  };

  const productDB = {
    "1": { ...defaultProduct, name: "Digital Printed Shirt" },
    "2": { ...defaultProduct, name: "Motorsport Oversized Hoodie", price: 2499, originalPrice: null, media: [{ type: 'image', url: categorizedImages.shirts[0] }, { type: 'image', url: categorizedImages.shirts[1] }, { type: 'image', url: categorizedImages.shirts[2] }, { type: 'image', url: categorizedImages.shirts[3] }] },
    "motorsport-hoodie": { ...defaultProduct, name: "Motorsport Oversized Hoodie", price: 2499, originalPrice: null, media: [{ type: 'image', url: categorizedImages.shirts[0] }, { type: 'image', url: categorizedImages.shirts[1] }, { type: 'image', url: categorizedImages.shirts[2] }, { type: 'image', url: categorizedImages.shirts[3] }] },
    "3": { ...defaultProduct, name: "Charcoal Gurkha", price: 1499, originalPrice: null, media: [{ type: 'image', url: categorizedImages.bottoms[0] }, { type: 'image', url: categorizedImages.bottoms[1] }, { type: 'image', url: categorizedImages.bottoms[2] }, { type: 'image', url: categorizedImages.bottoms[3] }] },
    "charcoal-gurkha": { ...defaultProduct, name: "Charcoal Gurkha", price: 1499, originalPrice: null, media: [{ type: 'image', url: categorizedImages.bottoms[0] }, { type: 'image', url: categorizedImages.bottoms[1] }, { type: 'image', url: categorizedImages.bottoms[2] }, { type: 'image', url: categorizedImages.bottoms[3] }] },
  };

  const product = productDB[id] || defaultProduct;

  const relatedProducts = [
    { id: 2, name: "Motorsport Hoodie", price: 1299, image: categorizedImages.shirts[4] },
    { id: 3, name: "Gurkha Pants", price: 1499, image: categorizedImages.bottoms[4] },
    { id: 4, name: "Establish Tee", price: 699, image: categorizedImages.shirts[5] },
    { id: 5, name: "Off-White Shorts", price: 599, image: categorizedImages.bottoms[5] }
  ];

  // JSON-LD Schema for Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.media[0].url,
    description: product.description,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${id}`,
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Snipes Menswear',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
    },
  };

  return (
    <>
      {/* Inject JSON-LD Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
