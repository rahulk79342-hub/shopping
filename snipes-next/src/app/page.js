"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import BestsellersCarousel from '@/components/BestsellersCarousel';
import HeroCarousel from '@/components/HeroCarousel';
import InstagramFeed from '@/components/InstagramFeed';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import ProductShowcase from '@/components/ProductShowcase';
import Testimonials from '@/components/Testimonials';
import Benefits from '@/components/Benefits';
import Newsletter from '@/components/Newsletter';
import { getBestsellers } from '@/lib/sanity';
import { useCurrency } from '@/hooks/useCurrency';
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion';

// Start of Home component

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const [bestsellers, setBestsellers] = useState([]);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited_snipes');
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      localStorage.setItem('hasVisited_snipes', 'true');
    }

    async function loadData() {
      const data = await getBestsellers();
      setBestsellers(data);
    }
    loadData();
  }, []);

  const heroImageY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroTextY = useTransform(scrollY, [0, 1000], [0, -100]); // Less extreme for mobile
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="w-full bg-[var(--color-background)] overflow-x-hidden">
      <ExitIntentPopup />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* New Professional Sliding Hero Carousel */}
      <HeroCarousel />

      {/* Categories Row */}
      <section className="w-full pb-8 pt-4 px-4 overflow-hidden max-w-screen-2xl mx-auto">
        <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-4 snap-x snap-mandatory">
          {[
            { title: "Printed", items: "33 items", img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" },
            { title: "Stripes", items: "21 items", img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio" },
            { title: "Solid", items: "44 items", img: "https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5" },
            { title: "Printed", items: "43 items", img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk" },
          ].map((cat, i) => (
            <motion.div
              key={i}
              className="relative min-w-[105px] snap-center cursor-pointer group flex flex-col"
            >
              <Link href="/discover" className="block w-full h-full relative">
                <div className="w-full h-[120px] rounded-[16px] overflow-hidden mb-2 relative bg-[#f5f5f5]">
                  <Image src={cat.img} fill sizes="120px" className="object-cover object-top" alt={cat.title} />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-bold text-[13px] text-black leading-tight">{cat.title}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">{cat.items}</p>
                  </div>
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[12px] transform -rotate-45">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Snipes Picks Section */}
      <section className="w-full px-4 mb-12 max-w-screen-2xl mx-auto">
        <div className="border border-gray-300 rounded-[20px] p-4 flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-bold text-black tracking-tight">Snipes Picks</h2>
          <Link href="/discover" className="text-[12px] text-gray-500 hover:text-black transition-colors">
            View all
          </Link>
        </div>
        
        {/* Placeholder for the Snipes Picks images, you can integrate your products here */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[200px] rounded-[16px] overflow-hidden bg-gray-100">
             <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="Sale Item" />
             <div className="absolute top-2 right-2 bg-white text-black text-[10px] px-2 py-1 rounded-full font-bold">Sale</div>
          </div>
          <div className="relative h-[200px] rounded-[16px] overflow-hidden bg-gray-100">
             <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" alt="New Item" />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Bestsellers Carousel (Embla + Sanity) */}
      <BestsellersCarousel products={bestsellers} />

      {/* Testimonials */}
      <Testimonials />

      {/* Instagram Feed Integration */}
      <InstagramFeed />

      {/* USP / Benefits Section */}
      <Benefits />

      {/* Newsletter Signup */}
      <Newsletter />

    </main>
  );
}
