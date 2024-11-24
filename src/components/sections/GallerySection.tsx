import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <motion.div className="col-span-full lg:col-span-3">
      <div className="flex justify-between items-center mb-4 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">GALLERY</h2>
        <Link to="/gallery">
          <span className="text-sm sm:text-base font-bold hover:text-yellow-500">
            View All →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square"
          >
            <div className="absolute inset-0 bg-white border-2 sm:border-4 border-black neo-brutal-shadow rounded-lg overflow-hidden transform transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm sm:text-base font-bold">
                    {image.title}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link to="/gallery">
        <motion.button
          className="w-full mt-4 sm:mt-8 bg-black text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 border-2 sm:border-4 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
          whileHover={{ scale: 1.01 }}
        >
          VIEW FULL GALLERY →
        </motion.button>
      </Link>
    </motion.div>
  );
}
