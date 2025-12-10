
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button, Input, Section, SectionTitle } from './components/UI';
import { MOCK_PRODUCTS, MOCK_ARTICLES } from './constants';
import { Product, CartItem, PaymentMethod, MobileProvider } from './types';
import { Play, ArrowRight, Star, Smartphone, Check, BookOpen, Film as FilmIcon, MapPin, Mail, Phone, Clock, Truck, ShieldCheck, RefreshCw, Heart, AlertCircle } from 'lucide-react';
import { getStylingAdvice } from './services/geminiService';
import { fetchProducts, fetchProductById, fetchRecommendations, likeProduct, processPayment } from './services/api';

// --- PAGE COMPONENTS ---

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gray-900">
         <img 
            src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ebony/90" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 animate-fade-in">
        <h2 className="text-white font-sans text-xs md:text-sm uppercase tracking-[0.4em] mb-6">Est. 2026 &bull; Kigali</h2>
        <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-9xl font-light mb-8 leading-none">
          Where Culture<br />Becomes Couture
        </h1>
        <p className="text-smoke/80 font-light max-w-lg mb-12 text-lg italic font-serif">
          "Elegance is not about being noticed, it’s about being remembered."
        </p>
        <Link to="/shop">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Explore Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface ProductListProps {
  category?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const [allProducts, recs] = await Promise.all([
        fetchProducts(),
        fetchRecommendations(category) 
      ]);

      if (category) {
        const filtered = allProducts.filter(p => p.category === category);
        setProducts(filtered);
      } else {
        setProducts(allProducts);
      }

      setRecommendations(recs);
      setLoading(false);
    };
    loadData();
  }, [category]);

  const toggleLike = async (e: React.MouseEvent, id: string) => {
    e.preventDefault(); 
    if (likedItems.includes(id)) {
       setLikedItems(prev => prev.filter(item => item !== id));
    } else {
       setLikedItems(prev => [...prev, id]);
       await likeProduct(id); 
    }
  };

  const getTitle = () => {
    switch (category) {
      case 'men': return 'Men\'s Collection';
      case 'women': return 'Women\'s Collection';
      case 'accessories': return 'Accessories';
      default: return 'The Collection';
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="flex justify-center items-center h-64">
           <div className="w-12 h-12 border-4 border-champagne border-t-gold rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  return (
    <div className="pt-20">
       {recommendations.length > 0 && !category && (
          <Section className="pb-0">
             <div className="mb-12 text-center">
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-gold dark:text-antique mb-2 block">Curated For You</span>
                <h2 className="font-serif text-3xl md:text-4xl">Trending & Recommended</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recommendations.map(product => (
                   <Link to={`/product/${product.id}`} key={product.id} className="group relative">
                      <div className="relative overflow-hidden aspect-[3/4] mb-4">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute top-2 right-2 bg-gold/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            Most Loved
                         </div>
                      </div>
                      <h3 className="font-serif text-xl">{product.name}</h3>
                      <p className="text-sm opacity-60">${product.price}</p>
                   </Link>
                ))}
             </div>
             <div className="w-full h-px bg-shadow/10 dark:bg-smoke/10 mt-20"></div>
          </Section>
       )}

       <Section>
         <SectionTitle subtitle={category ? "Selection" : "Latest Arrivals"}>{getTitle()}</SectionTitle>
         {products.length === 0 ? (
           <div className="text-center py-20 opacity-60">
             <p className="font-serif text-xl">New pieces arriving soon for this collection.</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map(product => (
                 <div key={product.id} className="group cursor-pointer relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <button 
                          onClick={(e) => toggleLike(e, product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white z-20"
                        >
                          <Heart size={18} fill={likedItems.includes(product.id) ? "white" : "none"} />
                        </button>

                        {product.isNew && (
                          <span className="absolute top-4 left-4 bg-white/90 text-black text-[10px] uppercase tracking-widest px-2 py-1">
                            New
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-serif text-2xl group-hover:text-gold transition-colors">{product.name}</h3>
                        <span className="text-sm font-medium opacity-60">${product.price}</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest opacity-50 mt-1">{product.category}</p>
                    </Link>
                 </div>
              ))}
           </div>
         )}
      </Section>
    </div>
  );
};

const ProductDetail = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [stylingTip, setStylingTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      if (!id) return;
      const data = await fetchProductById(id);
      setProduct(data || null);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAskStylist = async () => {
    if (!product) return;
    setLoadingTip(true);
    const tip = await getStylingAdvice(product.name);
    setStylingTip(tip);
    setLoadingTip(false);
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover aspect-[4/5]" />
          {product.secondaryImage && (
            <img src={product.secondaryImage} alt={`${product.name} detail`} className="w-full h-auto object-cover aspect-[4/5]" />
          )}
        </div>

        <div className="lg:sticky lg:top-32 h-fit">
          <span className="text-xs uppercase tracking-[0.2em] text-gold mb-2 block">{product.category}</span>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">{product.name}</h1>
          <p className="text-2xl font-light mb-8">${product.price}</p>
          
          <div className="border-t border-b border-shadow/10 dark:border-smoke/10 py-8 mb-8">
            <p className="text-lg leading-relaxed opacity-80 font-serif italic mb-6">
              {product.description}
            </p>
            
            {!stylingTip ? (
               <button 
                  onClick={handleAskStylist}
                  disabled={loadingTip}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold hover:text-shadow dark:hover:text-smoke transition-colors"
               >
                  <Star size={14} />
                  {loadingTip ? "Consulting Stylist..." : "Ask AI Stylist how to wear this"}
               </button>
            ) : (
              <div className="bg-champagne/30 dark:bg-charcoal p-4 border-l-2 border-gold animate-fade-in">
                <p className="font-serif italic text-sm opacity-90">"{stylingTip}"</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            <Button onClick={() => addToCart(product)} fullWidth>Add to Cart</Button>
            <button 
              onClick={() => likeProduct(product.id)}
              className="p-4 border border-shadow/20 dark:border-smoke/20 hover:bg-shadow hover:text-white dark:hover:bg-smoke dark:hover:text-black transition-colors"
            >
              <Heart size={20} />
            </button>
          </div>
          
          <div className="space-y-4 text-xs uppercase tracking-widest opacity-60">
             <p>Free Shipping Worldwide</p>
             <p>Authenticity Guaranteed</p>
             <p>Made in Rwanda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Story = () => {
  return (
    <>
      <div className="h-[70vh] bg-cocoa relative flex items-center justify-center overflow-hidden">
         <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply" alt="Story BG" />
         <div className="relative z-10 text-center max-w-2xl px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-champagne mb-6">The Soul of LaFleur</h1>
            <p className="text-white/80 text-lg md:text-xl font-light">Weaving the threads of history into the fabric of the future.</p>
         </div>
      </div>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div>
              <h3 className="font-serif text-4xl mb-6">A Tale of Two Cities</h3>
              <p className="mb-6 leading-relaxed opacity-80">
                CoutureLaFleur was born from a desire to bridge the gap between the haute couture salons of Paris and the vibrant, artistic energy of Kigali. 
                Our founder believed that luxury is not just about material, but about the story it tells.
              </p>
              <p className="leading-relaxed opacity-80">
                Each piece is designed with the precision of French tailoring and the soulful warmth of Rwandan craftsmanship.
              </p>
           </div>
           <div className="aspect-square bg-gray-200">
             <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80" alt="Founder" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
           </div>
        </div>
      </Section>
    </>
  );
};

const Film = () => {
  return (
    <div className="bg-ebony text-smoke min-h-screen pt-32 pb-20">
      <Section className="text-center">
        <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">CoutureLaFleur Originals</span>
        <h1 className="font-serif text-5xl md:text-7xl mb-12">The Cinematic Universe</h1>
        <p className="max-w-xl mx-auto opacity-70 mb-16">
          Fashion is motion. It is emotion. Watch our latest campaigns and short films documenting the journey.
        </p>

        <div className="relative aspect-video w-full max-w-5xl mx-auto bg-black group cursor-pointer mb-24 overflow-hidden border border-white/10">
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1920&q=80" alt="Film Cover" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                <Play fill="currentColor" size={24} />
             </div>
          </div>
          <div className="absolute bottom-8 left-8 text-left">
             <h3 className="font-serif text-3xl mb-1">Origins: The Beginning</h3>
             <span className="text-xs uppercase tracking-widest opacity-70">Short Film &bull; 05:00</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {['Teaser 01: Dawn', 'Teaser 02: Dusk'].map((title, i) => (
             <div key={i} className="relative aspect-video bg-charcoal group cursor-pointer border border-white/5">
                <img src={i === 0 ? "https://images.unsplash.com/photo-1485230946086-1d99d529c7ad?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"} alt={title} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Play fill="currentColor" size={48} />
                </div>
                <div className="absolute bottom-4 left-4 text-left">
                   <h4 className="font-serif text-xl">{title}</h4>
                </div>
             </div>
           ))}
        </div>
      </Section>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="pt-32 pb-20">
      <SectionTitle subtitle="Client Services">Contact Us</SectionTitle>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl mb-4">Kigali Atelier</h3>
              <p className="opacity-70 leading-relaxed mb-4">
                KG 14 Ave, Heights Manor<br/>
                Kigali, Rwanda
              </p>
              <div className="flex items-center gap-3 opacity-60 text-sm">
                <Phone size={14} /> <span>+250 788 000 000</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4">Paris Studio</h3>
              <p className="opacity-70 leading-relaxed mb-4">
                45 Rue du Faubourg Saint-Honoré<br/>
                75008 Paris, France
              </p>
              <div className="flex items-center gap-3 opacity-60 text-sm">
                <Phone size={14} /> <span>+33 1 40 00 00 00</span>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4">Inquiries</h3>
              <div className="flex items-center gap-3 opacity-60 text-sm mb-2">
                <Mail size={14} /> <span>concierge@couturelafleur.com</span>
              </div>
              <div className="flex items-center gap-3 opacity-60 text-sm">
                <Clock size={14} /> <span>Mon - Fri: 9am - 6pm</span>
              </div>
            </div>
          </div>
          
          <div className="bg-champagne/10 dark:bg-charcoal/50 p-8 md:p-12">
            <h3 className="font-serif text-2xl mb-8">Send a Message</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Email Address" />
              <Input placeholder="Subject" />
              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs uppercase tracking-widest text-shadow/60 dark:text-smoke/60">Message</label>
                <textarea 
                  rows={5}
                  className="bg-transparent border-b border-shadow/20 py-2 text-sm focus:border-gold focus:outline-none transition-colors dark:border-smoke/20 dark:text-smoke dark:focus:border-antique placeholder:text-shadow/30 dark:placeholder:text-smoke/30 resize-none"
                  placeholder="How can we assist you?"
                />
              </div>
              <Button fullWidth>Send Inquiry</Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const Shipping = () => {
  return (
    <div className="pt-32 pb-20">
      <SectionTitle subtitle="Policies">Shipping & Returns</SectionTitle>
      <Section>
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="flex gap-6 items-start">
            <Truck size={32} className="text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-2xl mb-4">Global Delivery</h3>
              <p className="opacity-80 leading-relaxed mb-4">
                We are pleased to offer complimentary express shipping on all orders over $500. 
                All international shipments are handled via DHL Express to ensure your pieces arrive safely and promptly.
              </p>
              <ul className="list-disc pl-5 opacity-70 space-y-2 text-sm">
                <li>Europe & USA: 3-5 Business Days</li>
                <li>Asia & Middle East: 5-7 Business Days</li>
                <li>Africa: 2-4 Business Days</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <MapPin size={32} className="text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-2xl mb-4">Local Kigali Delivery</h3>
              <p className="opacity-80 leading-relaxed">
                For our clients in Kigali, we offer same-day concierge delivery for orders placed before 2 PM. 
                Alternatively, private appointments can be arranged for pick-up at our Heights Manor atelier.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <RefreshCw size={32} className="text-gold shrink-0 mt-1" />
            <div>
              <h3 className="font-serif text-2xl mb-4">Returns & Exchanges</h3>
              <p className="opacity-80 leading-relaxed mb-4">
                We accept returns of unworn, unwashed, and undamaged items with original tags attached within 14 days of delivery.
                Bespoke and made-to-measure pieces are final sale.
              </p>
              <p className="opacity-80 leading-relaxed">
                To initiate a return, please contact our concierge service.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Where are your garments made?",
      a: "Every piece is designed in our Paris studio and hand-crafted by master artisans in our Kigali atelier, ensuring fair wages and preserving traditional craftsmanship."
    },
    {
      q: "Do you offer made-to-measure services?",
      a: "Yes. For our Couture pieces, we offer bespoke fitting services. Please contact our concierge to schedule a virtual or in-person consultation."
    },
    {
      q: "How do I care for the silk pieces?",
      a: "Our silk is organic and delicate. We recommend professional dry cleaning or gentle hand washing with cold water and pH-neutral soap."
    },
    {
      q: "What sustainable practices do you follow?",
      a: "We operate on a made-to-order basis to minimize waste. We source local materials whenever possible and use eco-friendly dyes."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <SectionTitle subtitle="Help">Frequently Asked Questions</SectionTitle>
      <Section>
        <div className="max-w-3xl mx-auto grid gap-8">
          {faqs.map((item, i) => (
            <div key={i} className="border-b border-shadow/10 dark:border-smoke/10 pb-8">
              <h3 className="font-serif text-xl mb-3">{item.q}</h3>
              <p className="opacity-70 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

const ProductCare = () => {
  return (
    <div className="pt-32 pb-20">
      <SectionTitle subtitle="Longevity">Product Care</SectionTitle>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 border border-shadow/10 dark:border-smoke/10 hover:border-gold transition-colors">
            <h3 className="font-serif text-2xl mb-4">Silk & Satin</h3>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-6">Delicate Fibers</p>
            <p className="opacity-80 text-sm leading-relaxed">
              Dry clean only is recommended to maintain the sheen and structure. 
              If hand washing, use cold water and avoid wringing. Iron on low heat with a protective cloth.
            </p>
          </div>
          <div className="p-8 border border-shadow/10 dark:border-smoke/10 hover:border-gold transition-colors">
            <h3 className="font-serif text-2xl mb-4">Linen & Cotton</h3>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-6">Natural Fibers</p>
            <p className="opacity-80 text-sm leading-relaxed">
              Machine wash cold on a gentle cycle. Air dry to preserve the fiber integrity. 
              Linen softens with time; embrace the natural wrinkles or steam for a crisp look.
            </p>
          </div>
          <div className="p-8 border border-shadow/10 dark:border-smoke/10 hover:border-gold transition-colors">
            <h3 className="font-serif text-2xl mb-4">Brass & Jewelry</h3>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-6">Metals</p>
            <p className="opacity-80 text-sm leading-relaxed">
              Keep away from water and perfumes. Polish gently with a soft cloth to restore shine. 
              Brass develops a natural patina over time which adds character.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

const Careers = () => {
  return (
    <div className="pt-32 pb-20">
      <SectionTitle subtitle="Join Us">Careers at CoutureLaFleur</SectionTitle>
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg opacity-80 mb-12">
            We are always looking for passionate individuals who share our vision of blending culture and couture.
          </p>
          <div className="text-left space-y-6">
            {['Senior Pattern Maker (Kigali)', 'Digital Marketing Lead (Remote)', 'Atelier Assistant (Paris)'].map((job, i) => (
              <div key={i} className="flex justify-between items-center p-6 border border-shadow/10 dark:border-smoke/10 hover:border-gold transition-colors group cursor-pointer">
                <span className="font-serif text-xl">{job}</span>
                <span className="text-xs uppercase tracking-widest opacity-60 group-hover:text-gold">Apply &rarr;</span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm opacity-60">
            Don't see a role? Send your CV/Portfolio to careers@couturelafleur.com
          </p>
        </div>
      </Section>
    </div>
  );
};

const Cart = ({ cart, updateQuantity, checkout }: { cart: CartItem[], updateQuantity: (id: string, d: number) => void, checkout: () => void }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-20">
        <h2 className="font-serif text-3xl mb-4">Your Shopping Bag is Empty</h2>
        <Link to="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }
  return (
    <Section>
      <SectionTitle>Shopping Bag</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8 mb-12">
          {cart.map(item => (
            <div key={item.id} className="flex gap-6 items-center border-b border-shadow/10 dark:border-smoke/10 pb-6">
               <img src={item.image} alt={item.name} className="w-24 h-32 object-cover" />
               <div className="flex-grow">
                 <div className="flex justify-between mb-2">
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="font-medium">${item.price * item.quantity}</p>
                 </div>
                 <p className="text-xs uppercase opacity-60 mb-4">{item.category}</p>
                 <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-gold">-</button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-gold">+</button>
                 </div>
               </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end gap-4">
           <div className="flex justify-between w-full md:w-1/2 text-xl font-serif">
              <span>Subtotal</span>
              <span>${total}</span>
           </div>
           <p className="text-xs opacity-60">Taxes and shipping calculated at checkout</p>
           <Button onClick={checkout} className="w-full md:w-auto">Proceed to Checkout</Button>
        </div>
      </div>
    </Section>
  );
};

const Checkout = ({ cart }: { cart: CartItem[] }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.MOBILE_MONEY);
  const [mobileProvider, setMobileProvider] = useState<MobileProvider>(MobileProvider.MTN);
  const [phone, setPhone] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Validate phone number based on provider when provider or phone changes
  useEffect(() => {
    setValidationError(null);
    if (method === PaymentMethod.MOBILE_MONEY && phone) {
        if (mobileProvider === MobileProvider.MTN) {
           if (!phone.startsWith('078') && !phone.startsWith('079')) {
              setValidationError("MTN numbers must start with 078 or 079");
           }
        } else if (mobileProvider === MobileProvider.AIRTEL) {
           if (!phone.startsWith('072') && !phone.startsWith('073')) {
              setValidationError("Airtel numbers must start with 072 or 073");
           }
        }
    }
  }, [phone, mobileProvider, method]);

  const handlePay = async () => {
    if (validationError) return;
    setIsProcessing(true);
    setPaymentError(null);
    setPaymentMessage(null);
    
    try {
      // Prepare payload based on method
      let payload: any = {};
      if (method === PaymentMethod.MOBILE_MONEY) {
          payload = { provider: mobileProvider, phoneNumber: phone };
      }

      // Call the Backend Payment API
      const result = await processPayment(
         method, 
         cart, 
         payload
      );

      console.log("Payment Result:", result);

      if (result.success) {
         setPaymentMessage(result.message); 
         setTimeout(() => {
           setIsProcessing(false);
           navigate('/success');
         }, 3000);
      } else {
         // Backend explicitly failed
         setPaymentError(result.message);
         setIsProcessing(false);
      }
    } catch (err: any) {
       // Network or other unexpected error
       console.error("Payment failed", err);
       alert(err.message || "Something went wrong. Please try again.");
       setPaymentError(err.message || "Something went wrong. Please try again.");
       setIsProcessing(false);
    }
  };

  const isFormValid = () => {
      if (method === PaymentMethod.MOBILE_MONEY) {
          return phone && !validationError && phone.length >= 10;
      }
      return false;
  };

  if (cart.length === 0) return <div className="pt-32 text-center">Your bag is empty.</div>;

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
         <div className="flex justify-between items-center mb-12 border-b border-shadow/10 dark:border-smoke/10 pb-4">
            <h1 className="font-serif text-3xl">Secure Checkout</h1>
            <span className="text-xs uppercase tracking-widest text-gold">Step {step}/3</span>
         </div>

         {/* Steps */}
         <div className="flex gap-4 mb-8 text-xs uppercase tracking-widest opacity-60">
            <span className={step >= 1 ? "text-gold opacity-100" : ""}>1. Shipping</span>
            <span>&gt;</span>
            <span className={step >= 2 ? "text-gold opacity-100" : ""}>2. Payment</span>
            <span>&gt;</span>
            <span className={step >= 3 ? "text-gold opacity-100" : ""}>3. Review</span>
         </div>

         {/* CONTENT */}
         {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Address Line 1" />
              <div className="grid grid-cols-2 gap-4">
                 <Input placeholder="City" />
                 <Input placeholder="Postal Code" />
              </div>
              <Input placeholder="Country" defaultValue="Rwanda" />
              <Input placeholder="Phone" />
              <div className="pt-6">
                <Button onClick={() => setStep(2)} fullWidth>Continue to Payment</Button>
              </div>
            </div>
         )}

         {step === 2 && (
            <div className="space-y-12 animate-fade-in">
              
              {/* SECTION: MOBILE MONEY */}
              <div>
                   <h3 className="text-xs uppercase tracking-widest opacity-60 mb-6 border-b border-shadow/10 dark:border-smoke/10 pb-2">Select Provider</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <button 
                         onClick={() => { setMobileProvider(MobileProvider.MTN); setPhone(''); }}
                         className={`p-6 border flex flex-col items-center gap-3 transition-colors ${mobileProvider === MobileProvider.MTN ? 'border-[#FFCC00] bg-[#FFCC00]/10 text-black dark:text-smoke' : 'border-shadow/20 opacity-70'}`}
                      >
                         <Smartphone size={24} className={mobileProvider === MobileProvider.MTN ? 'text-[#FFCC00]' : ''} />
                         <span className="text-xs uppercase tracking-widest font-bold">MTN MoMo</span>
                      </button>
                      <button 
                         onClick={() => { setMobileProvider(MobileProvider.AIRTEL); setPhone(''); }}
                         className={`p-6 border flex flex-col items-center gap-3 transition-colors ${mobileProvider === MobileProvider.AIRTEL ? 'border-[#FF0000] bg-[#FF0000]/10 text-black dark:text-smoke' : 'border-shadow/20 opacity-70'}`}
                      >
                         <Smartphone size={24} className={mobileProvider === MobileProvider.AIRTEL ? 'text-[#FF0000]' : ''} />
                         <span className="text-xs uppercase tracking-widest font-bold">Airtel Money</span>
                      </button>
                   </div>
                   
                   <div className="mt-6 animate-fade-in">
                      <label className="text-xs uppercase tracking-widest text-shadow/60 dark:text-smoke/60 mb-2 block">Mobile Money Number</label>
                      <Input 
                          placeholder="Enter phone number" 
                          value={phone}
                          onChange={(e) => {
                             const val = e.target.value.replace(/\D/g, '');
                             if (val.length <= 10) setPhone(val);
                          }}
                      />
                      {validationError && (
                         <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <AlertCircle size={12} /> {validationError}
                         </p>
                      )}
                      <p className="text-xs opacity-60 mt-4 text-center">
                          A prompt will be sent to your phone to approve the transaction.
                      </p>
                   </div>
                </div>

              <div className="pt-6">
                 <Button 
                     onClick={() => setStep(3)} 
                     fullWidth 
                     disabled={!isFormValid()}
                 >
                    Review Order
                 </Button>
              </div>
            </div>
         )}

         {step === 3 && (
            <div className="space-y-6 animate-fade-in">
               <div className="bg-champagne/20 dark:bg-charcoal/50 p-6 space-y-4">
                  <h3 className="font-serif text-xl border-b border-shadow/10 dark:border-smoke/10 pb-2">Order Summary</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                       <span>{item.quantity}x {item.name}</span>
                       <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-lg font-serif pt-4 border-t border-shadow/10 dark:border-smoke/10">
                     <span>Total</span>
                     <span>${total}</span>
                  </div>
               </div>
               <div className="text-sm opacity-70">
                 Payment Method: {mobileProvider} ({phone})
               </div>

               {/* Feedback Messages */}
               {paymentError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center rounded">
                     {paymentError}
                  </div>
               )}
               {paymentMessage && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm text-center rounded">
                     {paymentMessage}
                  </div>
               )}

               <Button onClick={handlePay} fullWidth disabled={isProcessing || !!paymentMessage}>
                 {isProcessing ? 'Processing Transaction...' : `Pay $${total}`}
               </Button>
            </div>
         )}
      </div>
    </Section>
  );
};

const Success = () => (
  <div className="h-screen flex flex-col items-center justify-center text-center px-6">
    <div className="w-20 h-20 rounded-full bg-gold text-white flex items-center justify-center mb-8 animate-slide-up">
      <Check size={40} />
    </div>
    <h1 className="font-serif text-5xl mb-4 animate-slide-up" style={{ animationDelay: '0.1s'}}>Merci Beaucoup.</h1>
    <p className="max-w-md opacity-70 mb-8 animate-slide-up" style={{ animationDelay: '0.2s'}}>
      Payment was Successfully Done. Thank you shopping at couturelafleur.
    </p>
    <Link to="/" className="animate-slide-up" style={{ animationDelay: '0.3s'}}>
       <Button variant="outline">Return Home</Button>
    </Link>
  </div>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, size: 'M' }]; // Default M for demo
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Layout cartCount={cartCount}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Section>
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="font-serif text-3xl italic mb-6">"Fashion is the armor to survive the reality of everyday life."</h3>
                  <p className="text-xs uppercase tracking-widest opacity-60">— Bill Cunningham</p>
                </div>
              </Section>
              <ProductList />
            </>
          } />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/collections" element={<ProductList />} />
          <Route path="/men" element={<ProductList category="men" />} />
          <Route path="/women" element={<ProductList category="women" />} />
          <Route path="/accessories" element={<ProductList category="accessories" />} />
          
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/story" element={<Story />} />
          <Route path="/film" element={<Film />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} checkout={() => window.location.hash = '#/checkout'} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/success" element={<Success />} />
          
          {/* New Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/care" element={<ProductCare />} />
          <Route path="/careers" element={<Careers />} />

          {/* Magazine Hub containing Story, Film and Articles */}
          <Route path="/magazine" element={
            <div className="min-h-screen">
              <div className="bg-cocoa/90 text-champagne pt-32 pb-16 px-6">
                <div className="container mx-auto text-center">
                  <h1 className="font-serif text-5xl md:text-7xl mb-4">The LaFleur Journal</h1>
                  <p className="max-w-xl mx-auto opacity-80 font-light text-lg">
                    Culture, Heritage, and the Art of Living.
                  </p>
                </div>
              </div>

              {/* Magazine Navigation Cards */}
              <Section>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <Link to="/story" className="group relative aspect-video overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1542060748-10c287222695?auto=format&fit=crop&w=800&q=80" alt="Brand Story" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                         <BookOpen className="text-white mb-4 w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                         <h2 className="text-white font-serif text-4xl mb-2">The Story</h2>
                         <span className="text-white/80 text-xs uppercase tracking-widest">Read our heritage</span>
                      </div>
                    </Link>

                    <Link to="/film" className="group relative aspect-video overflow-hidden cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" alt="Short Film" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                         <FilmIcon className="text-white mb-4 w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                         <h2 className="text-white font-serif text-4xl mb-2">Cinematics</h2>
                         <span className="text-white/80 text-xs uppercase tracking-widest">Watch the campaign</span>
                      </div>
                    </Link>
                 </div>

                 {/* Articles */}
                 <SectionTitle subtitle="Read">Latest Articles</SectionTitle>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_ARTICLES.map(art => (
                      <div key={art.id} className="group cursor-pointer">
                        <div className="overflow-hidden aspect-video mb-4">
                          <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-gold mb-2 block">{art.category}</span>
                        <h3 className="font-serif text-2xl mb-2 group-hover:underline decoration-gold underline-offset-4">{art.title}</h3>
                        <p className="text-sm opacity-70 leading-relaxed">{art.excerpt}</p>
                      </div>
                    ))}
                  </div>
              </Section>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
