import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "해한Ai 블로그", template: "%s | 해한Ai 블로그" },
  description: "건설업 AI 자동화, 입찰 전략, CAD 활용 등 건설 현장 실무자를 위한 기술 블로그.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/android-chrome-192x192.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
