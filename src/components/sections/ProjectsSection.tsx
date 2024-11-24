import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  tags: string[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.div className="col-span-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">
        FEATURED PROJECTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
        {projects.slice(0, 3).map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover border-2 border-black rounded-lg mb-3 sm:mb-4"
              />
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                {project.title}
              </h3>
              <p className="mb-3 sm:mb-4 text-gray-700 text-sm sm:text-base">
                {project.subTitle}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-yellow-400 text-black px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm border-2 border-black rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <Link to="/all-projects">
        <motion.button
          className="w-full bg-black text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 border-2 sm:border-4 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
          whileHover={{ scale: 1.01 }}
        >
          VIEW ALL PROJECTS →
        </motion.button>
      </Link>
    </motion.div>
  );
}
