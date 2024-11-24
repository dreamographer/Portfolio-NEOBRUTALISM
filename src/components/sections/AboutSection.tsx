import { Bot, Cpu, Brain } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const AboutSection = () => {
  return (
    <motion.div
      className="col-span-2 bg-yellow-400 p-6 sm:p-12 neo-brutal-shadow rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8">
          AI-POWERED DEVELOPER
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          Leveraging cutting-edge AI technologies to build innovative digital
          solutions. From smart web applications to AI-integrated platforms, I
          create experiences that push the boundaries of what's possible.
        </p>
        <div className="flex gap-3 sm:gap-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white flex items-center justify-center rounded-lg">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white flex items-center justify-center rounded-lg border-2 border-black">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black text-white flex items-center justify-center rounded-lg">
            <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
