import React, { useState } from 'react';
import { Mail, Heart, Star, Coffee, Smile, Moon } from 'lucide-react';

const LoveLetters = () => {
  const [openLetter, setOpenLetter] = useState<string | null>(null);

  const letters = [
    {
      id: 'morning',
      title: 'Open when you wake up',
      icon: Coffee,
      color: 'from-amber-400 to-orange-500',
      content: `My dearest love,

As the morning sun kisses your face, I want you to know that you are the first thought that graces my mind every single day. Your sleepy smile is more beautiful than any sunrise, and your gentle breathing beside me is the sweetest melody I've ever heard.

Every morning with you feels like a gift unwrapped, full of possibilities and love. Thank you for being my sunshine, my coffee, and my reason to smile before I'm even fully awake.

I love you more than all the mornings we'll share together.

Forever yours,
Your devoted husband ❤️`
    },
    {
      id: 'laugh',
      title: 'Open when you need a laugh',
      icon: Smile,
      color: 'from-pink-400 to-rose-500',
      content: `My silly, wonderful wife,

Remember that time you tried to cook dinner and accidentally used salt instead of sugar in the dessert? We laughed until our stomachs hurt, and I realized that even your "disasters" are perfect because they're ours.

Or when you got so excited about that movie that you spoiled the ending for yourself while trying to avoid spoilers? Your face was priceless!

These moments of pure joy and laughter are what make our love story so beautifully unique. You don't just make me laugh - you make my soul dance with happiness.

Keep being your wonderfully quirky self. I fall in love with your laugh every single day.

Your comedy partner for life 😄`
    },
    {
      id: 'special',
      title: 'Open when you feel special',
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      content: `To my extraordinary wife,

You are not just special - you are extraordinary, magical, and irreplaceable. In a world of billions, there is only one you, and somehow, miraculously, you chose to love me.

Your kindness touches everyone around you. Your strength inspires me daily. Your love transforms ordinary moments into treasured memories. You have this incredible ability to make everyone feel seen and valued, especially me.

You are the star that guides me home, the dream I never dared to dream, and the answer to prayers I didn't know I was praying.

Never forget how truly special you are, not just to me, but to this world.

In awe of you always ⭐`
    },
    {
      id: 'night',
      title: 'Open before you sleep',
      icon: Moon,
      color: 'from-indigo-400 to-purple-500',
      content: `My darling,

As you prepare for sleep, I want you to drift off knowing that you are deeply, completely, and eternally loved. Today, like every day, you made the world brighter just by being in it.

Let go of any worries from today. Tomorrow is a new canvas for us to paint more beautiful memories together. Rest your beautiful mind and gentle heart.

I'll be right here beside you, grateful for another day of loving you and being loved by you. Sweet dreams, my love.

May your dreams be filled with all the happiness you bring to my waking hours.

Sleep well, my heart 🌙`
    },
    {
      id: 'love',
      title: 'Open when you doubt my love',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      content: `My beloved wife,

If you're reading this, perhaps you're having one of those moments where doubt creeps in. Let me be absolutely clear: my love for you is not a feeling that comes and goes - it's a choice I make every single day, and it's the easiest choice I've ever made.

You are woven into the very fabric of my being. You are in my thoughts when I wake, in my heart throughout the day, and in my dreams when I sleep. My love for you doesn't diminish with time - it grows stronger, deeper, more profound.

Even on our difficult days, even when we disagree, even when life gets complicated - my love for you remains constant, unwavering, and true.

You are my person, my home, my forever.

With all my love, always and forever 💕`
    }
  ];

  const openEnvelope = (letterId: string) => {
    setOpenLetter(letterId);
  };

  const closeLetter = () => {
    setOpenLetter(null);
  };

  return (
    <section className="py-20 px-4 vintage-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 vintage-title animate-fade-in">
          Letters to My Love
        </h2>
        
        <p className="text-center text-gray-600 mb-12 text-lg italic vintage-text">
          "Words from my heart, sealed with love, waiting for the perfect moment"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter, index) => {
            const Icon = letter.icon;
            return (
              <div
                key={letter.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openEnvelope(letter.id)}
              >
                <div className="vintage-envelope bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-2 border-amber-200">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${letter.color} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-4 group-hover:text-rose-600 transition-colors duration-300">
                    {letter.title}
                  </h3>
                  
                  <div className="flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rose-400 animate-pulse" />
                    <span className="ml-2 text-sm text-gray-600 font-medium">Click to open</span>
                  </div>
                  
                  {/* Vintage wax seal effect */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full opacity-80 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Letter Modal */}
      {openLetter && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-2xl w-full">
            <div className="vintage-letter bg-amber-50 p-8 rounded-lg shadow-2xl border-4 border-amber-200 animate-scale-in">
              <div className="vintage-paper-texture">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {letters.find(l => l.id === openLetter)?.title}
                  </h3>
                  <div className="w-16 h-1 bg-rose-400 mx-auto"></div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line font-serif text-lg">
                    {letters.find(l => l.id === openLetter)?.content}
                  </p>
                </div>
                
                {/* Vintage decorative elements */}
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <div className="w-16 h-px bg-rose-300"></div>
                    <Heart className="w-4 h-4 text-rose-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={closeLetter}
              className="absolute -top-4 -right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoveLetters;