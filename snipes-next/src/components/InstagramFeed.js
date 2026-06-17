"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InstagramFeed() {

  // Using static mockup data for performance and avoiding token issues
  const posts = [
    {
      id: 1,
      image: "https://i.imgur.com/7eW9nXP.jpeg",
      likes: 1240,
      comments: 45,
      product: { id: 'p1', name: 'Vintage Wash Tee', price: '₹899', image: 'https://i.imgur.com/IvxMPFr.jpeg' }
    },
    {
      id: 2,
      image: "https://i.imgur.com/R2PN9Wq.jpeg",
      likes: 890,
      comments: 22,
      product: { id: 'p2', name: 'Linen Blend Shirt', price: '₹1299', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=800&q=80' }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80",
      likes: 2150,
      comments: 104,
      product: { id: 'p3', name: 'Classic Chinos', price: '₹1499', image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=800&q=80' }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      likes: 1430,
      comments: 38,
      product: { id: 'p4', name: 'Printed Cuban Collar', price: '₹1199', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80' }
    },
  ];

  return (
    <section className="w-full py-12 ml-4 mr-4 md:py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 xl:px-12 text-center mb-12">
        <span className="font-bold text-[10px] text-gray-500 uppercase tracking-widest block mb-4 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[14px]">photo_camera</span>
          Join the Movement
        </span>
        <h2 className="text-[32px] md:text-[48px] font-bold text-black mb-4 tracking-tighter" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Styled By You
        </h2>
        <p className="text-gray-500 text-[14px] md:text-[16px] mb-8 max-w-md mx-auto">
          Tag <span className="font-bold text-black">#SnipesMenswear</span> on Instagram to be featured in our gallery and win a monthly ₹5000 gift card.
        </p>
      </div>

      <div className="w-full">
        {/* Mobile: Horizontal scroll, Desktop: 4 column grid */}
        <div className="flex md:grid md:grid-cols-4 gap-1 md:gap-1 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              className="relative aspect-square min-w-[85vw] md:min-w-0 snap-center group overflow-hidden cursor-pointer bg-gray-100"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                sizes="(max-width: 768px) 85vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Hover Overlay - Shoppable Focus */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">

                {/* Social Stats (Top Right) */}
                <div className="absolute top-4 right-4 flex gap-3 text-white">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    <span className="text-[12px] font-bold">{post.likes}</span>
                  </div>
                </div>

                {/* Shoppable Product Info */}
                <div className="mt-auto flex flex-col items-center w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white mb-3 bg-white">
                    <Image src={post.product.image} width={64} height={64} className="object-cover h-full w-full" alt={post.product.name} />
                  </div>
                  <span className="text-white font-bold text-[14px] leading-tight mb-1">{post.product.name}</span>
                  <span className="text-gray-300 text-[12px] mb-4">{post.product.price}</span>

                  <Link
                    href={`/product/${post.product.id}`}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest text-[11px] py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center"
                  >
                    Shop The Look
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
