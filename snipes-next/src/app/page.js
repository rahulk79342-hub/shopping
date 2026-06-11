"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity, 
  useAnimationFrame,
  useMotionValue
} from 'framer-motion';

// --- Magnetic Button Component ---
function MagneticButton({ children, href, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-10"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

// --- Velocity Marquee Component ---
function VelocityMarquee({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const wrapX = useTransform(baseX, (v) => `${(v % -50)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    // Increase speed based on scroll velocity
    moveBy += moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="bg-[var(--color-ink-black)] text-[var(--color-secondary)] py-6 overflow-hidden flex whitespace-nowrap m-0 relative">
      <motion.div className="flex font-[var(--font-family-label-caps)] text-[14px] tracking-[0.3em] uppercase" style={{ x: wrapX }}>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
        <span className="block mr-12">{children}</span>
      </motion.div>
    </div>
  );
}

// --- Custom Cursor Component ---
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--color-secondary)] pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  
  // Parallax transforms for Hero
  const heroImageY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroTextY = useTransform(scrollY, [0, 1000], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <main className="w-full bg-[var(--color-background)]">
      <CustomCursor />
      
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-secondary)] z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* Immersive Parallax Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-[var(--color-primary)]">
        <motion.div 
          style={{ y: heroImageY }}
          className="absolute inset-0 w-full h-[120%]" // 120% to allow for downward parallax
        >
          <motion.div 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-man-in-a-denim-jacket-and-sunglasses-posing-4458-large.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
        
        {/* Soft dark vignette over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[var(--color-primary)] opacity-90"></div>
        
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 pt-20"
        >
          <motion.span variants={fadeInUp} className="font-[var(--font-family-label-caps)] text-[12px] md:text-[14px] text-[var(--color-secondary)] uppercase tracking-[0.4em] mb-6 block">
            The Mercury Collection
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-[var(--font-family-display-lg)] text-[50px] md:text-[8vw] font-extrabold text-[var(--color-on-primary)] leading-[0.9] mb-8 tracking-tighter uppercase">
            Sartorial <br/> Prestige.
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="mt-12">
            <MagneticButton href="/discover" className="bg-[var(--color-secondary)] text-[var(--color-on-secondary)] px-12 py-5 font-[var(--font-family-label-caps)] text-[13px] uppercase tracking-widest hover:bg-white transition-colors duration-500 shadow-2xl flex items-center gap-3">
              Explore Collection
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Velocity Marquee */}
      <VelocityMarquee baseVelocity={-2}>
        NEW ARRIVALS EVERY WEEK &nbsp;·&nbsp; ELEVATE YOUR WARDROBE &nbsp;·&nbsp; PREMIUM QUALITY GUARANTEED &nbsp;·&nbsp; FREE SHIPPING OVER RS. 2000 &nbsp;·&nbsp; 
      </VelocityMarquee>

      {/* Categories Reveal */}
      <section className="max-w-[1440px] mx-auto py-32 px-[var(--spacing-margin-mobile)] md:px-12 overflow-hidden bg-[var(--color-background)]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="flex justify-between items-end mb-16 border-b border-[var(--color-outline-variant)] pb-8">
            <motion.h2 variants={fadeInUp} className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[56px] text-[var(--color-on-background)] leading-none tracking-tight">Curated <br/> Selections</motion.h2>
            <motion.div variants={fadeInUp}>
              <Link href="/discover" className="hidden md:flex items-center gap-2 font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-outline)] hover:text-[var(--color-primary)] uppercase transition-colors tracking-widest pb-2">
                View Lookbook <span className="material-symbols-outlined text-[14px]">east</span>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Printed Shirts", img: "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk", aspect: "aspect-[3/4]" },
              { title: "Linen Collection", img: "https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5", aspect: "aspect-[4/5] md:mt-16" },
              { title: "Old Money", img: "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio", aspect: "aspect-[3/4]" }
            ].map((cat, i) => (
              <motion.div key={i} variants={fadeInUp} className={`${cat.aspect} relative group cursor-pointer overflow-hidden`}>
                <Link href="/discover" className="block w-full h-full relative">
                  <Image src={cat.img} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" alt={cat.title}/>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="font-[var(--font-family-headline-md)] text-[24px] text-white mb-2">{cat.title}</h3>
                    <div className="w-0 h-[1px] bg-white group-hover:w-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Asymmetric Editorial Grid (Editor's Picks) */}
      <section className="bg-[var(--color-surface-container-low)]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] md:px-12 py-32"
        >
          <div className="text-center mb-16">
            <motion.span variants={fadeInUp} className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-[0.3em] block">The Edit</motion.span>
            <motion.h2 variants={fadeInUp} className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[48px] mt-4 text-[var(--color-primary)] tracking-tight">Editor's Picks</motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto md:h-[700px]">
            {/* Featured Large (Asymmetric Left) */}
            <motion.div variants={fadeInUp} className="md:col-span-8 h-[500px] md:h-full relative overflow-hidden group cursor-pointer bg-[var(--color-surface-container)]">
              <Link href="/product/1" className="block w-full h-full relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" alt="Motorsport Collection"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-secondary)] uppercase tracking-widest mb-4 block">Most Wanted</span>
                  <h3 className="font-[var(--font-family-headline-lg)] text-[32px] md:text-[48px] mb-4 leading-[1.1]">Motorsport<br/>Oversized Hoodie</h3>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="font-[var(--font-family-body-md)] text-sm border-b border-[var(--color-secondary)] pb-1">Shop Item</span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* Regular Small Right Column */}
            <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 h-[800px] md:h-full">
              <motion.div variants={fadeInUp} className="flex-1 relative overflow-hidden group cursor-pointer bg-[var(--color-surface-container)]">
                <Link href="/product/2" className="block w-full h-full relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.05] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" alt="Gurkha Pants"/>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700"></div>
                  <div className="absolute bottom-6 left-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="font-[var(--font-family-headline-md)] text-[20px]">Charcoal Gurkha</h3>
                    <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-secondary)] mt-1">Rs. 1,499.00</p>
                  </div>
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex-1 relative overflow-hidden group cursor-pointer bg-[var(--color-surface-container)]">
                <Link href="/product/3" className="block w-full h-full relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top group-hover:scale-[1.05] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" alt="Printed Tees"/>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700"></div>
                  <div className="absolute bottom-6 left-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <h3 className="font-[var(--font-family-headline-md)] text-[20px]">Establish Tees</h3>
                    <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-secondary)] mt-1">Rs. 699.00</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
