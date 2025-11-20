import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Article } from "../App";

interface ArticleGridProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export function ArticleGrid({
  articles,
  onArticleClick,
}: ArticleGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 py-24">
      <div className="space-y-32">
        {articles.map((article, index) => (
          <article
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="group cursor-pointer"
          >
            <div
              className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative aspect-[3/4] overflow-hidden ${
                  index % 2 === 1 ? "md:col-start-2" : ""
                }`}
              >
                <ImageWithFallback
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div
                className={`space-y-8 ${
                  index % 2 === 1
                    ? "md:col-start-1 md:row-start-1"
                    : ""
                }`}
              >
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="text-xs tracking-[0.3em] text-stone-400 uppercase">
                      {article.category}
                    </div>
                    <h2
                      className="text-3xl md:text-4xl text-stone-900 tracking-tight group-hover:text-stone-600 transition-colors duration-300"
                      style={{ fontWeight: 300 }}
                    >
                      {article.title}
                    </h2>
                  </div>

                  <div className="h-px w-12 bg-stone-300" />

                  <p
                    className="text-stone-600 leading-loose max-w-md"
                    style={{ fontWeight: 300 }}
                  >
                    {article.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs tracking-wider text-stone-400">
                  <span>{article.location}</span>
                  <span className="w-px h-3 bg-stone-300" />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}