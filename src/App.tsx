import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AllProjectsPage from "./pages/AllProjectsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import GalleryPage from "./pages/GalleryPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <Router>
      <div
        className={`relative ${!isMobile ? "cursor-none" : ""}`}
        onMouseMove={handleMouseMove}
      >
        {!isMobile && (
          <>
            <div
              className={`fixed pointer-events-none z-50 ${
                isMobile ? "hidden" : ""
              }`}
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 32 32"
                className="cursor-svg"
              >
                <path
                  d="M 6 2 L 6 25 L 11 20 L 16 26 L 20 23 L 15 17 L 21 17 L 6 2"
                  fill="white"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </>
        )}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`fixed pointer-events-none z-40 ${
              isMobile ? "hidden" : ""
            }`}
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: "translate(-50%, -50%)",
              transition: `all ${
                300 + index * 100
              }ms cubic-bezier(0.2, 1, 0.2, 1)`,
            }}
          >
            <div
              className={`
                w-4 h-4 rounded-full 
                animate-pulse
                border-2 border-black
                cursor-follower-${index}
              `}
              style={{
                animationDelay: `${index * 200}ms`,
                backgroundColor: index % 2 === 0 ? "#FCD34D" : "#000000",
                opacity: 1 - index * 0.2,
              }}
            />
          </div>
        ))}
        <AnimatePresence>
          {isLoading ? (
            <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          ) : (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="project/:id" element={<ProjectDetail />} />
                <Route path="all-projects" element={<AllProjectsPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:id" element={<BlogPostPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
