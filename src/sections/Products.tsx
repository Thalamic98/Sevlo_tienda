import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Check, X, Beaker, Droplets, Sparkles, Info } from 'lucide-react';
import { productsConfig } from '../config';
import type { Product } from '../config';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
  stock: Record<number, number>;
}

const Products = ({ onAddToCart, stock }: ProductsProps) => {
  if (!productsConfig.heading && productsConfig.products.length === 0) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState(productsConfig.categories[0] || 'All');
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const filteredProducts = activeCategory === productsConfig.categories[0]
    ? productsConfig.products
    : productsConfig.products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    if (stock[product.id] <= 0) return;
    
    onAddToCart(product);
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const getStockStatus = (productId: number) => {
    const currentStock = stock[productId] || 0;
    if (currentStock === 0) return { text: 'Agotado', color: 'text-red-500', bgColor: 'bg-red-50' };
    if (currentStock <= 3) return { text: `En stock: ${currentStock} unidades`, color: 'text-orange-500', bgColor: 'bg-orange-50' };
    return { text: `En stock: ${currentStock} unidades`, color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px]">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {productsConfig.tag}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-black mb-6 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {productsConfig.heading}
          </h2>
          <p
            className={`max-w-2xl mx-auto text-[#696969] text-lg transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {productsConfig.description}
          </p>
        </div>

        {/* Category Filter */}
        {productsConfig.categories.length > 0 && (
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {productsConfig.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-sm tracking-wide transition-all duration-300 rounded-full ${
                  activeCategory === category
                    ? 'bg-[#8b6d4b] text-white'
                    : 'bg-[#fafafa] text-[#696969] hover:bg-[#f0f0f0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const stockStatus = getStockStatus(product.id);
            const isOutOfStock = stock[product.id] <= 0;
            
            return (
              <div
                key={product.id}
                className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-[#f0f0f0] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${Math.min(400 + index * 50, 800)}ms` }}
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-[#f8f8f8] cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-product.webp';
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs text-[#8b6d4b] font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>

                  {/* Out of Stock Overlay */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full">
                        Agotado
                      </span>
                    </div>
                  )}

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); openModal(product); }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#8b6d4b] hover:text-white"
                  >
                    <Info size={16} />
                  </button>

                  {/* Add to Cart Button */}
                  {!isOutOfStock && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className={`absolute bottom-4 left-4 right-4 py-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        addedItems.includes(product.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-[#8b6d4b] text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                      }`}
                    >
                      {addedItems.includes(product.id) ? (
                        <>
                          <Check size={18} />
                          {productsConfig.addedToCartText}
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          {productsConfig.addToCartText}
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 
                    className="font-serif text-lg text-black leading-tight cursor-pointer hover:text-[#8b6d4b] transition-colors"
                    onClick={() => openModal(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[#8b6d4b] font-semibold mt-2 text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-[#999] text-sm mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  {/* Stock Status */}
                  <p className={`text-xs mt-2 px-2 py-1 rounded inline-block ${stockStatus.bgColor} ${stockStatus.color}`}>
                    {stockStatus.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#8b6d4b] hover:text-white transition-all duration-300"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="aspect-square md:aspect-auto md:h-full bg-[#f8f8f8] relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {stock[selectedProduct.id] <= 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full">
                      Agotado
                    </span>
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-8">
                {/* Category & Name */}
                <span className="text-sm text-[#8b6d4b] font-medium uppercase tracking-wide">
                  {selectedProduct.category}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-black mt-2 mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="text-[#8b6d4b] font-bold text-2xl mb-6">
                  ${selectedProduct.price.toFixed(2)}
                </p>

                {/* Stock Status */}
                <div className="mb-6">
                  {(() => {
                    const status = getStockStatus(selectedProduct.id);
                    return (
                      <span className={`text-sm px-3 py-1.5 rounded-full ${status.bgColor} ${status.color}`}>
                        {status.text}
                      </span>
                    );
                  })()}
                </div>

                {/* Main Benefit */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={18} className="text-[#8b6d4b]" />
                    <h3 className="font-semibold text-black">Beneficio Principal</h3>
                  </div>
                  <p className="text-[#555] leading-relaxed">
                    {selectedProduct.mainBenefit}
                  </p>
                </div>

                {/* Scientific Info */}
                <div className="mb-6 bg-[#faf8f5] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Beaker size={18} className="text-[#8b6d4b]" />
                    <h3 className="font-semibold text-black">Base Científica</h3>
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed">
                    {selectedProduct.scientificInfo}
                  </p>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets size={18} className="text-[#8b6d4b]" />
                    <h3 className="font-semibold text-black">Ingredientes Clave</h3>
                  </div>
                  <p className="text-[#555] text-sm">
                    {selectedProduct.ingredients}
                  </p>
                </div>

                {/* Skin/Hair Type */}
                {(selectedProduct.skinType || selectedProduct.hairType) && (
                  <div className="mb-6">
                    <span className="text-sm font-medium text-[#8b6d4b]">
                      Ideal para:
                    </span>
                    <p className="text-[#555] text-sm mt-1">
                      {selectedProduct.skinType || selectedProduct.hairType}
                    </p>
                  </div>
                )}

                {/* Features */}
                {selectedProduct.features && (
                  <div className="mb-6">
                    <span className="text-sm font-medium text-[#8b6d4b]">
                      Características:
                    </span>
                    <p className="text-[#555] text-sm mt-1">
                      {selectedProduct.features}
                    </p>
                  </div>
                )}

                {/* Usage */}
                <div className="mb-8">
                  <span className="text-sm font-medium text-[#8b6d4b]">
                    Modo de Uso:
                  </span>
                  <p className="text-[#555] text-sm mt-1">
                    {selectedProduct.usage}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {stock[selectedProduct.id] > 0 ? (
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeModal();
                      }}
                      className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 ${
                        addedItems.includes(selectedProduct.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-[#8b6d4b] text-white hover:bg-[#7a5f42]'
                      }`}
                    >
                      {addedItems.includes(selectedProduct.id) ? (
                        <>
                          <Check size={20} />
                          Agregado
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={20} />
                          Agregar al Carrito
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-4 flex items-center justify-center gap-2 font-medium rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                      Agotado
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
