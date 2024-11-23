import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const allPosts = [
  // Include your existing posts plus more
  {
    id: '1',
    title: "The Future of Web Development",
    date: "2024-03-01",
    excerpt: "Exploring upcoming trends in web development and what they mean for developers.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: '2',
    title: "Mastering React Performance",
    date: "2024-02-15",
    excerpt: "Tips and tricks for optimizing your React applications for better performance.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800&h=400",
  },
  // Add more blog posts here
];

export default function BlogPage() {
  const featuredPost = allPosts[0]; // Use the first post as featured
  const remainingPosts = allPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-8 py-24">
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </Link>
      </div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-7xl font-bold mb-20 text-center">
          <span className="block text-2xl text-gray-600 mb-4">Thoughts & Insights</span>
          Digital Canvas
        </h1>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <Link to={`/blog/${featuredPost.id}`}>
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors" />
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-[60vh] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                <time className="text-sm text-yellow-200">{featuredPost.date}</time>
                <h2 className="text-4xl font-bold mt-2 mb-4">{featuredPost.title}</h2>
                <p className="text-lg mb-6 max-w-2xl">{featuredPost.excerpt}</p>
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-white transition-colors">
                  Read Featured Post
                </button>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Remaining Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {remainingPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-yellow-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center text-black font-semibold">
                    Read More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 