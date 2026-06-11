"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InstagramFeed() {
  // Using static mockup data for performance and avoiding token issues
  const posts = [
    { id: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW", likes: 1240, comments: 45 },
    { id: 2, image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", likes: 890, comments: 22 },
    { id: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN", likes: 2150, comments: 104 },
    { id: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB", likes: 1430, comments: 38 },
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-[var(--color-background)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12 text-center mb-16">
        <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-[0.3em] block mb-4">
          Join the Movement
        </span>
        <h2 className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[48px] text-[var(--color-primary)] mb-6 tracking-tight">
          @SnipesMenswear
        </h2>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-[var(--color-primary)] pb-1 font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-outline)] hover:border-[var(--color-outline)] transition-colors"
        >
          Follow Us
          <span className="material-symbols-outlined text-[14px]">call_made</span>
        </a>
      </div>

      <div className="w-full">
        {/* Mobile: Horizontal scroll, Desktop: 4 column grid */}
        <div className="flex md:grid md:grid-cols-4 gap-1 md:gap-0 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: post.id * 0.1 }}
              className="relative aspect-square min-w-[80vw] md:min-w-0 snap-center group cursor-pointer"
            >
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image 
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-white font-[var(--font-family-body-md)]">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-[var(--font-family-body-md)]">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>mode_comment</span>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
