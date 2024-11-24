import { motion } from "framer-motion";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <motion.div 
      className="rounded-xl bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                border-2 border-black hover:translate-x-[3px] hover:translate-y-[3px] 
                hover:shadow-none transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-black mb-6 uppercase text-black">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className="bg-yellow-300 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-bold text-lg">{exp.company}</h3>
              <p className="font-mono text-sm bg-white inline-block px-2 py-1 border border-black">
                {exp.position}
              </p>
              <p className="text-sm font-bold mt-1">{exp.period}</p>
              <div className="mt-2 text-sm">
                {exp.description.split('•').filter(Boolean).map((point, index) => (
                  <div key={index} className="flex gap-2 items-start mb-1">
                    <span className="text-primary">•</span>
                    <span>{point.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 