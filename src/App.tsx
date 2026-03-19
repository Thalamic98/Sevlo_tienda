import { useState, useCallback, useEffect } from 'react';
import { siteConfig, productsConfig } from './config';
import type { Product } from './config';
import { db, analytics } from './lib/firebase';
import { logEvent } from 'firebase/analytics';
import { 
  collection, 
  doc, 
  onSnapshot, 
  updateDoc, 
  writeBatch,
  increment
} from 'firebase/firestore';
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

  const [stock, setStock] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  // Sync Products to Firestore (Initial Seed) and Listen for Updates
  useEffect(() => {
    const syncDb = async () => {
      try {
        console.log('Connecting to Firestore products collection...');
        const productsCol = collection(db, 'products');
        
        const unsubscribe = onSnapshot(productsCol, (snap) => {
          console.log(`Firestore Update received! Count: ${snap.size}`);
          const newStock: Record<number, number> = {};
          
          if (snap.empty) {
            console.warn('The products collection is EMPTY in Firestore!');
            // Only use fallback if absolutely necessary, but log it
            productsConfig.products.forEach(p => newStock[p.id] = p.stock);
          } else {
            snap.forEach((doc) => {
              const data = doc.data();
              newStock[Number(doc.id)] = data.stock;
              console.log(`Product ${doc.id}: ${data.stock} units`);
            });
          }
          
          setStock(newStock);
          setLoading(false);
        }, (error) => {
          console.error('Firestore real-time error:', error);
          setLoading(false);
        });

        return unsubscribe;
      } catch (err) {
        console.error('Firestore Connection Error:', err);
        setLoading(false);
      }
    };

    const unsubscribePromise = syncDb();
    return () => {
      unsubscribePromise.then(unsub => unsub?.()).catch(console.error);
    };
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('sevlo-cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const handleAddToCart = useCallback((product: Product) => {
    // Check if local UI stock is available
    if (stock[product.id] <= 0) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        image: product.image 
      }];
    });

    // Update Firestore
    const docRef = doc(db, 'products', product.id.toString());
    updateDoc(docRef, {
      stock: increment(-1)
    }).catch(err => console.error('Error updating stock:', err));

    // LOG EVENT: Add to Cart
    if (analytics) {
      logEvent(analytics as any, 'add_to_cart', {
        item_id: product.id,
        item_name: product.name,
        currency: 'MXN',
        value: product.price
      });
    }
  }, [stock]);

  const handleRemoveFromCart = useCallback((id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      // Return stock to Firestore
      const docRef = doc(db, 'products', id.toString());
      updateDoc(docRef, {
        stock: increment(item.quantity)
      }).catch(err => console.error('Error returning stock:', err));
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
      const docRef = doc(db, 'products', id.toString());
      updateDoc(docRef, {
        stock: increment(currentQuantity)
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else if (quantityDiff > 0) {
      // Increasing quantity - check if stock can handle it
      if (stock[id] >= quantityDiff) {
        const docRef = doc(db, 'products', id.toString());
        updateDoc(docRef, {
          stock: increment(-quantityDiff)
        });
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      }
    } else if (quantityDiff < 0) {
      // Decreasing quantity - return stock
      const docRef = doc(db, 'products', id.toString());
      updateDoc(docRef, {
        stock: increment(-quantityDiff) // quantityDiff is negative
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, [cartItems, stock]);

  const handleClearCart = useCallback(() => {
    // Return all stock to Firestore
    const batch = writeBatch(db);
    cartItems.forEach(item => {
      const docRef = doc(db, 'products', item.id.toString());
      batch.update(docRef, {
        stock: increment(item.quantity)
      });
    });
    batch.commit().catch((err: any) => console.error('Error clearing cart:', err));
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
    
    // LOG EVENT: Begin Checkout / Contact
    if (analytics) {
      logEvent(analytics as any, 'begin_checkout', {
        currency: 'MXN',
        value: total,
        items: cartItems.map(item => ({ item_id: item.id, item_name: item.name }))
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#8b6d4b] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-serif text-xl">Cargando Tienda...</p>
        </div>
      </div>
    );
  }

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
