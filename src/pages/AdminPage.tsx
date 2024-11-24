import { useState } from "react";
import {
  skills,
  projects,
  posts,
  gallery,
  experience,
  education,
} from "../data";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [jsonData, setJsonData] = useState("");
  const [loading, setLoading] = useState(false);

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = "dreamographer";
  const REPO_NAME = "Portfolio-NEOBRUTALISM";
  const BRANCH = "main";
  const FILE_PATH = "src/data/index.ts";

  const sections = {
    skills: skills,
    projects: projects,
    posts: posts,
    gallery: gallery,
    experience: experience,
    education: education,
  };

  const handleEdit = (section: keyof typeof sections) => {
    setActiveSection(section);
    setJsonData(JSON.stringify(sections[section], null, 2));
  };

  const generateFileContent = () => {
    const allExports = Object.entries(sections).map(([key, value]) => {
      const data = key === activeSection ? JSON.parse(jsonData) : value;
      return `export const ${key} = ${JSON.stringify(data, null, 2)};`;
    });
    return allExports.join("\n\n");
  };

  const handleSave = async () => {
    if (!GITHUB_TOKEN) {
      alert("GitHub token not configured!");
      return;
    }

    setLoading(true);
    try {
      const getCurrentFile = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!getCurrentFile.ok) {
        throw new Error("Failed to fetch current file");
      }

      const currentFile = await getCurrentFile.json();

      const content = btoa(unescape(encodeURIComponent(generateFileContent())));

      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `Update ${activeSection} data via admin panel`,
            content: content,
            sha: currentFile.sha,
            branch: BRANCH,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update file");
      }

      alert(
        "Changes saved! The site will update once Vercel completes the deployment."
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving changes: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      {!GITHUB_TOKEN && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Warning: GitHub token not configured. Updates will not work.
        </div>
      )}

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
        disabled={loading || !GITHUB_TOKEN}
        className={`px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 ${
          loading || !GITHUB_TOKEN ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminPage;
