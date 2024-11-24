export const skillsData = [
  {
    id: 1,
    title: "Languages",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "SQL" },
      { name: "HTML/CSS" },
    ],
    bgColor: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    id: 2,
    title: "Frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Express.js" },
      { name: "Nest.js" },
      { name: "Redux Toolkit" },
      { name: "Tailwind CSS" },
    ],
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    id: 3,
    title: "Tools",
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Node.js" },
      { name: "Socket.IO" },
    ],
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Databases",
    skills: [{ name: "MongoDB" }, { name: "MySQL" }, { name: "PostgreSQL" }],
    bgColor: "bg-yellow-50",
    textColor: "text-black",
  },
];

export const projects = [
  {
    id: "1",
    title: "Zensync",
    subTitle:
      "A cloud-based software-as-a-service platform designed to enhance collaboration among users",
    description:
      "ZenSync is a cutting-edge collaboration platform designed to redefine teamwork in the digital age. It empowers teams to work together seamlessly in real time, enabling simultaneous document editing, brainstorming on interactive whiteboards, and video conferencing—all within a single, cohesive environment. With AI-powered autocomplete, ZenSync streamlines workflows, saving time and boosting productivity. Its 'work anywhere' design ensures that you can access your tools and documents from any location, while effortless sharing via public URLs enhances collaboration with ease. ZenSync combines simplicity, flexibility, and innovation to help teams achieve more together.",
    image: "https://i.ibb.co/JCMS97g/Screenshot-2024-11-24-at-12-55-58-PM.png",
    tags: [
      "Next",
      "TailwindCSS",
      "TypeScript",
      "Express",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "ChatGPT",
    ],
    featured: true,
    linkedin:
      "https://www.linkedin.com/posts/ashwin-kv_webdevelopment-zensync-realtimecolaboration-activity-7178428330235293696-akac?utm_source=share&utm_medium=member_desktop",
    github: "https://github.com/dreamographer/zenSync-backend",
    live: "https://www.zensync.ltd/",
    features: [
      "Real-time document editing for seamless collaboration",
      "Built-in video conferencing for crystal-clear discussions",
      "Shared interactive whiteboards for visual brainstorming",
      "AI-powered autocomplete to streamline workflows",
      "Anywhere, anytime access to tools and documents",
      "Effortless sharing via public URLs for simplified communication",
    ],
  },
  {
    id: "2",
    title: "OFFIQ",
    subTitle:
      "an e-commerce platform designed for office equipment. Built from scratch with a blend of Node.js , MongoDB , EJS, Tailwind Labs CSS, and Alpine.js, this project truly tested my skills and broadened my capabilities.",
    description:
      "OFFIQ is a feature-rich e-commerce platform tailored for office equipment, combining advanced functionalities with a seamless user experience. Built using modern web technologies like Node.js, MongoDB, EJS, Tailwind CSS, and Alpine.js, it provides both customers and administrators with tools to simplify their interactions and enhance productivity. Hosted on AWS EC2, OFFIQ offers secure transactions via Razorpay and user authentication through Google Auth, ensuring reliability and user trust.",
    image: "https://i.ibb.co/dDW3HDV/Screenshot-2024-11-24-at-12-59-54-PM.png",
    tags: ["Node.js", "MongoDB", "EJS", "TailwindCSS", "Alpine.js"],
    featured: true,
    github: "https://github.com/dreamographer/OFFIQ",
    live: "https://offiq-shop.onrender.com",
    linkedin:
      "https://www.linkedin.com/posts/ashwin-kv_offiq-activity-7124970642424172545-Pore?utm_source=share&utm_medium=member_desktop",
    features: [
      "User Authentication and Authorization",
      "Category-based product browsing with filters and sorting options",
      "Secure payments via Razorpay integration",
      "Google Authentication for user login",
      "Admin panel with graphical insights and stock management",
      "Wallet system for refunds and balance tracking",
      "Coupon management for discounts",
      "Wishlist for saving favorite products",
      "Invoice generation and sales report downloads (PDF/Excel)",
    ],
  },
  {
    id: "3",
    title: "Eatables",
    subTitle:
      "a platform that offers users a convenient way to explore new food options based on their current location.",
    description:
      "Eatables is a full-stack platform designed to enhance food discovery by leveraging location-based services. Developed as a final-year degree project by Me, Darshan Dinesh M.P, and Delbin George, it offered users the ability to explore nearby restaurants, access detailed information, and read user reviews. With features like favorites, drops, and filtered search results, Eatables provided a streamlined and user-friendly dining exploration experience.",
    image: "https://i.ibb.co/swdQmYv/1688368828450.jpg",
    tags: ["php", "mysql", "javascript", "html", "css"],
    featured: true,
    linkedin:
      "https://www.linkedin.com/posts/ashwin-kv_eatables-fullstackdeveloper-team-activity-7081532144665165824-dbXr?utm_source=share&utm_medium=member_desktop",
    features: [
      "Location-based restaurant discovery",
      "Detailed restaurant information",
      "User reviews for informed dining choices",
      "Favorites feature for bookmarking restaurants",
      "Drops feature for food vlogs",
      "Filtered search results for tailored discovery",
    ],
  },
  {
    id: "4",
    title: "Finanshels - Team",
    type: "professional",
    company: "Finanshels",
    subTitle:
      "A Powerful Internal Tool for Streamlining Operations and Client Management at Finanshels",
    description:
      "contributed to the development of a comprehensive internal web application for Finanshels to enhance their operational efficiency, client management, and internal communications. This multi-feature application streamlined various aspects of the organization, from client onboarding and relationship management to HR functions and team operations. With features like a CRM module, compliance calendar generator, and a role-based access control system, the application ensured robust security, seamless collaboration, and improved productivity. It was designed to address Finanshels’ specific needs, combining intuitive interfaces with scalable architecture to simplify complex workflows",
    image: "https://i.ibb.co/SKd1drL/smartmockups-m2yss4zd.png",
    tags: ["Nest.js", "PostgreSQL", "TailwindCSS", "React", "TypeScript"],
    features: [
      "Client Onboarding System: Simplifies adding and managing client lifecycles",
      "CRM Module: Tracks client interactions and relationship management in one place",
      "Compliance Calendar Generator: Automates creation and updates of compliance schedules",
      "Employee Profile Management: Maintains a secure and up-to-date employee repository",
      "Internal Communication System: Integrates chat and email for team collaboration",
      "Team Management Dashboard: Provides visual insights into team structure and performance",
      "HR Management System (HRMS): Handles all HR-related tasks efficiently",
      "Role-Based Access Control (RBAC): Ensures secure and role-specific access to sensitive data",
    ],
  },
  {
    id: "5",
    title: "Fin - CT automation",
    type: "professional",
    company: "Finanshels",
    subTitle: "A Cutting-Edge Automation System to Streamline CT Registration",
    description:
      "contributed to the development of an innovative automation system to simplify and accelerate the CT registration process, reducing the workload on employees and improving operational efficiency. This system automated key tasks such as scheduling appointments, verifying documents, and sending notifications, while providing real-time updates on application statuses.Leveraging Amazon SQS for asynchronous data flow management and integrating it with API Gateway, I ensured seamless handling of REST APIs and reliable processing of tasks. This project demonstrated my ability to build complex systems with robust automation, combining technical expertise with a user-centric approach.",
    image: "https://i.ibb.co/6m2RFq6/Screenshot-2024-11-24-at-1-40-50-PM.png",
    tags: ["Express.js", "PostgreSQL", "TypeScript", "Retool", "SQS"],
    features: [
      "Automated Appointment Scheduling: Coordinates meetings between clients and representatives",
      "Document Verification: Detects expired or missing documents automatically",
      "Notification System: Sends email alerts for missing or expired documents",
      "Asynchronous Processing: Uses Amazon SQS for efficient data flow management",
      "REST API Integration: Connects API Gateway with SQS for seamless API handling",
    ],
  },
  {
    id: "6",
    title: "Finanshels",
    type: "professional",
    company: "Finanshels",
    subTitle: "SaaS for Streamlining Financial Processes for UAE Businesses",
    description:
      "contributed to developing a financial management SaaS tailored for businesses in the UAE market. The platform was designed to simplify accounting processes, automate tax compliance, and provide actionable insights for better decision-making.",
    image:
      "https://cdn.prod.website-files.com/634fc8d084a32a7597b0bde8/66d181c13acdaf47452ce590_Finanshels%20Mockup-p-2000.png",
    tags: ["Next.js", "Nest.js", "PostgreSQL", "TypeScript", "TailwindCSS"],
    live: "https://www.finanshels.com/finanshels-app",
    features: [
      "Automated Tax Compliance Calendar: Includes reminders and Google Calendar integration",
      "Centralized Document Management: Simplifies storage and retrieval of critical financial documents",
      "Accounting Software Integration: Ensures compatibility with existing tools",
      "User-Friendly Interface: Accessible on both desktop and mobile devices",
      "Industry Adaptability: Designed for startups, and SMEs",
      "Enhanced Data Security: Protects sensitive financial information with robust measures",
    ],
  },
  {
    id: "7",
    title: "Portfolio",
    subTitle: "Personal Portfolio",
    description:
      "Personal Portfolio built using React.js, TailwindCSS, and TypeScript in a neo-brutalist design. It showcases my skills, projects, and experiences in a clean and modern interface.",
    image: "https://i.ibb.co/swdQmYv/1688368828450.jpg",
    live: "https://ashwin-kv.vercel.app",
    tags: ["React", "TailwindCSS", "TypeScript"],
    featured: true,
    linkedin:
      "https://www.linkedin.com/posts/ashwin-kv_eatables-fullstackdeveloper-team-activity-7081532144665165824-dbXr?utm_source=share&utm_medium=member_desktop",
    features: [
      "Location-based restaurant discovery",
      "Detailed restaurant information",
      "User reviews for informed dining choices",
      "Favorites feature for bookmarking restaurants",
      "Drops feature for food vlogs",
      "Filtered search results for tailored discovery",
    ],
  },
];

export const posts = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    date: "2024-03-01",
    excerpt:
      "Exploring how AI is revolutionizing the way we build websites and applications.",
    image: "https://picsum.photos/800/400?random=4",
  },
  {
    id: "2",
    title: "Mastering Prompt Engineering",
    date: "2024-02-15",
    excerpt:
      "Tips and techniques for writing effective prompts for AI-powered development.",
    image: "https://picsum.photos/800/400?random=5",
  },
];

export const galleryImages = [
  {
    id: "1",
    url: "https://picsum.photos/800/800?random=6",
    title: "AI Generated Art",
  },
  {
    id: "2",
    url: "https://picsum.photos/800/800?random=7",
    title: "Neural Networks",
  },
  {
    id: "3",
    url: "https://picsum.photos/800/800?random=8",
    title: "AI Development",
  },
  {
    id: "4",
    url: "https://picsum.photos/800/800?random=9",
    title: "Machine Learning",
  },
];
