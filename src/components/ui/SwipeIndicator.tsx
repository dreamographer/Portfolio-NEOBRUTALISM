export default function SwipeIndicator() {
  return (
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
} 