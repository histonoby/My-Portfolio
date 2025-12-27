"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CanvasDotsBackground from "@/components/CanvasDotsBackground";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  key: keyof typeof triviaData;
};

const timeline: TimelineItem[] = [
  {
    year: "Early 1990s",
    title: "バーコードの限界",
    description:
      "工場ではバーコードで部品管理をしていたが、情報量が少なく、読み取りに時間がかかることが課題となっていた。",
    key: "limit",
  },
  {
    year: "1994",
    title: "QRコード誕生",
    description:
      "デンソーウェーブの開発チームが大容量かつ高速読み取りが可能な2次元コードを発表。開発期間は1年半、チームは2人だった。",
    key: "igo",
  },
  {
    year: "1999",
    title: "特許のオープン化",
    description:
      "「規格化されたQRコードに対しては権利行使しない」と宣言し、誰もが自由に使える技術として開放。普及の決定打となる。",
    key: "patent",
  },
  {
    year: "2002",
    title: "ガラケーへの搭載",
    description:
      "日本国内でQRコード読み取り機能を搭載した携帯電話が登場。URL入力を省略できる利便性から広告・雑誌で爆発的に普及した。",
    key: "mobile",
  },
  {
    year: "2010s",
    title: "中国での決済革命",
    description:
      "AlipayやWeChat PayがQRコード決済を採用し、屋台からデパートまでキャッシュレスの社会インフラに。",
    key: "china",
  },
  {
    year: "2020 - Now",
    title: "非接触需要と再評価",
    description:
      "パンデミックで非接触需要が増加し、メニュー、入場管理、ワクチン証明など世界中で「安全のためのツール」として再評価。",
    key: "future",
  },
];

const triviaData = {
  limit: {
    title: "腱鞘炎が開発のきっかけ？",
    text: "工場担当者が1日に何千回もバーコードを読み取り、「手首が腱鞘炎になる」「もっと多くの情報を一度に読みたい」という声が開発の原動力となった。",
  },
  igo: {
    title: "ヒントは「囲碁」だった",
    text: "特徴的な3つの四角（切り出しシンボル）は、開発者が昼休みに楽しんでいた囲碁の石の配置から着想を得たと言われる。",
  },
  patent: {
    title: "「1:1:3:1:1」の黄金比",
    text: "QRコードの角にある四角はどんな角度でも認識できるよう、印刷物の中で最も出現頻度が低い黒白比率「1:1:3:1:1」を採用している。",
  },
  mobile: {
    title: "開発者は懐疑的だった",
    text: "携帯への搭載当初、開発者は「一般人は使わない」と懐疑的だったが、J-PHONEなどが採用して大ヒット。ユーザーの遊び心が普及を後押しした。",
  },
  china: {
    title: "物乞いもQRコードを掲げる",
    text: "中国での普及速度は圧倒的で、現金を持たない人が増えた結果、路上の物乞いもQRコードを掲げるほどになった。",
  },
  future: {
    title: "汚れでも読める強さ",
    text: "誤り訂正機能により最大30%が欠損しても復元できるため、油まみれの工場や屋外看板でも読み取りが可能になった。",
  },
} as const;

export default function QrHistoryPage() {
  const [activeKey, setActiveKey] = useState<keyof typeof triviaData | null>(
    null
  );

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

    document.querySelectorAll(".qr-timeline-item").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeTrivia = activeKey ? triviaData[activeKey] : null;

  return (
    <div className="qr-page">
      <CanvasDotsBackground />

      <header className="qr-header">
        <h1>
          HISTORY OF
          <br />
          QR CODE
        </h1>
        <p className="subtitle">
          日本発、世界標準へ。白と黒のドットに込められた技術と戦略の軌跡。
        </p>
        <Link href="/" className="back-link">
          ← Portfolioへ戻る
        </Link>
      </header>

      <div className="qr-timeline">
        {timeline.map((item, index) => (
          <div
            key={item.key}
            className={`qr-timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <span className="year">{item.year}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button className="trivia-btn" onClick={() => setActiveKey(item.key)}>
                SCAN: SECRET DATA
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="qr-footer">
        <p>INITIATED BY DENSO WAVE | RENDERED BY AI</p>
      </footer>

      {activeTrivia && (
        <div className="modal-overlay active" onClick={() => setActiveKey(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveKey(null)}>
              &times;
            </button>
            <span className="trivia-tag">DECODED INFORMATION</span>
            <h3 id="modal-title">{activeTrivia.title}</h3>
            <p id="modal-text">{activeTrivia.text}</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Share+Tech+Mono&display=swap");
        :root {
          --primary: #00ff41;
          --secondary: #008f11;
          --accent: #ffffff;
          --bg-dark: #050505;
          --glass: rgba(0, 20, 0, 0.6);
          --glass-border: rgba(0, 255, 65, 0.2);
          --text-main: #e0f2e0;
        }
      `}</style>

      <style jsx>{`
        .qr-page {
          position: relative;
          min-height: 100vh;
          background: var(--bg-dark);
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

        .qr-header {
          text-align: center;
          padding: 120px 20px 80px;
          position: relative;
        }

        h1 {
          font-family: "Share Tech Mono", monospace;
          font-size: clamp(2.5rem, 6vw, 5rem);
          color: var(--primary);
          margin-bottom: 20px;
          text-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
          letter-spacing: -2px;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #88aa88;
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .back-link {
          display: inline-flex;
          margin-top: 16px;
          color: var(--primary);
          text-decoration: none;
          font-family: "Share Tech Mono", monospace;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }

        .back-link:hover {
          opacity: 0.8;
        }

        .qr-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        .qr-timeline::after {
          content: "";
          position: absolute;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--primary), transparent);
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
          box-shadow: 0 0 10px var(--primary);
        }

        .qr-timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .qr-timeline-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .qr-timeline-item.left {
          left: 0;
        }

        .qr-timeline-item.right {
          left: 50%;
        }

        .qr-timeline-item::after {
          content: "";
          position: absolute;
          width: 16px;
          height: 16px;
          right: -8px;
          background-color: var(--bg-dark);
          border: 2px solid var(--primary);
          top: 30px;
          z-index: 1;
          box-shadow: 0 0 8px var(--primary);
        }

        .qr-timeline-item.right::after {
          left: -8px;
        }

        .content {
          padding: 30px;
          background: var(--glass);
          backdrop-filter: blur(5px);
          border: 1px solid var(--glass-border);
          border-left: 4px solid var(--primary);
          border-radius: 6px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.7);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          position: relative;
          overflow: hidden;
        }

        .content::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 65, 0.1),
            transparent
          );
          transition: left 0.5s;
        }

        .content:hover::before {
          left: 100%;
        }

        .content:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 255, 65, 0.1);
          border-color: var(--primary);
        }

        .year {
          font-family: "Share Tech Mono", monospace;
          font-size: 1.3rem;
          color: var(--primary);
          margin-bottom: 10px;
          display: block;
          text-shadow: 0 0 5px var(--primary);
        }

        h2 {
          margin-bottom: 12px;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          color: var(--accent);
        }

        p {
          line-height: 1.7;
          margin-bottom: 16px;
          color: #ccc;
          font-size: 0.95rem;
        }

        .trivia-btn {
          background: rgba(0, 255, 65, 0.1);
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 8px 20px;
          cursor: pointer;
          font-family: "Share Tech Mono", monospace;
          font-size: 0.9rem;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
        }

        .trivia-btn:hover {
          background: var(--primary);
          color: #000;
          box-shadow: 0 0 15px var(--primary);
        }

        .qr-footer {
          text-align: center;
          padding: 60px 20px 80px;
          color: #446644;
          font-size: 0.9rem;
          font-family: "Share Tech Mono", monospace;
          border-top: 1px solid #111;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          background-image: radial-gradient(circle at center, #111 0%, #000 100%);
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
          background: #0a1a0a;
          border: 1px solid var(--primary);
          padding: 32px;
          max-width: 520px;
          width: 90%;
          position: relative;
          transform: scale(0.92);
          transition: transform 0.3s;
          box-shadow: 0 0 50px rgba(0, 255, 65, 0.1);
        }

        .modal-overlay.active .modal-content {
          transform: scale(1);
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 1.8rem;
          color: var(--primary);
          cursor: pointer;
          background: none;
          border: none;
          line-height: 1;
        }

        .trivia-tag {
          color: var(--bg-dark);
          background: var(--primary);
          padding: 2px 8px;
          font-size: 0.8rem;
          font-family: "Share Tech Mono", monospace;
          margin-bottom: 12px;
          display: inline-block;
        }

        @media screen and (max-width: 768px) {
          .qr-timeline::after {
            left: 30px;
          }
          .qr-timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 20px;
          }
          .qr-timeline-item::after {
            left: 21px;
          }
          .qr-timeline-item.right {
            left: 0%;
          }
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

