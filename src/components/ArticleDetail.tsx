import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Article } from "../App";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  return (
    <div className="min-h-screen">
      <div className="relative w-full aspect-[2/1] max-h-[320px] md:max-h-[360px] lg:max-h-[420px] min-h-[180px] overflow-hidden">
        <ImageWithFallback
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-50" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-8 md:left-16 w-12 h-12 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-56">
          <div className="max-w-3xl">
            <div className="space-y-6">
              <div className="text-xs tracking-[0.3em] text-white/80 uppercase">
                {article.category}
              </div>
              <h1 className="text-5xl md:text-6xl text-white tracking-tight drop-shadow-lg" style={{ fontWeight: 250 }}>
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-8 md:px-16 pt-24 pb-20 relative z-10">
        <div className="space-y-16">
          {/* Meta */}
          <div className="space-y-6">
            <p 
              className="text-xl md:text-2xl text-stone-700 leading-relaxed"
              style={{ fontWeight: 300 }}
            >
              {article.subtitle}
            </p>
            
            <div className="flex items-center gap-6 text-xs tracking-wider text-stone-400">
              <span>{article.location}</span>
              <span className="w-px h-3 bg-stone-300" />
              <span>{article.date}</span>
              <span className="w-px h-3 bg-stone-300" />
              <span>{article.readTime}</span>
            </div>
            
            <div className="h-px w-full bg-stone-200" />
          </div>

          {/* Body */}
          <div className="space-y-8">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="text-stone-600 leading-loose tracking-wide"
                style={{ fontWeight: 300, fontSize: '1.0625rem' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Gallery */}
          {article.gallery.length > 1 && (
            <div className="pt-16 space-y-12">
              <div className="h-px w-full bg-stone-200" />
              {article.gallery.slice(1).map((image, index) => (
                <div key={index} className="space-y-6">
                  <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                    <ImageWithFallback
                      src={image}
                      alt={`${article.title} - 图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Bottom Spacing */}
      <div className="h-32" />
    </div>
  );
}
