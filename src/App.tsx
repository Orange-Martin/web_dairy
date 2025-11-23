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
      const list = fetched.articles || [];
      setContent(cfg);
      setArticles(list);
    };
    loadContent();
  }, []);

  const categories = ["全部", "亚洲", "欧洲", "海岛", "非洲"];

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
          <Hero />
          <Header
            logoText={content.header_logo}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <ArticleGrid
            articles={filteredArticles}
            onArticleClick={setSelectedArticle}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
