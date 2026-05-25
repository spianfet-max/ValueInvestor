import { ChecklistReport } from "../types";
import { Sparkles, Flag, Flame, Target, Compass } from "lucide-react";

interface VerdictViewProps {
  report: ChecklistReport;
}

export default function VerdictView({ report }: VerdictViewProps) {
  const getDecisionStyles = (decision: string) => {
    switch (decision) {
      case "STRONG INVEST":
        return {
          bg: "bg-[#3b7a57]/5",
          border: "border-[#3b7a57]",
          text: "text-[#3b7a57]",
          subtitle: "Highly undervalued with stable economic moats & secure cash conversions.",
        };
      case "WATCHLIST/PATIENCE":
        return {
          bg: "bg-[#b89b5c]/5",
          border: "border-[#b89b5c]",
          text: "text-[#b89b5c]",
          subtitle: "Hold close on watchlists. Strong business but waiting for a larger margin of safety.",
        };
      case "AVOID/SPECULATIVE":
        return {
          bg: "bg-[#b22222]/5",
          border: "border-[#b22222]",
          text: "text-[#b22222]",
          subtitle: "Substantial capital impairment risks. Avoid speculative positions entirely.",
        };
      case "VALUE TRAP RISK":
        return {
          bg: "bg-[#111111]/5",
          border: "border-[#111111]",
          text: "text-[#111111]",
          subtitle: "Appears cheap on reported multiples, but possesses structural business decline.",
        };
      default:
        return {
          bg: "bg-[#111111]/5",
          border: "border-[#111111]",
          text: "text-[#111111]",
          subtitle: "Evaluation pending further qualitative search grounding proofs.",
        };
    }
  };

  const styles = getDecisionStyles(report.overallVerdict.decision);

  return (
    <section className="w-full max-w-5xl mx-auto py-10 px-4 md:px-0 select-none">
      
      {/* Verdict Header Badge Card */}
      <div className={`border-double-ny ${styles.border} ${styles.bg} p-6 md:p-8 mb-10 text-center`}>
        <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">SECTION V — THE ADVISORY VERDICT</span>
        
        <h2 className={`font-serif font-black text-3xl md:text-5xl uppercase tracking-tight my-2 ${styles.text}`}>
          {report.overallVerdict.decision}
        </h2>
        
        <p className="font-serif italic text-sm md:text-base text-[#111111]/75 max-w-xl mx-auto mt-2 leading-relaxed border-t border-[#111111]/10 pt-3">
          {styles.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 items-center justify-center font-mono text-xs uppercase pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#fbfbf9]">
            <Compass className="w-3.5 h-3.5" />
            <span>Discount to Value: {report.overallVerdict.discountToValue || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#111111]/10 px-2 py-1 text-[#111111]/80">
            <span>Z-Score: {report.altmanZScore.score}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#111111]/10 px-2 py-1 text-[#111111]/80">
            <span>F-Score: {report.piotroskiFScore.totalScore} / 9</span>
          </div>
        </div>
      </div>

      {/* New Yorker Styled Editorial Article Block */}
      <div className="border-t border-[#111111] pt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Metadata and Author Credit block */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#111111]/15 pb-6 md:pb-0 md:pr-6">
          <div className="sticky top-6">
            <h4 className="font-serif font-bold text-xl uppercase tracking-tight border-b-2 border-[#111111] pb-1.5 mb-4">
              ANALYSIS DISCLOSURE
            </h4>
            
            <p className="font-mono text-xs text-[#111111]/60 leading-relaxed space-y-2">
              <span className="block"><strong>Subject:</strong> {report.companyName} ({report.ticker})</span>
              <span className="block"><strong>Industry Sector:</strong> {report.sector}</span>
              <span className="block"><strong>Valuation Framework:</strong> Multi-Legend Checklist Synthesis</span>
              <span className="block"><strong>Time Horizon:</strong> 3 – 5 Years (Compound Horizon)</span>
            </p>

            <div className="mt-8 border-t border-[#111111]/10 pt-6">
              <span className="font-mono text-[10px] uppercase tracking-wider block text-[#111111]/50 mb-1">
                EXECUTIVE ANALYST
              </span>
              <p className="font-serif italic text-sm text-[#111111]/80">
                The AI Speculator's Board of Trustees
              </p>
              <p className="text-[10px] font-mono text-[#111111]/40 uppercase tracking-widest mt-0.5">
                New Yorker Value Desk
              </p>
            </div>
            
            {/* Tiny illustration cartoon like standard New Yorker margin cartoons */}
            <div className="mt-10 border border-[#111111]/10 p-4 bg-white/40 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border border-[#111111] rounded-full flex items-center justify-center font-bold text-lg font-serif">
                $
              </div>
              <p className="mt-2 text-[10px] font-mono text-[#111111]/40 uppercase tracking-widest leading-normal">
                "Patience is the only arbitrage left in a nervous market."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: High editorial columns */}
        <div className="md:col-span-8 font-serif leading-relaxed text-[#111111]/90">
          <h3 className="font-serif font-black text-2xl uppercase tracking-tight mb-4 text-[#111111] leading-tight">
            Valuation Notes & Business Quality Essay
          </h3>
          
          <div className="text-sm md:text-base space-y-5 text-justify leading-relaxed max-w-prose">
            {/* We will render the executive prose as paragraphs */}
            {report.overallVerdict.executiveSummary.split("\n\n").map((para, i) => {
              if (i === 0) {
                // First paragraph gets a drop cap
                const firstChar = para.charAt(0);
                const restOfPara = para.substring(1);
                return (
                  <p key={i} className="first-line:uppercase first-line:tracking-wider leading-relaxed">
                    <span className="float-left text-5xl md:text-6xl font-serif font-black pr-2.5 pt-1.5 leading-none text-[#111111]">
                      {firstChar}
                    </span>
                    {restOfPara}
                  </p>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-2 border-t border-b border-[#111111]/15 py-3">
            <span className="font-serif font-bold text-xs uppercase text-[#111111]">
              CERTIFIED SECURE SPECULATION FRAMEWORK — NO GUARANTEES OF FUTURES EXPRESSED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
