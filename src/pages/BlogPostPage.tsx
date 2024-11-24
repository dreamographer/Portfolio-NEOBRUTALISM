import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from '../data';

interface ShareConfig {
  platform: string;
  url: (postUrl: string, title: string) => string;
  icon: JSX.Element;
}

const SHARE_CONFIGS: ShareConfig[] = [
  {
    platform: 'Twitter',
    url: (postUrl, title) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    url: (postUrl, title) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    platform: 'Facebook',
    url: (postUrl, title) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function BlogPostPage() {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  
  const handleShare = async (platform: string) => {
    const postUrl = window.location.href;
    const shareConfig = SHARE_CONFIGS.find(config => config.platform === platform);
    
    if (!shareConfig) return;

    // Try Web Share API first (mobile devices)
    if (platform === 'Share' && navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: postUrl,
        });
        return;
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }

    // Fallback to platform-specific sharing
    const shareUrl = shareConfig.url(postUrl, post?.title || '');
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h2>
          <Link 
            to="/blog" 
            className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Digital Canvas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-yellow-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Hero Section - Updated height and padding */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <time className="text-yellow-200 text-sm tracking-wider uppercase">
                {post.date}
              </time>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mt-4 mb-6">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section - Updated padding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Navigation */}
          <Link 
            to="/blog" 
            className="text-gray-600 hover:text-yellow-600 inline-flex items-center mb-12 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Digital Canvas
          </Link>

          {/* Updated Article Content */}
          <article className="prose prose-lg max-w-none px-0 sm:px-4">
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
              {post.excerpt}
            </p>
            
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              {post.content && post.content.map((section: any, index: number) => (
                <div key={index}>
                  {section.title && (
                    <h2 className="text-2xl font-bold mt-8 mb-4">{section.title}</h2>
                  )}
                  <p className="text-gray-700">{section.text}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Share Section - Updated with functional sharing */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              {SHARE_CONFIGS.map(({ platform, icon }) => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-gray-100 hover:bg-yellow-100 
                    rounded-full text-sm font-medium transition-colors"
                  aria-label={`Share on ${platform}`}
                >
                  {icon}
                  <span>Share on {platform}</span>
                </button>
              ))}
              
              {/* Native Share button for mobile devices */}
              {typeof navigator.share === 'function' && (
                <button
                  onClick={() => handleShare('Share')}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-gray-100 hover:bg-yellow-100 
                    rounded-full text-sm font-medium transition-colors"
                  aria-label="Share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
