import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { mockArtisans } from "./src/data/mockArtisans.js";
import { MSMEProfile } from "./src/types.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI if GEMINI_API_KEY is defined
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully for Lucknow Credit Scoring.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
} else {
  console.log("No GEMINI_API_KEY found in environment. Using robust rule-based local backup.");
}

// Global state for live added and simulated artisans
let activeArtisans = [...mockArtisans];

// --- API Endpoints ---

// 1. Get all artisans
app.get("/api/artisans", (req, res) => {
  res.json(activeArtisans);
});

// 2. Add an artisan (Simplified manual profile creation)
app.post("/api/artisans", (req, res) => {
  const newProfile: MSMEProfile = {
    id: `msme_${Date.now()}`,
    ...req.body
  };
  activeArtisans.unshift(newProfile);
  res.status(201).json(newProfile);
});

// 3. Simulated GST Document OCR Parsing
app.post("/api/analyze-gst-file", (req, res) => {
  const { fileName, fileContentBase64 } = req.body;
  
  // Create simulated reliable GST data
  const baseTurnover = 150000 + Math.random() * 200000;
  const quarters = ["Q1 - 2026", "Q4 - 2025", "Q3 - 2025", "Q2 - 2025"];
  const filFilings = quarters.map((q, idx) => ({
    quarter: q,
    turnover: Math.round(baseTurnover * (1 - idx * 0.15 + (Math.random() * 0.1))),
    taxPaid: Math.round(baseTurnover * 0.05),
    filingDate: `2026-0${4 - idx}-15`,
    status: Math.random() > 0.15 ? "Filed-On-Time" : "Filed-Late"
  }));

  res.json({
    success: true,
    fileName,
    parsedFilings: filFilings,
    summary: {
      totalAnnualTurnover: filFilings.reduce((sum, item) => sum + item.turnover, 0),
      onTimeRatio: filFilings.filter(f => f.status === "Filed-On-Time").length / filFilings.length,
      averageQuarterlyGst: Math.round(filFilings.reduce((sum, item) => sum + item.taxPaid, 0) / filFilings.length)
    }
  });
});

// Rule-based credit assessment engine (Local Fallback + Secondary validation)
function calculateDeterministicScore(profile: MSMEProfile) {
  // Score parameters starting base 300
  let integrity = 65;
  let fulfillment = 60;
  let financial = 55;
  let marketTrend = 60;

  // Evaluate GST filing timeliness
  const totalGst = profile.gstFilings.length;
  if (totalGst > 0) {
    const onTime = profile.gstFilings.filter(f => f.status === "Filed-On-Time").length;
    const gstRatio = onTime / totalGst;
    integrity += Math.round(gstRatio * 25); // max +25
  } else {
    integrity -= 10;
  }

  // Evaluate transaction digital ratio
  // More digital UPI/Bank Transfer means higher integrity and financial auditability
  const digitalRatio = 1 - profile.transactionCashRatio;
  integrity += Math.round(digitalRatio * 15); // max +15
  financial += Math.round(digitalRatio * 20); // max +20

  // Late delivery rate penalty
  const delayRate = profile.deliveryDelayRate;
  if (delayRate < 0.10) {
    fulfillment += 25;
    integrity += 10;
  } else if (delayRate < 0.25) {
    fulfillment += 10;
  } else {
    fulfillment -= 15;
    integrity -= 5;
  }

  // Artisan employee count support capacity
  const count = profile.artisanCount;
  if (count > 15) {
    fulfillment += 15;
    marketTrend += 10;
  } else if (count > 5) {
    fulfillment += 8;
  } else {
    fulfillment -= 5; // Bottleneck risk
  }

  // Customer retention
  financial += Math.round(profile.customerRetentionRate * 15);

  // Raw material cushion
  financial += Math.round(profile.rawMaterialCostIncreaseBuffer * 15);

  // Target Location weight (e.g. Kakori vs high-rent Chowk/Aminabad)
  if (profile.location === "Kakori") {
    // Kakori is rural cluster development hub, low rent, high margin potential
    financial += 5;
    marketTrend += 5;
  } else if (profile.location === "Aminabad") {
    // High premium, heavy traffic but high fixed rent
    financial -= 5;
    marketTrend += 12;
  } else {
    marketTrend += 8;
  }

  // Normalize metrics to 0-100 range
  const norm = (val: number) => Math.min(100, Math.max(0, val));
  const finalIntegrity = norm(integrity);
  const finalFulfillment = norm(fulfillment);
  const finalFinancial = norm(financial);
  const finalMarketTrend = norm(marketTrend);

  // Overall Score (300 to 900)
  // Weighted: 30% financial, 30% integrity, 20% fulfillment, 20% trend
  const weightedPercentage = (finalFinancial * 0.30) + (finalIntegrity * 0.30) + (finalFulfillment * 0.20) + (finalMarketTrend * 0.20);
  const overallScore = Math.round(300 + (weightedPercentage * 6)); // Maps 0-100 to 300-900

  let rating: 'High Eligibility' | 'Moderate Eligibility' | 'Low Eligibility' | 'Needs Collateral' = 'Needs Collateral';
  if (overallScore >= 750) rating = 'High Eligibility';
  else if (overallScore >= 620) rating = 'Moderate Eligibility';
  else if (overallScore >= 450) rating = 'Low Eligibility';

  // Recommendation Safe Loan calculation
  const maximumSafeLoanAmount = Math.round((profile.gstFilings.reduce((sum, f) => sum + f.turnover, 0) / 2) * (overallScore / 700));

  return {
    overallScore,
    integrityScore: finalIntegrity,
    fulfillmentCapacity: finalFulfillment,
    financialHealth: finalFinancial,
    marketTrendIndex: finalMarketTrend,
    recommendationRating: rating,
    maximumSafeLoanAmount: Math.max(50000, Math.min(1000000, maximumSafeLoanAmount)),
    assessmentReason: `Based on a ${Math.round(digitalRatio * 100)}% digital transactional ratio, ${totalGst} quarters of verified GST filings, and a raw material buffer capacity of ${Math.round(profile.rawMaterialCostIncreaseBuffer * 100)}% outputting excellent artisan capabilities in ${profile.location}.`
  };
}

// Local mock scheme generator matching the data structure
const genericSchemes = [
  {
    name: "One District One Product (ODOP) Margin Money Scheme",
    agency: "Panchayat & MSME Dept, Government of UP",
    purpose: "Provides up to 25% subsidy on project costs for traditional Lucknow Chikankari and Zardozi artisan enterprises.",
    subsidyPercentage: 25,
    maxAmount: 1000000,
    matchScore: 95,
    relevanceExplanation: "Direct match for registered craft hubs in Chowk/Nakhas looking for capital subsidies on raw metallic zari and cotton fabric looms."
  },
  {
    name: "Pradhan Mantri Mudra Yojana (Mudra - Shishu / Kishor)",
    agency: "SIDBI & Nationalized Banks",
    purpose: "Collateral-free business loans for MSMEs and cottage weavers up to ₹10 Lakhs.",
    subsidyPercentage: 0,
    maxAmount: 1000000,
    matchScore: 90,
    relevanceExplanation: "Supports artisan groups lacking traditional land collateral. Accessible using verified alternate transactional audit trails."
  },
  {
    name: "PM Vishwakarma Scheme",
    agency: "Ministry of MSME, Govt of India",
    purpose: "Skill upgradation, digital transaction incentives, and credit support at low five percent concessional interest rates.",
    subsidyPercentage: 15,
    maxAmount: 300000,
    matchScore: 88,
    relevanceExplanation: "Ideal for individual embroidery artisans (Karigars) linked into workshops looking to upgrade workspace toolkits."
  },
  {
    name: "SFURTI (Scheme of Fund for Regeneration of Traditional Industries)",
    agency: "Ministry of MSME, Govt of India",
    purpose: "Grant to set up Common Facility Centers (CFCs), modern machinery clusters, and brand development.",
    subsidyPercentage: 90,
    maxAmount: 25000000,
    matchScore: 82,
    relevanceExplanation: "Applicable for artisan cooperatives with more than 15 associated karigars (like Avadh Mahila Cooperative) to set up localized block pattern yards."
  }
];

// 4. Post Alternative Business Data to Assess Credit Score (Gemini AI Powered!)
app.post("/api/score", async (req, res) => {
  const profile: MSMEProfile = req.body;
  const deterministicScoring = calculateDeterministicScore(profile);

  if (!aiClient) {
    // If Gemini client is unavailable, return beautiful simulated AI scoring built on the artisan profile
    const responseData = {
      msmeId: profile.id,
      scoring: deterministicScoring,
      recommendedSchemes: genericSchemes.map(s => {
        let score = s.matchScore;
        if (profile.craftType === "Chikankari" && s.name.includes("ODOP")) score = 98;
        if (profile.artisanCount < 5 && s.name.includes("SFURTI")) score = 40;
        return {
          ...s,
          matchScore: score,
          relevanceExplanation: `Highly recommended for this ${profile.craftType} workshop in ${profile.location}. The digital sales footprint of ${Math.round((1 - profile.transactionCashRatio) * 100)}% verifies consistent local repayment capacity.`
        };
      }),
      riskAnalysis: {
        mitigators: [
          `Verified GST return compliance of ${Math.round(profile.gstFilings.filter(f => f.status === "Filed-On-Time").length / Math.max(1, profile.gstFilings.length) * 100)}% provides an audit trail.`,
          `Robust customer retention of ${Math.round(profile.customerRetentionRate * 100)}% indicates strong B2B buyer loyalty.`,
          `Decentralized production buffer with ${profile.artisanCount} master and helper karigars.`
        ],
        riskFactors: [
          profile.transactionCashRatio > 0.5 ? "High reliance on physical cash deposits weakens immediate bank credit history reporting." : "Minor seasonality dependency on wedding and festive cycles.",
          profile.deliveryDelayRate > 0.2 ? "Higher production shipment delays could impact short-term inventory liquidity." : "General raw material price volatility (zari metal & cotton yarns)."
        ],
        growthOpportunities: [
          `Registering on the Government e-Marketplace (GeM) to fetch central handloom quotas.`,
          `Establish direct boutique links to reduce middleman wholesale margins from 40% to 15%.`,
          `Introducing modern silk raw materials to diversify product catalogs beyond cotton sarees.`
        ]
      },
      customReportSummary: `Based on alternative asset data, ${profile.name} exhibits a Credit Score of **${deterministicScoring.overallScore} / 900** (${deterministicScoring.recommendationRating}). They possess high artisan capacity capable of managing a debt size of ₹${deterministicScoring.maximumSafeLoanAmount.toLocaleString('en-IN')}. This business is a premium candidate for ${profile.craftType === 'Chikankari' ? 'ODOP (One District One Product)' : 'PM Mudra'} support.`
    };
    return res.json(responseData);
  }

  try {
    // Construct rich context prompt for Gemini 3.5 Flash
    const prompt = `
Evaluate the creditworthiness of a traditional artisan handicraft business in Lucknow using alternative MSME data points.
Do not rely on collateral or traditional Bureau scores. You are alternative underwriting AI.

Input MSME Profile:
- Business Name: ${profile.name}
- Owner Name: ${profile.ownerName}
- Craft Specialty: ${profile.craftType} (Lucknow hand-embroidery)
- Location: ${profile.location}, Lucknow
- Artisans (Karigars) Pool Count: ${profile.artisanCount}
- Founded Year: ${profile.foundedYear}
- Monthly Fixed Overheads: Rent Rs. ${profile.monthlyRent}
- Raw Material Channel: ${profile.rawMaterialSource}

Alternative Data Indicators:
- Annual Verified GST filings and consistency list: ${JSON.stringify(profile.gstFilings)}
- Past Order book and fulfillment: ${JSON.stringify(profile.orders)}
- Historical 12 months sales trends: ${JSON.stringify(profile.monthlySales)}
- Cash Transaction Ratio (vs Verifiable UPI/Bank Digital volume): ${profile.transactionCashRatio * 100}%
- Production delivery late delay rate: ${profile.deliveryDelayRate * 100}%
- Customer Return/Retention loyalty: ${profile.customerRetentionRate * 100}%
- Raw Material Price Cushion absorption capability: ${profile.rawMaterialCostIncreaseBuffer * 100}%
- Artisan requested loan amount: Rs. ${profile.loanRequirement} (Purpose: ${profile.loanPurpose})

Calculate the overall score on a scale of 300 to 900 (mimicking alternate CIBIL metrics suitable for artisans).
Evaluate 4 micro indices from 0 to 100:
1. Integrity Score (based on consistent GST handshakes, low cash ratio, reliable verification).
2. Fulfillment Capacity (based on order volume, low delay rate, ample artisan counts).
3. Financial Health (profit margins, raw material buffer, customer retention).
4. Market Trend Index (seasonal growth, festival spikes, regional Lucknawi tourism trade fit).

Recommend the best linkages to nationalized government schemes such as:
- 'One District One Product (ODOP) Margin Money Scheme'
- 'Pradhan Mantri Mudra Yojana (Mudra)'
- 'PM Vishwakarma Scheme'
- 'SFURTI Cluster Grant'

You MUST return a JSON object that adheres strictly to the following schema. No extra text, fields, or markdown fences except raw JSON format.

JSON Schema:
{
  "scoring": {
    "overallScore": number (must be integer between 300 and 900),
    "integrityScore": number (integer 0-100),
    "fulfillmentCapacity": number (integer 0-100),
    "financialHealth": number (integer 0-100),
    "marketTrendIndex": number (integer 0-100),
    "recommendationRating": string ("High Eligibility" | "Moderate Eligibility" | "Low Eligibility" | "Needs Collateral"),
    "maximumSafeLoanAmount": number (integer rupee value),
    "assessmentReason": string (brief explanation of rating)
  },
  "recommendedSchemes": [
    {
      "name": string (full scheme name),
      "agency": string (governing department),
      "purpose": string (brief funding purpose),
      "subsidyPercentage": number (integer %),
      "maxAmount": number (integer Max Rs value),
      "matchScore": number (integer 0-100),
      "relevanceExplanation": string (craft-specific logic relating to location or weaver scale)
    }
  ],
  "riskAnalysis": {
    "mitigators": [string],
    "riskFactors": [string],
    "growthOpportunities": [string]
  },
  "customReportSummary": string (rich paragraph detailing artisan alternative credit report, formatted with standard markdown)
}
`;

    // Invoke Gemini 3.5 Flash server side
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const textResponse = response.text || "";
    const cleanJson = JSON.parse(textResponse.trim());
    
    // Inject the msme ID & sanitize scores before sending to client
    res.json({
      msmeId: profile.id,
      scoring: {
        ...deterministicScoring, // fallback defaults
        ...cleanJson.scoring
      },
      recommendedSchemes: cleanJson.recommendedSchemes || genericSchemes,
      riskAnalysis: cleanJson.riskAnalysis || { mitigators: [], riskFactors: [], growthOpportunities: [] },
      customReportSummary: cleanJson.customReportSummary || deterministicScoring.assessmentReason
    });
  } catch (error) {
    console.error("Gemini credit evaluation failed, falling back to deterministic calculations:", error);
    res.json({
      msmeId: profile.id,
      scoring: deterministicScoring,
      recommendedSchemes: genericSchemes,
      riskAnalysis: {
        mitigators: [
          `Verified GST quarterly compliance provides reliable alternate transaction registry.`,
          `Solid B2B relationships buffer raw silk shortages.`
        ],
        riskFactors: [
          `Cash handling at ${Math.round(profile.transactionCashRatio * 100)}% presents minor tax auditing gaps.`
        ],
        growthOpportunities: [
          `Enrolling on craft clusters to procure wholesale threads.`
        ]
      },
      customReportSummary: `Automated calculations determined a credit assessment rating of **${deterministicScoring.overallScore} / 900** (${deterministicScoring.recommendationRating}). Fallback report is active because the AI session generated a rate limit or initialization override.`
    });
  }
});


// ==========================================
// NEW FEATURE A: AI LOAN REPAYMENT STRESS TEST ER
// ==========================================
app.post("/api/ai-stress-test", async (req, res) => {
  const { profile, scenarioId } = req.body;
  
  let scoreImpact = -50;
  let scenarioName = "Monsoon Logistics Bottleneck";
  let defaultReport = "";

  if (scenarioId === "monsoon_delays") {
    scoreImpact = -65;
    scenarioName = "Severe Monsoon Logistics Stagnation";
    defaultReport = `Under monsoon waterlogging inside Chowk and Aminabad markets, weaving cycles typically suffer a 3-week delay due to canvas yarn moisture. While this temporarily impacts your fulfillment metrics to ${Math.round((profile.deliveryDelayRate + 0.15) * 100)}% late deliveries, historical customer retention remains robust. Recommended buffer limit matches a 15-day grace stretch.`;
  } else if (scenarioId === "price_surges") {
    scoreImpact = -85;
    scenarioName = "25% Grade-A Zari & Cotton Fabric Squeeze";
    defaultReport = `Raw metallic thread price volatility directly squeezes cottage operating buffers, especially with a raw materials buffer rating of only ${Math.round(profile.rawMaterialCostIncreaseBuffer * 100)}%. Financial index decreases by ~18 points. Mitigate by locking wholesale rates under ODOP cooperative capital.`;
  } else if (scenarioId === "tourism_dip") {
    scoreImpact = -110;
    scenarioName = "Off-season Chikankari Tourist Drop (-45%)";
    defaultReport = `A severe drop in seasonal Lucknow handcraft footfalls impacts continuous weekly capital liquidity. Workshops with high rent (₹${profile.monthlyRent}) will face stress. It is advised to shift 20% of offline retail to B2B e-market contracts to sustain steady repayments.`;
  }

  const deterministicScoring = calculateDeterministicScore(profile);
  const rawScore = deterministicScoring.overallScore;
  const simulatedScore = Math.max(300, rawScore + scoreImpact);

  if (!aiClient) {
    return res.json({
      scenarioName,
      impactScoreChange: scoreImpact,
      simulatedScore,
      repaymentHealthForecast: defaultReport,
      mitigationBlueprint: `To insulate ${profile.name} against this threat: 
1. **Transition cash transactions** (currently ${Math.round(profile.transactionCashRatio*100)}%) to UPI to build verified digital ledger speed.
2. **Form direct linkages** under the Lucknow weavers hub cooperative to buy raw materials at state-regulated caps of 10% lower.
3. **Access concessional short-term loans** under the Prime Minister Mudra Yojana (maximum suggests ₹${Math.round(simulatedScore * 1000)} grace cap).`
    });
  }

  try {
    const prompt = `
Stress test a Lucknow handicraft workshop under an economic stress scenario.
Artisan Profile:
- Name: ${profile.name}
- Craft: ${profile.craftType} inside ${profile.location}
- Rent: Rs. ${profile.monthlyRent}
- Karigars count: ${profile.artisanCount}
- Original alternate credit score calculated: ${rawScore}/900
- Cash ratio: ${profile.transactionCashRatio * 100}%

Stress Scenario selected: ${scenarioName}
Stress Scenario detail: ${defaultReport}

Under this stress:
1. Estimate a custom simulated Score drop (integer, must be negative, between -40 and -120 depending on severe impact).
2. Generate an analytical, expert AI grace limit and repayment forecast paragraph.
3. Provide 3 highly specific, localized mitigation steps suitable for Lucknow artisans (referencing things like ODOP, Chowk/Nakhas wholesale pools, or digital conversion).

Return a JSON object conforming strictly to this format:
{
  "impactScoreChange": number,
  "simulatedScore": number,
  "repaymentHealthForecast": string,
  "mitigationBlueprint": string
}
Do not return any other text, block code formatting, or markdown wrappers except raw JSON.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    const parsed = JSON.parse(response.text.trim());
    return res.json({
      scenarioName,
      impactScoreChange: parsed.impactScoreChange || scoreImpact,
      simulatedScore: parsed.simulatedScore || simulatedScore,
      repaymentHealthForecast: parsed.repaymentHealthForecast || defaultReport,
      mitigationBlueprint: parsed.mitigationBlueprint || "1. Buffer metallic inputs\n2. Digitize ledgers."
    });
  } catch (error) {
    console.error("AI Stress test execution failed:", error);
    return res.json({
      scenarioName,
      impactScoreChange: scoreImpact,
      simulatedScore,
      repaymentHealthForecast: defaultReport,
      mitigationBlueprint: "Utilize localized Lucknow cooperative raw buffer materials to absorb 20% cost volatility."
    });
  }
});


// ==========================================
// NEW FEATURE B: AI UNDERWRITING COOPERATIVE COUNSEL / ADVISOR
// ==========================================
app.post("/api/ai-counsel", async (req, res) => {
  const { profile, userMessage, language } = req.body;
  const rawScore = calculateDeterministicScore(profile).overallScore;
  const currentLang = language || "en";

  if (!aiClient) {
    let fallbackReply = "";
    if (currentLang === "hi") {
      fallbackReply = `आपकी कार्यशाला **${profile.name}** की क्रेडिट पात्रता बढ़ाने के संबंध में:
      
1. **डिजिटल लेनदेन दर्ज करें:** आपका वर्तमान नकद लेनदेन अनुपात **${Math.round(profile.transactionCashRatio*100)}%** है। यदि आप हजरतगंज और चौक के बुटीक ऑर्डर्स के लिए डिजिटल यूपीआई (UPI) भुगतान स्वीकार करते हैं, तो आपका इंटीग्रिटी स्कोर सुधरेगा जिससे स्कोर सीधे **+45 अंक** तक बढ़ सकता है!

2. **ओडीओपी (ODOP) के तहत सामग्री समर्थन:** चूंकि आपका बफर रक्षा स्तर **${Math.round(profile.rawMaterialCostIncreaseBuffer*100)}%** है, कच्चे माल के महंगे होने पर आपके मुनाफे प्रभावित हो सकते हैं। हम चौक लखनऊ में **एक जिला एक उत्पाद (ODOP)** हब से रियायती दरों पर धागे और जरी थोक में खरीदने की सलाह देते हैं।

3. **डिलीवरी की समयबद्धता:** आपकी डिलीवरी डिले रेट **${Math.round(profile.deliveryDelayRate*100)}%** है। भारतीय डाक या स्थानीय पार्सल सेवाओं के साथ अपनी डिलीवरी ट्रैक करने योग्य बनाने से बैंक जोखिम स्तर को काफी कम मानेंगे।

क्या आप पीएम मुद्रा योजना के बारे में विस्तार से चर्चा करना चाहेंगे?`;
    } else if (currentLang === "hinglish") {
      fallbackReply = `Aapki workshop **${profile.name}** ki credit score badhane ke liye tips:
      
1. **Transactions Digitize karein:** Aapka cash ratio abhi **${Math.round(profile.transactionCashRatio*100)}%** hai. Isse kam karke UPI/GPay lene se ledger strong hoga aur core score **+45 points** jump hoga.

2. **ODOP Se looms and thread pools:** Aapka raw material buffer buffer limit **${Math.round(profile.rawMaterialCostIncreaseBuffer*100)}%** hai, zari material rates badhne se profit pr asar padega. Chowk Lucknow ke **One District One Product (ODOP)** cooperative center se bulk threads lene se chhoot milegi.

3. **Delivery On-time karein:** Delivery time badha kar updates track karne se financial rating acchi hogi aur traditional land collateral ke bina bank credit lines de payenge.

Kya aap PM Mudra scheme me support chahte hain?`;
    } else {
      fallbackReply = `Regarding your query about upgrading **${profile.name}**'s credit standing:
      
1. **Digitize transaction trace:** Your cash dependency stands at **${Math.round(profile.transactionCashRatio*100)}%**. Encouraging digital UPI options for local boutique orders on Hazratganj blocks will raise your integrity index score, uplifting your core Alternative Score by around **+45 points**!

2. **Supply Chain Buffering under ODOP:** Since your cushion limit is **${Math.round(profile.rawMaterialCostIncreaseBuffer*100)}%**, you are vulnerable to zari and metallic cotton shortages. We recommend purchase linking through Lucknow's central **One District One Product (ODOP) common block** to grab subsidised looms.

3. **Logistics Auditability:** Your delivery delay sits at **${Math.round(profile.deliveryDelayRate*100)}%**. Enrolling in India Post handloom delivery APIs provides an audited tracing log, directly mitigating risk scores with underwriter banks.

Would you like more details on linking these metrics to a PM Mudra loan application?`;
    }
    return res.json({ reply: fallbackReply });
  }

  try {
    const contextPrompt = `
You are the alternative credit advisor for the Lucknow Weaver Underwriting System. 
A traditional MSME workshop (${profile.name}, specializing in ${profile.craftType} at ${profile.location}, Lucknow) is asking for guidance on how to raise their eligibility.

Current alternative indicators:
- Karigars headcount: ${profile.artisanCount} weavers
- alternate score: ${rawScore}/900
- cash ratio: ${profile.transactionCashRatio * 100}%
- raw material cushion buffer: ${profile.rawMaterialCostIncreaseBuffer * 100}%
- monthly rent overhead: Rs. ${profile.monthlyRent}
- loan requirement: Rs. ${profile.loanRequirement} (for ${profile.loanPurpose})

Enquiry: "${userMessage}"

Generate a short, elegant, helpful conversational response explaining specific alternate ledger indicators they should modify. 
Reference Lucknow's historical handcraft centers (Chowk, Nakhas, Aminabad, Kakori blocks) with cultural richness and prestige.
Break down advice into clear, readable sections. Do not exceed 3 small paragraphs. Focus strictly on empowering them to bypass traditional land collateral traps.

CRITICAL: Respond in the language specified below:
Target Language config: "${currentLang}"
- If Target Language is "hi" or "hindi", write the response completely in warm, respectful, official Hindi language in Devanagari script.
- If Target Language is "hinglish", write the response in warm, clear Hinglish (Hindi mixed with English, written using the Roman alphabet/English letters).
- If Target Language is "en" or "english", write the response in warm, professional English.
`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contextPrompt,
      config: {
        temperature: 0.6
      }
    });

    return res.json({
      reply: response.text || "I recommend improving digital ledger tracing to boost alternate index score."
    });
  } catch (error) {
    console.error("AI counseling session failed:", error);
    return res.json({
      reply: currentLang === "hi" 
        ? "हम परंपरागत बंधक की बाधा को दूर करने के लिए अमीनाबाद कोऑपरेटिव बैंक में अपना डिजिटल यूपीआई बही-खाता प्रदर्शित करने की सलाह देते हैं।" 
        : currentLang === "hinglish"
          ? "Hum recommend karte hain ki bina land papers ke loan lene ke liye apna UPI ledger bank me share karein."
          : "We suggest linking your UPI transaction ledger inside Aminabad banks to verify credit margins without land collateral assets."
    });
  }
});


// --- Vite Dev or Production Static Server Setup ---

async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  const distPath = path.join(process.cwd(), "dist");

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server on 0.0.0.0:3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lucknow Artisan Credit Ledger running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Lucknow alternate credit server:", err);
});
