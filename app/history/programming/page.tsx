"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  filename: string;
  key: string;
};

const timeline: TimelineItem[] = [
  {
    year: "1957",
    title: "Fortran",
    description:
      "ジョン・バッカス（IBM）が開発。「数式翻訳（Formula Translation）」の名が示す通り、科学技術計算のために作られた世界初の高級言語。",
    filename: "fortran.f",
    key: "fortran",
  },
  {
    year: "1972",
    title: "C Language",
    description:
      "デニス・リッチー（ベル研究所）がUNIX開発のために設計。ハードウェア寄りの操作が可能で、現代のOSや組み込みシステムの基盤となった「神の言語」。",
    filename: "main.c",
    key: "c",
  },
  {
    year: "1983",
    title: "C++",
    description:
      "ビャーネ・ストロヴストルップが「C with Classes」として開発。オブジェクト指向を導入し、大規模システム開発を可能にしたが、仕様の複雑さは悪名高い。",
    filename: "class.cpp",
    key: "cpp",
  },
  {
    year: "1991",
    title: "Python",
    description:
      "グイド・ヴァン・ロッサムが「読みやすさ」を重視して開発。当時はスクリプト言語扱いだったが、AIブームにより世界で最も人気のある言語の一つへ。",
    filename: "script.py",
    key: "python",
  },
  {
    year: "1995",
    title: "Java & JavaScript",
    description:
      "Sun Microsystemsが「Write Once, Run Anywhere」を掲げたJavaを発表。同年、Netscape社でWebブラウザ用の言語JavaScriptが誕生した。",
    filename: "app.js / Main.java",
    key: "java",
  },
  {
    year: "2010s",
    title: "Modern Systems (Rust/Go)",
    description:
      "Google発のGo、Mozilla発のRustなど、マルチコア時代の並行処理とメモリ安全性を重視した新しいシステム言語が台頭。",
    filename: "main.rs",
    key: "modern",
  },
];

const triviaData: Record<string, string> = {
  fortran:
    '>> ERROR: GOTO STATEMENT CONSIDERED HARMFUL\n\n当時のプログラムは「GOTO文」だらけで、処理があっちこっちに飛び回るため「スパゲッティコード」と呼ばれていました。\nこれを批判したダイクストラの論文が、後の「構造化プログラミング」への道を開きました。',
  c: '>> WARNING: NULL POINTER EXCEPTION\n\nC言語の生みの親の1人であるトニー・ホーアは、後に「NULL参照を発明したのは10億ドルの過ちだった」と謝罪しています。\nしかし、C言語の簡潔さとパワフルさは、K&R本（プログラミング言語C）と共に伝説となっています。',
  cpp: '>> COMPILATION ERROR: TEMPLATE TOO COMPLEX\n\n開発者ストロヴストルップの名言：\n「C言語では、自分の足を撃ち抜くのは簡単だ。\nC++ではそれは難しいが、もし撃ち抜いてしまったら、足はおろかその先まで吹き飛ばしてしまうだろう。」',
  python:
    ">> IMPORT ANTIGRAVITY\n\n名前の由来はヘビではなく、イギリスのコメディ番組『空飛ぶモンティ・パイソン』です。\nそのため、公式ドキュメントの例文には「spam」や「eggs」といったモンティ・パイソンのネタが頻繁に登場します。",
  java: '>> SYSTEM.OUT.PRINTLN("JAVA IS JAVASCRIPT?");\n\nJavaScriptは元々「LiveScript」という名前でしたが、当時人気絶頂だったJavaの勢いにあやかるために、名前だけ似せられました。\n「JavaとJavaScriptは、メロンとメロンパンくらい違う」というのは有名な例え話です。\n\nちなみにJSはブレンダン・アイクによってわずか10日間でプロトタイプが作られました。',
  modern:
    '>> CARGO BUILD --RELEASE\n\nRustは「所有権」という概念で、ガベージコレクション（GC）なしでメモリ安全性を保証します。\n開発当初、エレベーターの制御プログラムが頻繁にクラッシュすることにイラついたMozilla社員が、「もっと安全な言語が必要だ」と考えたのがきっかけと言われています。',
};

type SymbolFloat = {
  x: number;
  y: number;
  text: string;
  color: string;
  speed: number;
  fontSize: number;
  opacity: number;
};

export default function ProgrammingHistoryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // 背景のシンタックスアニメーション
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let symbols: SymbolFloat[] = [];

    const chars = [
      "{",
      "}",
      ";",
      "//",
      "</>",
      "fn",
      "var",
      "if",
      "=>",
      "0x",
      "&&",
      "||",
      "#",
      "$",
    ];
    const colors = ["#ff79c6", "#8be9fd", "#50fa7b", "#f1fa8c", "#6272a4"];

    const createSymbol = (startFromBottom = true): SymbolFloat => ({
      x: Math.random() * width,
      y: startFromBottom ? height + 50 : Math.random() * height,
      text: chars[Math.floor(Math.random() * chars.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.5 + Math.random() * 1.5,
      fontSize: 14 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.4,
    });

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initSymbols();
    };

    const initSymbols = () => {
      symbols = [];
      const count = Math.floor(width / 15);
      for (let i = 0; i < count; i++) {
        symbols.push(createSymbol(false));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      symbols.forEach((s) => {
        s.y -= s.speed;
        if (s.y < -50) {
          Object.assign(s, createSymbol(true));
        }

        ctx.font = `bold ${s.fontSize}px "Fira Code", monospace`;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity;
        ctx.fillText(s.text, s.x, s.y);
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
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
      { threshold: 0.15 }
    );

    document.querySelectorAll(".prog-timeline-item").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeTrivia = activeKey ? triviaData[activeKey] : null;

  return (
    <div className="prog-page">
      <canvas ref={canvasRef} id="canvas-bg" />

      <header className="prog-header">
        <h1>
          HELLO WORLD<span className="cursor"></span>
        </h1>
        <p className="subtitle">
          // A brief history of how we talk to machines.
        </p>
        <Link href="/" className="back-link">
          ← Portfolioへ戻る
        </Link>
      </header>

      <div className="prog-timeline">
        {timeline.map((item, index) => (
          <div
            key={item.key}
            className={`prog-timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <div className="card-header">
                <div className="dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <span className="filename">{item.filename}</span>
              </div>
              <div className="card-body">
                <span className="year">{item.year}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button
                  className="run-btn"
                  onClick={() => setActiveKey(item.key)}
                >
                  Run trivia
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="prog-footer">
        <p>/* End of File */</p>
      </footer>

      {activeTrivia && (
        <div
          className="modal-overlay active"
          onClick={() => setActiveKey(null)}
        >
          <div
            className="terminal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="terminal-header">
              <div
                className="close-btn"
                onClick={() => setActiveKey(null)}
              ></div>
              bash - 80x24
            </div>
            <div className="terminal-body">
              <div>
                <span className="prompt">user@history:~$</span>
                <span className="cmd">cat secret_trivia.txt</span>
              </div>
              <div className="output">{activeTrivia}</div>
              <br />
              <div>
                <span className="prompt">user@history:~$</span>
                <span className="cursor"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600&family=Noto+Sans+JP:wght@300;400;700&display=swap");
        :root {
          --bg-dark: #1e1e2e;
          --card-bg: #282a36;
          --text-main: #f8f8f2;
          --comment: #6272a4;
          --pink: #ff79c6;
          --cyan: #8be9fd;
          --green: #50fa7b;
          --purple: #bd93f9;
          --yellow: #f1fa8c;
          --line-color: #44475a;
        }
      `}</style>

      <style jsx>{`
        .prog-page {
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
          background: var(--bg-dark);
        }

        .prog-header {
          text-align: center;
          padding: 100px 20px 60px;
          position: relative;
          z-index: 10;
        }

        h1 {
          font-family: "Fira Code", monospace;
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 4rem);
          color: var(--pink);
          margin-bottom: 20px;
        }

        .cursor {
          display: inline-block;
          width: 0.6em;
          height: 1em;
          background-color: var(--text-main);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 5px;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .subtitle {
          font-family: "Fira Code", monospace;
          font-size: 1rem;
          color: var(--comment);
          max-width: 600px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          margin-top: 24px;
          color: var(--cyan);
          text-decoration: none;
          font-family: "Fira Code", monospace;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        .prog-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          z-index: 10;
        }

        .prog-timeline::after {
          content: "";
          position: absolute;
          width: 4px;
          background: var(--line-color);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
          border-radius: 2px;
        }

        .prog-timeline-item {
          padding: 20px 40px;
          position: relative;
          width: 50%;
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.6s ease-out;
        }

        .prog-timeline-item.right {
          transform: translateX(30px);
        }

        .prog-timeline-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .prog-timeline-item.left {
          left: 0;
        }

        .prog-timeline-item.right {
          left: 50%;
        }

        .prog-timeline-item::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          right: -9px;
          background-color: var(--bg-dark);
          border: 4px solid var(--purple);
          top: 40px;
          border-radius: 50%;
          z-index: 1;
        }

        .prog-timeline-item.right::after {
          left: -9px;
        }

        .content {
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          border: 1px solid var(--line-color);
          transition: transform 0.3s;
        }

        .content:hover {
          transform: translateY(-5px);
          border-color: var(--cyan);
        }

        .card-header {
          background: #191a21;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--line-color);
        }

        .dots {
          display: flex;
          gap: 6px;
          margin-right: 15px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .red {
          background: #ff5555;
        }
        .yellow {
          background: #f1fa8c;
        }
        .green {
          background: #50fa7b;
        }

        .filename {
          font-family: "Fira Code", monospace;
          font-size: 0.8rem;
          color: var(--comment);
        }

        .card-body {
          padding: 25px;
        }

        .year {
          font-family: "Fira Code", monospace;
          font-size: 1.2rem;
          color: var(--purple);
          margin-bottom: 5px;
          display: block;
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--pink);
        }

        p {
          line-height: 1.7;
          margin-bottom: 20px;
          color: var(--text-main);
          font-size: 0.95rem;
        }

        .run-btn {
          background: #44475a;
          border: none;
          color: var(--green);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Fira Code", monospace;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .run-btn:hover {
          background: #6272a4;
          color: #fff;
        }

        .run-btn::before {
          content: "▶";
          font-size: 0.8em;
        }

        .prog-footer {
          text-align: center;
          padding: 60px;
          color: var(--comment);
          font-family: "Fira Code", monospace;
          font-size: 0.8rem;
          position: relative;
          z-index: 10;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .terminal-window {
          background: #0f0f14;
          width: 90%;
          max-width: 600px;
          border-radius: 6px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          font-family: "Fira Code", monospace;
          overflow: hidden;
          transform: scale(0.95);
          transition: transform 0.2s;
          border: 1px solid #333;
        }

        .modal-overlay.active .terminal-window {
          transform: scale(1);
        }

        .terminal-header {
          background: #333;
          padding: 5px 10px;
          color: #ccc;
          font-size: 0.8rem;
          text-align: center;
          position: relative;
        }

        .close-btn {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: #ff5555;
          border-radius: 50%;
          cursor: pointer;
        }

        .terminal-body {
          padding: 20px;
          color: #ddd;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .prompt {
          color: var(--green);
          margin-right: 8px;
        }

        .cmd {
          color: var(--yellow);
        }

        .output {
          margin-top: 10px;
          white-space: pre-wrap;
          color: var(--text-main);
        }

        @media screen and (max-width: 768px) {
          .prog-timeline::after {
            left: 30px;
          }
          .prog-timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 20px;
          }
          .prog-timeline-item::after {
            left: 21px;
          }
          .prog-timeline-item.right {
            left: 0%;
          }
          h1 {
            font-size: 2rem;
          }
          .prog-timeline-item.right {
            transform: translateX(-30px);
          }
        }
      `}</style>
    </div>
  );
}

