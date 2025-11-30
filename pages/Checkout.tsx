import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { CreditCard, Smartphone } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setStep(3); // Success state
        clearCart();
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
      return (
          <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center">
                  <h2 className="font-serif text-3xl text-shadow dark:text-smoke mb-4">Your bag is empty</h2>
                  <p className="text-sm text-shadow/60 mb-8">Luxury awaits.</p>
                  <Button onClick={() => window.location.hash = '#/shop'}>Continue Shopping</Button>
              </div>
          </div>
      );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-snow dark:bg-ebony">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: Form */}
        <div>
            {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                    <h2 className="font-serif text-3xl text-shadow dark:text-smoke border-b border-champagne pb-4">Shipping Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                        <input type="text" placeholder="Last Name" className="bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                    <input type="text" placeholder="Address" className="w-full bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="City" className="bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                        <input type="text" placeholder="Postal Code" className="bg-transparent border-b border-shadow/20 py-3 outline-none text-sm text-shadow dark:text-smoke dark:border-smoke/20" />
                    </div>
                    <Button fullWidth onClick={() => setStep(2)}>Continue to Payment</Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                    <h2 className="font-serif text-3xl text-shadow dark:text-smoke border-b border-champagne pb-4">Payment Method</h2>
                    
                    <div className="space-y-4">
                        <label className="flex items-center p-4 border border-shadow/10 dark:border-smoke/10 cursor-pointer hover:border-gold transition-colors">
                            <input type="radio" name="payment" className="mr-4 accent-gold" defaultChecked />
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium text-shadow dark:text-smoke">Credit Card</span>
                                <CreditCard className="w-5 h-5 text-shadow/50" />
                            </div>
                        </label>
                        
                        <label className="flex items-center p-4 border border-shadow/10 dark:border-smoke/10 cursor-pointer hover:border-gold transition-colors">
                            <input type="radio" name="payment" className="mr-4 accent-gold" />
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium text-shadow dark:text-smoke">MTN Mobile Money</span>
                                <Smartphone className="w-5 h-5 text-[#FFCC00]" />
                            </div>
                        </label>

                         <label className="flex items-center p-4 border border-shadow/10 dark:border-smoke/10 cursor-pointer hover:border-gold transition-colors">
                            <input type="radio" name="payment" className="mr-4 accent-gold" />
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium text-shadow dark:text-smoke">Airtel Money</span>
                                <Smartphone className="w-5 h-5 text-[#FF0000]" />
                            </div>
                        </label>
                    </div>

                    <div className="pt-6">
                        <Button fullWidth onClick={handlePayment} disabled={loading}>
                            {loading ? 'Processing...' : `Pay $${cartTotal}`}
                        </Button>
                        <button onClick={() => setStep(1)} className="mt-4 text-xs text-shadow/50 underline w-full text-center">Back to Shipping</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center py-20 animate-slide-up">
                    <h2 className="font-serif text-4xl text-gold mb-6">Merci.</h2>
                    <p className="text-shadow dark:text-smoke mb-8">Your order has been confirmed. Welcome to the society.</p>
                    <p className="text-xs uppercase tracking-widest text-shadow/50 mb-12">Order #CLF-88291</p>
                    <Button onClick={() => window.location.hash = '#/'}>Return Home</Button>
                </div>
            )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-champagne/10 dark:bg-charcoal/20 p-8 h-fit">
            <h3 className="font-serif text-xl text-shadow dark:text-smoke mb-6">Order Summary</h3>
            <div className="space-y-6 mb-8">
                {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <img src={item.image} className="w-16 h-20 object-cover" alt={item.name} />
                        <div>
                            <p className="font-medium text-sm text-shadow dark:text-smoke">{item.name}</p>
                            <p className="text-xs text-shadow/60 dark:text-smoke/60">Size: {item.size} | Qty: {item.quantity}</p>
                            <p className="text-xs mt-1 text-shadow dark:text-smoke">${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-shadow/10 dark:border-smoke/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-shadow/70 dark:text-smoke/70">
                    <span>Subtotal</span>
                    <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-shadow/70 dark:text-smoke/70">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-serif text-shadow dark:text-smoke pt-4">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};