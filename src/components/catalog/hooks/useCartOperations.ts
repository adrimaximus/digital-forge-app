
import { useState, useEffect } from 'react';
import { CartItem, CatalogItem } from '@/types/catalog';
import { safeStorage } from '../utils/storageUtils';

export const useCartOperations = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = safeStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        
        // Ensure all cart items have the required properties
        const validatedCart = parsedCart.map((item: Partial<CartItem>) => ({
          ...item,
          imageUrl: item.imageUrl || 'https://source.unsplash.com/random/800x600/?business',
          description: item.description || '',
          longDescription: item.longDescription || '',
          category: item.category || '',
          features: item.features || [],
        }));
        
        setCart(validatedCart);
      } catch (e) {
        console.error('Error parsing cart:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Only save essential cart data to minimize storage use
    if (cart.length > 0) {
      const success = safeStorage.setItem('cart', JSON.stringify(cart));
      if (!success) {
        // If we can't save all items, try saving fewer
        if (cart.length > 3) {
          const reducedCart = cart.slice(0, 3);
          safeStorage.setItem('cart', JSON.stringify(reducedCart));
        }
      }
    } else {
      safeStorage.setItem('cart', '[]');
    }
  }, [cart]);

  const addToCart = (item: CatalogItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Create a cart item with all necessary properties
        const cartItem: CartItem = {
          id: item.id,
          title: item.title,
          description: item.description,
          longDescription: item.longDescription,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl || item.image || 'https://source.unsplash.com/random/800x600/?business',
          image: item.image,
          features: item.features || [],
          quantity: 1,
          period: item.period
        };
        return [...prevCart, cartItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === itemId 
        ? { ...item, quantity: quantity >= 1 ? quantity : 1 }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart
  };
};
