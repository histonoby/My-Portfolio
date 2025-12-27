"use client";

import { motion } from "framer-motion";

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient fog */}
      <motion.div
        className="absolute top-[-10%] left-[10%] w-[32rem] h-[32rem] bg-cyber-accent/12 blur-3xl rounded-full"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] w-[36rem] h-[36rem] bg-cyber-blue/12 blur-3xl rounded-full"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[35%] w-[22rem] h-[22rem] bg-cyber-purple/12 blur-3xl rounded-full"
        animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent"
        animate={{ backgroundPositionY: ["0%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "100% 300%" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,170,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

