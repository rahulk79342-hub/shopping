import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      savedForLater: [],
      
      cartCount: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),
      cartTotal: () => get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),

      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(
          item => item.id === product.id && item.size === product.size
        );
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id && item.size === product.size
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            )
          };
        }
        return { cartItems: [...state.cartItems, { ...product, quantity: product.quantity || 1 }] };
      }),

      removeFromCart: (id, size) => set((state) => ({
        cartItems: state.cartItems.filter(item => !(item.id === id && item.size === size))
      })),

      updateQuantity: (id, size, quantity) => set((state) => {
        if (quantity < 1) {
          return {
            cartItems: state.cartItems.filter(item => !(item.id === id && item.size === size))
          };
        }
        return {
          cartItems: state.cartItems.map(item =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          )
        };
      }),

      clearCart: () => set({ cartItems: [] }),

      // Save for Later
      saveForLater: (item) => set((state) => {
        const filteredCart = state.cartItems.filter(cartItem => !(cartItem.id === item.id && cartItem.size === item.size));
        // Check if it already exists in savedForLater
        const exists = state.savedForLater.find(savedItem => savedItem.id === item.id && savedItem.size === item.size);
        if (exists) return { cartItems: filteredCart };
        
        return { 
          cartItems: filteredCart,
          savedForLater: [...state.savedForLater, item] 
        };
      }),

      moveToCart: (item) => set((state) => {
        const filteredSaved = state.savedForLater.filter(savedItem => !(savedItem.id === item.id && savedItem.size === item.size));
        
        const existingCartItem = state.cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);
        if (existingCartItem) {
          return {
            savedForLater: filteredSaved,
            cartItems: state.cartItems.map(cartItem => 
              cartItem.id === item.id && cartItem.size === item.size
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
          };
        }

        return {
          savedForLater: filteredSaved,
          cartItems: [...state.cartItems, item]
        };
      }),
      
      removeSaved: (id, size) => set((state) => ({
        savedForLater: state.savedForLater.filter(item => !(item.id === id && item.size === size))
      }))
    }),
    {
      name: 'snipes-cart-storage', // localStorage key
    }
  )
);
