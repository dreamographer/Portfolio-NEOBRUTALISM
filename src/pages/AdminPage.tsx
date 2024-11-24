import { useState } from "react";
import {
  skillsData,
  projects,
  posts,
  galleryImages,
  experienceData,
  educationData,
} from "../data";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [jsonData, setJsonData] = useState("");

  const sections = {
    skillsData: skillsData,
    projects: projects,
    posts: posts,
    galleryImages: galleryImages,
    experienceData: experienceData,
    educationData: educationData,
  };

  const handleEdit = (section: keyof typeof sections) => {
    setActiveSection(section);
    setJsonData(JSON.stringify(sections[section], null, 2));
  };

  const generateFileContent = () => {
    // Start with existing exports
    const allExports = Object.entries(sections).map(([key, value]) => {
      // If this is the section we're editing, use the new data
      const data = key === activeSection ? JSON.parse(jsonData) : value;
      return `export const ${key} = ${JSON.stringify(data, null, 2)};`;
    });

    // Join all exports with newlines between them
    return allExports.join("\n\n");
  };

  const handleSave = async () => {
    try {
      // Validate JSON before proceeding
      JSON.parse(jsonData);

      // Generate the full file content
      const fileContent = generateFileContent();

      // Send the content to our local development server
      const response = await fetch("/api/update-data", {
        method: "POST",
        body: fileContent,
      });

      if (!response.ok) {
        throw new Error("Failed to save file");
      }

      alert(
        "File updated successfully! The page will refresh to show changes."
      );
      window.location.reload();
    } catch (error: any) {
      alert("Error saving file: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {Object.keys(sections).map((section) => (
          <button
            key={section}
            onClick={() => handleEdit(section as keyof typeof sections)}
            className={`px-4 py-2 rounded ${
              activeSection === section
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="w-full h-[600px] p-4 font-mono text-sm border rounded"
          spellCheck="false"
        />
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminPage;
