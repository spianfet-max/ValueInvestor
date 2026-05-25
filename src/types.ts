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
    earningsYield: string; // EBIT / EV
    returnOnCapital: string; // EBIT / (Net Fixed Assets + Working Capital)
    evaluation: string;
  };

  piotroskiFScore: {
    points: PiotroskiPoint[];
    totalScore: number; // out of 9
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
    executiveSummary: string; // Literal, eloquent, New Yorker style prose
  };
}
