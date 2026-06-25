"use client";
import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null); // null means modal is closed

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAuraOpen, setIsAuraOpen] = useState(false);

  const toggleCartDrawer = () => setIsCartDrawerOpen(prev => !prev);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);

  const openQuickAdd = (product) => setQuickAddProduct(product);
  const closeQuickAdd = () => setQuickAddProduct(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  const openAura = () => setIsAuraOpen(true);
  const closeAura = () => setIsAuraOpen(false);

  return (
    <UIContext.Provider value={{ 
      isCartDrawerOpen, toggleCartDrawer, closeCartDrawer, openCartDrawer,
      quickAddProduct, openQuickAdd, closeQuickAdd,
      isSearchOpen, openSearch, closeSearch,
      isSizeGuideOpen, openSizeGuide, closeSizeGuide,
      isAuraOpen, openAura, closeAura
    }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
