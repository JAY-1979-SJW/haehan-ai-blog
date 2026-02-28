import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

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

const categories = ["전체", "AI활용", "업계동향", "제품소식"];

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50" style={{ backgroundColor: ORANGE }} />

      {/* 헤더 */}
      <header
        className="sticky top-[3px] z-40 border-b"
        style={{ backgroundColor: `${DARK}f5`, borderColor: BORDER, backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="https://haehan-ai.kr" className="flex items-center gap-2 select-none">
            <img src="/logo-header.svg" alt="해한Ai Engineering" className="h-7" />
            <span className="text-xs font-medium hidden sm:inline" style={{ color: MUTED }}>블로그</span>
          </a>
          <a href="https://haehan-ai.kr" className="text-sm transition-colors hover:text-white" style={{ color: BLUE }}>
            ← 홈으로
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 히어로 */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
            style={{ backgroundColor: `${BLUE}15`, borderColor: `${BLUE}30`, color: BLUE }}
          >
            기술 블로그
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            건설 현장 <span style={{ color: ORANGE }}>AI 인사이트</span>
          </h1>
          <p style={{ color: MUTED }}>
            건설업 AI 자동화, 입찰 전략, CAD 활용 팁을 현장 실무자 관점으로 전달합니다.
          </p>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm font-medium border cursor-default"
              style={{ backgroundColor: "transparent", borderColor: BORDER, color: MUTED }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* 글 목록 */}
        <div className="space-y-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="block group">
              <article
                className="rounded-2xl border p-6 transition-colors"
                style={{ backgroundColor: CARD, borderColor: BORDER }}
              >
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${categoryColor[post.category] || BLUE}20`,
                      color: categoryColor[post.category] || BLUE,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: `${MUTED}80` }}>
                    {post.date} · {post.readTime} 읽기
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {post.description}
                </p>
                <div className="mt-4 text-sm font-medium" style={{ color: ORANGE }}>
                  읽기 →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t mt-16 py-8" style={{ borderColor: BORDER }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
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
