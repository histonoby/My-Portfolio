"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// アプリ・サービスのカード
const appProjects = [
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
    image: "/images/japanese-stock-screening.png",
    liveUrl: "https://japanese-stock-screening-webver.vercel.app/",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 3,
    title: "RapidReport | 声で終わる爆速日報",
    description: "現場での音声メモをAIが日報フォーマットに即整形。写真自動整理とワンタップの完了スタンプで、5分かかっていた報告を30秒に短縮するデモ。",
    tags: ["Next.js", "音声入力", "UI Prototype"],
    image: "/images/rapid-report.png",
    liveUrl: "https://rapid-report-six.vercel.app/",
    githubUrl: null,
    isPlaceholder: false,
  },
];

// テックヒストリーのカード
const historyCards = [
  {
    id: 3,
    title: "AI/ML History Timeline",
    description: "機械学習の歴史を辿るタイムライン。1950年のチューリングテスト提唱から生成AIまで、重要な転換点を紹介します。",
    tags: ["Next.js", "Canvas", "Animation"],
    image: "/images/history-ai.png",
    liveUrl: "/history",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 4,
    title: "QR Code History",
    description: "QRコード誕生の裏側から普及の転換点までをまとめたタイムライン。工場の課題から世界標準までの軌跡を紹介します。",
    tags: ["Canvas", "Animation", "Timeline"],
    image: "/images/history-qr.png",
    liveUrl: "/history/qr",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 5,
    title: "Semiconductor History",
    description: "半導体の歴史を辿るタイムライン。1947年のトランジスタ誕生からオングストローム時代まで、シリコンが紡ぐ進化の記録。",
    tags: ["Canvas", "Circuit", "Timeline"],
    image: "/images/history-semi.png",
    liveUrl: "/history/semiconductor",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 6,
    title: "Programming Language History",
    description: "プログラミング言語の歴史を辿るタイムライン。1957年のFortranから現代のRust/Goまで、人間と機械の対話の進化を紹介。",
    tags: ["Canvas", "Syntax", "Timeline"],
    image: "/images/history-prog.png",
    liveUrl: "/history/programming",
    githubUrl: null,
    isPlaceholder: false,
  },
  {
    id: 7,
    title: "Computing History",
    description: "コンピューターの黎明期から未来の量子計算までを辿るタイムライン。レトロCRT風の演出で進化の軌跡を表示します。",
    tags: ["Canvas", "Retro", "Timeline"],
    image: "/images/history-computer.png",
    liveUrl: "/history/computer",
    githubUrl: null,
    isPlaceholder: false,
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
            {appProjects.map((project, index) => {
              const Card = (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`relative bg-cyber-darker border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover-lift ${!project.isPlaceholder ? "hover:border-cyber-accent/50 cursor-pointer" : ""}`}>
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
                      <div className="flex flex-wrap gap-2 mb-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-cyber-accent/10 text-cyber-accent rounded-md border border-cyber-accent/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-cyber-accent to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
                    </div>
                  </div>
                </motion.div>
              );

              if (!project.isPlaceholder && project.liveUrl) {
                return (
                  <Link key={project.id} href={project.liveUrl} className="block">
                    {Card}
                  </Link>
                );
              }
              return Card;
            })}
          </div>

          {/* History Section */}
          <div className="mt-20 mb-8">
            <h3 className="section-title gradient-text">History</h3>
            <p className="mt-6 text-gray-400 max-w-2xl">
              技術の転換点をまとめたタイムラインをカード形式で紹介します。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyCards.map((project, index) => {
              const Card = (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`relative bg-cyber-darker border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 hover-lift ${!project.isPlaceholder ? "hover:border-cyber-accent/50 cursor-pointer" : ""}`}>
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
                      <div className="flex flex-wrap gap-2 mb-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-cyber-accent/10 text-cyber-accent rounded-md border border-cyber-accent/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-cyber-accent to-transparent transform rotate-45 translate-x-8 -translate-y-4" />
                    </div>
                  </div>
                </motion.div>
              );

              if (!project.isPlaceholder && project.liveUrl) {
                return (
                  <Link key={project.id} href={project.liveUrl} className="block">
                    {Card}
                  </Link>
                );
              }
              return Card;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

