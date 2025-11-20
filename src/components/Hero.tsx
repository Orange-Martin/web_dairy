import { ChevronDown, Minus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center min-h-[calc(100vh-10rem)]">
          {/* Left Content */}
          <div className="md:col-span-5 space-y-12 md:space-y-16">
            {/* Header */}
            <div className="space-y-8">
              {/* Small intro */}
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-stone-400" />
                <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase">
                  Photography & Writing
                </span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-6xl md:text-7xl text-stone-900" style={{ 
                    fontWeight: 200,
                    letterSpacing: '0.08em',
                    lineHeight: '1.1'
                  }}>
                    游记
                  </h1>
                  <h1 className="text-6xl md:text-7xl text-stone-900" style={{ 
                    fontWeight: 200,
                    letterSpacing: '0.08em',
                    lineHeight: '1.1'
                  }}>
                    手札
                  </h1>
                </div>
                
                <div className="flex items-center gap-4 pl-1">
                  <div className="w-12 h-px bg-stone-900" />
                  <span className="text-xs tracking-[0.3em] text-stone-400" style={{ fontWeight: 300 }}>
                    TRAVEL JOURNAL
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-8 max-w-md">
              <p className="text-stone-600 leading-loose tracking-wide" style={{ 
                fontWeight: 300,
                fontSize: '0.9375rem',
                lineHeight: '2'
              }}>
                用镜头捕捉时光的温度，以文字铭刻旅途的印记。<br />
                每一段旅程，都是一次与世界的对话。
              </p>
              
              {/* Stats */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-300 to-transparent" />
                <div className="flex items-center gap-8 pl-4">
                  <div className="space-y-2">
                    <div className="text-3xl text-stone-900" style={{ fontWeight: 200, letterSpacing: '0.05em' }}>06</div>
                    <div className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">Stories</div>
                  </div>
                  <div className="w-px h-12 bg-stone-300" />
                  <div className="space-y-2">
                    <div className="text-3xl text-stone-900" style={{ fontWeight: 200, letterSpacing: '0.05em' }}>04</div>
                    <div className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">Regions</div>
                  </div>
                  <div className="w-px h-12 bg-stone-300" />
                  <div className="space-y-2">
                    <div className="text-3xl text-stone-900" style={{ fontWeight: 200, letterSpacing: '0.05em' }}>2025</div>
                    <div className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">Latest</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={scrollToContent}
              className="group flex items-center gap-4 text-stone-900 hover:text-stone-600 transition-colors pt-4"
            >
              <span className="text-sm tracking-[0.15em]" style={{ fontWeight: 300 }}>
                探索游记
              </span>
              <div className="flex items-center gap-2">
                <Minus className="w-4 h-4" />
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Right Image */}
          <div className="md:col-span-7 relative">
            {/* Single decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-stone-300/50 pointer-events-none" />
            
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759519028791-13f7fb5e71aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmb3Jlc3QlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NjM2MDExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              
              {/* Simple caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <div className="flex items-end justify-between text-white">
                  <div className="space-y-2">
                    <div className="text-lg tracking-wide" style={{ fontWeight: 300 }}>
                      静谧之境
                    </div>
                    <div className="text-[10px] tracking-[0.2em] text-white/70 uppercase">
                      Tranquility
                    </div>
                  </div>
                  <div className="text-xs tracking-wider text-white/70" style={{ fontWeight: 300 }}>
                    01
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top decorative elements */}
      <div className="absolute top-8 left-8 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-stone-400">
          <div className="text-[10px] tracking-[0.3em]">2025</div>
          <div className="w-8 h-px bg-stone-300" />
        </div>
        <div className="text-[9px] tracking-[0.2em] text-stone-400/60 uppercase">
          Collection
        </div>
      </div>
      
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
        <div className="flex items-center gap-3 text-stone-400">
          <div className="w-8 h-px bg-stone-300" />
          <div className="text-[10px] tracking-[0.3em]">PORTFOLIO</div>
        </div>
        <div className="text-[9px] tracking-[0.2em] text-stone-400/60 uppercase">
          Vol. I
        </div>
      </div>

      {/* Subtle grid pattern decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #78716c 1px, transparent 1px),
            linear-gradient(to bottom, #78716c 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  );
}
