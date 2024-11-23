import { useState } from "react";
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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <main className="relative">
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
              </Route>
            </Routes>
          )}
        </AnimatePresence>
      </main>
    </Router>
  );
}

export default App;
