import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicUrl = "/src/music/Spring-Flowers.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume and loop
    audio.volume = volume;
    audio.loop = true;

    // Attempt to play automatically after a small delay
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay was prevented:', error);
        setShowPlayPrompt(true);
        setIsPlaying(false);
      }
    };

    // Try autoplay after 1 second (some browsers allow this after page load)
    const autoplayTimer = setTimeout(attemptAutoplay, 1000);

    return () => {
      clearTimeout(autoplayTimer);
      audio.pause();
    };
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
        setShowPlayPrompt(false); // Hide prompt once user interacts
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg animate-fade-in">
      <audio ref={audioRef} src={musicUrl} />
      
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 relative"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
          {showPlayPrompt && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Click to play music
            </div>
          )}
        </button>
        
        <button
          onClick={toggleMute}
          className="text-gray-700 hover:text-pink-600 transition-colors duration-200"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-pink-500"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;