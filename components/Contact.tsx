"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

// X (Twitter) Icon Component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Section Title */}
          <div className="mb-12">
            <h2 className="section-title gradient-text mx-auto">Contact</h2>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              お問い合わせやご質問がありましたら、
              <br className="hidden sm:block" />
              お気軽にご連絡ください。
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="relative bg-cyber-darker border border-gray-800 rounded-2xl p-8 md:p-12 glow-box"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyber-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyber-blue/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-cyber-accent/20 to-cyber-blue/20 flex items-center justify-center border border-cyber-accent/30">
                <MessageSquare className="text-cyber-accent" size={32} />
              </div>

              {/* Social Links */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* X (Twitter) Link */}
                <a
                  href="https://x.com/histonoby_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-cyber-dark border border-gray-700 rounded-xl hover:border-cyber-accent/50 transition-all duration-300 hover-lift w-full sm:w-auto justify-center"
                >
                  <XIcon size={20} />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    @histonoby_dev
                  </span>
                  <Send
                    size={16}
                    className="text-gray-600 group-hover:text-cyber-accent group-hover:translate-x-1 transition-all"
                  />
                </a>
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-gray-800"
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm font-mono">
                  <Mail size={14} className="text-cyber-accent/50" />
                  <span>DMでお気軽にお問い合わせください</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Code Comment */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8 text-gray-600 font-mono text-sm"
          >
            <span className="text-cyber-purple">{"//"}</span> Let&apos;s build something amazing together!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

