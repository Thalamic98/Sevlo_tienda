// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "SevLo | Cosmética Natural",
  description: "Cosmética para piel y cabello con ingredientes naturales. Para piel sensible, cabellos maltratados y quienes buscan productos sin químicos agresivos.",
  language: "es",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "SEVLO",
  menuLinks: [
    { label: "Inicio", href: "#hero" },
    { label: "Tendencias Virales", href: "#products" },
    { label: "Skincare", href: "#products" },
    { label: "Cabello", href: "#products" },
    { label: "Nuestra Historia", href: "#about" },
    { label: "Contacto", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com/sevlo" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com/sevlo" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com/sevlo" },
  ],
  searchPlaceholder: "Buscar productos...",
  cartEmptyText: "Tu carrito está vacío",
  cartCheckoutText: "Pedir por WhatsApp",
  continueShoppingText: "Seguir comprando",
  menuBackgroundImage: "/images/menu-bg.webp",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "COSMÉTICA NATURAL",
  title: "Belleza que\nrespeta tu piel\ny el planeta",
  ctaPrimaryText: "Ver Productos",
  ctaPrimaryTarget: "#products",
  ctaSecondaryText: "Conócenos",
  ctaSecondaryTarget: "#about",
  backgroundImage: "/images/hero-bg.webp",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "NUESTRA FILOSOFÍA",
  heading: "Ingredientes naturales, resultados reales",
  bodyParagraphs: [
    "En SevLo creemos en la transparencia: cada producto se prueba en nuestra propia familia antes de llegar a ti. Apostamos por cosmética consciente que respeta tanto tu piel como el planeta.",
    "Cada frasco lleva el compromiso de ofrecerte la mejor calidad a un precio justo. Sin químicos agresivos, solo lo que la naturaleza nos brinda."
  ],
  linkText: "Descubre más",
  linkTarget: "#about",
  image1: "/images/subhero-1.webp",
  image2: "/images/subhero-2.webp",
  stats: [
    { value: 15, suffix: "+", label: "Productos Naturales" },
    { value: 100, suffix: "%", label: "Ingredientes Orgánicos" },
    { value: 50, suffix: "+", label: "Clientes Satisfechos" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "TENDENCIAS VIRALES",
  heading: "Lo más visto en redes",
  bodyParagraphs: [
    "Descubre los productos que están revolucionando el cuidado natural de la piel y el cabello. Desde nuestro viral Jabón de Leche de Arroz hasta el Perfume de Feromonas que potencia tu atracción natural.",
    "Cada producto es cuidadosamente seleccionado con ingredientes de la más alta calidad y libres de químicos agresivos."
  ],
  ctaText: "Ver Tendencias",
  ctaTarget: "#products",
  backgroundImage: "/images/video-section-bg.webp",
};

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  shortDescription: string;
  mainBenefit: string;
  scientificInfo: string;
  ingredients: string;
  usage: string;
  skinType?: string;
  hairType?: string;
  features?: string;
  stock: number;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "NUESTRA COLECCIÓN",
  heading: "Productos Naturales",
  description: "Explora nuestra línea de cosmética natural diseñada para cuidar tu piel y cabello con los mejores ingredientes que nos brinda la naturaleza.",
  viewAllText: "Ver Todos",
  addToCartText: "Agregar",
  addedToCartText: "¡Agregado!",
  categories: ["Todos", "Tendencias Virales", "Skincare", "Cabello"],
  products: [
    // Tendencias Virales
    {
      id: 1,
      name: "Perfume de Feromonas",
      price: 45,
      category: "Tendencias Virales",
      image: "/images/products/perfume-feromonas.webp",
      shortDescription: "Fragancia seductora que potencia tu atractivo natural",
      mainBenefit: "Fragancia seductora que potencia atractivo natural y confianza.",
      scientificInfo: "Las feromonas naturales estimulan receptores olfativos, liberan endorfinas y mejoran autoestima según estudios de neurociencia olfativa.",
      ingredients: "Feromonas naturales • Esencias florales-frutales • Base sin alcohol",
      usage: "Muñecas, cuello, orejas. Retoque cada 4h.",
      features: "Roll-on práctico • Aroma floral-frutal 8h • Sin alcohol irritante",
      stock: 15
    },
    {
      id: 2,
      name: "Jabón de Leche de Arroz",
      price: 15,
      category: "Tendencias Virales",
      image: "/images/products/jabon-leche-arroz.webp",
      shortDescription: "Aclarante natural que unifica el tono de la piel",
      mainBenefit: "Aclarante natural + unifica tono.",
      scientificInfo: "Inhibe melanina 23% (estudios japoneses), vitamina B3 repara barrera cutánea, glicerina hidrata 48h.",
      ingredients: "Leche Arroz • Vit B3 • Glicerina orgánica",
      usage: "Espuma 1min rostro/cuerpo, enjuague.",
      skinType: "Todo tipo de piel",
      stock: 20
    },
    {
      id: 3,
      name: "Mascarilla Aguacate (Ojos)",
      price: 50,
      category: "Tendencias Virales",
      image: "/images/products/mascarilla-aguacate.webp",
      shortDescription: "Reduce bolsas y elimina signos de fatiga",
      mainBenefit: "Reduce bolsas 35% + elimina fatiga.",
      scientificInfo: "Ácidos grasos aguacate regeneran colágeno, vit E antioxidante 72h, colágeno hidrolizado rellena arrugas.",
      ingredients: "Aguacate orgánico • Vit E • Colágeno hidrolizado",
      usage: "Parches 15-20min, masajear suero.",
      skinType: "Todo tipo de piel",
      stock: 12
    },
    {
      id: 4,
      name: "Mascarilla Carbón Activado",
      price: 10,
      category: "Tendencias Virales",
      image: "/images/products/mascarilla-carbon.webp",
      shortDescription: "Limpieza profunda de poros y puntos negros",
      mainBenefit: "Limpieza poros + elimina puntos negros.",
      scientificInfo: "Carbón bambú adsorbe 99.9% toxinas, extractos astringentes contraen poros 28%.",
      ingredients: "Carbón bambú • Extractos astringentes",
      usage: "Capa zona T, secar 20min, jalar.",
      skinType: "Piel grasa y mixta",
      stock: 25
    },
    {
      id: 5,
      name: "Serum Granada",
      price: 20,
      category: "Tendencias Virales",
      image: "/images/products/serum-granada.webp",
      shortDescription: "Antioxidante potente antiedad",
      mainBenefit: "Antioxidante antiedad.",
      scientificInfo: "Punicalaginas granada x2 potente vit C, ácido hialurónico hidrata 24 capas piel.",
      ingredients: "Granada roja • Ácido hialurónico",
      usage: "3-5 gotas AM/PM.",
      skinType: "Todo tipo de piel",
      stock: 18
    },
    {
      id: 6,
      name: "Serum Papaya & Vit C",
      price: 35,
      category: "Tendencias Virales",
      image: "/images/products/serum-papaya.webp",
      shortDescription: "Ilumina y reduce poros visiblemente",
      mainBenefit: "Ilumina + poros.",
      scientificInfo: "Papaína exfolia 27% más suave AHA, vit C estabilizada +40% luminosidad.",
      ingredients: "Papaya • Vitamina C concentrada",
      usage: "Toques glow natural.",
      skinType: "Piel opaca y con manchas",
      stock: 14
    },
    // Skincare
    {
      id: 7,
      name: "Serum Nicotinamida",
      price: 30,
      category: "Skincare",
      image: "/images/products/serum-nicotinamida.webp",
      shortDescription: "Reduce poros, manchas e inflamación",
      mainBenefit: "Reduce poros 25%, manchas 35%, inflamación 68%.",
      scientificInfo: "Niacinamida 5% reduce poros 25%, manchas 35%, inflamación 68% (estudio 12 semanas).",
      ingredients: "Niacinamida 5% • Ácido hialurónico • Extractos calmantes",
      usage: "3-4 gotas AM/PM.",
      skinType: "Manchas, poros, tono desigual",
      stock: 16
    },
    {
      id: 8,
      name: "Serum Cúrcuma",
      price: 30,
      category: "Skincare",
      image: "/images/products/serum-curcuma.webp",
      shortDescription: "Antiinflamatorio e iluminador natural",
      mainBenefit: "Antiinflamatorio 84% eficaz.",
      scientificInfo: "Curcumina antiinflamatorio 84% eficaz, vit C estabilizada ilumina 40%, jojoba regula sebo.",
      ingredients: "Cúrcuma orgánica • Vit C • Jojoba",
      usage: "2-3 gotas PM.",
      skinType: "Opaca, acné",
      stock: 10
    },
    {
      id: 9,
      name: "Tónico Camelias",
      price: 65,
      category: "Skincare",
      image: "/images/products/tonico-camelias.webp",
      shortDescription: "Calma y protege piel sensible",
      mainBenefit: "Antioxidantes x3 retinol.",
      scientificInfo: "Polifenoles camelias antioxidantes x3 retinol, agua rosas calma irritación 72h, manzanilla antiinflamatoria.",
      ingredients: "Hidrolato camelias • Agua rosas • Manzanilla",
      usage: "Rociar pre-serum.",
      skinType: "Sensible",
      stock: 8
    },
    // Cabello
    {
      id: 10,
      name: "Shampoo Romero Rapunzel",
      price: 65,
      category: "Cabello",
      image: "/images/products/shampoo-romero.webp",
      shortDescription: "Fortalece raíz y reduce caída",
      mainBenefit: "Romero +200% microcirculación cuero cabelludo.",
      scientificInfo: "Romero +200% microcirculación cuero cabelludo (estudio vs minoxidil), biotina fortalece folículos.",
      ingredients: "Romero • Biotina • Aceites estimulantes",
      usage: "Masaje 2-3min, 2-3x/semana.",
      hairType: "Caída",
      stock: 20
    },
    {
      id: 11,
      name: "Shampoo Rizos Rapunzel",
      price: 65,
      category: "Cabello",
      image: "/images/products/shampoo-rizos.webp",
      shortDescription: "Definición y crecimiento para rizos",
      mainBenefit: "7 hierbas fortalecen cutícula 35%.",
      scientificInfo: "7 hierbas fortalecen cutícula 35%, queratina vegetal sella puntas.",
      ingredients: "7 hierbas • Queratina vegetal • Proteínas trigo",
      usage: "3min, frecuente.",
      hairType: "Rizado",
      stock: 15
    },
    {
      id: 12,
      name: "Acondicionador Rizos",
      price: 65,
      category: "Cabello",
      image: "/images/products/acondicionador-rizos.webp",
      shortDescription: "Hidratación profunda sin frizz",
      mainBenefit: "Karité sella humedad 48h.",
      scientificInfo: "Karité sella humedad 48h, argán penetra cutícula, pantenol +30% elasticidad.",
      ingredients: "Karité • Argán • Pantenol",
      usage: "Medios-puntas 2-3min.",
      hairType: "Frizz",
      stock: 12
    },
    {
      id: 13,
      name: "Tónico Rizos Rapunzel",
      price: 65,
      category: "Cabello",
      image: "/images/products/tonico-rizos.webp",
      shortDescription: "Define y desenreda sin frizz",
      mainBenefit: "Linaza crea gel natural.",
      scientificInfo: "Linaza crea gel natural, aloe hidrata sin peso, glicerina humecta.",
      ingredients: "Linaza • Aloe vera • Glicerina",
      usage: "Scrunch cabello húmedo.",
      hairType: "Definición",
      stock: 10
    },
    {
      id: 14,
      name: "Cera Capilar Barra",
      price: 30,
      category: "Cabello",
      image: "/images/products/cera-capilar.webp",
      shortDescription: "Fijación natural para baby hairs",
      mainBenefit: "Cera vegetal sin residuos.",
      scientificInfo: "Cera vegetal sin residuos, fijación natural 12h.",
      ingredients: "Cera vegetal • Aceites naturales",
      usage: "Deslizar baby hairs.",
      hairType: "Baby hairs",
      features: "Formato bolsillo • No pegajosa • Fijación 12h",
      stock: 22
    },
  ],
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "Leaf",
      title: "100% Natural",
      description: "Ingredientes orgánicos sin químicos agresivos ni parabenos."
    },
    {
      icon: "Heart",
      title: "Cruelty Free",
      description: "Ningún producto es testeado en animales."
    },
    {
      icon: "ShieldCheck",
      title: "Calidad Garantizada",
      description: "Cada producto es probado antes de llegar a tus manos."
    },
    {
      icon: "Truck",
      title: "Entregas en CDMX",
      description: "Entregas personales en puntos céntricos y estaciones de metro."
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "BLOG",
  heading: "Consejos de Belleza Natural",
  viewAllText: "Ver todos los artículos",
  readMoreText: "Leer más",
  posts: [
    {
      id: 1,
      title: "5 beneficios del romero para el cabello",
      date: "15 Feb 2026",
      image: "/images/blog/romero-cabello.webp",
      excerpt: "Descubre por qué el romero es el ingrediente secreto para un cabello fuerte y saludable.",
      content: [
        "🌿 5 BENEFICIOS DEL ROMERO PARA EL CABELLO (CIENCIA REAL)",
        "",
        "1️⃣ CRECIMIENTO +200% vs minoxidil",
        "Estudio: romero mejora microcirculación folículos igual fármacos.",
        "",
        "2️⃣ REDUCE CAÍDA 44%",
        "Ácido rosmarínico fortalece raíces, previene alopecia.",
        "",
        "3️⃣ ELIMINA CASPA",
        "Propiedades antifúngicas limpian cuero cabelludo.",
        "",
        "4️⃣ BRILLO NATURAL",
        "Antioxidantes sellan cutícula capilar.",
        "",
        "5️⃣ REGULACIÓN SEBO",
        "Cabello menos graso sin resecar.",
        "",
        "✅ Shampoo Romero Rapunzel: extracto concentrado + biotina",
        "Resultados visibles: 2 semanas"
      ]
    },
    {
      id: 2,
      title: "Rutina skincare con ingredientes naturales",
      date: "10 Feb 2026",
      image: "/images/blog/rutina-skincare.webp",
      excerpt: "Guía paso a paso para una rutina de cuidado facial 100% natural.",
      content: [
        "🌸 RUTINA SKINCARE NATURAL 100% EFECTIVA",
        "",
        "MAÑANA (Glow natural):",
        "1. Tónico Camelias (hidratación ligera)",
        "2. Serum Granada (antioxidante antiedad)",
        "3. Serum Papaya VitC (luminosidad)",
        "",
        "NOCHE (Reparación profunda):",
        "1. Jabón Leche Arroz (limpieza suave)",
        "2. Serum Nicotinamida (manchas/poros)",
        "3. Serum Cúrcuma (acné/inflamación)",
        "",
        "1x SEMANA:",
        "• Mascarilla Carbón (poros limpios)",
        "• Mascarilla Aguacate (contorno ojos)",
        "",
        "RESULTADO: Piel uniforme, hidratada, radiante en 21 días."
      ]
    },
    {
      id: 3,
      title: "El poder de la leche de arroz para tu piel",
      date: "5 Feb 2026",
      image: "/images/blog/leche-arroz.webp",
      excerpt: "Conoce los secretos detrás de este ingrediente viral asiático.",
      content: [
        "🥛 LECHE DE ARROZ: SECRETO JAPONÉS PARA PIEL RADIANTE",
        "",
        "🔬 CIENCIA DETRÁS:",
        "• Ácido férulico → inhibe melanina 23%",
        "• Aminoácidos arroz → hidratan 48h",
        "• Vitamina B3 → repara barrera cutánea",
        "• Ácido láctico → exfolia suavemente",
        "",
        "BENEFICIOS:",
        "✅ Manchas atenuadas (4 semanas)",
        "✅ Tono uniforme",
        "✅ Textura sedosa",
        "✅ Piel sensible OK",
        "",
        "Tradición milenaria + estudios clínicos = Jabón Leche Arroz SEVLO",
        "¡Piel de geisha natural!"
      ]
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "PREGUNTAS FRECUENTES",
  heading: "¿Tienes dudas?",
  ctaText: "Contáctanos para más información",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "¿Cómo hago un pedido?",
      answer: "Es muy sencillo: selecciona los productos que deseas, agrégalos al carrito y haz clic en 'Pedir por WhatsApp'. Te redirigiremos directamente a nuestro chat con tu lista de productos lista para enviar."
    },
    {
      id: 2,
      question: "¿Cuáles son los métodos de pago?",
      answer: "Aceptamos transferencia bancaria y efectivo en entrega. Una vez confirmado tu pedido por WhatsApp, te indicaremos los datos para el pago."
    },
    {
      id: 3,
      question: "¿Dónde hacen las entregas?",
      answer: "Realizamos entregas personales en puntos céntricos de la Ciudad de México y estaciones de metro principales. Coordina tu punto de entrega al hacer tu pedido."
    },
    {
      id: 4,
      question: "¿Los productos son aptos para piel sensible?",
      answer: "Sí, todos nuestros productos están formulados con ingredientes naturales suaves. Sin embargo, recomendamos hacer una prueba en una pequeña área de piel antes de usar cualquier producto nuevo."
    },
    {
      id: 5,
      question: "¿Cuánto duran los productos?",
      answer: "Nuestros productos tienen una vida útil de 6 a 12 meses. Al ser naturales y libres de conservantes químicos fuertes, recomendamos usarlos dentro de los primeros 6 meses para obtener los mejores resultados."
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "NUESTRA HISTORIA",
      heading: "¿Quiénes somos?",
      paragraphs: [
        "SEVLO es la marca que se interesa en tu belleza y tu satisfacción, contamos con los productos de la más alta calidad para tu cuidado personal.",
        "Creemos en la transparencia: cada producto se prueba en nuestra propia familia antes de llegar a ti. Apostamos por cosmética consciente que respeta tanto tu piel como el planeta.",
        "Cada frasco lleva el compromiso de ofrecerte la mejor calidad a un precio justo."
      ],
      quote: "",
      attribution: "",
      image: "/images/about-1.webp",
      backgroundColor: "#f7f7f7",
      textColor: "#333333",
    },
    {
      tag: "TESTIMONIOS",
      heading: "Lo que dicen nuestros clientes",
      paragraphs: [],
      quote: "Mi cabello es rizado y he utilizado los productos Rapunzel Curly y mi cabello se ve mucho más saludable. ¡Los recomiendo totalmente!",
      attribution: "— Uriel M., Polanco",
      image: "/images/about-2.webp",
      backgroundColor: "#8b6d4b",
      textColor: "#ffffff",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "¿Tienes preguntas?",
  description: "Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.",
  locationLabel: "Ubicación",
  location: "Ciudad de México, México",
  emailLabel: "Email",
  email: "hola@sevlo.com",
  phoneLabel: "WhatsApp",
  phone: "+52 55 5172 5689",
  formFields: {
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "¿En qué podemos ayudarte?",
  },
  submitText: "Enviar Mensaje",
  submittingText: "Enviando...",
  submittedText: "¡Enviado!",
  successMessage: "Gracias por contactarnos. Te responderemos pronto.",
  backgroundImage: "/images/contact-bg.webp",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "SEVLO",
  brandDescription: "Cosmética natural para piel y cabello. Ingredientes orgánicos, resultados reales.",
  newsletterHeading: "Suscríbete",
  newsletterDescription: "Recibe consejos de belleza natural y promociones exclusivas.",
  newsletterPlaceholder: "tu@email.com",
  newsletterButtonText: "Suscribirme",
  newsletterSuccessText: "¡Gracias por suscribirte!",
  linkGroups: [
    {
      title: "Productos",
      links: [
        { label: "Tendencias Virales", href: "#products" },
        { label: "Skincare", href: "#products" },
        { label: "Cabello", href: "#products" },
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Nuestra Historia", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Contacto", href: "#contact" },
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Preguntas Frecuentes", href: "#faq" },
        { label: "Envíos", href: "#" },
        { label: "Términos y Condiciones", href: "#" },
      ]
    },
  ],
  legalLinks: [
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" },
  ],
  copyrightText: "© 2026 SEVLO. Ciudad de México.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com/sevlo" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com/sevlo" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com/sevlo" },
  ],
};
