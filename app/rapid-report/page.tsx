"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  Mic,
  ShieldCheck,
  Sparkles,
  StopCircle,
} from "lucide-react";

type Attachment = {
  id: string;
  name: string;
  preview: string;
  category: string;
  timestamp: string;
};

type StampOption = {
  value: string;
  label: string;
  tone: string;
};

const stampOptions: StampOption[] = [
  { value: "完了", label: "完了", tone: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" },
  { value: "異常なし", label: "異常なし", tone: "bg-cyber-accent/10 text-cyber-accent border-cyber-accent/40" },
  { value: "要確認", label: "要確認", tone: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  { value: "追加手配", label: "追加手配", tone: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
];

const quickPhrases = [
  "品川第三プラント、配管工事完了。部材が2個足りず明日午前に追加入荷予定。漏れなし、安全確認済み。",
  "〇〇ビル空調更新、室外機Aの排水勾配を調整。排気ダクトのビス補強を実施。残作業は養生撤去のみ。",
  "データセンター第2ラック増設。電源系統Bに接続、ケーブルラベリング済み。軽微な擦り傷のみで異常なし。",
];

const featureCards = [
  {
    title: "音声→日報を自動整形",
    body: "話した内容を即座にセクション分けし、日付・現場・進捗・課題をテンプレ化。",
    icon: Mic,
  },
  {
    title: "写真自動配置",
    body: "撮影順やファイル名から施工前/後・不具合を推定し、所定の枠に配置。",
    icon: Camera,
  },
  {
    title: "ワンタップ報告",
    body: "「完了」「異常なし」「要確認」などをスタンプ化して誤送信を防止。",
    icon: CheckCircle2,
  },
  {
    title: "移動中でも使える",
    body: "オフライン一時保存とバックグラウンド再送で電波が弱くても安心。",
    icon: ShieldCheck,
  },
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function guessCategory(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("before") || lower.includes("pre")) return "施工前";
  if (lower.includes("after") || lower.includes("done")) return "施工後";
  if (lower.includes("issue") || lower.includes("ng")) return "不具合";
  return "作業記録";
}

function summarizeNotes(note: string, stamp: string, attachments: Attachment[]) {
  if (!note.trim()) return "音声メモを取得すると、ここに要約が生成されます。";

  const sentences = note
    .split(/[\n。.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const top = sentences.slice(0, 3);
  const photoHint = attachments.length
    ? `写真${attachments.length}枚を添付（${attachments.map((a) => a.category).join("・")}）`
    : "写真なし";

  return [
    ...top.map((t) => `・${t}`),
    `・ステータス: ${stamp}`,
    `・添付: ${photoHint}`,
  ].join("\n");
}

function buildStructuredReport(params: {
  siteName: string;
  workDate: string;
  note: string;
  stamp: string;
  attachments: Attachment[];
}) {
  const { siteName, workDate, note, stamp, attachments } = params;
  const tasks = note
    .split(/[\n。]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const needsMaterial = note.includes("足り") || note.includes("不足");
  const safety = note.includes("安全") || note.includes("異常なし");

  return {
    headline: `${siteName}｜${stamp}`,
    workDate,
    tasks: tasks.length ? tasks : ["音声メモ入力待ち"],
    attachments,
    safety: safety ? "安全確認済み・異常なし" : "安全確認を実施してください",
    nextActions: [
      needsMaterial ? "不足資材の手配を確認" : "次の現場に引き継ぎ",
      attachments.length ? "写真キャプションを確認" : "完了写真を撮影",
    ],
  };
}

export default function RapidReportPage() {
  const [transcript, setTranscript] = useState("");
  const [siteName, setSiteName] = useState("品川第三プラント 配管工事");
  const [workDate, setWorkDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedStamp, setSelectedStamp] = useState<StampOption>(stampOptions[0]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFeedback, setRecordingFeedback] = useState("");
  const [speechReady, setSpeechReady] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;
    if (SpeechRecognitionClass) {
      setSpeechReady(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      attachments.forEach((a) => URL.revokeObjectURL(a.preview));
    };
  }, [attachments]);

  const structured = useMemo(
    () =>
      buildStructuredReport({
        siteName,
        workDate,
        note: transcript,
        stamp: selectedStamp.label,
        attachments,
      }),
    [attachments, selectedStamp.label, siteName, transcript, workDate],
  );

  const summary = useMemo(
    () => summarizeNotes(transcript, selectedStamp.label, attachments),
    [attachments, selectedStamp.label, transcript],
  );

  const startRecording = () => {
    const SpeechRecognitionClass =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionClass) {
      setTranscript((prev) => `${prev ? `${prev}\n` : ""}${quickPhrases[0]}`);
      setRecordingFeedback("端末の音声認識が利用できないため、デモ文を挿入しました。");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "ja-JP";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecordingFeedback("録音中... 話し終えたら自動で停止します。");
      setIsRecording(true);
    };
    recognition.onresult = (event) => {
      const transcriptResult = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("。");
      setTranscript((prev) => `${prev ? `${prev}\n` : ""}${transcriptResult}。`);
    };
    recognition.onerror = () => {
      setRecordingFeedback("音声認識でエラーが発生しました。再度お試しください。");
      setIsRecording(false);
    };
    recognition.onend = () => {
      setRecordingFeedback("音声を受け取りました。要約を更新しています。");
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    setRecordingFeedback("録音を停止しました。");
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .slice(0, 4)
      .map((file) => ({
        id: createId(),
        name: file.name,
        preview: URL.createObjectURL(file),
        category: guessCategory(file.name),
        timestamp: new Date().toLocaleTimeString(),
      }));
    setAttachments((prev) => [...prev, ...next]);
  };

  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-cyber-accent/30 bg-gradient-to-r from-cyber-darker via-cyber-dark to-cyber-darker p-8 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-accent/5 via-transparent to-cyber-blue/5 pointer-events-none" />
          <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-cyber-accent">RapidReport</p>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text leading-tight">
                声で終わる爆速日報
              </h1>
              <p className="text-gray-300 leading-relaxed">
                移動中や片付けの合間に、話すだけで日報が完成。
                音声→自動整形、写真の自動配置、ワンタップの完了スタンプで、
                「5分かかっていた報告を30秒に」するデモ体験ページです。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-xs rounded-full bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30">
                  音声認識{speechReady ? " 利用可" : " デモ動作"}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-200 border border-blue-500/30">
                  AI整形（ローカルデモ）
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/30">
                  写真自動タグ付け
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl border border-cyber-accent/30 bg-cyber-darker/80 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>日報プレビュー</span>
                  <span className="text-cyber-accent">30秒で送信</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock3 size={16} className="text-cyber-accent" />
                    <span>{structured.workDate}</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{structured.headline}</div>
                  <div className="text-sm text-gray-400 leading-relaxed border border-gray-800 rounded-lg p-3 bg-cyber-dark/60">
                    {summary.split("\n").map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {structured.attachments.slice(0, 3).map((a) => (
                      <span
                        key={a.id}
                        className="text-xs px-2 py-1 rounded-md bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30"
                      >
                        {a.category}
                      </span>
                    ))}
                    {!structured.attachments.length && (
                      <span className="text-xs text-gray-500">写真なし</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-cyber-accent/10 rounded-full blur-3xl" />
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-800 bg-cyber-darker p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Step 1</p>
                  <h2 className="text-xl font-semibold text-white">音声でメモ</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 transition"
                  >
                    <Mic size={16} />
                    {isRecording ? "録音中..." : "録音開始"}
                  </button>
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
                  >
                    <StopCircle size={16} />
                    停止
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <label className="text-sm text-gray-300 space-y-2">
                  現場名
                  <input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full rounded-lg bg-cyber-dark border border-gray-800 px-3 py-2 text-sm focus:border-cyber-accent/60 focus:outline-none"
                  />
                </label>
                <label className="text-sm text-gray-300 space-y-2">
                  作業日
                  <input
                    type="date"
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    className="w-full rounded-lg bg-cyber-dark border border-gray-800 px-3 py-2 text-sm focus:border-cyber-accent/60 focus:outline-none"
                  />
                </label>
              </div>

              <div className="rounded-xl border border-gray-800 bg-cyber-dark/60 p-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <Sparkles size={16} className="text-cyber-accent" />
                  <span>音声から抽出されたメモ（手修正も可能）</span>
                </div>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg bg-cyber-darker border border-gray-800 px-3 py-2 text-sm focus:border-cyber-accent/60 focus:outline-none resize-none"
                  placeholder="例: 〇〇現場、配管工事完了。部材が2個足りなかった..."
                />
                {recordingFeedback && (
                  <p className="text-xs text-gray-500 mt-2">{recordingFeedback}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {quickPhrases.map((phrase) => (
                    <button
                      key={phrase}
                      className="text-xs px-3 py-2 rounded-lg border border-gray-800 text-gray-300 hover:border-cyber-accent/40 hover:text-cyber-accent transition"
                      onClick={() => setTranscript(phrase)}
                    >
                      サンプル読込
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-800 bg-cyber-darker p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">Step 2</p>
                  <h2 className="text-xl font-semibold text-white">写真を添付</h2>
                </div>
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/10 transition cursor-pointer">
                  <Camera size={16} />
                  画像を選択
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                {attachments.length === 0 && (
                  <div className="col-span-3 text-sm text-gray-500 border border-dashed border-gray-700 rounded-lg p-4">
                    撮影するとここに自動配置されます。ファイル名や順番から施工前/後を推定。
                  </div>
                )}
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="relative rounded-lg border border-gray-800 bg-cyber-dark/60 p-3 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <ImageIcon size={14} />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <span className="inline-flex items-center text-[11px] px-2 py-1 rounded-md bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30">
                      {file.category}
                    </span>
                    <p className="text-[11px] text-gray-500">撮影時刻: {file.timestamp}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-800 bg-cyber-darker p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-cyber-accent" />
                <h2 className="text-xl font-semibold text-white">AI要約・整形結果</h2>
              </div>
              <div className="rounded-xl border border-gray-800 bg-cyber-dark/60 p-4 text-sm text-gray-200 min-h-[160px] whitespace-pre-line">
                {summary}
              </div>
              <div className="mt-3 text-xs text-gray-500">
                ローカル整形のためAPI不要。実運用ではクラウドLLM＋禁止ワードフィルタを併用。
              </div>
            </section>

            <section className="rounded-2xl border border-gray-800 bg-cyber-darker p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-cyber-accent" />
                <h2 className="text-xl font-semibold text-white">スタンプと送信プレビュー</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {stampOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedStamp(opt)}
                    className={`text-sm px-3 py-2 rounded-lg border transition ${
                      selectedStamp.value === opt.value
                        ? `${opt.tone} border-current`
                        : "border-gray-800 text-gray-300 hover:border-cyber-accent/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-gray-800 bg-cyber-dark/60 p-4 space-y-3 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Clock3 size={14} className="text-cyber-accent" />
                  <span>{structured.workDate}</span>
                </div>
                <div className="font-semibold text-white">{structured.headline}</div>
                <div className="space-y-2 text-gray-300">
                  <p className="text-xs text-gray-500">進捗 / 作業内容</p>
                  <ul className="list-disc list-inside space-y-1">
                    {structured.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="text-xs text-gray-500">安全・品質</p>
                  <p>{structured.safety}</p>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="text-xs text-gray-500">次アクション</p>
                  <ul className="list-disc list-inside space-y-1">
                    {structured.nextActions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="w-full cyber-button text-center justify-center flex items-center gap-2">
                <ShieldCheck size={16} />
                送信（ダミー）
              </button>
            </section>
          </div>
        </div>

        <section className="rounded-2xl border border-gray-800 bg-cyber-darker p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-cyber-accent" />
            <h2 className="text-xl font-semibold text-white">このデモで再現しているポイント</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-800 bg-cyber-dark/60 p-4 space-y-2 hover:border-cyber-accent/30 transition"
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} className="text-cyber-accent" />
                  <p className="font-semibold text-white">{title}</p>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

