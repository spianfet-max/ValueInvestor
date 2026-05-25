import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined in environment variables.");
  }
} catch (err) {
  console.error("Failed to initialize GoogleGenAI:", err);
}

// REST API for analysis
app.post("/api/analyze", async (req, res) => {
  const { ticker } = req.body;
  const customApiKey = req.headers["x-gemini-key"];
  const finalApiKey = (typeof customApiKey === "string" ? customApiKey : "") || process.env.GEMINI_API_KEY;
  
  if (!ticker || typeof ticker !== "string" || ticker.trim().length === 0) {
    return res.status(400).json({ error: "A valid stock ticker is required." });
  }

  let requestAi: GoogleGenAI | null = null;
  if (finalApiKey) {
    try {
      requestAi = new GoogleGenAI({
        apiKey: finalApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI with request api key:", err);
    }
  }

  const activeAi = requestAi || ai;

  if (!activeAi) {
    return res.status(500).json({ 
      error: "Gemini AI client has no configured key. Please supply your personal free API Key in the custom key drawer above to run checks completely free of charge." 
    });
  }

  const symbol = ticker.toUpperCase().trim();

  try {
    const prompt = `
You are an expert value investor modeled after Benjamin Graham, Warren Buffett, Charlie Munger, Seth Klarman, and other investment legends. 
Analyze the stock with ticker token: "${symbol}".

Use Google Search Grounding to find the latest real-time stock metrics, balance sheet elements, and income statement elements (from the latest 2025/2026 financial report) for "${symbol}".

Calculate or evaluate the following value investing checklists specified in the JSON schema below. Be precise. Use real numbers fetched via search. If some numbers are absolutely unavailable, estimate them rationally using industry standards but flag this in the notes.

Calculate:
1. ValuationMetrics (currentPrice, marketCap, peRatio, pbRatio, psRatio, forwardPe, evToEbitda, ebitda, ebit, capex, fcf, operatingCashFlow, cashAndShortTerm, totalDebts, currentAssets, currentLiabilities, tangibleBookValue).
2. Graham Valuation Analysis:
   - Net-Net Working Capital (NNWC) = Cash & Equivalents + 0.75 * Accounts Receivable + 0.50 * Inventory - Total Liabilities.
   - Net Current Asset Value (NCAV) = Current Assets - Total Liabilities.
   - Graham Number = SquareRoot(22.5 * Earnings Per Share [EPS] * Book Value Per Share [BVPS]).
3. Piotroski F-Score (out of 9):
   - Net Income positive? (1 else 0)
   - Operating Cash Flow (CFFO) positive? (1 else 0)
   - ROA increasing year-over-year? (1 else 0)
   - Quality of earnings: CFFO > Net Income? (1 else 0)
   - Long-term debt vs. assets decreased? (1 else 0)
   - Current ratio increased? (1 else 0)
   - Shares outstanding fell/stable (no major dilution)? (1 else 0)
   - Gross margin increased? (1 else 0)
   - Asset turnover increased? (1 else 0)
4. Altman Z-Score:
   - Formula or zone (Safe, Grey, Distress).
5. Munger's Four Filters:
   - Understand the business
   - Sustainable competitive advantages (moats like network effect, switching costs, brand, cost leadership etc.)
   - Able and trustworthy management
   - Margin of safety price
6. Phil Fisher's qualitative growth & cost questions.
7. Magic Formula (Earnings Yield: EBIT/EV and return on capital: EBIT / (Net Fixed Assets + Working Capital))

Generate a complete checklist report matching this typescript interface exactly:
\`\`\`typescript
export interface ValuationMetrics {
  currentPrice: number;
  marketCap: number;
  peRatio: string;
  pbRatio: string;
  psRatio: string;
  forwardPe: string;
  evToEbitda: string;
  ebitda: string;
  ebit: string;
  capex: string;
  fcf: string;
  operatingCashFlow: string;
  cashAndShortTerm: string;
  totalDebts: string;
  currentAssets: string;
  currentLiabilities: string;
  tangibleBookValue: string;
}

export interface GrahamRuleResult {
  ruleName: string;
  threshold: string;
  actualValue: string;
  passed: boolean;
  notes: string;
}

export interface PiotroskiPoint {
  item: string;
  score: number; // 0 or 1
  description: string;
}

export interface ValuationAnalysis {
  grahamNumber: string;
  netNetWorkingCapital: string;
  netCurrentAssetValue: string;
  marginOfSafety: string;
}

export interface ChecklistReport {
  companyName: string;
  ticker: string;
  sector: string;
  businessSummary: string;
  metrics: ValuationMetrics;
  valuation: ValuationAnalysis;
  mungerFourFilters: {
    understandBusiness: { rating: "Excellent" | "Good" | "Fair" | "Poor" | "Unknown"; explanation: string };
    sustainableMoat: { rating: "Excellent" | "Good" | "Fair" | "Poor" | "Unknown"; explanation: string };
    trustworthyManagement: { rating: "Excellent" | "Good" | "Fair" | "Poor" | "Unknown"; explanation: string };
    marginOfSafetyPrice: { rating: "Excellent" | "Good" | "Fair" | "Poor" | "Unknown"; explanation: string };
  };
  grahamChecklist: {
    rules: GrahamRuleResult[];
    totalPassed: number;
  };
  magicFormula: {
    earningsYield: string;
    returnOnCapital: string;
    evaluation: string;
  };
  piotroskiFScore: {
    points: PiotroskiPoint[];
    totalScore: number;
    verdict: string;
  };
  altmanZScore: {
    score: number;
    zone: "Safe Zone" | "Grey Zone" | "Distress Zone" | "Unknown";
    explanation: string;
  };
  fisherQuestions: {
    productsPotential: string;
    managementIntegrity: string;
    costAnalysis: string;
    verdict: string;
  };
  overallVerdict: {
    decision: "STRONG INVEST" | "WATCHLIST/PATIENCE" | "AVOID/SPECULATIVE" | "VALUE TRAP RISK";
    discountToValue: string;
    executiveSummary: string; // Literate, detailed, New Yorker essay style prose
  };
}
\`\`\`

Return ONLY the raw JSON block without markdown formatting or other chatter. Do not wrap it in anything other than a clean JSON block if possible, but if you do use markdown, write exactly \`\`\`json <JSON object> \`\`\`. Write the executive summary in an elegant, sophisticated literary prose (like the New Yorker magazine), emphasizing patience, Margin of Safety, and intellectual skepticism.
`;

    const response = await activeAi.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2, // slightly conservative to keep calculations grounded
      },
    });

    let rawText = response.text || "";
    // Clean up any potential markdown prefix/suffix
    let cleanJsonText = rawText.trim();
    if (cleanJsonText.startsWith("```json")) {
      cleanJsonText = cleanJsonText.substring(7);
    }
    if (cleanJsonText.endsWith("```")) {
      cleanJsonText = cleanJsonText.substring(0, cleanJsonText.length - 3);
    }
    cleanJsonText = cleanJsonText.trim();

    try {
      const generatedReport = JSON.parse(cleanJsonText);
      res.json(generatedReport);
    } catch (parseError) {
      console.error("Failed to parse stock analysis JSON output:", parseError, "Raw output was:", rawText);
      res.status(500).json({ 
        error: "Failed to parse the structured report returned by Gemini. Please try again.",
        rawOutput: rawText 
      });
    }
  } catch (error: any) {
    console.error("Error analyzing ticker:", error);
    let errorMessage = error?.message || String(error);
    
    // Check for common quota / rate limits / 429 errors
    if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      errorMessage = "Gemini API Free Tier limits exceeded. To completely resolve this and run unlimited checks at $0 cost, please generate your own free personal API Key on https://aistudio.google.com/ and set it as GEMINI_API_KEY in the Secrets panel.";
    }
    
    res.status(500).json({ 
      error: errorMessage
    });
  }
});

// Vite/Static serve middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
