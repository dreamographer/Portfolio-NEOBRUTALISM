import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSwipeable } from "react-swipeable";
import SwipeIndicator from "../ui/SwipeIndicator";
import DesktopControls from "../ui/DesktopControls";

interface Skill {
  name: string;
}

interface SkillCategory {
  id: number;
  title: string;
  skills: Skill[];
  bgColor: string;
  textColor: string;
}

interface SkillsSectionProps {
  skillsData: SkillCategory[];
}

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

export default function SkillsSection({ skillsData }: SkillsSectionProps) {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
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
          const position =
            (index - activeSkillIndex + skillsData.length) % skillsData.length;
          return (
            <motion.div
              key={skillCard.id}
              style={{
                position: "absolute",
                width: "100%",
                minHeight: "200px",
                top: position * 8,
                zIndex: skillsData.length - position,
                filter: `brightness(${1 - position * 0.15})`,
              }}
              animate={{
                top: position * 8,
                scale: 1 - position * 0.05,
                zIndex: skillsData.length - position,
              }}
              {...(isMobile
                ? useSwipeable({
                    onSwipedLeft: () =>
                      setActiveSkillIndex(
                        (prev) => (prev + 1) % skillsData.length
                      ),
                    onSwipedRight: () =>
                      setActiveSkillIndex(
                        (prev) =>
                          (prev - 1 + skillsData.length) % skillsData.length
                      ),
                    trackMouse: true,
                  })
                : {})}
              className={`${skillCard.bgColor} ${
                skillCard.textColor
              } p-4 sm:p-8 neo-brutal-shadow rounded-lg 
                      flex flex-col ${
                        !isMobile
                          ? "hover:scale-[1.02] transition-transform"
                          : "cursor-grab"
                      }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">
                {skillCard.title}
              </h2>
              <div className="flex flex-wrap gap-2 flex-1">
                {skillCard.skills.map((skill) => (
                  <div key={skill.name}>
                    <span
                      className={`text-xs sm:text-sm font-semibold inline-block py-1 px-2 uppercase ${
                        skillCard.bgColor === "bg-black"
                          ? "bg-yellow-400 text-black"
                          : "bg-black text-white"
                      } rounded-md`}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {isMobile && <SwipeIndicator />}

        {!isMobile && (
          <DesktopControls
            setActiveSkillIndex={setActiveSkillIndex}
            totalItems={skillsData.length}
          />
        )}
      </div>
    </motion.div>
  );
}
