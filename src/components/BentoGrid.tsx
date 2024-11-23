import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Brain, Cpu } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';

const projects = [
  {
    id: "1",
    title: "AI Content Generator",
    description:
      "A powerful content generation platform powered by GPT-4 and custom AI models",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["AI", "React", "Node.js"],
  },
  {
    id: "2",
    title: "Smart Portfolio Builder",
    description:
      "AI-driven portfolio generator that creates personalized websites",
    image:
      "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["AI/ML", "Next.js", "TailwindCSS"],
  },
  {
    id: "3",
    title: "AI Design Assistant",
    description:
      "Intelligent design tool that generates UI components using AI",
    image:
      "https://images.unsplash.com/photo-1675426513141-f0020092d72e?auto=format&fit=crop&q=80&w=800&h=600",
    tags: ["AI", "React", "Python"],
  },
];

const posts = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    date: "2024-03-01",
    excerpt:
      "Exploring how AI is revolutionizing the way we build websites and applications.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: "2",
    title: "Mastering Prompt Engineering",
    date: "2024-02-15",
    excerpt:
      "Tips and techniques for writing effective prompts for AI-powered development.",
    image:
      "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?auto=format&fit=crop&q=80&w=800&h=400",
  },
];

const galleryImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=800",
    title: "AI Generated Art",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Neural Networks",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1675426513141-f0020092d72e?auto=format&fit=crop&q=80&w=800&h=800",
    title: "AI Development",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Machine Learning",
  },
];

const skillsData = [
  {
    id: 1,
    title: "AI SKILLS",
    skills: [
      { name: "AI Integration", level: 95 },
      { name: "Prompt Engineering", level: 90 },
    ],
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "WEB DEV SKILLS",
    skills: [
      { name: "React/Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
    ],
    bgColor: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    id: 3,
    title: "GENERAL SKILLS",
    skills: [
      { name: "Problem Solving", level: 94 },
      { name: "Team Leadership", level: 85 },
    ],
    bgColor: "bg-white",
    textColor: "text-black",
  },
];

const SwipeIndicator = () => (
  <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-sm text-gray-600 font-medium">
    <svg 
      className="w-4 h-4 animate-swipe-right" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7"
      />
    </svg>
    <span>Swipe to explore skills</span>
    <svg 
      className="w-4 h-4 animate-swipe-right" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const DesktopControls = ({ setActiveSkillIndex }: { setActiveSkillIndex: (fn: (prev: number) => number) => void }) => (
  <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
    <button 
      className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
      onClick={() => setActiveSkillIndex((prev) => 
        prev === 0 ? skillsData.length - 1 : prev - 1
      )}
    >
      ↑
    </button>
    <button 
      className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
      onClick={() => setActiveSkillIndex((prev) => 
        (prev + 1) % skillsData.length
      )}
    >
      ↓
    </button>
  </div>
);

const swipeStyles = `
  @keyframes swipe-right {
    0% {
      transform: translateX(-4px);
      opacity: 0;
    }
    50% {
      transform: translateX(4px);
      opacity: 1;
    }
    100% {
      transform: translateX(-4px);
      opacity: 0;
    }
  }
  
  .animate-swipe-right {
    animation: swipe-right 2s infinite;
  }
`;

export default function BentoGrid() {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="min-h-screen bg-white p-4 sm:p-8 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Hero/About Section */}
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
                Leveraging cutting-edge AI technologies to build innovative
                digital solutions. From smart web applications to AI-integrated
                platforms, I create experiences that push the boundaries of
                what's possible.
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

          {/* Skills Section */}
          <motion.div
            className="col-span-1 relative h-[300px] sm:h-[300px] mt-12 sm:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <style>{swipeStyles}</style>
            <div className="relative h-full">
              <div className="absolute -top-8 right-0 text-sm font-medium text-gray-600">
                {activeSkillIndex + 1} / {skillsData.length}
              </div>
              
              {skillsData.map((skillCard, index) => {
                const position = (index - activeSkillIndex + skillsData.length) % skillsData.length;
                return (
                  <motion.div
                    key={skillCard.id}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      top: position * 8,
                      zIndex: skillsData.length - position,
                      filter: `brightness(${1 - position * 0.15})`,
                    }}
                    animate={{
                      top: position * 8,
                      scale: 1 - position * 0.05,
                      zIndex: skillsData.length - position,
                    }}
                    {...(isMobile ? useSwipeable({
                      onSwipedLeft: () => setActiveSkillIndex((prev) => 
                        (prev + 1) % skillsData.length
                      ),
                      onSwipedRight: () => setActiveSkillIndex((prev) => 
                        (prev - 1 + skillsData.length) % skillsData.length
                      ),
                      trackMouse: true
                    }) : {})}
                    className={`${skillCard.bgColor} ${skillCard.textColor} p-4 sm:p-8 neo-brutal-shadow rounded-lg 
                      ${!isMobile ? 'hover:scale-[1.02] transition-transform' : 'cursor-grab'}`}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">
                      {skillCard.title}
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                      {skillCard.skills.map((skill) => (
                        <div key={skill.name} className="relative">
                          <div className="flex mb-2 sm:mb-3 items-center justify-between">
                            <span className={`text-xs sm:text-sm font-semibold inline-block py-1 px-2 uppercase ${
                              skillCard.bgColor === 'bg-black' ? 'bg-yellow-400 text-black' : 'bg-black text-white'
                            } rounded-md`}>
                              {skill.name}
                            </span>
                            <span className="text-xs sm:text-sm font-bold">{skill.level}%</span>
                          </div>
                          <div className={`overflow-hidden h-3 sm:h-4 text-xs flex ${
                            skillCard.bgColor === 'bg-black' ? 'bg-white' : 'bg-black'
                          } border-2 border-current rounded-md`}>
                            <div
                              className={`h-full ${
                                skillCard.bgColor === 'bg-black' ? 'bg-yellow-400' : 'bg-white'
                              } transition-all duration-500`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
              
              {isMobile && <SwipeIndicator />}
              
              {!isMobile && <DesktopControls setActiveSkillIndex={setActiveSkillIndex} />}
            </div>
          </motion.div>

          {/* Projects Section */}
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
                      {project.description}
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

          {/* Blog Section */}
          <motion.div className="col-span-full lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">
              LATEST POSTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-video object-cover rounded-lg mb-3 sm:mb-4"
                    />
                    <time className="text-xs sm:text-sm text-gray-600">
                      {post.date}
                    </time>
                    <h3 className="text-lg sm:text-xl font-bold mt-1 sm:mt-2">
                      {post.title}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>

            <Link to="/blog">
              <motion.button
                className="w-full bg-black text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 border-2 sm:border-4 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
                whileHover={{ scale: 1.01 }}
              >
                READ MORE POSTS →
              </motion.button>
            </Link>
          </motion.div>

          {/* Gallery Section */}
          <motion.div className="col-span-full lg:col-span-3">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                GALLERY
              </h2>
              <Link to="/gallery">
                <span className="text-sm sm:text-base font-bold hover:text-yellow-500">
                  View All →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {galleryImages.map((image, index) => (
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
        </div>
      </div>
    </section>
  );
}
