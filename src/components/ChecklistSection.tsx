import { ChecklistReport } from "../types";
import { CheckCircle2, XCircle, AlertCircle, Award, Target, Landmark, ShieldCheck, HeartPulse } from "lucide-react";

interface ChecklistSectionProps {
  report: ChecklistReport;
}

export default function ChecklistSection({ report }: ChecklistSectionProps) {
  
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent": return "text-[#3b7a57] border-[#3b7a57]/20 bg-[#3b7a57]/5";
      case "Good": return "text-[#4b5320] border-[#4b5320]/20 bg-[#4b5320]/5";
      case "Fair": return "text-[#996515] border-[#996515]/20 bg-[#996515]/5";
      case "Poor": return "text-[#b22222] border-[#b22222]/20 bg-[#b22222]/5";
      default: return "text-[#555555] border-[#555555]/20 bg-[#555555]/5";
    }
  };

  const getPiotroskiIcon = (score: number) => {
    return score === 1 ? (
      <CheckCircle2 className="w-4 h-4 text-[#3b7a57] inline" />
    ) : (
      <XCircle className="w-4 h-4 text-[#b22222] inline" />
    );
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-4 md:px-0 select-none">
      
      {/* 1. Munger's Four Filters */}
      <div className="border border-[#111111] bg-[#fafaf7] p-6 mb-10">
        <div className="border-b border-[#111111] pb-3 mb-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST II</span>
            <h3 className="font-serif font-black text-2xl uppercase tracking-tight">Charlie Munger's Four Filters</h3>
          </div>
          <Target className="w-8 h-8 text-[#111111]/80 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-serif">
          {/* Understand */}
          <div className="border-b md:border-b-0 md:border-r border-[#111111]/15 pb-4 md:pb-0 md:pr-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-base uppercase">1. Understand the Business</h4>
              <span className={`px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${getRatingColor(report.mungerFourFilters.understandBusiness.rating)}`}>
                {report.mungerFourFilters.understandBusiness.rating}
              </span>
            </div>
            <p className="text-[#111111]/85 text-xs md:text-sm leading-relaxed">
              {report.mungerFourFilters.understandBusiness.explanation}
            </p>
          </div>

          {/* Moat */}
          <div className="pb-4 md:pb-0">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-base uppercase">2. Sustainable Competitive Moat</h4>
              <span className={`px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${getRatingColor(report.mungerFourFilters.sustainableMoat.rating)}`}>
                {report.mungerFourFilters.sustainableMoat.rating}
              </span>
            </div>
            <p className="text-[#111111]/85 text-xs md:text-sm leading-relaxed">
              {report.mungerFourFilters.sustainableMoat.explanation}
            </p>
          </div>

          {/* Separation line for grid row */}
          <div className="col-span-1 md:col-span-2 border-t border-[#111111]/15 my-2 hidden md:block"></div>

          {/* Management */}
          <div className="border-b md:border-b-0 md:border-r border-[#111111]/15 pb-4 md:pb-0 md:pr-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-base uppercase">3. Trustworthy & Able Executives</h4>
              <span className={`px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${getRatingColor(report.mungerFourFilters.trustworthyManagement.rating)}`}>
                {report.mungerFourFilters.trustworthyManagement.rating}
              </span>
            </div>
            <p className="text-[#111111]/85 text-xs md:text-sm leading-relaxed">
              {report.mungerFourFilters.trustworthyManagement.explanation}
            </p>
          </div>

          {/* Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-base uppercase">4. Safe Margin of Safety Price</h4>
              <span className={`px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider border ${getRatingColor(report.mungerFourFilters.marginOfSafetyPrice.rating)}`}>
                {report.mungerFourFilters.marginOfSafetyPrice.rating}
              </span>
            </div>
            <p className="text-[#111111]/85 text-xs md:text-sm leading-relaxed">
              {report.mungerFourFilters.marginOfSafetyPrice.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Benjamin Graham's Net-Net & Commandments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* Benjamin Graham Column */}
        <div className="border border-[#111111] p-6 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#111111] pb-3 mb-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST III-A</span>
                <h3 className="font-serif font-black text-xl uppercase tracking-tight">Benjamin Graham Rules</h3>
              </div>
              <Landmark className="w-6 h-6 text-[#111111]/70" />
            </div>

            <div className="space-y-4">
              {/* Financial values card */}
              <div className="bg-[#111111]/5 p-3.5 border border-[#111111]/15 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#111111]/70">Graham Intrinsic Value</span>
                  <span className="font-bold">{report.valuation.grahamNumber || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111]/70">Net Current Asset Value (NCAV)</span>
                  <span className="font-bold">{report.valuation.netCurrentAssetValue || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111]/70">Net-Net Working Capital (NNWC)</span>
                  <span className="font-bold">{report.valuation.netNetWorkingCapital || "N/A"}</span>
                </div>
                <div className="flex justify-between border-t border-[#111111]/15 pt-1.5 mt-1">
                  <span className="text-[#111111]/70">Rationed Margin of Safety</span>
                  <span className="font-bold text-[#b22222]">{report.valuation.marginOfSafety || "N/A"}</span>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-3 pt-2">
                {report.grahamChecklist.rules.map((rule, idx) => (
                  <div key={idx} className="border-b border-[#111111]/10 pb-2 flex items-start gap-2.5">
                    {rule.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#3b7a57] mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#b89b5c] mt-0.5 shrink-0" />
                    )}
                    <div className="text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif font-bold uppercase">{rule.ruleName}</span>
                        <span className={`font-mono font-bold text-[10px] px-1.5 border ${rule.passed ? "text-[#3b7a57] border-[#3b7a57]/30 bg-[#3b7a57]/5" : "text-[#111111]/50 border-[#111111]/20"}`}>
                          {rule.passed ? "PASSED" : "FAILED"}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#111111]/60 font-mono mt-0.5">
                        Target: {rule.threshold} | Actual: {rule.actualValue}
                      </p>
                      <p className="text-xs text-[#111111]/80 mt-1">{rule.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#111111]/10 flex justify-between items-center text-xs font-mono">
            <span className="text-[#111111]/60 uppercase">GRAHAM COMPLIANCE</span>
            <span className="font-bold bg-[#111111] text-[#fbfbf9] px-2 py-0.5">{report.grahamChecklist.totalPassed} Rules Passed</span>
          </div>
        </div>

        {/* Piotroski F-Score & Altman Column */}
        <div className="space-y-6">
          {/* Piotroski F-Score */}
          <div className="border border-[#111111] p-6 bg-[#fafaf7]">
            <div className="border-b border-[#111111] pb-3 mb-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST III-B</span>
                <h3 className="font-serif font-black text-xl uppercase tracking-tight">Piotroski F-Score Checklist</h3>
              </div>
              <Award className="w-6 h-6 text-[#111111]/70" />
            </div>

            <div className="bg-[#111111]/5 py-2.5 px-4 mb-4 flex justify-between items-center border border-[#111111]/15">
              <span className="font-mono text-xs uppercase tracking-wider font-bold">Total F-Score Verdict</span>
              <span className="font-mono text-lg font-black bg-[#111111] text-[#fbfbf9] px-3 py-1">
                {report.piotroskiFScore.totalScore} / 9
              </span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-wider text-[#111111]/80 italic mb-4">
              * Score of 8-9 signals excellent cash operation; below 4 signals vulnerability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 border-b border-[#111111]/10 pb-4">
              {report.piotroskiFScore.points.map((pt, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-1.5 border-b border-[#111111]/5">
                  <span className="text-[#111111]/75 text-[11px] max-w-[85%]">{pt.item}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold font-mono">{pt.score}</span>
                    {getPiotroskiIcon(pt.score)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 font-serif italic text-xs md:text-sm text-[#111111]/85">
              <strong>Evaluation:</strong> {report.piotroskiFScore.verdict}
            </div>
          </div>

          {/* Altman Z-Score & Capital Fragility */}
          <div className="border border-[#111111] p-6 bg-[#fafaf7]">
            <div className="border-b border-[#111111] pb-3 mb-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST III-C</span>
                <h3 className="font-serif font-black text-xl uppercase tracking-tight">Altman Z-Score</h3>
              </div>
              <HeartPulse className="w-6 h-6 text-[#111111]/70" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#111111]/70">Calculated Safety Score</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold underline decoration-double decoration-ny-accent pr-1">
                  {report.altmanZScore.score}
                </span>
                <span className={`font-mono text-xs font-bold uppercase border px-2 py-0.5 ${
                  report.altmanZScore.zone === "Safe Zone" 
                    ? "text-[#3b7a57] border-[#3b7a57]/30 bg-[#3b7a57]/5" 
                    : report.altmanZScore.zone === "Grey Zone" 
                    ? "text-[#b89b5c] border-[#b89b5c]/30 bg-[#b89b5c]/5" 
                    : "text-[#b22222] border-[#b22222]/30 bg-[#b22222]/5"
                }`}>
                  {report.altmanZScore.zone}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#111111]/80 leading-relaxed font-serif pt-1">
              {report.altmanZScore.explanation}
            </p>
          </div>

        </div>
      </div>

      {/* 3. Magic Formula & Phil Fisher Growth parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Joel Greenblatt's Magic Formula */}
        <div className="border border-[#111111] p-6 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#111111] pb-3 mb-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST IV-A</span>
                <h3 className="font-serif font-black text-xl uppercase tracking-tight">Greenblatt's Magic Formula</h3>
              </div>
              <Landmark className="w-6 h-6 text-[#111111]/70" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-xs">
              <div className="bg-[#111111]/5 p-3.5 border border-[#111111]/15 text-center">
                <span className="text-[#111111]/60 block mb-1 uppercase text-[10px]">Earnings Yield (EBIT / EV)</span>
                <span className="text-base font-black text-[#111111]">{report.magicFormula.earningsYield}</span>
              </div>
              <div className="bg-[#111111]/5 p-3.5 border border-[#111111]/15 text-center">
                <span className="text-[#111111]/60 block mb-1 uppercase text-[10px]">Return on Capital (RoIC)</span>
                <span className="text-base font-black text-[#111111]">{report.magicFormula.returnOnCapital}</span>
              </div>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-wider text-[#111111]/80 italic mb-4">
              * A high combination of Earnings Yield (cheapness) and Roic (quality) triggers market-beating formulas.
            </p>

            <p className="text-xs md:text-sm text-[#111111]/80 font-serif leading-relaxed">
              {report.magicFormula.evaluation}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#111111]/10 text-xs text-[#111111]/50 font-mono">
            * Popularized by Joel Greenblatt in "The Little Book That Beats the Market".
          </div>
        </div>

        {/* Phil Fisher parameters */}
        <div className="border border-[#111111] p-6 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <div className="border-b border-[#111111] pb-3 mb-4 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">CHECKLIST IV-B</span>
                <h3 className="font-serif font-black text-xl uppercase tracking-tight">Phil Fisher's Growth Points</h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#111111]/70" />
            </div>

            <div className="space-y-3 font-serif text-xs md:text-sm">
              <div>
                <strong className="block uppercase text-xs tracking-wider mb-0.5 text-[#111111]">Product & Sales Potential</strong>
                <p className="text-[#111111]/80 mb-2 leading-relaxed">{report.fisherQuestions.productsPotential}</p>
              </div>
              <div>
                <strong className="block uppercase text-xs tracking-wider mb-0.5 text-[#111111]">Management Candor & R&D</strong>
                <p className="text-[#111111]/80 mb-2 leading-relaxed">{report.fisherQuestions.managementIntegrity}</p>
              </div>
              <div>
                <strong className="block uppercase text-xs tracking-wider mb-0.5 text-[#111111]">Cost Accounting & Integrity</strong>
                <p className="text-[#111111]/80 leading-relaxed">{report.fisherQuestions.costAnalysis}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#111111]/10 flex justify-between items-center text-xs font-mono">
            <span className="text-[#111111]/60 uppercase">FISHER RECOMMENDATION</span>
            <span className="font-bold underline uppercase">{report.fisherQuestions.verdict}</span>
          </div>
        </div>

      </div>

    </section>
  );
}
