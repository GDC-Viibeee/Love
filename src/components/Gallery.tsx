import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Camera, Home } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string>('travels');

  const albums = {
    travels: {
      title: "Our Adventures",
      icon: MapPin,
      photos: [
        {
          src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Romantic sunset couple",
          caption: "Our first sunset together in Paris, 2017",
          date: "Summer 2017"
        },
        {
          src: "https://images.pexels.com/photos/2887718/pexels-photo-2887718.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Mountain adventure",
          caption: "Conquering mountains and hearts",
          date: "Fall 2018"
        },
        {
          src: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Beach vacation",
          caption: "Barefoot walks on endless beaches",
          date: "Summer 2019"
        }
      ]
    },
    everyday: {
      title: "Everyday Magic",
      icon: Home,
      photos: [
        {
          src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Morning coffee",
          caption: "Sunday morning coffee rituals",
          date: "Every Weekend"
        },
        {
          src: "https://images.pexels.com/photos/1119972/pexels-photo-1119972.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Cooking together",
          caption: "Creating culinary disasters and memories",
          date: "Daily Adventures"
        },
        {
          src: "https://images.pexels.com/photos/1024949/pexels-photo-1024949.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Reading together",
          caption: "Quiet moments, loud love",
          date: "Every Evening"
        }
      ]
    },
    adventures: {
      title: "Life's Adventures",
      icon: Camera,
      photos: [
        {
          src: "https://images.pexels.com/photos/2887718/pexels-photo-2887718.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Hiking adventure",
          caption: "Exploring new trails, hand in hand",
          date: "Spring 2020"
        },
        {
          src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "City exploration",
          caption: "Getting lost in new cities together",
          date: "Various Times"
        },
        {
          src: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
          alt: "Festival fun",
          caption: "Dancing under the stars",
          date: "Summer Festivals"
        }
      ]
    }
  };

  const currentAlbum = albums[activeAlbum as keyof typeof albums];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % currentAlbum.photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? currentAlbum.photos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="py-20 px-4 vintage-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 vintage-title animate-fade-in">
          Our Beautiful Memories
        </h2>
        
        <p className="text-center text-gray-600 mb-12 text-lg italic vintage-text">
          "Every picture tells a story, but ours tells a love story"
        </p>

        {/* Album Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg vintage-card">
            {Object.entries(albums).map(([key, album]) => {
              const Icon = album.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveAlbum(key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeAlbum === key
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{album.title}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAlbum.photos.map((photo, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-fade-in-up vintage-photo-frame"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 bg-white p-3">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover rounded group-hover:scale-110 transition-transform duration-700 sepia-filter"
                />
                <div className="absolute inset-3 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-sm">{photo.caption}</p>
                    <p className="text-xs opacity-80">{photo.date}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
                  </div>
                </div>
                
                {/* Vintage photo corner */}
                <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-300 opacity-60"></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-300 opacity-60"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl max-h-full">
            <div className="bg-white p-6 rounded-lg shadow-2xl">
              <img
                src={currentAlbum.photos[selectedImage].src}
                alt={currentAlbum.photos[selectedImage].alt}
                className="max-w-full max-h-[70vh] object-contain rounded sepia-filter"
              />
              
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-800">{currentAlbum.photos[selectedImage].caption}</p>
                <p className="text-sm text-gray-600 mt-1">{currentAlbum.photos[selectedImage].date}</p>
              </div>
            </div>
            
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;