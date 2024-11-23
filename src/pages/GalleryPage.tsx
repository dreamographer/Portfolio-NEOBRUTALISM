import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images = [
    {
      url: "https://picsum.photos/800/800?random=1",
      title: "Creative Design"
    },
    {
      url: "https://picsum.photos/800/800?random=2",
      title: "Digital Art"
    },
    {
      url: "https://picsum.photos/800/800?random=3",
      title: "Web Development"
    },
    {
      url: "https://picsum.photos/800/800?random=4",
      title: "UI/UX Design"
    },
    {
      url: "https://picsum.photos/800/800?random=5",
      title: "Mobile App"
    },
    {
      url: "https://picsum.photos/800/800?random=6",
      title: "Brand Identity"
    }
  ];

  const nextImage = () => {
    setSelectedImageIndex(prev => 
      prev === null ? 0 : (prev + 1) % images.length
    );
  };

  const previousImage = () => {
    setSelectedImageIndex(prev => 
      prev === null ? 0 : (prev - 1 + images.length) % images.length
    );
  };

  // Add touch handling functions
  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 100) {
      previousImage();
    } else if (info.offset.x < -100) {
      nextImage();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-5xl font-bold mb-8 p-4 bg-yellow-300 inline-block transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Gallery
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white p-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-bold opacity-0 hover:opacity-100">
                  {image.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal Carousel */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              />
              
              {/* Navigation Buttons - Only visible on larger screens */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hidden md:block"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hidden md:block"
              >
                →
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute -top-4 -right-4 bg-white p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  transition-all"
              >
                ✕
              </button>

              {/* Image Title */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg">
                  {images[selectedImageIndex].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage; 