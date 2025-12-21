import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moto | Portfolio",
  description: "組み込み領域が本職のかけだしアプリ開発者。ささいな「あったらいいな」を形にします。",
  keywords: ["Moto", "ポートフォリオ", "Webアプリ", "開発者", "組み込み"],
  authors: [{ name: "Moto" }],
  openGraph: {
    title: "Moto | Portfolio",
    description: "組み込み領域が本職のかけだしアプリ開発者。ささいな「あったらいいな」を形にします。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moto | Portfolio",
    description: "組み込み領域が本職のかけだしアプリ開発者。ささいな「あったらいいな」を形にします。",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="grid-bg circuit-lines min-h-screen">
        {children}
      </body>
    </html>
  );
}

