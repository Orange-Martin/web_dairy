import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ArticleGrid } from "./components/ArticleGrid";
import { ArticleDetail } from "./components/ArticleDetail";
import { Footer } from "./components/Footer";

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

const articles: Article[] = [
  {
    id: "1",
    title: "北海道的冬日物语",
    subtitle: "在白雪皑皑的北国，寻找最纯粹的宁静",
    date: "2025年2月",
    location: "日本 · 北海道",
    coverImage:
      "https://images.unsplash.com/photo-1721313032845-3c22e5950506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRyYWRpdGlvbmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzUyMjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "亚洲",
    readTime: "8 分钟",
    content: `冬日的北海道，是一个被雪花轻柔包裹的梦境。从札幌到小樽，从函馆到富良野，每一处都散发着独特的魅力。

清晨，当第一缕阳光穿过窗帘，映照在榻榻米上，我便知道今天又将是美好的一天。推开窗，外面是一片银装素裹的世界，雪花还在慢悠悠地飘着，像是天空在诉说着温柔的情话。

小樽运河畔，煤油灯在黄昏时分被一盏盏点亮，温暖的光晕与白雪交相辉映。这座曾经繁华的港口城市，如今已褪去喧嚣，只剩下岁月沉淀下来的诗意与浪漫。

在这里，时间仿佛放慢了脚步。一杯热腾腾的抹茶，一碗暖心的拉面，都能让人感受到幸福原来如此简单。`,
    gallery: [
      "https://images.unsplash.com/photo-1721313032845-3c22e5950506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRyYWRpdGlvbmFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzUyMjU5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1749105862023-daa3512f32eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjYWZlJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYzNjAwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "2",
    title: "冰岛的极光追寻",
    subtitle: "在世界尽头，遇见最绚烂的天空",
    date: "2024年11月",
    location: "冰岛 · 雷克雅未克",
    coverImage:
      "https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NjM1NDU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "欧洲",
    readTime: "10 分钟",
    content: `在冰岛的极夜里追寻北极光，是一场与自然的约会，也是一次心灵的洗礼。

当绿色的光带在漆黑的夜空中舞动，仿佛天神在挥洒着荧光颜料，那种震撼是无法用言语形容的。我站在空旷的原野上，仰望着这场宇宙的演出，感受到了自己的渺小，也感受到了存在的意义。

冰岛的美，不仅在于极光，更在于那些冰川、火山、温泉和熔岩地貌。这是一片冰与火交织的土地，既狂野又纯净，既荒凉又充满生机。

每一次按下快门，都是对这份美好的记录；每一次深呼吸，都是与自然的对话。`,
    gallery: [
      "https://images.unsplash.com/photo-1648607560570-4ee80c5914c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYXxlbnwxfHx8fDE3NjM1NDU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1713959989861-2425c95e9777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNTg5MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "3",
    title: "漫步布拉格",
    subtitle: "在中世纪的街道上，寻找卡夫卡的足迹",
    date: "2024年9月",
    location: "捷克 · 布拉格",
    coverImage:
      "https://images.unsplash.com/photo-1688396766770-794df42aad2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzYzNjAwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "欧洲",
    readTime: "7 分钟",
    content: `布拉格，这座被称为"千塔之城"的城市，用它独特的魅力征服了每一位到访者。

漫步在查理大桥上，两侧的雕像静静伫立，仿佛在诉说着几百年前的故事。伏尔塔瓦河在桥下缓缓流淌，倒映着两岸古老的建筑，构成了一幅流动的油画。

老城广场的天文钟，每到整点便开始它的表演。人群聚集在钟楼下，仰望着这座精妙的机械装置，感叹着先人的智慧。

在这座城市里，每一条小巷都藏着惊喜，每一个转角都能遇见美好。这就是布拉格，一座活在童话里的城市。`,
    gallery: [
      "https://images.unsplash.com/photo-1688396766770-794df42aad2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzYzNjAwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "4",
    title: "马尔代夫的蓝色梦境",
    subtitle: "在印度洋的怀抱中，与世界说再见",
    date: "2024年6月",
    location: "马尔代夫",
    coverImage:
      "https://images.unsplash.com/photo-1631535152690-ba1a85229136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHRyb3BpY2FsJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzYwMDUwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "海岛",
    readTime: "6 分钟",
    content: `马尔代夫的蓝，是一种让人沉醉的蓝。从浅蓝到深蓝，海水呈现出层次分明的色彩，美得不真实。

住在水上屋里，推开门便是大海。清晨，被海浪声温柔唤醒；傍晚，看着夕阳一点点沉入海平面。这样的日子，简单而美好。

在这里，没有什么需要担心的，也没有什么需要急着去做的。只需要静静地躺在沙滩上，让海风拂过肌肤，让阳光温暖心房。

这是一场与自己的约会，也是一次心灵的度假。`,
    gallery: [
      "https://images.unsplash.com/photo-1631535152690-ba1a85229136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHRyb3BpY2FsJTIwc3Vuc2V0fGVufDF8fHx8MTc2MzYwMDUwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "5",
    title: "撒哈拉的星空",
    subtitle: "在沙漠深处，仰望璀璨银河",
    date: "2024年3月",
    location: "摩洛哥 · 撒哈拉",
    coverImage:
      "https://images.unsplash.com/photo-1684275749756-a456251d009e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYzNjAwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "非洲",
    readTime: "9 分钟",
    content: `三毛说过："每想你一次，天上飘落一粒沙，从此形成了撒哈拉。"来到这片传奇的沙漠，终于理解了这句话的诗意。

白天，沙漠在烈日下泛着金光，沙丘绵延起伏，像是凝固的波浪。骑着骆驼缓缓前行，感受着沙漠的浩瀚与苍凉。

夜晚，才是沙漠最美的时刻。当繁星在头顶铺满整个天空，银河清晰可见，仿佛伸手就能触碰到。那一刻，所有的烦恼都消失了，只剩下对宇宙的敬畏与感动。

在撒哈拉，我找到了内心的平静，也找到了生命的意义。`,
    gallery: [
      "https://images.unsplash.com/photo-1684275749756-a456251d009e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGUlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYzNjAwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "6",
    title: "吴哥窟的日出",
    subtitle: "在千年古寺前，等待第一缕阳光",
    date: "2023年12月",
    location: "柬埔寨 · 暹粒",
    coverImage:
      "https://images.unsplash.com/photo-1598177183308-ec8555cbfe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwcnVpbnN8ZW58MXx8fHwxNzYzNjAwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "亚洲",
    readTime: "8 分钟",
    content: `凌晨四点，当大部分人还在梦乡时，我已经站在了吴哥窟前。四周一片漆黑，只有星光在闪烁。

随着天色渐渐明亮，古老的寺庙轮廓开始显现。当第一缕阳光穿透云层，照射在五座塔尖上时，整个世界都被染成了金色。那一刻，时间仿佛停止了。

吴哥窟的美，不仅在于它的建筑艺术，更在于它所承载的历史与文化。每一块石头，每一尊雕像，都在讲述着高棉帝国曾经的辉煌。

在这里，我感受到了信仰的力量，也感受到了时间的流逝。千年之后，这些石头依然屹立，见证着人类文明的传承。`,
    gallery: [
      "https://images.unsplash.com/photo-1598177183308-ec8555cbfe76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwcnVpbnN8ZW58MXx8fHwxNzYzNjAwNTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

export default function App() {
  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("全部");

  const categories = ["全部", "亚洲", "欧洲", "海岛", "非洲"];

  const filteredArticles =
    selectedCategory === "全部"
      ? articles
      : articles.filter(
          (article) => article.category === selectedCategory,
        );

  return (
    <div className="min-h-screen bg-stone-50">
      {!selectedArticle ? (
        <>
          <Hero />
          <Header
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <ArticleGrid
            articles={filteredArticles}
            onArticleClick={setSelectedArticle}
          />
        </>
      ) : (
        <ArticleDetail
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      )}

      <Footer />
    </div>
  );
}