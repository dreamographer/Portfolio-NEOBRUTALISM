import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Code } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { Toaster, toast } from "sonner";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading("Sending message...");

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.text === "OK") {
        toast.success("Message sent successfully!", {
          id: loadingToast,
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            border: "2px solid #000",
          },
        });
        form.current?.reset();
      } else {
        toast.error("Failed to send message. Please try again.", {
          id: loadingToast,
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            border: "2px solid #000",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.", {
        id: loadingToast,
        duration: 3000,
        style: {
          background: "#000",
          color: "#fff",
          border: "2px solid #000",
        },
      });
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-white p-4 sm:p-8 py-16 sm:py-24"
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            border: "2px solid #000",
            borderRadius: "0px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "bold",
          },
          duration: 3000,
        }}
      />

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-16 border-b-4 border-black pb-2 sm:pb-4">
          CONTACT
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Get in touch
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-yellow-400 p-3 sm:p-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-sm sm:text-base">
                  ashwinkv.akv@gmail.com
                </span>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://linkedin.com/in/ashwin-kv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 p-3 sm:p-4 hover:bg-black hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://github.com/ashwin-kv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 p-3 sm:p-4 hover:bg-black hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://instagram.com/ashwin_kv_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 p-3 sm:p-4 hover:bg-black hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://leetcode.com/ashwin_kv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 p-3 sm:p-4 hover:bg-black hover:text-white transition-colors"
                >
                  <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          <form
            ref={form}
            className="space-y-4 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                NAME
              </label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                EMAIL
              </label>
              <input
                type="email"
                name="from_email"
                required
                className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                MESSAGE
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full border-2 border-black p-2 sm:p-3 focus:outline-none focus:border-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 sm:py-4 hover:bg-yellow-400 hover:text-black transition-colors text-sm sm:text-base"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
