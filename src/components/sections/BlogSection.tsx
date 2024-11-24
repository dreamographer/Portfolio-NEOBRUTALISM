import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <motion.div className="col-span-full lg:col-span-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">
        LATEST POSTS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-lg mb-3 sm:mb-4"
              />
              <time className="text-xs sm:text-sm text-gray-600">
                {post.date}
              </time>
              <h3 className="text-lg sm:text-xl font-bold mt-1 sm:mt-2">
                {post.title}
              </h3>
            </motion.div>
          </Link>
        ))}
      </div>

      <Link to="/blog">
        <motion.button
          className="w-full bg-black text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 border-2 sm:border-4 border-black neo-brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-lg"
          whileHover={{ scale: 1.01 }}
        >
          READ MORE POSTS →
        </motion.button>
      </Link>
    </motion.div>
  );
}
