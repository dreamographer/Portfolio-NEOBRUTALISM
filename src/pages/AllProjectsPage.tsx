import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const allProjects = [
  // Featured Projects
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with React and Node.js",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["React", "Node.js", "MongoDB"],
    featured: true,
  },
  {
    id: "2",
    title: "ZenSync",
    description: "A SaaS application for streamlined workflow management",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["SaaS", "React", "Node.js"],
    featured: true,
  },
  {
    id: "3",
    title: "AI Dashboard",
    description: "Analytics dashboard with AI-powered insights",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["Python", "TensorFlow", "React"],
    featured: true,
  },
  // Mini Projects
  {
    id: "4",
    title: "Weather App",
    description: "A minimalist weather application with real-time updates",
    image:
      "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["React", "OpenWeather API"],
    featured: false,
  },
  {
    id: "5",
    title: "Task Manager",
    description: "Simple but powerful task management tool",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["React", "LocalStorage"],
    featured: false,
  },
  // Add more mini projects here
];

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-4 sm:p-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 sm:mb-8 bg-black text-white font-bold py-2 px-3 sm:px-4 text-sm sm:text-base border-2 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          ← BACK HOME
        </Link>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 sm:mb-16 border-b-4 border-black pb-2 sm:pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ALL PROJECTS
        </motion.h1>

        {/* Featured Projects Section */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 border-l-4 sm:border-l-8 border-yellow-400 pl-3 sm:pl-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          FEATURED PROJECTS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
          {allProjects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>

        {/* Mini Projects Section */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 border-l-4 sm:border-l-8 border-yellow-400 pl-3 sm:pl-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          MINI PROJECTS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {allProjects
            .filter((project) => !project.featured)
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

// ProjectCard Component
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm border-2 sm:border-4 border-black p-4 sm:p-6 neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full aspect-video object-cover border-2 border-black mb-4 sm:mb-6"
      />
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{project.title}</h2>
      <p className="text-sm sm:text-base mb-4 sm:mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-yellow-400 text-black px-2 sm:px-3 py-1 text-xs sm:text-sm border-2 border-black"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={`/project/${project.id}`}
        className="inline-block bg-black text-white font-bold py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base border-2 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        VIEW PROJECT →
      </Link>
    </motion.div>
  );
}
