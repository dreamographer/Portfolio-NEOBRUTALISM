import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = {
  '1': {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with React and Node.js. Features include real-time inventory management, secure payment processing, and a responsive admin dashboard.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1200&h=600",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/example/project",
    live: "https://example.com",
    features: [
      "User authentication and authorization",
      "Real-time inventory tracking",
      "Secure payment processing",
      "Admin dashboard",
      "Order management system"
    ]
  },
  '2': {
    title: "AI Dashboard",
    description: "Analytics dashboard with AI-powered insights. Helps businesses make data-driven decisions through advanced visualization and machine learning predictions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600",
    tags: ["Python", "TensorFlow", "React"],
    github: "https://github.com/example/ai-dashboard",
    live: "https://ai-dashboard.example.com",
    features: [
      "Real-time data visualization",
      "Predictive analytics",
      "Custom reporting",
      "Data export capabilities",
      "Team collaboration tools"
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="h-[80vh] sm:h-screen relative overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover scale-105"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end">
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-yellow-400 transform -rotate-2">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="bg-yellow-400 text-black px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-xl font-bold transform rotate-1">
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
            <p className="text-lg sm:text-2xl transform rotate-1">{project.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 sm:gap-3 bg-black text-white p-4 sm:p-6 text-base sm:text-xl font-bold hover:bg-white hover:text-black transition-colors border-2 sm:border-4 border-black transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000]"
            >
              <Github size={20} className="sm:w-7 sm:h-7" /> View Source
            </a>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 sm:gap-3 bg-green-400 text-black p-4 sm:p-6 text-base sm:text-xl font-bold hover:bg-black hover:text-white transition-colors border-2 sm:border-4 border-black transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000]"
            >
              <ExternalLink size={20} className="sm:w-7 sm:h-7" /> Live Demo
            </a>
          </div>

          <motion.div 
            className="bg-blue-400 p-4 sm:p-8 border-2 sm:border-4 border-black transform rotate-1 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 transform -rotate-1">Key Features</h2>
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