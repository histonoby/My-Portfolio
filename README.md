# Moto Portfolio

サイバーパンク風のモダンなポートフォリオサイトです。

## 🚀 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm start
```

## 🌐 Vercelへのデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「Add New Project」をクリック
3. GitHubリポジトリを選択
4. 自動的に設定が検出されます
5. 「Deploy」をクリック

## 📁 プロジェクト構成

```
portfolio/
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
├── components/
│   ├── Header.tsx       # ナビゲーションヘッダー
│   ├── Hero.tsx         # ヒーローセクション
│   ├── About.tsx        # 自己紹介セクション
│   ├── Projects.tsx     # プロジェクト一覧
│   ├── Contact.tsx      # コンタクトセクション
│   └── Footer.tsx       # フッター
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## ✏️ カスタマイズ

### プロジェクトの追加

`components/Projects.tsx` の `projects` 配列を編集：

```typescript
const projects = [
  {
    id: 1,
    title: "プロジェクト名",
    description: "プロジェクトの説明",
    tags: ["Next.js", "TypeScript"],
    image: "/images/project.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/...",
    isPlaceholder: false,
  },
  // ...
];
```

### SNSリンクの追加

`components/Contact.tsx` と `components/Footer.tsx` で追加のソーシャルリンクを設定できます。

## 📄 ライセンス

MIT License

