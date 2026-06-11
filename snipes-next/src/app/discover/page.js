"use client";
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function Discover() {
  const [layout, setLayout] = useState('normal'); // 'normal' | 'dense'

  const products = [
    {
      id: 1,
      name: "Digital Printed Shirts - Violet&Blue",
      price: 899,
      originalPrice: 1499,
      sale: true,
      images: [
        "https://lh3.googleusercontent.com/aida/AP1WRLtXGR7SzSYfLq_WcEd1dIgXMuhck9ZFw-aDoyVPkbMzz6wlmy1y8q8nr7D8F9ieFG_zBepQ-ntDVuMjExLDWUcz43bRNxu4MXtJAIgPdrJ4rMN1zXICmEmL6tyT9e71Eypst3aCZOJ50ZFHXuAMSI5DmFO-za2UnQ-EZ0G35U912G_5srCY01MYPuQvlExHiDp31ozzPfMF4L7i6K3fYjKjwlLngadZWVwjTnyr5SKy9g3zFYW5",
        "https://lh3.googleusercontent.com/aida/AP1WRLvdTNrLqdIbrlVcwvhf1pkicFIWpnzBFdCNmEPxGZPQWSdo5JLETjU7OD2n_HxSzocDKARWSH6316KlftpQ7TnhFoy0mGx_msvfc5QkybOjQoo3H0Dfl1ceWVKM3voQAjRKpFFhc7kJrj21ZQY6aS4zFyRINNnb8xhYILeid1pTKRLT_LG3VXqTFZKBSvir70jC-LREyJzbtBirF6QDKz9BeU13JLHCPk1fd4-MBWrPDa3Mr-u8s8tYQzA"
      ],
      type: "tall"
    },
    {
      id: 2,
      name: "Digital Printed Shirts - Beige&Black",
      price: 899,
      sale: true,
      images: [
        "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio",
        "https://lh3.googleusercontent.com/aida/AP1WRLvw9FdItBs4xTS_sjAW7ZS9oTvshB8ITreVknakm6GMz86Zo0W786YpzmYVSmC1KErN9goD0XG1VJutC2FAwXySv_2ovKk9QqiiwSezdFGZoo-6zzAz4YYfUPcAOwq8Gtel_Q75arPu1aD8lH_UWit-6m9DG5AHP3F9a_vreoH0InhMZccvmHvyN69HZeUl0A7WBvVb5aspdaWoiYMTTXm0316rRjaZoBEuFpuc7rSGGRpXi8i_gjmy6Lk"
      ],
      type: "normal"
    },
    {
      id: 3,
      name: "Digital Printed Shirts - Blue&White",
      price: 899,
      images: [
        "https://lh3.googleusercontent.com/aida/AP1WRLvdTNrLqdIbrlVcwvhf1pkicFIWpnzBFdCNmEPxGZPQWSdo5JLETjU7OD2n_HxSzocDKARWSH6316KlftpQ7TnhFoy0mGx_msvfc5QkybOjQoo3H0Dfl1ceWVKM3voQAjRKpFFhc7kJrj21ZQY6aS4zFyRINNnb8xhYILeid1pTKRLT_LG3VXqTFZKBSvir70jC-LREyJzbtBirF6QDKz9BeU13JLHCPk1fd4-MBWrPDa3Mr-u8s8tYQzA",
        "https://lh3.googleusercontent.com/aida/AP1WRLvSYcGlZrnwqfIIv18eMDIdu2yLyYBG21HM8YJfRqO_iAicuLNUK6anx727focsmckkG7zBbMgV0uhNqsGq8zrEDcq7W1A7-RSbsmKQEvt8zaF0TdkSKstAczSYMBv9CcFDe5jeiEQcGpzsHczxL3WmLBx4t4tpS4HEVDcYOJyrORZr23DyxdoA2bqQhlU-wuQZtkAuGZwChFskCe2q5bfCAidUzkN4jVbZugbdlK7ejH3aTvrL4mMYnio"
      ],
      type: "short"
    },
    {
      id: 4,
      name: "Oversized Motorsport Hoodie",
      price: 1299,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YavZNiw9DhrBb0ZBgyJifNRaItiQDPQUi190lzf_JBwvZh3tWuqKExcUQ7eiZcM6BMOmdoVawxp7B661YYJoSVHa_NlGyj796o0KV2R1Q9Nc45Q3CNxnoQTn90NPz_W_G5RvD6zZyvqdKTdxVvkjDwKvoFNpfMcRoi9jGYZ-PpK3F7wbv1h7xKcQNrcKB59Y8RmwskjgfFomuWiIiKlNnTjxBlMtQyXkykV6wYO5CsJBp5nwj5joHCf52oJfQKzUZlUzaK2CIrJW"
      ],
      type: "tall"
    },
    {
      id: 5,
      name: "Classic Charcoal Gurkha Pants",
      price: 1499,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA76zNwvs5gMYBFVZdgoSKJixLptgh8_OB9nQow0L6_sa-MyFkZ_KEm8y6a2HgRpEoWIqeXdoqpUwF94EgjQmd61fahM19_jR7mirZXRODBeuMxABEdij3syuzXzQbdpXRTIDT0jSfZ9w1e8WNpD1AvZU2g9kOq7r6vmwllFI9oFTFs0PUiYBF7TNVegv2eNGwSdmDEnbrnEmdAanvGG7WAdGbHwCKGcgxcHmU228IbrBPWR6kQBJJlX9OMjpPQ4qKvdkkPp-zi-CzN"
      ],
      type: "normal"
    },
    {
      id: 6,
      name: "Establish Printed Tee - White",
      price: 699,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2T5ScOkf6IGg-8_FhievtvgyT3NP2bgwX4PxJxAmxL5rI1dqkz7qMYE1Hcuu3nuLT-8TS5ga_RJQvRdmscfKLJRLKpSlvhCDSQJld2aLlhyJ_bCM5NaRIjUZ3vUv8__E4aGjFEaCbB89BaZcHTxpJ4Xe1DDGzz1RvpJEdQy7hHsI4iuu0OZoWpQqiF7_oG0I01WEHkLeohuJPZc9m5tuDwUQ6CRvMC-hvmrvlA06GBWUi4QAX716W41QeZXo4wYH8Um85lRy0_rJB"
      ],
      type: "short"
    }
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] py-[var(--spacing-stack-lg)] min-h-screen">
      <section className="flex flex-col gap-[var(--spacing-stack-md)] mb-[var(--spacing-stack-lg)]">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] text-[var(--color-outline)] uppercase tracking-widest">Curated Collection</span>
            <h2 className="font-[var(--font-family-headline-lg)] text-[var(--text-headline-lg)] mt-1 text-[var(--color-primary)]">Printed Shirts & Streetwear</h2>
            <p className="text-sm text-[var(--color-outline)] mt-2">{products.length} Products</p>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-[var(--color-outline-variant)] pr-6">
              <button 
                onClick={() => setLayout('normal')}
                className={`p-2 rounded transition-colors flex items-center justify-center cursor-pointer ${layout === 'normal' ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)]' : 'text-[var(--color-outline)] hover:text-[var(--color-primary)]'}`}
                title="Grid View"
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>grid_view</span>
              </button>
              <button 
                onClick={() => setLayout('dense')}
                className={`p-2 rounded transition-colors flex items-center justify-center cursor-pointer ${layout === 'dense' ? 'bg-[var(--color-surface-container)] text-[var(--color-primary)]' : 'text-[var(--color-outline)] hover:text-[var(--color-primary)]'}`}
                title="Catalog View"
              >
                <span className="material-symbols-outlined">apps</span>
              </button>
            </div>
            
            <button className="flex items-center gap-2 border border-[var(--color-outline)] px-4 py-2 hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              <span className="font-[var(--font-family-label-caps)] text-[12px]">Sort By</span>
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          <button className="whitespace-nowrap px-6 py-2 bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-[var(--border-radius-lg)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] active:scale-95 transition-transform cursor-pointer">All</button>
          <button className="whitespace-nowrap px-6 py-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded-[var(--border-radius-lg)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] hover:border-[var(--color-primary)] active:scale-95 transition-transform cursor-pointer">Shirts</button>
          <button className="whitespace-nowrap px-6 py-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded-[var(--border-radius-lg)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] hover:border-[var(--color-primary)] active:scale-95 transition-transform cursor-pointer">Bottoms</button>
          <button className="whitespace-nowrap px-6 py-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded-[var(--border-radius-lg)] font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] hover:border-[var(--color-primary)] active:scale-95 transition-transform cursor-pointer">Sale</button>
        </div>
      </section>

      <section className={layout === 'dense' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4' : 'masonry-grid'}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} layout={layout} />
        ))}
        {layout === 'dense' && products.map(product => (
          <ProductCard key={`${product.id}-copy`} product={{...product, id: product.id + 100}} layout={layout} />
        ))}
      </section>

      <div className="w-full flex justify-center py-[var(--spacing-stack-xl)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-[var(--font-family-label-caps)] text-[var(--text-label-caps)] text-[var(--color-outline)] uppercase tracking-widest">Loading More Drops</span>
        </div>
      </div>
    </main>
  );
}
