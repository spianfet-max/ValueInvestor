import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  BookOpen, 
  RotateCcw, 
  TrendingUp, 
  HelpCircle, 
  Landmark, 
  ArrowRight,
  FileText,
  AlertCircle,
  Clock
} from "lucide-react";
import Header from "./components/Header";
import BriefMetrics from "./components/BriefMetrics";
import ChecklistSection from "./components/ChecklistSection";
import VerdictView from "./components/VerdictView";
import { ChecklistReport } from "./types";

const SUGGESTIONS = ["MSFT", "AAPL", "NVDA", "BRK.A", "TSLA", "VOO", "SBUX", "DIS"];

const QUOTES = [
  { text: "The stock market is designed to transfer money from the active to the patient.", author: "Warren Buffett" },
  { text: "Invert, always invert: Turn a situation or problem upside down. Look at it backward.", author: "Charlie Munger" },
  { text: "If you aren't willing to own a stock for ten years, don't even think about owning it for ten minutes.", author: "Warren Buffett" },
  { text: "The major losses in investing come from buying low-quality assets in prosperous times.", author: "Benjamin Graham" },
  { text: "The best thing that happens to us is when a great company gets into temporary trouble.", author: "Warren Buffett" },
  { text: "Understanding how to prevent capital loss is the primary directive of all value speculative pursuits.", author: "Seth Klarman" }
];

export default function App() {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ChecklistReport | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [customKey, setCustomKey] = useState("");
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  // Load history & Custom Key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ticker_analyzer_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    const savedKey = localStorage.getItem("custom_gemini_api_key");
    if (savedKey) {
      setCustomKey(savedKey);
    }
  }, []);

  // Update quote index while loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setCurrentQuoteIdx((prev) => (prev + 1) % QUOTES.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const saveHistory = (symbol: string) => {
    const updated = [symbol, ...history.filter((h) => h !== symbol)].slice(0, 8);
    setHistory(updated);
    localStorage.setItem("ticker_analyzer_history", JSON.stringify(updated));
  };

  const handleSearch = async (symbol: string) => {
    if (!symbol || symbol.trim().length === 0) return;
    
    setLoading(true);
    setError(null);
    setReport(null);
    setTicker(symbol.toUpperCase().trim());

    try {
      const savedKey = localStorage.getItem("custom_gemini_api_key") || "";
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(savedKey ? { "X-Gemini-Key": savedKey } : {})
        },
        body: JSON.stringify({ ticker: symbol }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze stock. Please make sure the ticker exists and try again.");
      }

      setReport(data);
      saveHistory(symbol.toUpperCase().trim());
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred. Please verify your internet connection or secret credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = (val: string) => {
    setCustomKey(val);
    localStorage.setItem("custom_gemini_api_key", val.trim());
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("ticker_analyzer_history");
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#111111] selection:text-[#fbfbf9] pb-10">
      
      {/* Masthead */}
      <Header />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-0 mt-8">
        
        {/* Search Panel styled as an antique bank dispatch register */}
        <section className="border border-[#111111] p-6 bg-[#fafaf7] mb-10 select-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left instructions block */}
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#111111]/15 pb-4 md:pb-0 md:pr-6">
              <h3 className="font-serif font-black text-xl uppercase tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#111111]/80" />
                <span>Search Ledger</span>
              </h3>
              <p className="font-serif text-xs md:text-sm text-[#111111]/70 leading-relaxed mt-2">
                Enter any valid corporate ticker (e.g. <strong>MSFT</strong>, <strong>AAPL</strong>, <strong>NVDA</strong>). 
                The speculator engine will trace public filings, compile accounting sheets, and compute classic value scores.
              </p>
            </div>

            {/* Middle Input elements */}
            <div className="md:col-span-8 space-y-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(ticker);
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex-none flex items-center text-[#111111]/40">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="ENTER CORPORATE TICKER (e.g. BRK.A)"
                    className="w-full bg-[#fbfbf9] border border-[#111111] pl-10 pr-4 py-2.5 font-mono text-xs md:text-sm tracking-wider uppercase focus:outline-none focus:ring-1 focus:ring-[#111111] placeholder:text-[#111111]/30 text-[#111111]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#111111] hover:bg-[#111111]/88 text-[#fbfbf9] px-6 py-2.5 font-serif font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-40"
                >
                  {loading ? "Grounding..." : "Analyze"}
                </button>
              </form>

              {/* Autocomplete Quick Chips */}
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="font-mono text-[#111111]/50 text-[10px] uppercase">SUGGESTIONS:</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setTicker(s);
                      handleSearch(s);
                    }}
                    className="font-mono text-[11px] px-2 py-0.5 border border-[#111111]/15 hover:border-[#111111] bg-white text-[#111111]/80 hover:text-[#111111] transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Collapsible Personal Gemini Key config block */}
              <div className="pt-4 border-t border-[#111111]/10">
                <button
                  type="button"
                  onClick={() => setShowKeyConfig(!showKeyConfig)}
                  className="font-mono text-[10px] text-[#111111]/60 hover:text-[#111111] hover:underline uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>{showKeyConfig ? "[ - ] Hide Personal Key Settings (Optional)" : "[ + ] Configure Personal Gemini Key / Free Tier Bypass"}</span>
                </button>
                
                <AnimatePresence>
                  {showKeyConfig && (
                    <motion.div
                      style={{ originY: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-2.5 text-[11px] font-mono space-y-2.5 border-t border-dashed border-[#111111]/15"
                    >
                      <p className="text-[#111111]/65 font-serif leading-relaxed text-[11px]">
                        If running on personal custom domains (such as Render) or experiencing rate-limits, paste your personal free Gemini API Key below. This key is saved locally in your browser cache (<code className="bg-[#111111]/5 px-1 py-0.5 text-[10px]">localStorage</code>) and is supplied server-side over secure on-the-fly lookups.
                      </p>
                      <div className="flex gap-2 items-center">
                        <input
                          type="password"
                          value={customKey}
                          onChange={(e) => handleSaveKey(e.target.value)}
                          placeholder="PASTE YOUR FREE GEMINI API KEY HERE (AIzaSy...)"
                          className="flex-1 bg-white border border-[#111111]/35 px-3 py-2 text-[10px] text-[#111111] font-mono tracking-widest placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]"
                        />
                        {customKey && (
                          <button
                            type="button"
                            onClick={() => handleSaveKey("")}
                            className="text-[#b22222] hover:underline uppercase font-bold text-[10px] shrink-0"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-[#111111]/50 pt-1">
                        <a 
                          href="https://aistudio.google.com/app/apikey" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="underline hover:text-[#111111] font-serif italic"
                        >
                          Generate a free API key at Google AI Studio &rarr;
                        </a>
                        <span className="font-bold uppercase tracking-wider">{customKey ? "✓ Custom Key Active" : "Default Server Key"}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </section>

        {/* History Desk & Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-[#b22222] bg-[#b22222]/5 p-4 mb-8 flex items-start gap-3 select-none"
            >
              <AlertCircle className="w-5 h-5 text-[#b22222] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#b22222] uppercase">
                  Analysis Interrupted
                </h4>
                <p className="font-serif text-xs md:text-sm text-[#111111]/90 mt-1 leading-relaxed">
                  {error}
                </p>
                <div className="mt-2 font-mono text-[10px] text-[#111111]/55 uppercase">
                  Verify ticker input accuracy. Also check settings for Gemini API keys.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saved dispatch history list */}
        {history.length > 0 && !loading && !report && !error && (
          <motion.section 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="border-b border-[#111111]/15 pb-8 mb-10 select-none"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] text-[#111111]/60 uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Historic Dispatches ({history.length})</span>
              </span>
              <button 
                onClick={clearHistory}
                className="font-mono text-[10px] text-[#b22222]/80 hover:text-[#b22222] hover:underline uppercase"
              >
                Clear Archives
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {history.map((hist) => (
                <button
                  key={hist}
                  onClick={() => {
                    setTicker(hist);
                    handleSearch(hist);
                  }}
                  className="border border-[#111111] bg-white p-3 hover:bg-[#fafaf7] transition-all flex flex-col items-center justify-center text-center text-[#111111]"
                >
                  <span className="font-mono text-xs font-bold block">{hist}</span>
                  <span className="text-[9px] font-serif text-[#111111]/50 mt-1 flex items-center gap-0.5 uppercase">
                    Load <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search Initial Screen Placeholder */}
        {!loading && !report && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 md:py-20 flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 select-none"
          >
            <Landmark className="w-12 h-12 text-[#111111]/30 border border-[#111111]/15 p-2 rounded-full mb-4" />
            <h3 className="font-serif font-bold text-xl uppercase tracking-tight text-[#111111]/85">
              Speculative Registry is Clean
            </h3>
            <p className="font-serif text-sm text-[#111111]/65 mt-2 leading-relaxed">
              No stock reports have been generated for this session. Choose a suggested corporate ticker or type any official symbol into the Search Ledger to fetch instant metrics, calculated Graham numbers, and New Yorker style essays.
            </p>
          </motion.div>
        )}

        {/* Reassuring Loading screen with literary quotes */}
        {loading && (
          <div className="py-16 md:py-24 border border-[#111111] bg-[#fafaf7] p-8 text-center max-w-xl mx-auto selection:bg-[#111111] selection:text-[#fafaf7] select-none">
            <span className="font-mono text-xs tracking-widest uppercase text-[#111111]/65 block mb-4">
              Grounding Current Financials
            </span>
            <div className="w-12 h-12 border-2 border-[#111111]/10 border-t-[#111111] rounded-full animate-spin mx-auto mb-8"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.5 }}
                className="font-serif"
              >
                <p className="text-base italic text-[#111111] leading-relaxed max-w-sm mx-auto">
                  "{QUOTES[currentQuoteIdx].text}"
                </p>
                <span className="block mt-3 text-xs font-mono tracking-wider uppercase text-[#111111]/60">
                  — {QUOTES[currentQuoteIdx].author}
                </span>
              </motion.div>
            </AnimatePresence>

            <span className="font-mono text-[9px] uppercase tracking-widest text-[#111111]/45 block mt-10 border-t border-[#111111]/10 pt-4">
              * Tapping search libraries like Google Grounding to secure exact current price and balance sheets for {ticker}...
            </span>
          </div>
        )}

        {/* Fully Generated Report View Desk */}
        {report && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Report Header block */}
            <section className="border border-[#111111] p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
              <div>
                <span className="font-mono text-xs tracking-wider uppercase text-[#b89b5c] block mb-1">
                  OFFICIAL VALUATION RECORD
                </span>
                <h2 className="font-serif font-black text-2xl md:text-4xl uppercase tracking-tight text-[#111111]">
                  {report.companyName}
                </h2>
                <p className="font-serif italic text-sm text-[#111111]/70 mt-1 leading-normal max-w-xl">
                  {report.businessSummary}
                </p>
              </div>
              <div className="flex-none text-left md:text-right border-t md:border-t-0 md:border-l border-[#111111]/15 pt-3 md:pt-0 md:pl-6">
                <span className="font-mono text-[10px] text-[#111111]/50 block uppercase">CORPORATE REGISTER</span>
                <span className="font-mono text-xl font-bold block">{report.ticker}</span>
                <span className="font-mono text-[10px] bg-[#111111] text-[#fbfbf9] px-1.5 py-0.5 mt-1 inline-block uppercase font-bold tracking-wider">
                  {report.sector}
                </span>
              </div>
            </section>

            {/* Metric Column Cards */}
            <BriefMetrics metrics={report.metrics} />

            {/* Checklist details Section */}
            <ChecklistSection report={report} />

            {/* Overall Verdict New Yorker Article Column layout */}
            <VerdictView report={report} />
          </motion.div>
        )}

        {/* Fine literary footer disclaimer */}
        <footer className="border-t border-[#111111]/15 mt-16 pt-6 text-center select-none">
          <p className="font-mono text-[10px] text-[#111111]/45 uppercase tracking-widest leading-loose">
            PRODUCED BY COGNITIVE REASONING SPECTRE DESK. ALL HISTORIC QUOTATIONS CITING BENJAMIN GRAHAM COMPLIANT DATA. 
            NO RESPONSIBILITY FOR SPECULATIVE IMPAIRMENTS DECLARED. CONSULT A LICENSED STOCK JOBBER BEFORE COMMITMENT OF PRINCIPLE.
          </p>
          <p className="font-serif italic text-xs text-[#111111]/35 mt-2">
            "The investor's chief problem – and even his worst enemy – is likely to be himself."
          </p>
        </footer>

      </main>

    </div>
  );
}
