"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-gray-800/50">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-xl font-bold gradient-text"
          >
            &lt;histonoby /&gt;
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://x.com/Z7RaKsNV7822798"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-cyber-dark border border-gray-800 hover:border-cyber-accent/50 text-gray-400 hover:text-cyber-accent transition-all duration-300"
              aria-label="X (Twitter)"
            >
              <XIcon size={18} />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-gray-500 text-sm font-mono"
          >
            <span>© {currentYear} histonoby.</span>
            <span className="hidden sm:inline">Built with</span>
            <Heart size={14} className="text-cyber-pink hidden sm:inline" />
            <span className="hidden sm:inline">& Next.js</span>
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-cyber-accent transition-colors text-sm font-mono"
          >
            <span className="text-cyber-accent">&lt;</span>
            Back to Top
            <span className="text-cyber-accent">/&gt;</span>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

