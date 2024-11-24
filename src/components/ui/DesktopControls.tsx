interface DesktopControlsProps {
  setActiveSkillIndex: (fn: (prev: number) => number) => void;
  totalItems: number;
}

export default function DesktopControls({ setActiveSkillIndex, totalItems }: DesktopControlsProps) {
  return (
    <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
      <button 
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setActiveSkillIndex((prev) => 
          prev === 0 ? totalItems - 1 : prev - 1
        )}
      >
        ↑
      </button>
      <button 
        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setActiveSkillIndex((prev) => 
          (prev + 1) % totalItems
        )}
      >
        ↓
      </button>
    </div>
  );
} 