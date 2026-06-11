import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import QuickAddModal from "@/components/QuickAddModal";
import SearchOverlay from "@/components/SearchOverlay";
import SizeRecommender from "@/components/SizeRecommender";

const sora = Sora({
  variable: "--font-family-headline-lg",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-family-body-md",
  subsets: ["latin"],
});

export const metadata = {
  title: "Snipes Menswear | Premium Urban Streetwear",
  description: "Discover premium streetwear and printed shirts. Experience the intersection of comfort and luxury with Snipes Menswear.",
  openGraph: {
    title: "Snipes Menswear",
    description: "Premium Urban Streetwear",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${sora.variable} ${hanken.variable} antialiased`}>
        <UIProvider>
          <CartProvider>
            <div className="bg-[var(--color-background)] min-h-screen text-[var(--color-on-background)] selection:bg-[var(--color-primary)] selection:text-white">
              <AnnouncementBar />
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
              <CartDrawer />
              <QuickAddModal />
              <SearchOverlay />
              <SizeRecommender />
            </div>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
