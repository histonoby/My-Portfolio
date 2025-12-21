"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code2, Lightbulb, Rocket } from "lucide-react";

const skills = [
  { name: "Embedded Systems", icon: Cpu, color: "cyber-accent" },
  { name: "Web Development", icon: Code2, color: "cyber-blue" },
  { name: "Problem Solving", icon: Lightbulb, color: "cyber-purple" },
  { name: "App Development", icon: Rocket, color: "cyber-pink" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="section-title gradient-text">About Me</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Terminal Style Info */}
            <div className="space-y-6">
              {/* Terminal Window */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-cyber-darker border border-cyber-accent/20 rounded-lg overflow-hidden glow-box"
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-cyber-dark border-b border-cyber-accent/20">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-sm text-gray-500 font-mono">about.sh</span>
                </div>
                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-3">
                  <p>
                    <span className="text-cyber-accent">$</span>{" "}
                    <span className="text-gray-400">cat profile.json</span>
                  </p>
                  <div className="text-gray-300 pl-4 space-y-1">
                    <p>
                      <span className="text-cyber-purple">&quot;name&quot;</span>:{" "}
                      <span className="text-cyber-blue">&quot;Moto&quot;</span>,
                    </p>
                    <p>
                      <span className="text-cyber-purple">&quot;role&quot;</span>:{" "}
                      <span className="text-cyber-blue">&quot;Embedded × App Developer&quot;</span>,
                    </p>
                    <p>
                      <span className="text-cyber-purple">&quot;passion&quot;</span>:{" "}
                      <span className="text-cyber-blue">&quot;Creating useful apps&quot;</span>,
                    </p>
                    <p>
                      <span className="text-cyber-purple">&quot;motto&quot;</span>:{" "}
                      <span className="text-cyber-blue">&quot;あったらいいなを形に&quot;</span>
                    </p>
                  </div>
                  <p className="flex items-center">
                    <span className="text-cyber-accent">$</span>{" "}
                    <span className="text-gray-400 terminal-cursor ml-2"></span>
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-400 leading-relaxed"
              >
                組み込みシステムの開発経験を活かしながら、日常の「あったらいいな」を解決する
                アプリケーションを開発しています。ハードウェアとソフトウェアの両方の視点から、
                ユーザーにとって本当に価値のあるプロダクトを追求しています。
              </motion.p>
            </div>

            {/* Right: Skills */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group relative bg-cyber-darker border border-gray-800 rounded-xl p-6 hover:border-cyber-accent/50 transition-all duration-300 hover-lift"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-${skill.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <skill.icon
                      size={24}
                      className={`text-${skill.color}`}
                    />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
                  <div className={`w-8 h-0.5 bg-${skill.color} rounded-full`} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

