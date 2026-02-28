import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getPost, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

const BG = "#1B2838";
const DARK = "#141E2A";
const CARD = "#243144";
const BORDER = "rgba(91,164,217,0.2)";
const ORANGE = "#F47920";
const BLUE = "#5BA4D9";
const MUTED = "#A0AEC0";

const categoryColor: Record<string, string> = {
  "AI활용": ORANGE,
  "업계동향": BLUE,
  "제품소식": "#48BB78",
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const color = categoryColor[post.category] || BLUE;

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50" style={{ backgroundColor: ORANGE }} />

      {/* 헤더 */}
      <header
        className="sticky top-[3px] z-40 border-b"
        style={{ backgroundColor: `${DARK}f5`, borderColor: BORDER, backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-baseline gap-1 select-none">
            <span className="text-lg font-black text-white">해한</span>
            <span className="text-lg font-black" style={{ color: ORANGE }}>Ai</span>
            <span className="text-xs font-medium ml-1 hidden sm:inline" style={{ color: MUTED }}>블로그</span>
          </a>
          <Link href="/" className="text-sm transition-colors hover:text-white" style={{ color: BLUE }}>
            ← 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* 글 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {post.category}
            </span>
            <span className="text-xs" style={{ color: `${MUTED}80` }}>
              {post.date} · {post.readTime} 읽기
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: MUTED }}>
            {post.description}
          </p>
          <div className="mt-6 h-px" style={{ backgroundColor: BORDER }} />
        </div>

        {/* 본문 */}
        <div className="prose">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* 하단 CTA */}
        <div
          className="mt-14 rounded-2xl p-6 sm:p-8 text-center border"
          style={{ backgroundColor: CARD, borderColor: `${ORANGE}30` }}
        >
          <p className="text-white font-semibold mb-2">해한Ai Engineering 서비스 체험하기</p>
          <p className="text-sm mb-5" style={{ color: MUTED }}>
            건설업 전 공종 30개+ AI 자동화 도구를 직접 사용해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.haehan-ai.kr"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              서비스 사전 등록
            </a>
            <a
              href="https://haehan-ai.kr/pricing"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold border transition-colors hover:text-white"
              style={{ borderColor: BORDER, color: MUTED }}
            >
              요금제 보기
            </a>
          </div>
        </div>

        {/* 목록으로 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm transition-colors hover:text-white"
            style={{ color: BLUE }}
          >
            ← 블로그 목록으로
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t mt-16 py-8" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs" style={{ color: `${MUTED}80` }}>
            <span>상호: 해한AI엔지니어링</span>
            <span>대표자: 신재우</span>
            <span>사업자등록번호: 372-34-00685</span>
            <span>이메일: info@haehan-ai.kr</span>
          </div>
          <p className="text-xs" style={{ color: `${MUTED}50` }}>© 2025 해한AI엔지니어링. All rights reserved.</p>
        </div>
      </footer>
      <div className="h-[3px] w-full" style={{ backgroundColor: ORANGE }} />
    </div>
  );
}
