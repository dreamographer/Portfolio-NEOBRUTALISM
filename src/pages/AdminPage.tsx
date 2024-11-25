import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  skills,
  projects,
  posts,
  gallery,
  experience,
  education,
} from "../data";

// Helper component for labeled inputs
interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

const LabeledInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  multiline = false,
  rows = 4,
}: LabeledInputProps) => {
  const inputClasses =
    "w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base";

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
};

interface AuthFormProps {
  onLogin: (username: string, password: string) => void;
}

const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6 p-4 sm:p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Admin Login
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(username, password);
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("skills");
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = "dreamographer";
  const REPO_NAME = "Portfolio-NEOBRUTALISM";
  const BRANCH = "main";
  const FILE_PATH = "src/data/index.ts";

  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    toast.success("Logged out successfully!");
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

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
    setEditData(sections[section]);
  };

  const generateFileContent = () => {
    const allExports = Object.entries(sections).map(([key, value]) => {
      const data = key === activeSection ? editData : value;
      return `export const ${key} = ${JSON.stringify(data, null, 2)};`;
    });
    return allExports.join("\n\n");
  };

  const handleSave = async () => {
    if (!GITHUB_TOKEN) {
      toast.error("GitHub token not configured!");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Saving changes...");

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

      toast.success(
        "Changes saved successfully! The site will update once Vercel completes the deployment."
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error saving changes: " + (error as Error).message);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  const renderEditor = () => {
    switch (activeSection) {
      case "skills":
        return (
          <div className="space-y-4">
            {editData?.map((category: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    className="flex-1 p-2 border rounded"
                    value={category.title}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].title = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Category Title"
                  />
                  <select
                    className="p-2 border rounded w-full sm:w-auto"
                    value={category.bgColor}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].bgColor = e.target.value;
                      setEditData(newData);
                    }}
                  >
                    <option value="bg-yellow-400">Yellow</option>
                    <option value="bg-white">White</option>
                    <option value="bg-black">Black</option>
                    <option value="bg-yellow-50">Light Yellow</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill: any, skillIdx: number) => (
                    <div key={skillIdx} className="flex gap-2">
                      <input
                        className="flex-1 p-2 border rounded"
                        value={skill.name}
                        onChange={(e) => {
                          const newData = [...editData];
                          newData[idx].skills[skillIdx].name = e.target.value;
                          setEditData(newData);
                        }}
                        placeholder="Skill name"
                      />
                      <button
                        onClick={() => {
                          const newData = [...editData];
                          newData[idx].skills = newData[idx].skills.filter(
                            (_: any, i: number) => i !== skillIdx
                          );
                          setEditData(newData);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newData = [...editData];
                      newData[idx].skills.push({ name: "" });
                      setEditData(newData);
                    }}
                    className="w-full p-2 border border-dashed rounded hover:bg-gray-50"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    id: editData.length + 1,
                    title: "",
                    skills: [],
                    bgColor: "bg-white",
                    textColor: "text-black",
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Category
            </button>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            {editData.map((project: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabeledInput
                    label="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].title = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter project title"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="Subtitle"
                    value={project.subTitle}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].subTitle = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter subtitle"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="Image URL"
                    value={project.image}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].image = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter image URL"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="GitHub URL"
                    value={project.github || ""}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].github = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter GitHub URL"
                  />

                  <LabeledInput
                    label="Live URL"
                    value={project.live || ""}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].live = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter live URL"
                  />

                  <LabeledInput
                    label="LinkedIn URL"
                    value={project.linkedin || ""}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].linkedin = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter LinkedIn URL"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="Description"
                    value={project.description}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].description = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter project description"
                    multiline={true}
                    rows={4}
                    className="col-span-1 sm:col-span-2"
                  />

                  {/* Tags Section */}
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <label className="text-xs text-gray-600">Tags</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded">
                      {project.tags.map((tag: string, tagIdx: number) => (
                        <div
                          key={tagIdx}
                          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => {
                              const newData = [...editData];
                              newData[idx].tags = newData[idx].tags.filter(
                                (_: string, i: number) => i !== tagIdx
                              );
                              setEditData(newData);
                            }}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const tag = prompt("Enter new tag");
                          if (tag) {
                            const newData = [...editData];
                            newData[idx].tags = [
                              ...(newData[idx].tags || []),
                              tag,
                            ];
                            setEditData(newData);
                          }
                        }}
                        className="px-2 py-1 border border-dashed rounded hover:bg-gray-50 text-sm"
                      >
                        + Add Tag
                      </button>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <label className="text-xs text-gray-600">Features</label>
                    <div className="space-y-2 p-2 border rounded">
                      {project.features?.map(
                        (feature: string, featureIdx: number) => (
                          <div key={featureIdx} className="flex gap-2">
                            <input
                              className="flex-1 p-2 border rounded"
                              value={feature}
                              onChange={(e) => {
                                const newData = [...editData];
                                newData[idx].features[featureIdx] =
                                  e.target.value;
                                setEditData(newData);
                              }}
                              placeholder="Feature description"
                            />
                            <button
                              onClick={() => {
                                const newData = [...editData];
                                newData[idx].features = newData[
                                  idx
                                ].features.filter(
                                  (_: string, i: number) => i !== featureIdx
                                );
                                setEditData(newData);
                              }}
                              className="text-red-500 hover:text-red-700 px-2"
                            >
                              ×
                            </button>
                          </div>
                        )
                      )}
                      <button
                        onClick={() => {
                          const newData = [...editData];
                          newData[idx].features = [
                            ...(newData[idx].features || []),
                            "",
                          ];
                          setEditData(newData);
                        }}
                        className="w-full p-2 border border-dashed rounded hover:bg-gray-50"
                      >
                        Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    id: String(editData.length + 1),
                    title: "",
                    subTitle: "",
                    description: "",
                    image: "",
                    tags: [],
                    features: [],
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Project
            </button>
          </div>
        );

      case "posts":
        return (
          <div className="space-y-4">
            {editData.map((post: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabeledInput
                    label="Title"
                    value={post.title}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].title = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Post Title"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="Date"
                    value={post.date}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].date = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="YYYY-MM-DD"
                    className="col-span-1"
                  />

                  <LabeledInput
                    label="Image"
                    value={post.image}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].image = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Image URL"
                    className="col-span-1"
                  />

                  <textarea
                    className="w-full p-2 border rounded col-span-1 sm:col-span-2"
                    value={post.excerpt}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].excerpt = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Excerpt"
                    rows={2}
                  />

                  {/* Content Sections */}
                  <div className="col-span-1 sm:col-span-2 space-y-4">
                    <p className="font-medium">Content Sections</p>
                    {post.content?.map((section: any, sectionIdx: number) => (
                      <div key={sectionIdx} className="border p-3 rounded">
                        <input
                          className="w-full p-2 border rounded mb-2"
                          value={section.title}
                          onChange={(e) => {
                            const newData = [...editData];
                            newData[idx].content[sectionIdx].title =
                              e.target.value;
                            setEditData(newData);
                          }}
                          placeholder="Section Title"
                        />
                        <textarea
                          className="w-full p-2 border rounded"
                          value={section.text}
                          onChange={(e) => {
                            const newData = [...editData];
                            newData[idx].content[sectionIdx].text =
                              e.target.value;
                            setEditData(newData);
                          }}
                          placeholder="Section Content"
                          rows={3}
                        />
                        <button
                          onClick={() => {
                            const newData = [...editData];
                            newData[idx].content = newData[idx].content.filter(
                              (_: any, i: number) => i !== sectionIdx
                            );
                            setEditData(newData);
                          }}
                          className="mt-2 text-red-500 hover:text-red-700"
                        >
                          Remove Section
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newData = [...editData];
                        newData[idx].content = [
                          ...(newData[idx].content || []),
                          { title: "", text: "" },
                        ];
                        setEditData(newData);
                      }}
                      className="w-full p-2 border border-dashed rounded hover:bg-gray-50"
                    >
                      Add Content Section
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    id: String(editData.length + 1),
                    title: "",
                    date: new Date().toISOString().split("T")[0],
                    excerpt: "",
                    image: "",
                    featured: false,
                    content: [],
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Post
            </button>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-4">
            {editData.map((item: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    className="flex-1 p-2 border rounded"
                    value={item.url}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].url = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Image URL"
                  />
                  <input
                    className="flex-1 p-2 border rounded"
                    value={item.title}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].title = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Title"
                  />
                  <button
                    onClick={() => {
                      const newData = editData.filter(
                        (_: any, i: number) => i !== idx
                      );
                      setEditData(newData);
                    }}
                    className="w-full sm:w-auto text-red-500 hover:text-red-700 px-4 py-2 border rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    id: String(editData.length + 1),
                    url: "",
                    title: "",
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Gallery Item
            </button>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            {editData.map((exp: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabeledInput
                    label="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].company = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter company name"
                  />

                  <LabeledInput
                    label="Position"
                    value={exp.position}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].position = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter position"
                  />

                  <LabeledInput
                    label="Period"
                    value={exp.period}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].period = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="e.g., Jan 2020 - Present"
                    className="col-span-1 sm:col-span-2"
                  />

                  <LabeledInput
                    label="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].description = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Enter job description"
                    multiline={true}
                    className="col-span-1 sm:col-span-2"
                  />
                </div>

                <button
                  onClick={() => {
                    const newData = editData.filter(
                      (_: any, i: number) => i !== idx
                    );
                    setEditData(newData);
                  }}
                  className="mt-4 text-red-500 hover:text-red-700"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    company: "",
                    position: "",
                    period: "",
                    description: "",
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Experience
            </button>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            {editData.map((edu: any, idx: number) => (
              <div key={idx} className="border p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className="p-2 border rounded"
                    value={edu.school}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].school = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="School"
                  />
                  <input
                    className="p-2 border rounded"
                    value={edu.degree}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].degree = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Degree"
                  />
                  <input
                    className="p-2 border rounded sm:col-span-2"
                    value={edu.period}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].period = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Period"
                  />
                  <textarea
                    className="w-full p-2 border rounded sm:col-span-2"
                    value={edu.description}
                    onChange={(e) => {
                      const newData = [...editData];
                      newData[idx].description = e.target.value;
                      setEditData(newData);
                    }}
                    placeholder="Description"
                    rows={4}
                  />
                </div>
                <button
                  onClick={() => {
                    const newData = editData.filter(
                      (_: any, i: number) => i !== idx
                    );
                    setEditData(newData);
                  }}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setEditData([
                  ...editData,
                  {
                    school: "",
                    degree: "",
                    period: "",
                    description: "",
                  },
                ]);
              }}
              className="w-full p-3 border border-dashed rounded hover:bg-gray-50"
            >
              Add Education
            </button>
          </div>
        );

      default:
        return (
          <textarea
            value={JSON.stringify(editData, null, 2)}
            onChange={(e) => {
              try {
                setEditData(JSON.parse(e.target.value));
              } catch (error) {
                // Handle invalid JSON
              }
            }}
            className="w-full h-[600px] p-4 font-mono text-sm border rounded"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-2 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Personal Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  GITHUB_TOKEN ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-sm text-gray-600">
                {GITHUB_TOKEN ? "Connected to GitHub" : "GitHub token missing"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>

        {!GITHUB_TOKEN && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p>GitHub token not configured. Updates will not work.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Sidebar - Make it horizontal scrollable on mobile */}
          <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Sections</h2>
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {Object.keys(sections).map((section) => (
                <button
                  key={section}
                  onClick={() => handleEdit(section as keyof typeof sections)}
                  className={`p-3 rounded-lg text-left transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                    activeSection === section
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="capitalize">{section}</span>
                  <span className="text-xs block text-gray-400">
                    {Array.isArray(sections[section as keyof typeof sections])
                      ? `${
                          sections[section as keyof typeof sections].length
                        } items`
                      : "Object"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-xl font-semibold capitalize">
                  {activeSection} Editor
                </h2>
                <button
                  onClick={handleSave}
                  disabled={loading || !GITHUB_TOKEN}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    loading || !GITHUB_TOKEN
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">{renderEditor()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
