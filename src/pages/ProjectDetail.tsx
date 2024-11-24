import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data";
import Show from "../components/Show";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="h-[50vh] sm:h-screen relative overflow-hidden">
        <div className="relative h-full w-full">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain sm:object-cover sm:scale-105 px-4 sm:px-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent sm:block" />
        </div>
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end">
          <motion.div
            className="max-w-6xl mx-auto w-full"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-yellow-400 transform -rotate-2">
              {project.title}
              {project.type === "professional" ?(
                <span className="text-sm sm:text-base md:text-lg bg-green-400 text-black px-3 py-1 ml-4 inline-block transform rotate-2">
                  {project.company}
                </span>
              ) : (
                <span className="text-sm sm:text-base md:text-lg bg-yellow-300 text-black px-3 py-1 ml-4 inline-block transform rotate-2">
                  Personal
                </span>
              )}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-yellow-400 text-black px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-xl font-bold transform rotate-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white border-t-4 sm:border-t-8 border-b-4 sm:border-b-8 border-black relative">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <motion.div
            className="bg-pink-400 p-4 sm:p-8 transform -rotate-1 border-2 sm:border-4 border-black neo-brutal-shadow mb-8 sm:mb-12 hover:rotate-0 transition-transform"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-lg sm:text-2xl transform rotate-1">
              {project.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <Show when={Boolean(project.github)}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-black text-white p-4 sm:p-6 text-base sm:text-xl font-bold hover:bg-white hover:text-black transition-colors border-2 sm:border-4 border-black transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000]"
              >
                <Github size={20} className="sm:w-7 sm:h-7" /> View Source
              </a>
            </Show>

            <Show when={Boolean(project.live)}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 bg-green-400 text-black p-4 sm:p-6 text-base sm:text-xl font-bold hover:bg-black hover:text-white transition-colors border-2 sm:border-4 border-black transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000]"
              >
                <ExternalLink size={20} className="sm:w-7 sm:h-7" /> Live Demo
              </a>
            </Show>

            <Show when={Boolean(project.linkedin)}>
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-2 flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 text-white p-4 sm:p-6 text-base sm:text-xl font-bold hover:bg-white hover:text-blue-600 transition-colors border-2 sm:border-4 border-black transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000]"
              >
                <svg
                  className="sm:w-7 sm:h-7 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View on LinkedIn
              </a>
            </Show>
          </div>

          <motion.div
            className="bg-blue-400 p-4 sm:p-8 border-2 sm:border-4 border-black transform rotate-1 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 transform -rotate-1">
              Key Features
            </h2>
            <ul className="space-y-2 sm:space-y-4 transform -rotate-1">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 sm:gap-4 text-base sm:text-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-black text-white w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm sm:text-base">
                    {index + 1}
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
