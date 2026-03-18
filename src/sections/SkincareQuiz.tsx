import { useEffect, useRef, useState } from 'react';
import { Sparkles, ShoppingBag, Check, RefreshCw } from 'lucide-react';
import { productsConfig } from '../config';
import type { Product } from '../config';

interface SkincareQuizProps {
  onAddToCart: (product: Product) => void;
  stock: Record<number, number>;
}

interface Question {
  id: number;
  question: string;
  options: { text: string; value: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cómo describirías tu piel al despertar?",
    options: [
      { text: "Brillosa y con exceso de grasa", value: "oily" },
      { text: "Seca y tirante", value: "dry" },
      { text: "Mixta (grasa en zona T, seca en mejillas)", value: "combination" },
      { text: "Normal, ni muy seca ni muy grasa", value: "normal" },
      { text: "Sensible y reactiva", value: "sensitive" },
    ],
  },
  {
    id: 2,
    question: "¿Cuál es tu principal preocupación?",
    options: [
      { text: "Manchas y tono desigual", value: "spots" },
      { text: "Acné y poros dilatados", value: "acne" },
      { text: "Líneas de expresión y flacidez", value: "aging" },
      { text: "Piel opaca y sin brillo", value: "dull" },
      { text: "Rojeces e irritación", value: "redness" },
    ],
  },
  {
    id: 3,
    question: "¿Qué tipo de rutina prefieres?",
    options: [
      { text: "Rápida y sencilla (2-3 pasos)", value: "simple" },
      { text: "Completa y elaborada (5+ pasos)", value: "complete" },
      { text: "Intermedia, lo justo y necesario", value: "moderate" },
    ],
  },
];

interface Recommendation {
  products: Product[];
  routine: {
    morning: string[];
    night: string[];
    weekly: string[];
  };
}

const SkincareQuiz = ({ onAddToCart, stock }: SkincareQuizProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [addedItems, setAddedItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAddedItems([]);
  };

  const getRecommendations = (): Recommendation => {
    const skinType = answers[1];
    const concern = answers[2];
    const routineType = answers[3];

    const recommendedProducts: Product[] = [];
    const morning: string[] = [];
    const night: string[] = [];
    const weekly: string[] = [];

    // Base recommendations by skin type
    if (skinType === 'oily' || skinType === 'combination') {
      recommendedProducts.push(productsConfig.products.find(p => p.id === 4)!); // Mascarilla Carbón
      recommendedProducts.push(productsConfig.products.find(p => p.id === 7)!); // Serum Nicotinamida
      recommendedProducts.push(productsConfig.products.find(p => p.id === 8)!); // Serum Cúrcuma
      morning.push('Tónico Camelias');
      night.push('Jabón de Leche de Arroz', 'Serum Nicotinamida');
      weekly.push('Mascarilla de Carbón Activado');
    } else if (skinType === 'dry') {
      recommendedProducts.push(productsConfig.products.find(p => p.id === 2)!); // Jabón Leche Arroz
      recommendedProducts.push(productsConfig.products.find(p => p.id === 5)!); // Serum Granada
      recommendedProducts.push(productsConfig.products.find(p => p.id === 9)!); // Tónico Camelias
      morning.push('Tónico Camelias', 'Serum Granada');
      night.push('Jabón de Leche de Arroz', 'Serum Granada');
    } else if (skinType === 'sensitive') {
      recommendedProducts.push(productsConfig.products.find(p => p.id === 2)!); // Jabón Leche Arroz
      recommendedProducts.push(productsConfig.products.find(p => p.id === 9)!); // Tónico Camelias
      recommendedProducts.push(productsConfig.products.find(p => p.id === 3)!); // Mascarilla Aguacate
      morning.push('Tónico Camelias');
      night.push('Jabón de Leche de Arroz');
      weekly.push('Mascarilla de Aguacate (Ojos)');
    } else {
      // Normal skin
      recommendedProducts.push(productsConfig.products.find(p => p.id === 2)!); // Jabón Leche Arroz
      recommendedProducts.push(productsConfig.products.find(p => p.id === 5)!); // Serum Granada
      recommendedProducts.push(productsConfig.products.find(p => p.id === 6)!); // Serum Papaya
      morning.push('Tónico Camelias', 'Serum Granada');
      night.push('Jabón de Leche de Arroz', 'Serum Papaya & Vit C');
    }

    // Add concern-specific products
    if (concern === 'spots') {
      if (!recommendedProducts.find(p => p.id === 6)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 6)!); // Serum Papaya
      }
      if (!recommendedProducts.find(p => p.id === 7)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 7)!); // Serum Nicotinamida
      }
      morning.push('Serum Papaya & Vit C');
      night.push('Serum Nicotinamida');
    } else if (concern === 'acne') {
      if (!recommendedProducts.find(p => p.id === 4)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 4)!); // Mascarilla Carbón
      }
      if (!recommendedProducts.find(p => p.id === 8)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 8)!); // Serum Cúrcuma
      }
      night.push('Serum Cúrcuma');
      weekly.push('Mascarilla de Carbón Activado');
    } else if (concern === 'aging') {
      if (!recommendedProducts.find(p => p.id === 5)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 5)!); // Serum Granada
      }
      if (!recommendedProducts.find(p => p.id === 3)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 3)!); // Mascarilla Aguacate
      }
      morning.push('Serum Granada');
      night.push('Serum Granada');
      weekly.push('Mascarilla de Aguacate (Ojos)');
    } else if (concern === 'dull') {
      if (!recommendedProducts.find(p => p.id === 6)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 6)!); // Serum Papaya
      }
      morning.push('Serum Papaya & Vit C');
    } else if (concern === 'redness') {
      if (!recommendedProducts.find(p => p.id === 9)) {
        recommendedProducts.push(productsConfig.products.find(p => p.id === 9)!); // Tónico Camelias
      }
      morning.push('Tónico Camelias');
    }

    // Simplify routine if user wants simple routine
    if (routineType === 'simple') {
      return {
        products: recommendedProducts.slice(0, 3),
        routine: {
          morning: morning.slice(0, 2),
          night: night.slice(0, 2),
          weekly: weekly.slice(0, 1),
        },
      };
    }

    return {
      products: [...new Set(recommendedProducts)].filter(Boolean),
      routine: {
        morning: [...new Set(morning)],
        night: [...new Set(night)],
        weekly: [...new Set(weekly)],
      },
    };
  };

  const handleAddToCart = (product: Product) => {
    if (stock[product.id] <= 0) return;
    onAddToCart(product);
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  const recommendations = showResults ? getRecommendations() : null;

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8]"
    >
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            RUTINA PERSONALIZADA
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl text-black mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Descubre tu rutina ideal
          </h2>
          <p
            className={`text-[#696969] text-lg max-w-xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Responde 3 preguntas rápidas y te recomendaremos los productos SEVLO perfectos para tu tipo de piel.
          </p>
        </div>

        {/* Quiz Container */}
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {!showResults ? (
            <div className="p-8 md:p-12">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-[#696969] mb-2">
                  <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8b6d4b] transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="font-serif text-2xl md:text-3xl text-black mb-8">
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 md:p-5 text-left border-2 border-[#f0f0f0] rounded-xl hover:border-[#8b6d4b] hover:bg-[#faf8f5] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border-2 border-[#d0d0d0] group-hover:border-[#8b6d4b] flex items-center justify-center transition-colors">
                        <div className="w-3 h-3 rounded-full bg-[#8b6d4b] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-lg text-[#333] group-hover:text-black">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12">
              {/* Results Header */}
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#8b6d4b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-white" />
                </div>
                <h3 className="font-serif text-3xl text-black mb-2">
                  ¡Tu rutina personalizada!
                </h3>
                <p className="text-[#696969]">
                  Basado en tus respuestas, estos productos son perfectos para ti
                </p>
              </div>

              {/* Recommended Routine */}
              <div className="bg-[#faf8f5] rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#8b6d4b]" />
                  Tu rutina diaria
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#8b6d4b] mb-2">🌅 Mañana</p>
                    <ul className="text-sm text-[#555] space-y-1">
                      {recommendations?.routine.morning.map((step, i) => (
                        <li key={i}>• {step}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#8b6d4b] mb-2">🌙 Noche</p>
                    <ul className="text-sm text-[#555] space-y-1">
                      {recommendations?.routine.night.map((step, i) => (
                        <li key={i}>• {step}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#8b6d4b] mb-2">📅 1x semana</p>
                    <ul className="text-sm text-[#555] space-y-1">
                      {recommendations?.routine.weekly.map((step, i) => (
                        <li key={i}>• {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommended Products */}
              <h4 className="font-semibold text-black mb-4">Productos recomendados</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {recommendations?.products.map((product) => {
                  const isOutOfStock = stock[product.id] <= 0;
                  return (
                    <div key={product.id} className="bg-white border border-[#f0f0f0] rounded-xl overflow-hidden">
                      <div className="aspect-square bg-[#f8f8f8] relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                              Agotado
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h5 className="font-serif text-sm text-black line-clamp-1">{product.name}</h5>
                        <p className="text-[#8b6d4b] font-semibold text-sm mt-1">${product.price.toFixed(2)}</p>
                        {!isOutOfStock ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full mt-3 py-2 flex items-center justify-center gap-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                              addedItems.includes(product.id)
                                ? 'bg-green-600 text-white'
                                : 'bg-[#8b6d4b] text-white hover:bg-[#7a5f42]'
                            }`}
                          >
                            {addedItems.includes(product.id) ? (
                              <>
                                <Check size={14} />
                                Agregado
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={14} />
                                Agregar
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full mt-3 py-2 text-xs font-medium rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
                          >
                            Agotado
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Restart Button */}
              <button
                onClick={handleRestart}
                className="w-full py-4 border-2 border-[#8b6d4b] text-[#8b6d4b] font-medium rounded-xl hover:bg-[#8b6d4b] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Volver a hacer el quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkincareQuiz;
