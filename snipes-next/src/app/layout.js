import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import QuickAddModal from "@/components/QuickAddModal";
import SizeRecommender from "@/components/SizeRecommender";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";

const sora = Sora({
  variable: "--font-family-headline-lg",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-family-body-md",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://snipes.com'),
  title: {
    default: "Snipes Menswear | Premium Urban Streetwear",
    template: "%s | Snipes Menswear"
  },
  description: "Discover premium streetwear and printed shirts. Experience the intersection of comfort and luxury with Snipes Menswear.",
  openGraph: {
    title: "Snipes Menswear",
    description: "Premium Urban Streetwear",
    url: '/',
    siteName: 'Snipes Menswear',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for actual OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snipes Menswear',
    description: 'Premium Urban Streetwear',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className={`${sora.variable} ${hanken.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          <UIProvider>
            <div className="bg-[var(--color-background)] min-h-screen text-[var(--color-on-background)] selection:bg-[var(--color-primary)] selection:text-white">
              <AnnouncementBar />
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
              <CartDrawer />
              <QuickAddModal />
              <SizeRecommender />
              <CookieBanner />
            </div>
          </UIProvider>
        </Providers>
      </body>
    </html>
  );
}
