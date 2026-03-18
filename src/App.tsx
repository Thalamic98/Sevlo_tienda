import { useState, useCallback, useEffect } from 'react';
import { siteConfig, productsConfig } from './config';
import type { Product } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import VideoSection from './sections/VideoSection';
import Products from './sections/Products';
import Features from './sections/Features';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import SkincareQuiz from './sections/SkincareQuiz';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Initialize stock from products config
const initializeStock = () => {
  const stock: Record<number, number> = {};
  productsConfig.products.forEach(product => {
    stock[product.id] = product.stock;
  });
  return stock;
};

function App() {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('sevlo-cart');
        return savedCart ? JSON.parse(savedCart) : [];
      }
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
    return [];
  });

  // Load stock from localStorage or initialize from products
  const [stock, setStock] = useState<Record<number, number>>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedStock = localStorage.getItem('sevlo-stock');
        if (savedStock) {
          return JSON.parse(savedStock);
        }
      }
    } catch (e) {
      console.error('Error loading stock from localStorage:', e);
    }
    return initializeStock();
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('sevlo-cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  // Save stock to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('sevlo-stock', JSON.stringify(stock));
    } catch (e) {
      console.error('Error saving stock to localStorage:', e);
    }
  }, [stock]);

  const handleAddToCart = useCallback((product: Product) => {
    // Check if stock is available
    if (stock[product.id] <= 0) {
      return; // Can't add if no stock
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });

    // Decrease stock
    setStock((prevStock) => ({
      ...prevStock,
      [product.id]: prevStock[product.id] - 1,
    }));
  }, [stock]);

  const handleRemoveFromCart = useCallback((id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      // Return stock
      setStock((prevStock) => ({
        ...prevStock,
        [id]: prevStock[id] + item.quantity,
      }));
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, [cartItems]);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (!currentItem) return;

    const currentQuantity = currentItem.quantity;
    const quantityDiff = quantity - currentQuantity;

    if (quantity === 0) {
      // Return all stock and remove item
      setStock((prevStock) => ({
        ...prevStock,
        [id]: prevStock[id] + currentQuantity,
      }));
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else if (quantityDiff > 0) {
      // Increasing quantity - check stock
      if (stock[id] >= quantityDiff) {
        setStock((prevStock) => ({
          ...prevStock,
          [id]: prevStock[id] - quantityDiff,
        }));
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      }
    } else if (quantityDiff < 0) {
      // Decreasing quantity - return stock
      setStock((prevStock) => ({
        ...prevStock,
        [id]: prevStock[id] - quantityDiff, // quantityDiff is negative, so this adds
      }));
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, [cartItems, stock]);

  const handleClearCart = useCallback(() => {
    // Return all stock
    cartItems.forEach(item => {
      setStock((prevStock) => ({
        ...prevStock,
        [item.id]: prevStock[item.id] + item.quantity,
      }));
    });
    setCartItems([]);
  }, [cartItems]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;

    const phoneNumber = '525551725689';
    
    // Build message
    let message = 'Hola, quiero hacer un pedido a SEVLO:\n';
    let total = 0;
    
    cartItems.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      message += `• ${item.name} x${item.quantity} - $${subtotal.toFixed(2)} MXN\n`;
    });
    
    message += `\nTotal: $${total.toFixed(2)} MXN`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-white" lang={siteConfig.language || undefined}>
      <Navigation
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
      <main>
        <Hero />
        <SubHero />
        <VideoSection />
        <Products onAddToCart={handleAddToCart} stock={stock} />
        <Features />
        <SkincareQuiz onAddToCart={handleAddToCart} stock={stock} />
        <Blog />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
