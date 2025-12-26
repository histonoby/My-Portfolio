"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Image from "next/image";

// プロジェクトデータ
const projects = [
  {
    id: 1,
    title: "Markdown for Engineer",
    description: "エンジニア向けのMarkdownエディタ・プレビューツール。開発ログを効率的に管理し、プロジェクトごとにドキュメントを整理できます。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: "/images/markdown-editor.png",
    liveUrl: "https://markdown-for-engineer-git-main-histonobys-projects.vercel.app/",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 2,
    title: "StockScreenPro",
    description: "国内株式スクリーニングアプリ。東証プライム全銘柄から投資スタイルに合った銘柄を効率的に見つけられます。PER、PBR、配当利回りなどの条件でフィルタリング可能。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: null,
    liveUrl: "https://japanese-stock-screening-webver.vercel.app/",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 3,
    title: "Coming Soon",
    description: "新しいプロジェクトを準備中です。お楽しみに！",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    image: null,
    liveUrl: null,
    githubUrl: null,
    isPlaceholder: true,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="section-title gradient-text">Projects</h2>
            <p className="mt-6 text-gray-400 max-w-2xl">
              作成したアプリケーションを紹介します。
              <br />
              各プロジェクトをクリックして詳細をご覧ください。
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-cyber-darker border border-gray-800 rounded-xl overflow-hidden hover:border-cyber-accent/50 transition-all duration-500 hover-lift">
                  {/* Project Image / Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-cyber-dark via-cyber-navy to-cyber-darker flex items-center justify-center overflow-hidden">
                    {project.isPlaceholder ? (
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-3 border-2 border-dashed border-cyber-accent/30 rounded-full flex items-center justify-center"
                        >
                          <Sparkles className="text-cyber-accent/50" size={24} />
                        </motion.div>
                        <span className="text-gray-600 text-sm font-mono">// Loading...</span>
                      </div>
                    ) : project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-cyber-accent/10 group-hover:bg-cyber-accent/20 transition-colors" />
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-cyber-accent/10 text-cyber-accent rounded-md border border-cyber-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {!project.isPlaceholder && (
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-accent transition-colors"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-accent transition-colors"
                          >
                            <Github size={16} />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-cyber-accent to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Projects Coming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 font-mono text-sm">
              <span className="text-cyber-accent">/*</span> More projects coming soon...{" "}
              <span className="text-cyber-accent">*/</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

