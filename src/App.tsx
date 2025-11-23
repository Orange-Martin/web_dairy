import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ArticleGrid } from "./components/ArticleGrid";
import { ArticleDetail } from "./components/ArticleDetail";
import { Footer } from "./components/Footer";
import { fetchWebsiteContent } from "./services/feishu";

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  coverImage: string;
  category: string;
  content: string;
  gallery: string[];
  readTime: string;
}

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [content, setContent] = useState<Record<string, any>>({});
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const fetched = await fetchWebsiteContent();
      const cfg = fetched.config || fetched;
      setContent(cfg);
      const built: Article[] = [];
      for (let i = 1; i <= 6; i++) {
        const p = `grid_${i}`;
        const title = cfg[`${p}_title`];
        const cover = cfg[`${p}_cover_url`];
        if (!title || !cover) continue;
        built.push({
          id: String(i),
          title: String(title),
          subtitle: String(cfg[`${p}_subtitle`] || ''),
          date: String(cfg[`${p}_date`] || ''),
          location: String(cfg[`${p}_location`] || ''),
          coverImage: String(cover),
          category: String(cfg[`${p}_category`] || ''),
          content: String(cfg[`${p}_content`] || ''),
          gallery: Array.isArray(cfg[`${p}_gallery_urls`])
            ? (cfg[`${p}_gallery_urls`] as string[])
            : String(cfg[`${p}_gallery_urls`] || '')
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean),
          readTime: String(cfg[`${p}_read_time`] || ''),
        });
      }
      setArticles(built);
    };
    loadContent();
  }, []);

  const categories = ["全部", "亚洲", "欧洲", "海岛", "非洲"];
  const dynamicCategories = Array.from(new Set(articles.map(a => a.category).filter(Boolean)));
  const allCategories = dynamicCategories.length > 0 ? ["全部", ...dynamicCategories] : categories;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedArticle(null); // Reset article selection when category changes
  };

  const filteredArticles =
    selectedCategory === "全部"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      {selectedArticle ? (
        <ArticleDetail 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)} 
        />
      ) : (
        <>
          <Hero
            smallIntro={content.hero_small_intro}
            titleLine1={content.hero_title_line1}
            titleLine2={content.hero_title_line2}
            badgeTitle={content.hero_badge_title}
            description={content.hero_description}
            statsStories={content.stats_stories}
            statsRegions={content.stats_regions}
            statsLatest={content.stats_latest}
            imageUrl={content.hero_image_url}
            captionTitle={content.hero_caption_title}
            captionSubtitle={content.hero_caption_subtitle}
            captionIndex={content.hero_caption_index}
          />
          <Header
            logoText={content.header_logo}
            categories={allCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <ArticleGrid
            articles={filteredArticles}
            onArticleClick={setSelectedArticle}
          />
          <Footer
            title={content.footer_title}
            text={content.footer_text}
            year={content.footer_year}
          />
        </>
      )}
    </div>
  );
}
