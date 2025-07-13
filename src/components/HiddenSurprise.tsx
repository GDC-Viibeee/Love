import React, { useState } from 'react';
import { Heart, Gift, Star, Sparkles } from 'lucide-react';

const HiddenSurprise = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const revealSurprise = () => {
    setIsRevealed(true);
    setTimeout(() => setShowMessage(true), 500);
  };

  return (
    <section className="py-20 px-4 vintage-section relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {!isRevealed ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 vintage-title">
              There's something special waiting for you...
            </h2>
            
            <p className="text-gray-600 mb-12 text-lg italic vintage-text">
              "Some treasures are hidden in plain sight, waiting for love to find them"
            </p>
            
            <div className="relative inline-block">
              <button
                onClick={revealSurprise}
                className="group relative"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 animate-pulse">
                  <Heart className="w-12 h-12 text-white group-hover:animate-heartbeat" />
                </div>
                
                {/* Floating sparkles */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
                <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Star className="absolute top-0 left-0 w-5 h-5 text-purple-400 animate-spin-slow" />
              </button>
              
              <p className="mt-4 text-sm text-gray-500 font-medium">
                Click the heart to reveal your surprise
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-scale-in">
            <div className="vintage-card bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-rose-200 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-rose-300 opacity-60"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-rose-300 opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-rose-300 opacity-60"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-rose-300 opacity-60"></div>
              
              <Gift className="w-16 h-16 text-rose-500 mx-auto mb-6 animate-bounce" />
              
              <h2 className="text-4xl font-bold mb-6 vintage-title bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                A Message from My Heart
              </h2>
              
              {showMessage && (
                <div className="animate-fade-in-up space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed font-serif text-xl">
                      My dearest wife,
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed font-serif text-lg">
                      This website is more than just photos and words - it's a digital love letter, 
                      a testament to the incredible journey we've shared together. Every pixel, 
                      every animation, every carefully chosen word has been crafted with one purpose: 
                      to show you how deeply, completely, and eternally you are loved.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed font-serif text-lg">
                      You are my greatest adventure, my safest harbor, my brightest star, 
                      and my most cherished dream come true. Thank you for filling my life 
                      with so much love, laughter, and magic.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed font-serif text-lg">
                      Here's to all the memories we've made and all the beautiful moments 
                      still waiting for us. I love you more than words could ever express, 
                      more than this website could ever show, and more than my heart could ever contain.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed font-serif text-xl font-bold">
                      Forever and always yours,<br />
                      Your devoted husband 💕
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-4">
                      <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" />
                      <div className="w-24 h-px bg-rose-300"></div>
                      <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                      <div className="w-24 h-px bg-rose-300"></div>
                      <Heart className="w-6 h-6 text-rose-500 animate-heartbeat" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-10 left-10 w-8 h-8 text-rose-200 animate-float opacity-30" />
        <Heart className="absolute top-20 right-20 w-6 h-6 text-pink-200 animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-20 left-20 w-10 h-10 text-rose-200 animate-float opacity-20" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-10 right-10 w-7 h-7 text-pink-200 animate-float opacity-35" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};

export default HiddenSurprise;