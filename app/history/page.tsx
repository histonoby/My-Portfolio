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
    year: "1950",
    title: "チューリング・テストの提唱",
    description:
      "アラン・チューリングが「Computing Machinery and Intelligence」を発表。人間と区別がつかない応答ができれば「知的」とみなす基準を提示。",
    key: "turing",
  },
  {
    year: "1957",
    title: "パーセプトロンの登場",
    description:
      "フランク・ローゼンブラットが脳のニューロンを模したアルゴリズムを考案。最初期のニューラルネットワークとして画像認識の基礎を築く。",
    key: "perceptron",
  },
  {
    year: "1969",
    title: "第一次AIの冬 (XOR問題)",
    description:
      "ミンスキーとパパートが著書でパーセプトロンの限界を指摘し、研究資金が凍結。AI研究が冬の時代に入る。",
    key: "winter",
  },
  {
    year: "1986",
    title: "バックプロパゲーションの再発見",
    description:
      "ジェフリー・ヒントンらが誤差逆伝播法を一般化。多層ニューラルネットワーク学習を可能にし、第二次AIブームを牽引。",
    key: "backprop",
  },
  {
    year: "1997",
    title: "Deep Blue vs カスパロフ",
    description:
      "IBMのDeep Blueがチェス世界王者ガルリ・カスパロフに勝利。特定タスクで機械が人類を超えた象徴的瞬間。",
    key: "deepblue",
  },
  {
    year: "2012",
    title: "ディープラーニングの衝撃 (AlexNet)",
    description:
      "ILSVRCでAlexNetが圧倒的精度で優勝。GPU活用によりディープラーニング時代が本格化。",
    key: "alexnet",
  },
  {
    year: "2016",
    title: "AlphaGo vs イ・セドル",
    description:
      "AlphaGoが囲碁トップ棋士イ・セドルに4勝1敗で勝利。直感が必要とされる囲碁での勝利がAIの進化を示す。",
    key: "alphago",
  },
  {
    year: "2017",
    title: "Attention Is All You Need",
    description:
      "Transformerアーキテクチャを提案。BERTやGPTシリーズの基盤となり、自然言語処理の性能を飛躍的に向上。",
    key: "transformer",
  },
  {
    year: "2022 - Now",
    title: "生成AIの民主化 (ChatGPT)",
    description:
      "大規模言語モデルが一般に普及し、テキスト・画像・動画生成が社会インフラの一部となり始める。",
    key: "genai",
  },
];

const triviaData: Trivia = {
  turing: {
    title: "実は最初は「男女当てゲーム」だった",
    text: "チューリングが提案したイミテーション・ゲームは、男性と女性が別室にいて、質問者がテキストチャットだけで「どちらが女性か」を当てるというもの。これを「人間と機械」に置き換えたのが現在のチューリングテスト。",
  },
  perceptron: {
    title: "ニューヨーク・タイムズの大袈裟な報道",
    text: "1958年発表当時、メディアは「この機械はすぐに歩き、話し、見て、書き、自己複製し、自らの存在を認識するようになる」と報じたが、実際は単純な図形を見分けるのがやっとだった。",
  },
  winter: {
    title: "「あの本」さえなければ...",
    text: "ミンスキーがパーセプトロンの限界を指摘した本は説得力がありすぎてニューラルネットへの資金援助が凍結。後に本人は「研究を止めるつもりはなかった」と後悔したといわれる。",
  },
  backprop: {
    title: "論文は一度、却下されていた",
    text: "バックプロパゲーションの概念は1960年代から存在。ヒントンらが有名にする前、ヤン・ルカンも提案していたが、当時は「ニューラルネットは時代遅れ」と見向きもされなかった。",
  },
  deepblue: {
    title: "バグが「神の一手」に見えた？",
    text: "カスパロフが疑惑を呈した一手は、実はDeep Blueが処理時間を使い果たしてパニックになり、プログラム上のバグでランダムに打った手だったという説がある。",
  },
  alexnet: {
    title: "GPUはゲーマー向けだった",
    text: "AlexNetで使われたGPUは研究用ではなく市販のNVIDIA GTX 580を2枚挿し。研究室の学生が自室でモデルを回していた。",
  },
  alphago: {
    title: "第4局の「神の一手」",
    text: "イ・セドルが放った白78手でAlphaGoの勝率が急落。想定外の手にAIがパニックを起こし、自滅したことで唯一の人間勝利が生まれた。",
  },
  transformer: {
    title: "ビートルズへのオマージュ",
    text: "論文タイトル『Attention Is All You Need』はビートルズの曲『All You Need Is Love』のもじり。複雑なRNNを捨て「Attentionだけで十分」と主張したかったのかもしれない。",
  },
  genai: {
    title: "「幻覚」を見るAI",
    text: "ChatGPTがもっともらしい嘘をつく現象はハルシネーション。確率的に言葉をつなげているだけで、事実を理解しているわけではない。",
  },
};

export default function HistoryPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    };

    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 10);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "rgba(0, 242, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.1 - dist / 1200})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".timeline-item").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openModal = (key: string) => {
    setActiveKey(key);
  };

  const closeModal = () => setActiveKey(null);

  const activeTrivia = activeKey ? triviaData[activeKey] : null;

  return (
    <div className="page">
      <canvas ref={canvasRef} id="canvas-bg" />

      <header className="page-header">
        <h1>HISTORY OF AI</h1>
        <p className="subtitle">
          夢想から現実へ。機械学習の進化と、その裏にある人間ドラマ。
        </p>
        <Link
          href="/"
          className="back-link"
        >
          ← Portfolioへ戻る
        </Link>
      </header>

      <div className="timeline">
        {timeline.map((item, index) => (
          <div
            key={item.key}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <span className="year">{item.year}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button className="trivia-btn" onClick={() => openModal(item.key)}>
                🤫 裏話を見る
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="page-footer">
        <p>Created by histonoby | Exploring the Frontier of Intelligence</p>
      </footer>

      {activeTrivia && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <span className="trivia-tag">Here&apos;s the secret...</span>
            <h3 id="modal-title">{activeTrivia.title}</h3>
            <p id="modal-text">{activeTrivia.text}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Orbitron:wght@500;700&display=swap");
        :root {
          --primary: #00f2ff;
          --secondary: #bd00ff;
          --bg-dark: #0a0a12;
          --glass: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
          --text-main: #e0e0e0;
        }
      `}</style>

      <style jsx>{`
        .page {
          position: relative;
          min-height: 100vh;
          background-color: var(--bg-dark);
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
          z-index: -1;
        }

        .page-header {
          text-align: center;
          padding: 120px 20px 60px;
          position: relative;
        }

        h1 {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
          text-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
        }

        .subtitle {
          font-size: 1.1rem;
          color: #aaa;
          max-width: 720px;
          margin: 0 auto 16px;
          line-height: 1.6;
        }

        .back-link {
          display: inline-flex;
          margin-top: 8px;
          color: var(--primary);
          text-decoration: none;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        .timeline {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 20px 80px;
        }

        .timeline::after {
          content: "";
          position: absolute;
          width: 4px;
          background: linear-gradient(180deg, var(--primary), var(--secondary));
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -2px;
          box-shadow: 0 0 15px var(--primary);
        }

        .timeline-item {
          padding: 10px 40px;
          position: relative;
          background-color: inherit;
          width: 50%;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-item.left {
          left: 0;
        }

        .timeline-item.right {
          left: 50%;
        }

        .timeline-item::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          right: -10px;
          background-color: var(--bg-dark);
          border: 4px solid var(--primary);
          top: 25px;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 10px var(--primary);
        }

        .timeline-item.right::after {
          left: -10px;
        }

        .content {
          padding: 30px;
          background: var(--glass);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s, border-color 0.3s;
        }

        .content:hover {
          transform: scale(1.02);
          border-color: var(--primary);
        }

        .year {
          font-family: "Orbitron", sans-serif;
          font-size: 1.3rem;
          color: var(--primary);
          margin-bottom: 10px;
          display: block;
        }

        h2 {
          margin-bottom: 12px;
          font-size: 1.4rem;
        }

        p {
          line-height: 1.7;
          margin-bottom: 14px;
          color: #ccc;
        }

        .trivia-btn {
          background: transparent;
          border: 1px solid var(--secondary);
          color: var(--secondary);
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .trivia-btn:hover {
          background: var(--secondary);
          color: white;
          box-shadow: 0 0 15px var(--secondary);
        }

        .page-footer {
          text-align: center;
          padding: 60px 20px 80px;
          color: #555;
          font-size: 0.9rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
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
          background: #1a1a24;
          border: 1px solid var(--secondary);
          padding: 32px;
          border-radius: 15px;
          max-width: 520px;
          width: 90%;
          position: relative;
          transform: scale(0.92);
          transition: transform 0.3s;
          box-shadow: 0 0 30px rgba(189, 0, 255, 0.2);
        }

        .modal-overlay.active .modal-content {
          transform: scale(1);
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 1.5rem;
          color: #aaa;
          cursor: pointer;
          background: none;
          border: none;
        }

        .trivia-tag {
          background: var(--secondary);
          color: white;
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          margin-bottom: 10px;
          display: inline-block;
        }

        @media screen and (max-width: 768px) {
          .timeline::after {
            left: 31px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
          }

          .timeline-item::after {
            left: 21px;
          }

          .timeline-item.right {
            left: 0%;
          }

          .year {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}

