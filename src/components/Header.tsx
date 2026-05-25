import { Landmark, TrendingUp } from "lucide-react";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="w-full max-w-5xl mx-auto pt-8 pb-6 px-4 md:px-0 text-center select-none">
      {/* Top tiny meta bar */}
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#111111]/60 uppercase border-b border-[#111111]/15 pb-2 mb-6">
        <span>No. 402</span>
        <span>The Value Column</span>
        <span>Est. 2026</span>
      </div>

      {/* Main Masthead */}
      <div className="my-2">
        <h1 className="font-serif font-black tracking-tight text-5xl md:text-7xl uppercase text-[#111111] leading-none">
          THE SPECULATOR
        </h1>
        <p className="font-serif italic text-base md:text-lg text-[#111111]/75 mt-3 max-w-2xl mx-auto leading-relaxed">
          "A quarterly review of corporate enterprises, intrinsic values, and checklists of the investment masters."
        </p>
      </div>

      {/* Literary Double Rules */}
      <div className="border-t border-[#111111] mt-6 pt-1">
        <div className="border-t-[3px] border-[#111111] py-1 flex flex-col sm:flex-row justify-between items-center text-xs font-mono uppercase tracking-wider text-[#111111]">
          <span>{currentDate}</span>
          <div className="flex items-center gap-1.5 font-bold my-1 sm:my-0">
            <Landmark className="w-3.5 h-3.5" />
            <span>Valuation Issue</span>
          </div>
          <span>Price: Skepticism & Patience</span>
        </div>
      </div>
    </header>
  );
}
