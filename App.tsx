
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button, Input, Section, SectionTitle } from './components/UI';
import { MOCK_PRODUCTS, MOCK_ARTICLES } from './constants';
import { Product, CartItem, PaymentMethod, MobileProvider } from './types';
import { Play, ArrowRight, Star, Smartphone, Check, BookOpen, Film as FilmIcon, MapPin, Mail, Phone, Clock, Truck, ShieldCheck, RefreshCw, Heart, AlertCircle } from 'lucide-react';
import { getStylingAdvice } from './services/geminiService';
import { fetchProducts, fetchProductById, fetchRecommendations, likeProduct, processPayment, sendContactForm } from './services/api';

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
    <div className="pt-10 md:pt-12">
       <Section>
        <SectionTitle subtitle={category ? "Selection" : "Latest Arrivals"}>{getTitle()}</SectionTitle>
        {products.length === 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[
                {
                  name: 'Noir Velvet Gown',
                  price: 2400,
                  image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
                  id: '5',
                  category: 'women'
                },
                {
                  name: 'Nyanza Linen Suit',
                  price: 1100,
                  image: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=800&q=80',
                  id: '7',
                  category: 'men'
                },
                {
                  name: 'Kivu Leather Weekender',
                  price: 950,
                  image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
                  id: '9',
                  category: 'accessories'
                }
              ].map(product => (
                 <div key={product.id} className="group cursor-pointer relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <button 
                          onClick={(e) => toggleLike(e, product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all z-20"
                        >
                          <Heart 
                            size={18} 
                            fill={likedItems.includes(product.id) ? "#ef4444" : "none"} 
                            stroke={likedItems.includes(product.id) ? "#ef4444" : "white"}
                            className="transition-all"
                          />
                        </button>
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
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all z-20"
                        >
                          <Heart 
                            size={18} 
                            fill={likedItems.includes(product.id) ? "#ef4444" : "none"} 
                            stroke={likedItems.includes(product.id) ? "#ef4444" : "white"}
                            className="transition-all"
                          />
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const result = await sendContactForm(formData);
      
      if (result.success) {
        setSubmitMessage({ type: 'success', message: result.message });
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      } else {
        setSubmitMessage({ type: 'error', message: result.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      <Section>
        <SectionTitle subtitle="Client Services">Contact Us</SectionTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Information */}
          <div className="space-y-10 md:space-y-12">
            <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gold/10 dark:bg-antique/10 rounded-full">
                  <MapPin className="text-gold dark:text-antique" size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">Visit Us</h3>
                  <p className="opacity-80 leading-relaxed mb-2">
                    KK 454 St.<br/>
                    Kigali, Rwanda
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gold/10 dark:bg-antique/10 rounded-full">
                  <Phone className="text-gold dark:text-antique" size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">Call Us</h3>
                  <a 
                    href="tel:+250792772202" 
                    className="block opacity-80 hover:opacity-100 hover:text-gold dark:hover:text-antique transition-all text-lg md:text-xl font-medium"
                  >
                    +250 792 772 202
                  </a>
                  <p className="text-sm opacity-60 mt-2">Available Mon - Fri: 9am - 6pm</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gold/10 dark:bg-antique/10 rounded-full">
                  <Mail className="text-gold dark:text-antique" size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-3">Email Us</h3>
                  <a 
                    href="mailto:couturelafleur19@gmail.com" 
                    className="block opacity-80 hover:opacity-100 hover:text-gold dark:hover:text-antique transition-all text-lg md:text-xl break-all"
                  >
                    couturelafleur19@gmail.com
                  </a>
                  <p className="text-sm opacity-60 mt-2">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm opacity-70 pt-4">
              <Clock size={16} />
              <span>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (Rwanda Time)</span>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-champagne/10 dark:bg-charcoal/50 p-6 md:p-10 lg:p-12 rounded-lg border border-shadow/10 dark:border-smoke/10">
            <h3 className="font-serif text-2xl md:text-3xl mb-2">Send a Message</h3>
            <p className="text-sm opacity-70 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
                <Input 
                  placeholder="Last Name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
              <Input 
                type="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Input 
                placeholder="Subject" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
              <div className="flex flex-col gap-2 w-full">
                <label className="text-xs uppercase tracking-widest text-shadow/60 dark:text-smoke/60">Message</label>
                <textarea 
                  rows={6}
                  className="bg-transparent border-b border-shadow/20 py-2 text-sm focus:border-gold focus:outline-none transition-colors dark:border-smoke/20 dark:text-smoke dark:focus:border-antique placeholder:text-shadow/30 dark:placeholder:text-smoke/30 resize-none"
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              
              {submitMessage && (
                <div className={`p-4 border text-sm rounded ${
                  submitMessage.type === 'success'
                    ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                }`}>
                  {submitMessage.message}
                </div>
              )}
              
              <Button fullWidth type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

const Shipping = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      <Section>
        <SectionTitle subtitle="Policies">Shipping & Returns</SectionTitle>
        
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Global Delivery */}
          <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-gold/10 dark:bg-antique/10 rounded-full shrink-0">
                <Truck size={32} className="text-gold dark:text-antique" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl mb-4">Global Delivery</h3>
                <p className="opacity-80 leading-relaxed mb-6 text-base md:text-lg">
                  We are pleased to offer complimentary express shipping on all orders over $500. 
                  All international shipments are handled via DHL Express to ensure your pieces arrive safely and promptly.
                </p>
                <div className="bg-white/50 dark:bg-ebony/50 p-6 rounded-lg">
                  <h4 className="text-sm uppercase tracking-widest mb-4 text-gold dark:text-antique">Estimated Delivery Times</h4>
                  <ul className="space-y-3 opacity-80">
                    <li className="flex justify-between items-center border-b border-shadow/10 dark:border-smoke/10 pb-2">
                      <span className="font-medium">Europe & USA</span>
                      <span className="text-gold dark:text-antique">3-5 Business Days</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-shadow/10 dark:border-smoke/10 pb-2">
                      <span className="font-medium">Asia & Middle East</span>
                      <span className="text-gold dark:text-antique">5-7 Business Days</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Africa</span>
                      <span className="text-gold dark:text-antique">2-4 Business Days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Local Kigali Delivery */}
          <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-gold/10 dark:bg-antique/10 rounded-full shrink-0">
                <MapPin size={32} className="text-gold dark:text-antique" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl mb-4">Local Kigali Delivery</h3>
                <p className="opacity-80 leading-relaxed mb-4 text-base md:text-lg">
                  For our clients in Kigali, we offer same-day concierge delivery for orders placed before 2 PM. 
                  Alternatively, private appointments can be arranged for pick-up at our atelier located at KK 454 St., Kigali.
                </p>
                <div className="bg-white/50 dark:bg-ebony/50 p-4 rounded-lg">
                  <p className="text-sm opacity-70">
                    <strong className="text-gold dark:text-antique">Same-day delivery:</strong> Orders placed before 2:00 PM will be delivered the same day (subject to availability).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Returns & Exchanges */}
          <div className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-8 md:p-10 rounded-lg border border-shadow/10 dark:border-smoke/10 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-gold/10 dark:bg-antique/10 rounded-full shrink-0">
                <RefreshCw size={32} className="text-gold dark:text-antique" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl mb-4">Returns & Exchanges</h3>
                <p className="opacity-80 leading-relaxed mb-6 text-base md:text-lg">
                  We accept returns of unworn, unwashed, and undamaged items with original tags attached within 14 days of delivery.
                  Bespoke and made-to-measure pieces are final sale.
                </p>
                <div className="bg-white/50 dark:bg-ebony/50 p-6 rounded-lg space-y-4">
                  <div>
                    <h4 className="text-sm uppercase tracking-widest mb-2 text-gold dark:text-antique">Return Policy</h4>
                    <ul className="space-y-2 text-sm opacity-80 list-disc list-inside">
                      <li>Items must be unworn, unwashed, and undamaged</li>
                      <li>Original tags must be attached</li>
                      <li>Returns accepted within 14 days of delivery</li>
                      <li>Bespoke and made-to-measure pieces are final sale</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-shadow/10 dark:border-smoke/10">
                    <p className="text-sm opacity-80">
                      To initiate a return, please contact our concierge service at{' '}
                      <a href="mailto:couturelafleur19@gmail.com" className="text-gold dark:text-antique hover:underline">
                        couturelafleur19@gmail.com
                      </a>
                      {' '}or call us at{' '}
                      <a href="tel:+250792772202" className="text-gold dark:text-antique hover:underline">
                        +250 792 772 202
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      q: "Where are your garments made?",
      a: "Every piece is designed in our Paris studio and hand-crafted by master artisans in our Kigali atelier, ensuring fair wages and preserving traditional craftsmanship. We take pride in supporting local artisans and maintaining the highest quality standards."
    },
    {
      q: "Do you offer made-to-measure services?",
      a: "Yes. For our Couture pieces, we offer bespoke fitting services. Please contact our concierge to schedule a virtual or in-person consultation. Our expert tailors will work with you to create a piece that fits perfectly and reflects your personal style."
    },
    {
      q: "How do I care for the silk pieces?",
      a: "Our silk is organic and delicate. We recommend professional dry cleaning or gentle hand washing with cold water and pH-neutral soap. Always check the care label on your specific garment for detailed instructions. Store silk items in a cool, dry place away from direct sunlight."
    },
    {
      q: "What sustainable practices do you follow?",
      a: "We operate on a made-to-order basis to minimize waste. We source local materials whenever possible and use eco-friendly dyes. Our packaging is recyclable, and we're committed to reducing our carbon footprint throughout the entire production process."
    },
    {
      q: "How can I track my order?",
      a: "Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package through our shipping partner's website. For local Kigali deliveries, our concierge team will contact you directly with delivery updates."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept major credit cards, debit cards, and mobile money payments (MTN Mobile Money and Airtel Money). All transactions are secure and encrypted for your protection. We also offer payment plans for select high-value items."
    },
    {
      q: "Can I cancel or modify my order?",
      a: "Orders can be cancelled or modified within 24 hours of placement, provided the item hasn't entered production. Please contact us immediately at couturelafleur19@gmail.com or +250 792 772 202. Made-to-order items cannot be cancelled once production has begun."
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship worldwide! We offer complimentary express shipping on orders over $500. International shipping typically takes 3-7 business days depending on your location. All customs duties and taxes are the responsibility of the customer."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      <Section>
        <SectionTitle subtitle="Help">Frequently Asked Questions</SectionTitle>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div 
                key={i} 
                className="bg-champagne/10 dark:bg-charcoal/50 rounded-lg border border-shadow/10 dark:border-smoke/10 overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 md:px-8 py-6 flex justify-between items-center text-left group"
                >
                  <h3 className="font-serif text-lg md:text-xl pr-4 group-hover:text-gold dark:group-hover:text-antique transition-colors">
                    {item.q}
                  </h3>
                  <div className={`shrink-0 text-gold dark:text-antique transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                    <ArrowRight size={20} className="transform rotate-90" />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 pt-0">
                    <p className="opacity-80 leading-relaxed text-sm md:text-base">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-gradient-to-br from-gold/10 to-champagne/20 dark:from-antique/10 dark:to-charcoal/30 rounded-lg border border-shadow/10 dark:border-smoke/10 text-center">
            <h3 className="font-serif text-2xl mb-3">Still have questions?</h3>
            <p className="opacity-80 mb-6">Our team is here to help. Reach out to us and we'll respond as soon as possible.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:couturelafleur19@gmail.com" className="inline-block">
                <Button variant="outline">Email Us</Button>
              </a>
              <a href="tel:+250792772202" className="inline-block">
                <Button>Call Us</Button>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const ProductCare = () => {
  const careCategories = [
    {
      title: "Silk & Satin",
      subtitle: "Delicate Fibers",
      icon: "✨",
      tips: [
        "Dry clean only is recommended to maintain the sheen and structure",
        "If hand washing, use cold water and avoid wringing",
        "Iron on low heat with a protective cloth",
        "Store hanging or folded with acid-free tissue paper",
        "Avoid direct sunlight to prevent fading"
      ],
      avoid: ["Bleach", "High heat", "Wringing or twisting"]
    },
    {
      title: "Linen & Cotton",
      subtitle: "Natural Fibers",
      icon: "🌿",
      tips: [
        "Machine wash cold on a gentle cycle",
        "Air dry to preserve the fiber integrity",
        "Iron while slightly damp for best results",
        "Linen softens with time; embrace natural wrinkles or steam for crisp look",
        "Use mild detergent and avoid fabric softeners"
      ],
      avoid: ["High heat drying", "Bleach", "Hot water"]
    },
    {
      title: "Brass & Jewelry",
      subtitle: "Metals",
      icon: "💎",
      tips: [
        "Keep away from water and perfumes",
        "Polish gently with a soft cloth to restore shine",
        "Store in a dry place, ideally in a jewelry box",
        "Brass develops a natural patina over time which adds character",
        "Clean with a soft, dry cloth after each wear"
      ],
      avoid: ["Harsh chemicals", "Abrasive cleaners", "Excessive moisture"]
    },
    {
      title: "Leather",
      subtitle: "Luxury Materials",
      icon: "🧳",
      tips: [
        "Clean with a damp cloth and mild soap",
        "Condition regularly with leather conditioner",
        "Store in a cool, dry place away from direct sunlight",
        "Use a leather protector spray to prevent stains",
        "Allow to air dry naturally if wet, never use direct heat"
      ],
      avoid: ["Direct heat", "Harsh chemicals", "Excessive moisture"]
    },
    {
      title: "Wool & Cashmere",
      subtitle: "Luxury Knits",
      icon: "🧶",
      tips: [
        "Hand wash in cold water with wool-specific detergent",
        "Lay flat to dry on a clean towel",
        "Store folded, never hang as it can stretch",
        "Use cedar blocks or lavender sachets to prevent moths",
        "Steam rather than iron when needed"
      ],
      avoid: ["Machine washing", "Wringing", "High heat"]
    },
    {
      title: "General Tips",
      subtitle: "For All Garments",
      icon: "⭐",
      tips: [
        "Always check the care label before washing",
        "Address stains immediately before they set",
        "Store items in a cool, dry, well-ventilated space",
        "Use proper hangers for structured pieces",
        "Rotate your wardrobe to prevent over-wearing"
      ],
      avoid: ["Storing in plastic bags", "Over-washing", "Ignoring care labels"]
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen">
      <Section>
        <SectionTitle subtitle="Longevity">Product Care</SectionTitle>
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-lg opacity-80 leading-relaxed">
            Proper care ensures your CoutureLaFleur pieces remain beautiful for years to come. 
            Follow these guidelines to maintain the quality and elegance of your garments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {careCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-champagne/20 to-gold/5 dark:from-charcoal/50 dark:to-charcoal/30 p-6 md:p-8 rounded-lg border border-shadow/10 dark:border-smoke/10 hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-serif text-2xl mb-2 group-hover:text-gold dark:group-hover:text-antique transition-colors">
                {category.title}
              </h3>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-6">{category.subtitle}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold dark:text-antique mb-3">Care Instructions</h4>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm opacity-80 leading-relaxed flex items-start gap-2">
                        <span className="text-gold dark:text-antique mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-shadow/10 dark:border-smoke/10">
                  <h4 className="text-xs uppercase tracking-widest text-red-500/70 dark:text-red-400/70 mb-2">Avoid</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.avoid.map((item, avoidIndex) => (
                      <span 
                        key={avoidIndex}
                        className="text-xs px-2 py-1 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 md:p-10 bg-gradient-to-br from-gold/10 to-champagne/20 dark:from-antique/10 dark:to-charcoal/30 rounded-lg border border-shadow/10 dark:border-smoke/10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-4 bg-gold/10 dark:bg-antique/10 rounded-full">
              <ShieldCheck size={32} className="text-gold dark:text-antique" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-serif text-2xl mb-3">Need Professional Care?</h3>
              <p className="opacity-80 mb-4">
                For delicate pieces or items requiring special attention, we recommend professional cleaning services. 
                Contact us for recommendations on trusted care providers in your area.
              </p>
              <a href="mailto:couturelafleur19@gmail.com" className="inline-block">
                <Button variant="outline">Contact Our Team</Button>
              </a>
            </div>
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
              <Section className="pb-10 md:pb-14">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="font-serif text-3xl italic mb-6">"Fashion is the armor to survive the reality of everyday life."</h3>
                  <p className="text-xs uppercase tracking-widest opacity-60">— Bill Cunningham</p>
                </div>
              </Section>
              
              {/* Curated For You Section */}
              <Section className="pt-10 md:pt-14 pb-16 md:pb-20">
                <div className="text-center mb-16">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-gold dark:text-antique mb-4 block">Curated For You</span>
                  <h2 className="font-serif text-4xl md:text-5xl mb-4">Trending & Recommended</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {[
                    {
                      name: 'The Kigali Trench',
                      price: 850,
                      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
                      id: '1'
                    },
                    {
                      name: 'Silk Ébène Dress',
                      price: 1200,
                      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
                      id: '2'
                    },
                    {
                      name: 'Savannah Blazer',
                      price: 920,
                      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
                      id: '4'
                    }
                  ].map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group">
                      <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 right-4 bg-gold/90 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Featured
                        </div>
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl mb-2 group-hover:text-gold dark:group-hover:text-antique transition-colors">{product.name}</h3>
                      <p className="text-lg font-medium text-gold dark:text-antique">${product.price}</p>
                    </Link>
                  ))}
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
