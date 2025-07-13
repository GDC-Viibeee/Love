import React from 'react';
import { Calendar, Heart, Star, Gift, Camera } from 'lucide-react';

const Timeline = () => {
  const milestones = [
    {
      date: "First Meeting",
      title: "When Our Eyes Met",
      description: "The moment I knew you were special. Time seemed to stop when I first saw your smile.",
      icon: Heart,
      color: "from-pink-400 to-pink-600"
    },
    {
      date: "First Date",
      title: "Coffee & Conversations",
      description: "Hours felt like minutes as we talked about everything and nothing, discovering our perfect harmony.",
      icon: Calendar,
      color: "from-purple-400 to-purple-600"
    },
    {
      date: "First 'I Love You'",
      title: "Three Little Words",
      description: "Under the starlit sky, when I finally found the courage to say what my heart had been whispering.",
      icon: Star,
      color: "from-pink-500 to-purple-500"
    },
    {
      date: "Our Anniversary",
      title: "One Year Together",
      description: "Celebrating 365 days of laughter, love, and countless beautiful memories we've created together.",
      icon: Gift,
      color: "from-purple-500 to-pink-500"
    },
    {
      date: "Special Moments",
      title: "Every Day Magic",
      description: "From sunrise coffee dates to midnight conversations, every moment with you is a treasure.",
      icon: Camera,
      color: "from-pink-600 to-purple-600"
    }
  ];

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Our Love Story Timeline
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300 rounded-full"></div>
          
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${
                  isLeft ? 'justify-start' : 'justify-end'
                } animate-slide-in-${isLeft ? 'left' : 'right'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-pink-400 z-10"></div>
                
                {/* Content card */}
                <div className={`w-5/12 ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-sm font-semibold text-purple-600 mb-2 uppercase tracking-wide">
                      {milestone.date}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;