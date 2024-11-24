import SkillsSection from "./sections/SkillsSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import BlogSection from "./sections/BlogSection";
import GallerySection from "./sections/GallerySection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import { galleryImages, posts, projects, skillsData, experienceData, educationData } from "../data";

export default function BentoGrid() {
  return (
    <section className="min-h-screen bg-yellow-50 p-4 sm:p-8 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 auto-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* About + Skills section */}
          <div className="col-span-1 md:col-span-2">
            <AboutSection />
          </div>
          <div className="col-span-1">
            <SkillsSection skillsData={skillsData} />
          </div>

          {/* Projects section - full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ProjectsSection projects={projects} />
          </div>

          {/* Experience + Education section */}
          <div className="col-span-1 md:col-span-2">
            <ExperienceSection experiences={experienceData} />
          </div>
          <div className="col-span-1">
            <EducationSection education={educationData} />
          </div>

          {/* Blog section - full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <BlogSection posts={posts} />
          </div>

          {/* Gallery section - full width */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <GallerySection images={galleryImages} />
          </div>
        </div>
      </div>
    </section>
  );
}
