import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Instagram } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-yellow-400 relative overflow-hidden px-4 py-12 sm:py-16 md:py-20">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 grid-rows-8 opacity-10">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="border-[1px] sm:border-2 border-black" />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column - Text Content */}
        <motion.div
          className="text-left space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-white p-2 sm:p-3 border-2 border-black shadow-brutal">
            <span className="text-xs sm:text-sm md:text-base font-bold">
              👋 HELLO, I'M ASHWIN K V
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold space-y-2 sm:space-y-4">
            <motion.span
              className="block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-white px-2 py-1 inline-block -rotate-2 shadow-brutal">
                BUILDING
              </span>
            </motion.span>
            <motion.span
              className="block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-black text-white px-2 py-1 inline-block rotate-2 shadow-brutal-white">
                THE FUTURE
              </span>
            </motion.span>
          </h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-md bg-white p-3 sm:p-4 border-2 border-black shadow-brutal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            I craft stunning websites by combining creative design using
            cutting-edge AI technologies. Let's build something extraordinary
            together.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex gap-2 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://github.com/dreamographer"
              className="bg-black text-white p-2 sm:p-3 hover:bg-white hover:text-black border-2 border-black transition-all duration-300 shadow-brutal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/ashwin-kv"
              className="bg-black text-white p-2 sm:p-3 hover:bg-white hover:text-black border-2 border-black transition-all duration-300 shadow-brutal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://instagram.com/dreamographer_"
              className="bg-black text-white p-2 sm:p-3 hover:bg-white hover:text-black border-2 border-black transition-all duration-300 shadow-brutal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="relative w-full order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block w-full max-w-[200px] sm:max-w-md mx-auto lg:max-w-none">
            {/* Decorative squares */}
            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-black -z-10" />
            <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-full h-full bg-white border-2 border-black -z-20" />

            {/* Main image container */}
            <div className="relative border-2 border-black bg-white">
              <img
                src="https://i.ibb.co/W3bhvG1/1000656484-removebg-2.png"
                alt="Ashwin K V"
                className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-8 h-8 sm:w-12 sm:h-12 animate-bounce" />
      </motion.div>
    </section>
  );
}
