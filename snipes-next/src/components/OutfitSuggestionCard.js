"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { MdOutlineAutoAwesome, MdOutlineShoppingBag } from 'react-icons/md';


export default function OutfitSuggestionCard({ layout = 'normal' }) {
  const addToCart = useCartStore(state => state.addToCart);
  const isDense = layout === 'dense';

  const handleAddBundle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add mock top and bottom
    addToCart({ id: 101, name: 'Linen Overshirt - Sand', price: 2499, size: 'M', image: 'https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk' });
    addToCart({ id: 102, name: 'Pleated Trousers - Olive', price: 1899, size: '32', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN' });
  };

  return (
    <div className={`group card-zoom cursor-pointer relative ${isDense ? 'h-[300px]' : 'masonry-item-tall'} mb-[var(--spacing-stack-lg)] border-2 border-[var(--color-primary)]`}>
      <Link href="/discover" className={`block relative overflow-hidden bg-[var(--color-surface-container)] ${isDense ? 'h-full' : 'h-full aspect-[3/4]'}`}>
        
        <Image 
          alt="Outfit Suggestion" 
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-front-of-a-white-wall-43284-large.mp4" 
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out hidden" 
        />
        <video 
          src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-front-of-a-white-wall-43284-large.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white text-[var(--color-primary)] font-[var(--font-family-label-caps)] text-[10px] px-3 py-1.5 uppercase tracking-widest flex items-center gap-1 shadow-md">
            <MdOutlineAutoAwesome className="text-[14px]" />
            AI Styled
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 z-20">
          <h3 className="font-[var(--font-family-headline-md)] text-2xl text-white mb-1">Earth Tones</h3>
          <p className="font-[var(--font-family-body-md)] text-sm text-white/80 mb-4">Linen Overshirt + Pleated Trousers</p>
          
          <button 
            onClick={handleAddBundle}
            className="w-full bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-[11px] uppercase tracking-widest py-3 hover:bg-[var(--color-secondary)] hover:text-black transition-colors duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <MdOutlineShoppingBag className="text-[16px]" />
            Add Bundle - Rs. 4398.00
          </button>
        </div>
      </Link>
    </div>
  );
}
