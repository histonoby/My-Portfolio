"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  key: keyof typeof triviaData;
  side: "left" | "right";
};

const timeline: TimelineItem[] = [
  {
    year: "1837",
    title: "解析機関 (The Analytical Engine)",
    description:
      "チャールズ・バベッジが設計した、蒸気機関で動くはずだった機械式汎用コンピュータ。完成はしなかったが、現代のコンピュータの基本概念（入力、演算、記憶、出力）を全て備えていた。",
    key: "ada",
    side: "left",
  },
  {
    year: "1946",
    title: "ENIAC (エニアック)",
    description:
      "アメリカ陸軍が弾道計算のために開発した、最初期の電子式汎用コンピュータ。17,468本の真空管を使用し、重量は30トン。プログラミングは配線の繋ぎ変えで行っていた。",
    key: "bug",
    side: "right",
  },
  {
    year: "1964",
    title: "IBM System/360",
    description:
      "それまでバラバラだったコンピュータの仕様を統一し、「アーキテクチャ」という概念を確立したメインフレームの金字塔。商用利用を一気に加速させた。",
    key: "ibm",
    side: "left",
  },
  {
    year: "1976",
    title: "Apple I",
    description:
      "スティーブ・ウォズニアックが独力で設計し、ジョブズとガレージで組み立てたワンボードマイコン。ここからパーソナルコンピュータ（PC）の革命が始まった。",
    key: "apple",
    side: "right",
  },
  {
    year: "1984",
    title: "Macintosh",
    description:
      "「マウス」で画面上のアイコンを操作するGUIを普及させた伝説のマシン。難解なコマンド入力から人類を解放した。",
    key: "xerox",
    side: "left",
  },
  {
    year: "1995",
    title: "Windows 95 & Internet",
    description:
      "Windows 95の発売はお祭り騒ぎとなり、PCが一家に一台の家電となった。同時期にインターネットが一般開放され、世界がデジタルで繋がり始めた。",
    key: "win95",
    side: "right",
  },
  {
    year: "FUTURE",
    title: "量子コンピュータ",
    description:
      "「0」と「1」を同時に重ね合わせる量子ビットを利用。従来のスパコンで数万年かかる計算を数秒で解く可能性を秘めた次世代の怪物。",
    key: "quantum",
    side: "left",
  },
];

const triviaData = {
  ada: {
    title: "世界初のプログラマは女性",
    text: "バベッジの解析機関のために、複雑なベルヌーイ数を計算するアルゴリズムを書いたのは、詩人バイロンの娘「エイダ・ラブレス」。19世紀に既に「数字だけでなく音楽や絵画も扱える」と予言していた。",
  },
  bug: {
    title: "バグの語源は「本物の虫」",
    text: "コンピュータの不調原因を調べたところ、リレーに蛾が挟まっていた。グレース・ホッパー博士が「本物の虫（Bug）」として貼り付けたのがデバッグの語源。",
  },
  ibm: {
    title: "月へ行ったコンピュータ",
    text: "アポロ計画で月に人類を送った誘導コンピュータ（AGC）は、スマホ充電器より低い性能だったが、信頼性が極めて高く、重要処理を優先する設計で動き続けた。",
  },
  apple: {
    title: "悪魔の価格設定？",
    text: "Apple I の価格は「666.66ドル」。ウォズニアックは「同じ数字が並んでいてタイピングしやすいし、クールだろ？」と理由を語った（宗教的意味は意図せず）。",
  },
  xerox: {
    title: "世紀の技術強奪",
    text: "GUI（マウス・ウィンドウ）を発明したのはXerox社。ジョブズは研究所見学で衝撃を受け、「金鉱の上に座っている」と叫び、アイデアをMacintoshへ取り入れた。",
  },
  win95: {
    title: "起動音はMacで作られた",
    text: "Windows 95の起動音を作ったブライアン・イーノは「Windows PCを使ったことはない」と語り、その曲をMacで制作した。",
  },
  quantum: {
    title: "シュレーディンガーの猫",
    text: "量子コンピュータは重ね合わせを利用し、結果も確率で得るため同じ計算を複数回行って正解を得る。量子力学の不思議を計算に活かす次世代技術。",
  },
} as const;

type Symbol = { x: number; y: number; phase: number };

export default function ComputingHistoryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeKey, setActiveKey] = useState<keyof typeof triviaData | null>(null);

  // 背景グリッド（レトロCRT風）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let offset = 0;
    const speed = 1;
    const gridSize = 40;
    let animationId = 0;

    // CRTのちらつき用
    const symbols: Symbol[] = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const drawCRTNoise = () => {
      ctx.fillStyle = "rgba(5,5,5,1)";
      ctx.fillRect(0, 0, width, height);

      // faint amber glow lines
      ctx.strokeStyle = "rgba(255, 176, 0, 0.15)";
      ctx.lineWidth = 1;

      const vanishX = width / 2;
      const vanishY = height / 3;
      const verticalLines = 20;
      for (let i = -verticalLines; i <= verticalLines; i++) {
        const x = width / 2 + i * 100;
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(vanishX, vanishY);
        ctx.stroke();
      }

      offset = (offset + speed) % gridSize;
      for (let i = 0; i < 30; i++) {
        const yPos = height - (gridSize * i + offset) * (i * 0.1 + 1);
        if (yPos > vanishY) {
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.lineTo(width, yPos);
          ctx.stroke();
        }
      }

      const gradient = ctx.createLinearGradient(0, vanishY, 0, height);
      gradient.addColorStop(0, "rgba(255, 176, 0, 0.2)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, vanishY, width, height - vanishY);

      // CRT noise dots
      ctx.fillStyle = "rgba(255, 220, 168, 0.05)";
      symbols.forEach((s) => {
        const nx = (s.x + Math.sin(s.phase) * 0.002 + 1) % 1;
        const ny = (s.y + Math.cos(s.phase) * 0.002 + 1) % 1;
        s.x = nx;
        s.y = ny;
        s.phase += 0.05;
        ctx.fillRect(nx * width, ny * height, 1, 1);
      });
    };

    const animate = () => {
      drawCRTNoise();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // スクロールフェードイン
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".comp-timeline-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeTrivia = activeKey ? triviaData[activeKey] : null;

  return (
    <div className="comp-page">
      <canvas ref={canvasRef} id="canvas-bg" />
      <div className="crt-overlay" />
      <div className="vignette" />

      <header className="comp-header">
        <h1>
          COMPUTING
          <br />
          HISTORY
        </h1>
        <p className="subtitle">&gt; SYSTEM READY... LOAD TIMELINE_</p>
        <Link href="/" className="back-link">
          ← Portfolioへ戻る
        </Link>
      </header>

      <div className="comp-timeline">
        {timeline.map((item) => (
          <div
            key={item.key}
            className={`comp-timeline-item ${item.side}`}
          >
            <div className="content">
              <span className="year">{item.year}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button className="trivia-btn" onClick={() => setActiveKey(item.key)}>
                [ READ LOG ]
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="comp-footer">
        <p>
          END OF STREAM_
          <br />
          PLEASE REBOOT TO CONTINUE
        </p>
      </footer>

      {activeTrivia && (
        <div className="modal-overlay active" onClick={() => setActiveKey(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveKey(null)}>
              X
            </button>
            <span className="system-msg">ACCESSING CLASSIFIED DATABASE...</span>
            <h3 id="modal-title">{activeTrivia.title}</h3>
            <p id="modal-text">{activeTrivia.text}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=VT323&family=Orbitron:wght@500;900&family=Noto+Sans+JP:wght@400;700&display=swap");
        :root {
          --primary: #ffb000;
          --primary-dim: #996a00;
          --bg-color: #050505;
          --glass: rgba(20, 10, 0, 0.7);
          --text-main: #ffdca8;
        }
      `}</style>

      <style jsx>{`
        .comp-page {
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
          z-index: -2;
        }
        .crt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
          z-index: -1;
          pointer-events: none;
        }
        .vignette {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
          z-index: 900;
          pointer-events: none;
        }
        .comp-header {
          text-align: center;
          padding: 120px 20px 80px;
          position: relative;
          z-index: 10;
        }
        h1 {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 5px;
          margin-bottom: 20px;
          text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary);
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary);
          }
          20%, 24%, 55% {
            opacity: 0.8;
            text-shadow: none;
          }
        }
        .subtitle {
          font-family: "VT323", monospace;
          font-size: 1.5rem;
          color: var(--primary-dim);
          text-transform: uppercase;
        }
        .back-link {
          display: inline-flex;
          margin-top: 16px;
          color: var(--primary);
          text-decoration: none;
          font-family: "VT323", monospace;
          font-size: 1.2rem;
          transition: opacity 0.2s;
        }
        .back-link:hover {
          opacity: 0.8;
        }
        .comp-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          z-index: 10;
        }
        .comp-timeline::after {
          content: "";
          position: absolute;
          width: 2px;
          background: var(--primary-dim);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
          box-shadow: 0 0 10px var(--primary);
        }
        .comp-timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          opacity: 0;
          transform: perspective(1000px) rotateX(20deg);
          transition: all 0.8s ease;
        }
        .comp-timeline-item.visible {
          opacity: 1;
          transform: perspective(1000px) rotateX(0deg);
        }
        .comp-timeline-item.left {
          left: 0;
        }
        .comp-timeline-item.right {
          left: 50%;
        }
        .comp-timeline-item::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          right: -7px;
          background-color: var(--bg-color);
          border: 2px solid var(--primary);
          top: 30px;
          z-index: 1;
          box-shadow: 0 0 10px var(--primary);
        }
        .comp-timeline-item.right::after {
          left: -7px;
        }
        .content {
          padding: 30px;
          background: var(--glass);
          border: 1px solid var(--primary-dim);
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(255, 176, 0, 0.1);
          position: relative;
        }
        .content::before,
        .content::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--primary);
          border-style: solid;
          transition: all 0.3s;
        }
        .content::before {
          top: -1px;
          left: -1px;
          border-width: 2px 0 0 2px;
        }
        .content::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 2px 2px 0;
        }
        .content:hover {
          border-color: var(--primary);
          box-shadow: 0 0 30px rgba(255, 176, 0, 0.3) inset;
        }
        .year {
          font-family: "Orbitron", sans-serif;
          font-size: 1.8rem;
          color: var(--primary);
          margin-bottom: 10px;
          display: block;
        }
        h2 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          font-family: "VT323", monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        p {
          line-height: 1.6;
          margin-bottom: 15px;
          font-size: 0.95rem;
          text-shadow: 0 0 2px rgba(255, 220, 168, 0.3);
        }
        .trivia-btn {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 5px 15px;
          cursor: pointer;
          font-family: "VT323", monospace;
          font-size: 1.2rem;
          transition: all 0.3s;
          text-transform: uppercase;
        }
        .trivia-btn:hover {
          background: var(--primary);
          color: #000;
          box-shadow: 0 0 20px var(--primary);
        }
        .comp-footer {
          text-align: center;
          padding: 80px;
          color: var(--primary-dim);
          font-family: "VT323", monospace;
          font-size: 1.2rem;
          z-index: 10;
          position: relative;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .modal-content {
          background: #110a00;
          border: 2px solid var(--primary);
          padding: 40px;
          max-width: 600px;
          width: 90%;
          position: relative;
          box-shadow: 0 0 50px rgba(255, 176, 0, 0.2);
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 2rem;
          color: var(--primary);
          cursor: pointer;
          background: none;
          border: none;
          font-family: "VT323", monospace;
        }
        .system-msg {
          font-family: "VT323", monospace;
          color: var(--primary-dim);
          font-size: 1.2rem;
          margin-bottom: 20px;
          display: block;
          border-bottom: 1px dashed var(--primary-dim);
        }
        @media screen and (max-width: 768px) {
          .comp-timeline::after {
            left: 30px;
          }
          .comp-timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 20px;
          }
          .comp-timeline-item::after {
            left: 21px;
          }
          .comp-timeline-item.right {
            left: 0%;
          }
          .comp-timeline-item.left,
          .comp-timeline-item.right {
            text-align: left;
          }
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

