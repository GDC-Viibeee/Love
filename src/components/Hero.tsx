import React from 'react';
import { Heart, Sparkles, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4 relative ">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8 relative">
          <Heart className="w-24 h-24 text-rose-500 mx-auto mb-6 animate-pulse vintage-heart" />
          <div className="absolute -top-6 -right-6">
            <Sparkles className="w-10 h-10 text-amber-400 animate-spin-slow" />
          </div>
          <div className="absolute -bottom-6 -left-6">
            <Sparkles className="w-8 h-8 text-rose-400 animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold vintage-title mb-6 animate-text-shimmer">
          My Beloved
        </h1>
        
        <p className="text-2xl md:text-4xl text-gray-700 mb-8 font-light leading-relaxed vintage-text">
          A timeless journey through our beautiful love story
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xl text-gray-600 mb-12">
          <Heart className="w-7 h-7 text-rose-500 animate-heartbeat" />
          <span className="animate-fade-in-delay-1 vintage-text italic">Est. The Day We Met</span>
          <Heart className="w-7 h-7 text-rose-500 animate-heartbeat" />
        </div>
        
        <button 
          onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
          className="vintage-button px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-float"
        >
          Begin Our Journey
        </button>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="w-8 h-8 text-gray-400 mx-auto" />
        </div>
      </div>
      
      {/* Vintage decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-amber-300 opacity-30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-amber-300 opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-amber-300 opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-amber-300 opacity-30"></div>
    </section>
  );
};

export default Hero;