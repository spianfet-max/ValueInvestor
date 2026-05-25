import { ValuationMetrics } from "../types";

interface BriefMetricsProps {
  metrics: ValuationMetrics;
}

export default function BriefMetrics({ metrics }: BriefMetricsProps) {
  const formatCurrency = (val: string | number) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    if (isNaN(num)) return "N/A";
    
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const formatNumberValue = (val: string | number) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    if (isNaN(num)) return "N/A";
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const pairs = [
    { label: "Current Price", value: `$${metrics.currentPrice || "N/A"}` },
    { label: "Market Capitalization", value: formatCurrency(metrics.marketCap) },
    { label: "Price / Earnings (LTM)", value: metrics.peRatio || "N/A" },
    { label: "Price / Book (P/B)", value: metrics.pbRatio || "N/A" },
    { label: "Price / Sales (P/S)", value: metrics.psRatio || "N/A" },
    { label: "Forward P/E", value: metrics.forwardPe || "N/A" },
    { label: "Enterprise Value / EBITDA", value: metrics.evToEbitda || "N/A" },
    { label: "EBITDA", value: formatCurrency(metrics.ebitda) },
    { label: "EBIT", value: formatCurrency(metrics.ebit) },
    { label: "Capital Expenditures", value: formatCurrency(metrics.capex) },
    { label: "Free Cash Flow (FCF)", value: formatCurrency(metrics.fcf) },
    { label: "Operating Cash Flow", value: formatCurrency(metrics.operatingCashFlow) },
    { label: "Cash & Cash Equivalents", value: formatCurrency(metrics.cashAndShortTerm) },
    { label: "Total Liabilities / Debt", value: formatCurrency(metrics.totalDebts) },
    { label: "Current Assets", value: formatCurrency(metrics.currentAssets) },
    { label: "Current Liabilities", value: formatCurrency(metrics.currentLiabilities) },
    { label: "Tangible Book Value", value: formatCurrency(metrics.tangibleBookValue) },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-8">
      <div className="text-center mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/75 block mb-1">SECTION I</span>
        <h3 className="font-serif font-black text-2xl uppercase tracking-tight">Key Ledger & Metrics</h3>
      </div>
      
      {/* Grid of editorial style ledger boards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Valuation Ratios */}
        <div className="border border-[#111111] p-5 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg border-b border-[#111111] pb-2 mb-4 uppercase">Valuation Ratios</h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">P/E Ratio (LTM)</span>
                <span className="font-bold text-[#111111]">{metrics.peRatio || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Forward P/E</span>
                <span className="font-bold text-[#111111]">{metrics.forwardPe || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Price / Book (P/B)</span>
                <span className="font-bold text-[#111111]">{metrics.pbRatio || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Price / Sales (P/S)</span>
                <span className="font-bold text-[#111111]">{metrics.psRatio || "N/A"}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">EV / EBITDA</span>
                <span className="font-bold text-[#111111]">{metrics.evToEbitda || "N/A"}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#111111]/10 text-[10px] italic text-[#111111]/60 font-mono">
            * Lower ratios indicate theoretical bargain potential relative to peers.
          </div>
        </div>

        {/* Middle Column: Cash Extraction & Flows */}
        <div className="border border-[#111111] p-5 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg border-b border-[#111111] pb-2 mb-4 uppercase">Cash Extraction</h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Free Cash Flow (FCF)</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.fcf)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Operating Cash Flow</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.operatingCashFlow)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">EBITDA</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.ebitda)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">EBIT</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.ebit)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Maintenance CapEx</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.capex)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#111111]/10 text-[10px] italic text-[#111111]/60 font-mono">
            * Critical check: verify high free cash conversion vs. reported earnings.
          </div>
        </div>

        {/* Right Column: Solvency & Liquidity */}
        <div className="border border-[#111111] p-5 bg-[#fafaf7] flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-lg border-b border-[#111111] pb-2 mb-4 uppercase">Solvency Checklist</h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Cash & equivalents</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.cashAndShortTerm)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Total Debt & liab.</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.totalDebts)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Current Assets</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.currentAssets)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Current Liabilities</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.currentLiabilities)}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                <span className="text-[#111111]/70">Tangible Book Value</span>
                <span className="font-bold text-[#111111]">{formatCurrency(metrics.tangibleBookValue)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#111111]/10 text-[10px] italic text-[#111111]/60 font-mono">
            * Check debt-to-assets to ensure company isn't fragile in recessions.
          </div>
        </div>
      </div>
      
      {/* Broad table view for printing layout */}
      <div className="mt-8 border border-[#111111] overflow-hidden">
        <table className="w-full text-left font-mono text-xs select-none">
          <thead>
            <tr className="bg-[#111111] text-[#fbfbf9] uppercase tracking-wider">
              <th className="p-3">Financial Ledger Item</th>
              <th className="p-3 text-right">Value Asset Metric</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#111111]/10">
            {pairs.map((p, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-[#fcfcf0]" : "bg-transparent"}>
                <td className="p-2.5 pl-4 text-[#111111]/75">{p.label}</td>
                <td className="p-2.5 pr-4 text-right font-bold text-[#111111]">{p.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
