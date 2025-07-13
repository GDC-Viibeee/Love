import React, { useState } from 'react';
import { MessageCircle, Heart, Send, User } from 'lucide-react';

const Guestbook = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah & Mike",
      message: "You two are absolutely perfect together! Watching your love story unfold has been such a joy. Here's to many more beautiful years! 💕",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Mom",
      message: "Seeing you both so happy fills my heart with joy. You've found your perfect match, and I couldn't be prouder. Love you both! ❤️",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Best Friend Emma",
      message: "From the moment you told me about her, I knew she was special. You light up when you talk about each other. True love! ✨",
      date: "2 weeks ago"
    }
  ]);

  const [newMessage, setNewMessage] = useState({ name: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name.trim() && newMessage.message.trim()) {
      const message = {
        id: messages.length + 1,
        name: newMessage.name,
        message: newMessage.message,
        date: "Just now"
      };
      setMessages([message, ...messages]);
      setNewMessage({ name: '', message: '' });
    }
  };

  return (
    <section className="py-20 px-4 vintage-section">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 vintage-title animate-fade-in">
          Messages of Love
        </h2>
        
        <p className="text-center text-gray-600 mb-12 text-lg italic vintage-text">
          "Love shared is love multiplied - leave your thoughts and memories"
        </p>

        {/* Message Form */}
        <div className="vintage-card bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12">
          <div className="text-center mb-6">
            <MessageCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Share Your Thoughts</h3>
            <p className="text-gray-600">What's your favorite memory of us together?</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Share your favorite memory, a wish, or just say hello..."
                required
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Messages Display */}
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className="vintage-card bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{message.name}</h4>
                    <span className="text-sm text-gray-500">{message.date}</span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {messages.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No messages yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Guestbook;