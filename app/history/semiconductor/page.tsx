"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  key: string;
};

type Trivia = Record<
  string,
  {
    title: string;
    text: string;
  }
>;

const timeline: TimelineItem[] = [
  {
    year: "1947",
    title: "トランジスタの誕生",
    description:
      "ベル研究所のバーディーン、ブラッテン、ショックレーが点接触型トランジスタを発明。真空管に代わる、小さくて壊れにくい増幅素子の登場は、エレクトロニクス時代の幕開けとなった。",
    key: "transistor",
  },
  {
    year: "1958",
    title: "集積回路 (IC) の発明",
    description:
      "ジャック・キルビー（TI）とロバート・ノイス（Fairchild）がほぼ同時期にICを発明。「数の暴力」と呼ばれた配線の複雑さを、一つのチップ上に回路を作り込むことで解決した。",
    key: "ic",
  },
  {
    year: "1971",
    title: "マイクロプロセッサ (Intel 4004)",
    description:
      "世界初の商用マイクロプロセッサ「4004」が登場。計算機能を持つCPUを1チップに集積。実はこの歴史的発明の影には、ある日本の電卓メーカーの存在があった。",
    key: "4004",
  },
  {
    year: "1980s",
    title: "VLSIと日本の台頭",
    description:
      "微細化技術が進み、超大規模集積回路（VLSI）の時代へ。DRAMを中心としたメモリ市場で日本企業が世界を席巻し、「産業のコメ」と呼ばれるようになった。",
    key: "vlsi",
  },
  {
    year: "1990s",
    title: "ファウンドリモデルの確立",
    description:
      "TSMCのモリス・チャンが、製造に特化する「ファウンドリ」ビジネスを確立。これによりNVIDIAやQualcommなどの工場を持たない「ファブレス」企業が躍進し、分業体制が加速した。",
    key: "foundry",
  },
  {
    year: "2020 - Now",
    title: "オングストローム時代へ",
    description:
      "ナノメートルの壁を超え、原子レベルの制御が求められる時代。EUV露光技術やGAA（Gate-All-Around）構造により、物理限界ギリギリの微細化への挑戦が続いている。",
    key: "future",
  },
];

const triviaData: Trivia = {
  transistor: {
    title: "最初は「失敗作」に見えた",
    text: "1947年の最初の点接触型トランジスタは、プラスチックの楔に金箔を貼り付け、それをゲルマニウムの塊に押し付けただけの不格好な装置でした。しかし、この小さな装置が巨大な真空管を駆逐し、現代文明の基盤となるとは、当時誰も想像していませんでした。",
  },
  ic: {
    title: "ワイヤー地獄からの解放",
    text: "IC以前の回路は、職人が手作業で部品同士をはんだ付けしていました。これを「数の暴力（Tyranny of Numbers）」と呼びます。キルビーは「部品も配線も全部同じシリコンで作ってしまえばいい」という逆転の発想で、この問題を一気に解決しました。",
  },
  "4004": {
    title: "日本の電卓メーカーの注文だった",
    text: "Intel 4004は、日本のビジコン社が「高機能な電卓用チップを作ってほしい」とIntelに依頼したことから生まれました。Intelのエンジニア嶋正利氏らが「汎用的に使えるプログラム方式」を提案し、世界初のCPUが誕生したのです。",
  },
  vlsi: {
    title: "クリーンルームは手術室より綺麗",
    text: "半導体工場（Fab）のクリーンルームは、手術室の1000倍以上清潔です。微細な回路にとって、目に見えない塵一つが巨大な岩石のように作用し、回路をショートさせてしまうからです。",
  },
  foundry: {
    title: "「工場を持たない」という革命",
    text: "かつては設計から製造まで1社で行うのが常識でした。しかし、モリス・チャンは「製造だけを請け負う（TSMC）」ビジネスを開始。当初は「他人の下請け」と笑われましたが、製造の超難易度化に伴い、今や世界最強の技術集団となりました。",
  },
  future: {
    title: "EUV露光の狂気的な技術",
    text: "最新チップの製造に使われるEUV（極端紫外線）露光装置は、溶けたスズの液滴にレーザーを当ててプラズマ化し、光を発生させます。これを「秒間5万回」正確に繰り返すという、人類史上最も精密で複雑な機械と言われています。",
  },
};

type CircuitRunner = {
  x: number;
  y: number;
  direction: number;
  history: { x: number; y: number }[];
  maxLength: number;
  color: string;
  dead: boolean;
  speed: number;
};

export default function SemiconductorHistoryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // 背景の回路生成アニメーション
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    const gridSize = 20;
    let runners: CircuitRunner[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createRunner = (): CircuitRunner => ({
      x: Math.floor(Math.random() * (width / gridSize)) * gridSize,
      y: Math.floor(Math.random() * (height / gridSize)) * gridSize,
      direction: Math.floor(Math.random() * 4),
      history: [],
      maxLength: 10 + Math.random() * 20,
      color: Math.random() > 0.8 ? "#FFD700" : "#00BFFF",
      dead: false,
      speed: 1,
    });

    const initRunners = () => {
      runners = [];
      for (let i = 0; i < 30; i++) {
        runners.push(createRunner());
      }
    };

    const updateRunner = (r: CircuitRunner) => {
      if (r.dead) return;

      r.history.push({ x: r.x, y: r.y });
      if (r.history.length > r.maxLength) {
        r.dead = true;
        return;
      }

      // ランダムに方向転換（直角のみ）
      if (Math.random() < 0.2) {
        if (r.direction % 2 === 0) {
          r.direction = Math.random() > 0.5 ? 1 : 3;
        } else {
          r.direction = Math.random() > 0.5 ? 0 : 2;
        }
      }

      switch (r.direction) {
        case 0:
          r.y -= gridSize;
          break;
        case 1:
          r.x += gridSize;
          break;
        case 2:
          r.y += gridSize;
          break;
        case 3:
          r.x -= gridSize;
          break;
      }

      // 画面外に出たらリセット
      if (r.x < 0 || r.x > width || r.y < 0 || r.y > height) {
        Object.assign(r, createRunner());
      }
    };

    const drawRunner = (r: CircuitRunner) => {
      if (r.history.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.3;

      ctx.moveTo(r.history[0].x, r.history[0].y);
      for (let i = 1; i < r.history.length; i++) {
        ctx.lineTo(r.history[i].x, r.history[i].y);
      }
      ctx.stroke();

      // 先頭にドット（電子）を描画
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      // 完全に消さずに薄い黒を重ねて残像を残す
      ctx.fillStyle = "rgba(11, 12, 21, 0.1)";
      ctx.fillRect(0, 0, width, height);

      runners.forEach((r) => {
        if (r.dead) {
          if (Math.random() > 0.95) Object.assign(r, createRunner());
        } else {
          updateRunner(r);
          drawRunner(r);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    initRunners();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // スクロールによるフェードイン
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".semi-timeline-item").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeTrivia = activeKey ? triviaData[activeKey] : null;

  return (
    <div className="semi-page">
      <canvas ref={canvasRef} id="canvas-bg" />

      <header className="semi-header">
        <h1>SILICON SAGA</h1>
        <p className="subtitle">
          // 砂から生まれた頭脳。
          <br />
          // 物理法則への挑戦と、集積度が紡ぐ進化の記録。
        </p>
        <Link href="/" className="back-link">
          ← Portfolioへ戻る
        </Link>
      </header>

      <div className="semi-timeline">
        {timeline.map((item, index) => (
          <div
            key={item.key}
            className={`semi-timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <span className="year">{item.year}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button
                className="trivia-btn"
                onClick={() => setActiveKey(item.key)}
              >
                Execute: Secrets
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="semi-footer">
        <p>SYSTEM STATUS: OPTIMAL | POWERED BY SILICON</p>
      </footer>

      {activeTrivia && (
        <div className="modal-overlay active" onClick={() => setActiveKey(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveKey(null)}>
              &times;
            </button>
            <span className="tech-data">
              ACCESS LEVEL: CLASSIFIED // DECRYPTING...
            </span>
            <h3 id="modal-title">{activeTrivia.title}</h3>
            <p id="modal-text">{activeTrivia.text}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Roboto+Mono:wght@400;700&family=Noto+Sans+JP:wght@300;400;700&display=swap");
        :root {
          --gold: #ffd700;
          --circuit-blue: #00bfff;
          --bg-dark: #0b0c15;
          --chip-bg: rgba(20, 25, 40, 0.8);
          --border-color: rgba(255, 215, 0, 0.3);
          --text-main: #e0e6ed;
        }
      `}</style>

      <style jsx>{`
        .semi-page {
          position: relative;
          min-height: 100vh;
          background: transparent;
          color: var(--text-main);
          font-family: "Noto Sans JP", sans-serif;
          overflow-x: hidden;
        }

        #canvas-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.6;
          background: var(--bg-dark);
        }

        .semi-header {
          text-align: center;
          padding: 120px 20px 80px;
          position: relative;
          z-index: 10;
          background: radial-gradient(
            circle at center,
            rgba(0, 191, 255, 0.1) 0%,
            transparent 70%
          );
        }

        h1 {
          font-family: "Rajdhani", sans-serif;
          font-weight: 700;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }

        .subtitle {
          font-family: "Roboto Mono", monospace;
          font-size: 1rem;
          color: var(--circuit-blue);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
          border-left: 2px solid var(--gold);
          padding-left: 15px;
          text-align: left;
          display: inline-block;
        }

        .back-link {
          display: inline-flex;
          margin-top: 24px;
          color: var(--gold);
          text-decoration: none;
          font-family: "Roboto Mono", monospace;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        .semi-timeline {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px;
          z-index: 10;
        }

        .semi-timeline::after {
          content: "";
          position: absolute;
          width: 6px;
          background: linear-gradient(180deg, var(--circuit-blue), var(--gold));
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
          box-shadow: 0 0 15px var(--circuit-blue);
          border-radius: 3px;
        }

        .semi-timeline-item {
          padding: 10px 50px;
          position: relative;
          width: 50%;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .semi-timeline-item.visible {
          opacity: 1;
          transform: scale(1);
        }

        .semi-timeline-item.left {
          left: 0;
          text-align: right;
        }

        .semi-timeline-item.right {
          left: 50%;
          text-align: left;
        }

        .semi-timeline-item::after {
          content: "";
          position: absolute;
          width: 24px;
          height: 24px;
          right: -12px;
          background-color: var(--bg-dark);
          border: 2px solid var(--gold);
          top: 30px;
          z-index: 1;
          transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold);
        }

        .semi-timeline-item.right::after {
          left: -12px;
        }

        .content {
          padding: 35px;
          background: var(--chip-bg);
          border: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
          clip-path: polygon(
            10px 0,
            100% 0,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0 100%,
            0 10px
          );
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .content::before {
          content: "";
          position: absolute;
          top: 5px;
          bottom: 5px;
          left: 5px;
          right: 5px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }

        .content:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 191, 255, 0.15);
          border-color: var(--circuit-blue);
        }

        .year {
          font-family: "Rajdhani", sans-serif;
          font-size: 2rem;
          color: var(--gold);
          margin-bottom: 5px;
          display: block;
          font-weight: 700;
        }

        h2 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #fff;
        }

        p {
          line-height: 1.7;
          margin-bottom: 20px;
          color: #ccc;
          font-size: 0.95rem;
        }

        .left .content {
          text-align: right;
        }
        .right .content {
          text-align: left;
        }

        .left .content p,
        .left .content h2 {
          text-align: right;
        }
        .left .trivia-btn {
          flex-direction: row-reverse;
        }

        .trivia-btn {
          background: transparent;
          border: 1px solid var(--circuit-blue);
          color: var(--circuit-blue);
          padding: 10px 20px;
          cursor: pointer;
          font-family: "Roboto Mono", monospace;
          font-size: 0.8rem;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .trivia-btn:hover {
          background: var(--circuit-blue);
          color: #000;
          box-shadow: 0 0 20px var(--circuit-blue);
        }

        .semi-footer {
          text-align: center;
          padding: 80px;
          color: #666;
          font-size: 0.8rem;
          font-family: "Roboto Mono", monospace;
          border-top: 1px solid #222;
          position: relative;
          z-index: 10;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .modal-content {
          background: #151a25;
          border: 2px solid var(--gold);
          padding: 50px;
          max-width: 600px;
          width: 90%;
          position: relative;
          transform: translateY(50px);
          transition: transform 0.3s;
          box-shadow: 0 0 60px rgba(255, 215, 0, 0.1);
        }

        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 25px;
          font-size: 2rem;
          color: var(--gold);
          cursor: pointer;
          background: none;
          border: none;
        }

        .tech-data {
          font-family: "Roboto Mono", monospace;
          color: var(--circuit-blue);
          font-size: 0.8rem;
          margin-bottom: 15px;
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 10px;
        }

        #modal-title {
          margin-bottom: 15px;
          color: var(--gold);
          font-family: "Rajdhani", sans-serif;
          font-size: 1.8rem;
        }

        #modal-text {
          color: #ddd;
          line-height: 1.8;
        }

        @media screen and (max-width: 768px) {
          .semi-timeline::after {
            left: 30px;
          }
          .semi-timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 20px;
          }
          .semi-timeline-item::after {
            left: 21px;
          }
          .semi-timeline-item.right {
            left: 0%;
          }
          .semi-timeline-item.left,
          .semi-timeline-item.right {
            text-align: left;
          }
          .left .content {
            text-align: left;
          }
          .left .content p,
          .left .content h2 {
            text-align: left;
          }
          .left .trivia-btn {
            flex-direction: row;
          }
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

