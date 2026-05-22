export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'UPI' | 'Bank Transfer' | 'Cash';
  partyName: string;
  status: 'Completed' | 'Pending';
}

export interface OrderRecord {
  id: string;
  buyerName: string;
  orderDate: string;
  deliveryDate: string;
  actualDeliveryDate: string; // To check delivery delay
  amount: number;
  itemsCount: number;
  status: 'Delivered' | 'In-Production' | 'Shipped' | 'Cancelled';
  embroiderersAssigned: number;
  craftType: 'Chikankari' | 'Zardozi';
}

export interface GstRecord {
  quarter: string;
  turnover: number;
  taxPaid: number;
  filingDate: string;
  status: 'Filed-On-Time' | 'Filed-Late' | 'Pending';
}

export interface MSMEProfile {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  location: 'Chowk' | 'Aminabad' | 'Nakhas' | 'Hazratganj' | 'Kakori';
  craftType: 'Chikankari' | 'Zardozi';
  foundedYear: number;
  artisanCount: number; // Headcount of master craftsman & helper karigars
  monthlyRent: number;
  rawMaterialSource: string;
  
  // Alternative Business Data
  gstFilings: GstRecord[];
  orders: OrderRecord[];
  monthlySales: { month: string; amount: number }[];
  transactionCashRatio: number; // Decimal (e.g. 0.40 means 40% cash, 60% digital UPI/bank)
  deliveryDelayRate: number; // Decimal representing percentage of late orders
  customerRetentionRate: number; // Decimal percentage
  rawMaterialCostIncreaseBuffer: number; // How much cost increase they can absorb (percentage)

  // Status/Application Details
  loanRequirement: number;
  loanPurpose: string;
}

export interface AlternativeCreditScore {
  overallScore: number; // 300 to 900
  integrityScore: number; // 0 to 100 (GST consistency, trans verification)
  fulfillmentCapacity: number; // 0 to 100 (orders delivered reliably, artisan pool)
  financialHealth: number; // 0 to 100 (cash ratio, sales growth, raw margin)
  marketTrendIndex: number; // 0 to 100 (seasonal demand, tourist reach, Lucknow trade season)
  recommendationRating: 'High Eligibility' | 'Moderate Eligibility' | 'Low Eligibility' | 'Needs Collateral';
  maximumSafeLoanAmount: number;
  assessmentReason: string;
}

export interface RecommendedScheme {
  name: string;
  agency: string;
  purpose: string;
  subsidyPercentage: number;
  maxAmount: number;
  matchScore: number; // 0 to 100
  relevanceExplanation: string;
}

export interface CreditAnalysisResponse {
  msmeId: string;
  scoring: AlternativeCreditScore;
  recommendedSchemes: RecommendedScheme[];
  riskAnalysis: {
    mitigators: string[];
    riskFactors: string[];
    growthOpportunities: string[];
  };
  customReportSummary: string;
}
