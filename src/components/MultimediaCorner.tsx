import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Music, Video, Play, Pause, Volume2, SkipBack, SkipForward, 
  Rewind, FastForward, X, Maximize2, VolumeX, Minimize2
} from 'lucide-react';

const MultimediaCorner = () => {
  const [activeTab, setActiveTab] = useState<'playlist' | 'videos'>('playlist');
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [audio] = useState<HTMLAudioElement>(new Audio());
  const [volume, setVolume] = useState<number>(0.5);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  
  // Video states
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentVideoData, setCurrentVideoData] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoVolume, setVideoVolume] = useState<number>(0.8);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const playlist = React.useMemo(() => [
    {
      title: "Love me like you do",
      artist: "Ellie Goulding",
      description: "You're the light, you're the night, you're the color of my blood...",
      src: "/src/music/love-me-like-you-do.mp3",
      duration: "4:10"
    },
    {
      title: "Monna Kanipinchavu",
      artist: "Harris Jayaraj",
      description: "Monna Kanipinchavu..Maya marichipoyanu.. Andhalatho nannu thutlu podichave..<3",
      src: "/src/music/monna-kanipinchavu.mp3",
      duration: "5:34"
    },
    {
      title: "Aagi Aagi sage Meghame",
      artist: "Vivek Sagar",
      description: "O.. aagi aagi saage meghamedo.. Nannu taakenaa.. okkasaare Nela veedi kaallu.. ningiloki.. ",
      src: "/src/music/aagi-aagi-sage-meghame.mp3",
      duration: "6:48"
    },
    {
      title: "Taanu Nenu",
      artist: "A R Rahman",
      description: "Taanu nenu moeilu minnu Taanu nenu kaluva kolanuTaanu nenu pairu chenu Taanu nenu veru maanu",
      src: "/src/music/taanu-nenu.mp3",
      duration: "4:14"
    },
    {
      title: "Andala Rakshasive",
      artist: "A R Rahman",
      description: "Andala rakshasive.. gundello gucchaave.. Mithaayi maatalato.. tootaalu pelchaave Kodavalito kasigaa.. manase kosaave...",
      src: "/src/music/andala-rakshasive.mp3",
      duration: "6:11"
    },
    {
      title: "Dil Diyan Gallan",
      artist: "Vishal and Shekhar",
      description: "Dil diyan gallan.. Kardiye kardiye..",
      src: "/src/music/dil-diyan-gallan.mp3",
      duration: "4:20"
    },
    {
      title: "Aa Seetadevi",
      artist: "A R Rahman",
      description: "Aa Seetadevi Navvula.. unnave enti maatala..",
      src: "/src/music/aa-seetadevi.mp3",
      duration: "4:14"
    },
    {
      title: "Ok Jaanu",
      artist: "A R Rahman",
      description: "Jaanoon, chal naa kuch karte hain.. Aa lakeeren padate hai.. Chal naa kuch karte hain...",
      src: "/src/music/ok-jaanu.mp3",
      duration: "3:26"
    },
    {
      title: "Uyyalaina Jampalaina",
      artist: "Sunny M.R.",
      description: "Uyyalaina jampalaina nito ugamani Malli manala puttinchadu sitaramlani..",
      src: "/src/music/uyyalaina-jampalaina.mp3",
      duration: "4:23"
    },
    {
      title: "Nene Kani Nenai Undaga",
      artist: "Yuvan Shankar Raja",
      description: "Thanu chlipiga nagavulu chilikithe.. Tolichanuvula chaluvalu sokithe.. Adi edi ani telisina tarunamu lo.. Magathemari vurike...",
      src: "/src/music/nene-kani-nenai-undaga.mp3",
      duration: "5:04"
    },
    {
      title: "Neeli Meghamulalo",
      artist: "Vivek Sagar",
      description:"Neeli Meghamulalo dharanee thejam.. Nayanaantharangamulalo Vanadhee naadham.....",
      src: "/src/music/neeli-meghamulalo.mp3",
      duration: "4:52"
    }
  ], []);

  const videos = [
    {
      title: "Our First Dance",
      thumbnail: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Swaying to our song under the stars",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: "0:30"
    },
    {
      title: "Cooking Disaster #47",
      thumbnail: "https://images.pexels.com/photos/1119972/pexels-photo-1119972.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "When we tried to make pasta and somehow burned water",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      duration: "1:12"
    },
    {
      title: "Morning Coffee Ritual",
      thumbnail: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Sunday mornings are made for slow coffee and fast kisses",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      duration: "0:45"
    },
    {
      title: "Surprise Birthday",
      thumbnail: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Your reaction when I surprised you with your favorite cake",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      duration: "3:21"
    }
  ];

  // Music player functions
  const handlePlay = useCallback(
    (songSrc: string, index: number) => {
      if (currentSong === songSrc) {
        audio.pause();
        setCurrentSong(null);
        setCurrentSongIndex(null);
      } else {
        // Pause any playing video
        if (currentVideo && videoRef.current) {
          videoRef.current.pause();
          setIsVideoPlaying(false);
          setCurrentVideo(null);
          setCurrentVideoData(null);
        }
        
        audio.pause();
        audio.src = songSrc;
        audio.volume = volume;
        audio.play()
          .then(() => {
            setCurrentSong(songSrc);
            setCurrentSongIndex(index);
          })
          .catch(error => {
            console.error('Audio playback failed:', error);
          });
      }
    },
    [audio, currentSong, volume, currentVideo]
  );

  const playNextSong = useCallback(() => {
    if (currentSongIndex !== null && currentSongIndex < playlist.length - 1) {
      const nextIndex = currentSongIndex + 1;
      const nextSong = playlist[nextIndex].src;
      handlePlay(nextSong, nextIndex);
    } else {
      setCurrentSong(null);
      setCurrentSongIndex(null);
    }
  }, [currentSongIndex, playlist, handlePlay]);

  const playPreviousSong = useCallback(() => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      const prevIndex = currentSongIndex - 1;
      const prevSong = playlist[prevIndex].src;
      handlePlay(prevSong, prevIndex);
    }
  }, [currentSongIndex, playlist, handlePlay]);

  const handlePlayFullPlaylist = useCallback(() => {
    if (playlist.length > 0) {
      setCurrentSongIndex(0);
      handlePlay(playlist[0].src, 0);
    }
  }, [playlist, handlePlay]);

  const handleVolumeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audio.volume = newVolume;
  }, [audio]);

  const handleTimeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    audio.currentTime = newTime;
  }, [audio]);

  // Video player functions
  const handleVideoPlay = useCallback(async (video: any) => {
    // Pause any playing audio
    if (currentSong) {
      audio.pause();
      setCurrentSong(null);
      setCurrentSongIndex(null);
    }

    setCurrentVideo(video.src);
    setCurrentVideoData(video);
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setShowVideoControls(true);
    
    // Wait for the next render cycle to ensure videoRef is updated
    await new Promise(resolve => setTimeout(resolve, 0));

    if (videoRef.current) {
      videoRef.current.src = video.src;
      videoRef.current.volume = videoVolume;
      videoRef.current.muted = isVideoMuted;
      try {
        await videoRef.current.play();
        setIsVideoPlaying(true);
        // Start timeout to hide controls
        resetControlsTimeout();
      } catch (error) {
        console.error('Video playback failed:', error);
        setIsVideoPlaying(false);
        setCurrentVideo(null);
        setCurrentVideoData(null);
      }
    }
  }, [audio, currentSong, videoVolume, isVideoMuted]);

  const toggleVideoPlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => {
            setIsVideoPlaying(true);
            resetControlsTimeout();
          })
          .catch(error => console.error('Error playing video:', error));
      }
    }
  }, [isVideoPlaying]);

  const skipVideoForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
      resetControlsTimeout();
    }
  }, []);

  const skipVideoBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
      resetControlsTimeout();
    }
  }, []);

  const handleVideoTimeUpdate = useCallback(() => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  }, []);

  const handleVideoSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      resetControlsTimeout();
    }
  }, []);

  const handleVideoVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVideoVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsVideoMuted(newVolume === 0);
    }
    resetControlsTimeout();
  }, []);

  const toggleVideoMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !isVideoMuted;
      setIsVideoMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        setVideoVolume(0);
      } else {
        setVideoVolume(videoRef.current.volume);
      }
      resetControlsTimeout();
    }
  }, [isVideoMuted]);

  const resetControlsTimeout = useCallback(() => {
    setShowVideoControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowVideoControls(false);
    }, 3000);
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch(() => {});
      } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
        (videoContainerRef.current as any).webkitRequestFullscreen();
        setIsFullScreen(true);
      } else if ((videoContainerRef.current as any).msRequestFullscreen) {
        ((videoContainerRef.current as any).msRequestFullscreen as () => void)();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false)).catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullScreen(false);
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
        setIsFullScreen(false);
      }
    }
    resetControlsTimeout();
  }, []);

  const closeVideoPlayer = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentVideo(null);
    setCurrentVideoData(null);
    setIsVideoPlaying(false);
    setVideoProgress(0);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  }, []);

  // Effects
  useEffect(() => {
    const onEnded = () => playNextSong();
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);

    const video = videoRef.current;
    if (video) {
      const onVideoTimeUpdate = () => handleVideoTimeUpdate();
      const onVideoPlay = () => setIsVideoPlaying(true);
      const onVideoPause = () => setIsVideoPlaying(false);
      const onVideoClick = () => {
        toggleVideoPlayPause();
        resetControlsTimeout();
      };
      const onVideoEnded = () => {
        setIsVideoPlaying(false);
        setShowVideoControls(true);
      };

      video.addEventListener('timeupdate', onVideoTimeUpdate);
      video.addEventListener('play', onVideoPlay);
      video.addEventListener('pause', onVideoPause);
      video.addEventListener('click', onVideoClick);
      video.addEventListener('ended', onVideoEnded);

      return () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        video.removeEventListener('timeupdate', onVideoTimeUpdate);
        video.removeEventListener('play', onVideoPlay);
        video.removeEventListener('pause', onVideoPause);
        video.removeEventListener('click', onVideoClick);
        video.removeEventListener('ended', onVideoEnded);
      };
    }

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [audio, playNextSong, handleVideoTimeUpdate, toggleVideoPlayPause, resetControlsTimeout]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard shortcuts for video player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentVideo) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          toggleVideoPlayPause();
          break;
        case 'ArrowRight':
          skipVideoForward();
          break;
        case 'ArrowLeft':
          skipVideoBackward();
          break;
        case 'f':
          toggleFullScreen();
          break;
        case 'Escape':
          closeVideoPlayer();
          break;
        case 'm':
          toggleVideoMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideo, toggleVideoPlayPause, skipVideoForward, skipVideoBackward, toggleFullScreen, closeVideoPlayer, toggleVideoMute]);

  return (
    <section className="py-20 px-4  ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Our Multimedia Corner
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg italic">
          "The soundtrack of our love and moments captured in time"
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('playlist')}
              className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 ${
                activeTab === 'playlist'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Music className="w-5 h-5" />
              <span className="font-medium">Our Playlist</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Video className="w-5 h-5" />
              <span className="font-medium">Home Videos</span>
            </button>
          </div>
        </div>

        {/* Playlist */}
        {activeTab === 'playlist' && (
            <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-rose-100">
              <div className="text-center mb-10">
              <Music className="w-16 h-16 text-rose-500 mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Songs That Tell Our Story</h3>
              <p className="text-gray-500 text-lg">Each song holds a piece of our heart</p>
              </div>

              <div className="space-y-4">
              {playlist.map((song, index) => (
                <div
                key={index}
                onClick={() => handlePlay(song.src, index)}
                className={`flex items-center p-5 rounded-xl transition-all duration-300 cursor-pointer border group ${
                  currentSong === song.src
                  ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200 shadow-lg'
                  : 'bg-white border-transparent hover:bg-rose-50 hover:border-rose-100'
                }`}
                >
                <div className={`w-14 h-14 flex items-center justify-center rounded-full mr-5 shadow-md transition-transform duration-300 ${
                  currentSong === song.src
                  ? 'bg-gradient-to-br from-rose-500 to-pink-500 scale-110'
                  : 'bg-gradient-to-br from-rose-200 to-pink-200 group-hover:scale-105'
                }`}>
                  {currentSong === song.src ? (
                  <Pause className="w-6 h-6 text-white" />
                  ) : (
                  <Play className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-lg truncate group-hover:text-rose-600 transition-colors duration-300">
                  {song.title}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                  <p className="text-xs text-gray-400 italic mt-1 truncate">{song.description}</p>
                </div>

                <div className="text-sm text-gray-400 font-mono mr-6 min-w-[56px] text-right">
                  {song.duration}
                </div>

                <Volume2 className="w-5 h-5 text-gray-300 group-hover:text-rose-400 transition-colors duration-300" />
                </div>
              ))}
              </div>

              <div className="text-center mt-10">
              <button 
                onClick={handlePlayFullPlaylist} 
                className="px-10 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
              >
                ▶ Play Full Playlist
              </button>
              </div>
            </div>

            {/* Mini Music Player */}
            {currentSong && (
              <div className="mt-6 p-6 bg-white/95 rounded-2xl shadow-xl border border-rose-100 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Music className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{playlist[currentSongIndex!].title}</h4>
                <p className="text-sm text-gray-500 truncate">{playlist[currentSongIndex!].artist}</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">{playlist[currentSongIndex!].duration}</span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <button
                onClick={playPreviousSong}
                className="p-2 rounded-full bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-400 hover:to-pink-400 transition-all shadow group"
                >
                <SkipBack className="w-6 h-6 text-rose-600 group-hover:text-white" />
                </button>
                <button
                onClick={() => audio.paused ? audio.play() : audio.pause()}
                className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg hover:scale-110 transition-all"
                >
                {audio.paused ? (
                  <Play className="w-7 h-7" />
                ) : (
                  <Pause className="w-7 h-7" />
                )}
                </button>
                <button
                onClick={playNextSong}
                className="p-2 rounded-full bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-400 hover:to-pink-400 transition-all shadow group"
                >
                <SkipForward className="w-6 h-6 text-rose-600 group-hover:text-white" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleTimeChange}
                className="flex-1 accent-rose-500"
                />
                <span className="text-xs text-gray-500 font-mono w-28 text-right">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                {" / "}
                {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Volume</label>
                <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-rose-500 w-32"
                />
              </div>
              </div>
            )}
            </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div className="space-y-8">
            {/* Video Player */}
            {currentVideo && (
              <div 
                ref={videoContainerRef}
                className={`relative mb-8 bg-black rounded-2xl overflow-hidden ${
                  isFullScreen ? 'fixed inset-0 z-50 m-0' : 'max-w-4xl mx-auto'
                }`}
                onMouseMove={resetControlsTimeout}
              >
                <video
                  ref={videoRef}
                  className={`w-full ${isFullScreen ? 'h-screen' : 'h-[500px]'} object-contain bg-black`}
                  preload="metadata"
                />
                
                {/* Video title */}
                {currentVideoData && (
                  <div className="absolute top-4 left-4 text-white text-xl font-semibold bg-black/50 px-3 py-1 rounded-md">
                    {currentVideoData.title}
                  </div>
                )}
                
                {/* Close button */}
                <button
                  onClick={closeVideoPlayer}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10 hover:bg-black/75 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Controls overlay */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm p-4 transition-opacity duration-300 ${
                    showVideoControls ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={toggleVideoPlayPause} 
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </button>
                      
                      <button 
                        onClick={skipVideoBackward} 
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        <Rewind className="w-5 h-5" />
                      </button>
                      
                      <button 
                        onClick={skipVideoForward} 
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        <FastForward className="w-5 h-5" />
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={toggleVideoMute} 
                          className="text-white hover:text-rose-400 transition-colors"
                        >
                          {isVideoMuted || videoVolume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={videoVolume}
                          onChange={handleVideoVolumeChange}
                          className="w-20 accent-rose-500"
                        />
                      </div>
                      
                      <div className="text-white text-sm">
                        {Math.floor(videoRef.current?.currentTime || 0)}s / {Math.floor(videoRef.current?.duration || 0)}s
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={toggleFullScreen}
                        className="text-white hover:text-rose-400 transition-colors"
                      >
                        {isFullScreen ? (
                          <Minimize2 className="w-5 h-5" />
                        ) : (
                          <Maximize2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={handleVideoSeek}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div 
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          onClick={() => handleVideoPlay(video)}
                        >
                          <Play className="w-8 h-8 text-rose-500 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      {currentVideo === video.src && (
                        <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1 rounded">
                          Now Playing
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors duration-300">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MultimediaCorner;