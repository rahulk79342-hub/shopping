export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface-container)] pt-16 pb-24 md:pb-8">
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] mb-4">About Snipes</h3>
          <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
            Premium streetwear designed for the modern urban lifestyle. We blend comfort with bold aesthetics to create pieces that stand out.
          </p>
        </div>
        <div>
          <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 font-[var(--font-family-body-md)] text-sm text-[var(--color-on-surface-variant)]">
            <li><a href="#" className="hover:text-[var(--color-primary)]">New Arrivals</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">Best Sellers</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">Track Order</a></li>
            <li><a href="#" className="hover:text-[var(--color-primary)]">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] mb-4">Contact</h3>
          <ul className="flex flex-col gap-2 font-[var(--font-family-body-md)] text-sm text-[var(--color-on-surface-variant)]">
            <li>Email: support@snipesmenswear.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Hours: Mon-Fri 9AM-5PM EST</li>
          </ul>
        </div>
        <div>
          <h3 className="font-[var(--font-family-headline-md)] text-[18px] text-[var(--color-primary)] mb-4">Newsletter</h3>
          <p className="font-[var(--font-family-body-md)] text-sm text-[var(--color-on-surface-variant)] mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="px-4 py-2 w-full border border-[var(--color-outline-variant)] focus:outline-none focus:border-[var(--color-primary)] bg-white"/>
            <button className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-4 py-2 font-[var(--font-family-label-caps)] text-[12px] hover:opacity-90">SUBSCRIBE</button>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-[var(--spacing-margin-mobile)] mt-16 pt-8 border-t border-[var(--color-outline-variant)] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-[var(--font-family-body-md)] text-xs text-[var(--color-outline)]">© 2026 Snipes Menswear. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-[var(--color-outline)] hover:text-[var(--color-primary)] cursor-pointer">facebook</span>
          <span className="material-symbols-outlined text-[var(--color-outline)] hover:text-[var(--color-primary)] cursor-pointer">camera_alt</span>
          <span className="material-symbols-outlined text-[var(--color-outline)] hover:text-[var(--color-primary)] cursor-pointer">play_arrow</span>
        </div>
      </div>
    </footer>
  );
}
