export function Footer() {
  return (
    <footer className="border-t border-stone-200/50 bg-stone-50">
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <h3 
              className="text-xl tracking-[0.2em] text-stone-800"
              style={{ fontWeight: 300 }}
            >
              游记手札
            </h3>
            <div className="h-px w-16 bg-stone-300 mx-auto" />
          </div>
          
          <p 
            className="text-sm text-stone-400 tracking-wider max-w-md"
            style={{ fontWeight: 300 }}
          >
            用镜头记录世界的美好，以文字铭刻时光的印记
          </p>
          
          <div className="pt-8 text-xs text-stone-400 tracking-wider">
            © 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
