"use client";
import Image from "next/image";
<<<<<<< HEAD
import Link from "next/link";

export default function InstagramFeed() {
  const posts = [
    { id: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW" },
    { id: 2, image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" },
    { id: 3, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN" },
    { id: 4, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB" },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 mb-8">
        <h2 className="text-[20px] md:text-[28px] text-black font-medium text-center">
          @SnipesMenswear
        </h2>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="relative aspect-square w-full">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                <Image 
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </Link>
            </div>
=======
import { motion } from "framer-motion";
import { useUI } from "@/context/UIContext";

export default function InstagramFeed() {
  const { openQuickAdd } = useUI();

  // Using static mockup data for performance and avoiding token issues
  const posts = [
    { 
      id: 1, 
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW", 
      likes: 1240, 
      comments: 45,
      product: { id: 'p1', name: 'Vintage Wash Tee', price: '₹899', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW' }
    },
    { 
      id: 2, 
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", 
      likes: 890, 
      comments: 22,
      product: { id: 'p2', name: 'Linen Blend Shirt', price: '₹1299', image: 'https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk' }
    },
    { 
      id: 3, 
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN", 
      likes: 2150, 
      comments: 104,
      product: { id: 'p3', name: 'Classic Chinos', price: '₹1499', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN' }
    },
    { 
      id: 4, 
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB", 
      likes: 1430, 
      comments: 38,
      product: { id: 'p4', name: 'Printed Cuban Collar', price: '₹1199', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB' }
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 text-center mb-12">
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
                   
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       openQuickAdd(post.product);
                     }}
                     className="w-full bg-white text-black font-bold uppercase tracking-widest text-[11px] py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
                   >
                     Shop The Look
                   </button>
                </div>

              </div>
            </motion.div>
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white px-8 py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Visit Instagram
        </a>
      </div>
    </section>
  );
}
