import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import LoveLetters from './components/LoveLetters';
import MultimediaCorner from './components/MultimediaCorner';
import HiddenSurprise from './components/HiddenSurprise';
import Guestbook from './components/Guestbook';
import MusicPlayer from './components/MusicPlayer';
import HeartParticles from './components/HeartParticles';

function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 overflow-x-hidden vintage-paper">
      <HeartParticles />
      <MusicPlayer />
      
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Gallery />
        <LoveLetters />
        <MultimediaCorner />
        <HiddenSurprise />
        <Guestbook />
      </main>
    </div>
  );
}

export default App;