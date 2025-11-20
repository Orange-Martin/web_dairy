interface HeaderProps {
  logoText?: string;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Header({ logoText, categories, selectedCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200/50">
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="text-center space-y-2">
            <h2 className="text-xl tracking-[0.2em] text-stone-800" style={{ fontWeight: 300 }}>
              {logoText || '游记手札'}
            </h2>
            <div className="h-px w-16 bg-stone-300 mx-auto" />
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`relative text-sm tracking-wider transition-colors duration-300 ${
                  selectedCategory === category
                    ? "text-stone-900"
                    : "text-stone-400 hover:text-stone-700"
                }`}
                style={{ fontWeight: 300 }}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-stone-900" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}