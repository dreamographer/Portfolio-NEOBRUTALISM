
import SkillsSection from "./sections/SkillsSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import BlogSection from "./sections/BlogSection";
import GallerySection from "./sections/GallerySection";
import { galleryImages, posts, projects, skillsData } from "../data";


export default function BentoGrid() {
  return (
    <section className="min-h-screen  bg-yellow-50 p-4 sm:p-8 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* About Section */}
          <AboutSection />
          {/* Skills Section */}
          <SkillsSection skillsData={skillsData} />
          {/* Projects Section */}
          <ProjectsSection projects={projects} />
          {/* Blog Section */}
          <BlogSection posts={posts} />

          {/* Gallery Section */}
          <GallerySection images={galleryImages} />
        </div>
      </div>
    </section>
  );
}
