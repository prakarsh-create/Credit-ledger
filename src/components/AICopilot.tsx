import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb, Compass, MessagesSquare, Send, CheckCircle, RefreshCw } from 'lucide-react';
import { MSMEProfile } from '../types';
import { Language, translations } from '../utils/translations';

interface AICopilotProps {
  profile: MSMEProfile;
  currentScore: number;
  language: Language;
}

export default function AICopilot({ profile, currentScore, language }: AICopilotProps) {
  // Milestone interactive state
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  
  // Chat console states
  const [userQuery, setUserQuery] = useState<string>('');
  const [chatReply, setChatReply] = useState<string>('');
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  // Translate Sugestion chips depending on locale
  const quickQuestionsMap = {
    en: [
      "How does shifting 15% cash boost my eligibility?",
      "Where is the ODOP common loom center in Chowk Lucknow?",
      "What government support can I secure at 750+ score?"
    ],
    hi: [
      "नकद लेन-देन १५% कम करने से क्रेडिट लिमिट कैसे बढ़ेगी?",
      "चौक लखनऊ में ओडीओपी (ODOP) कॉमन लूम सेंटर कहां है?",
      "७५०+ स्कोर पर कौन सी सरकारी ब्याज सब्सिडी मिलेगी?"
    ],
    hinglish: [
      "15 percent cash transaction kam karne se limit kaise badhegi?",
      "Lucknow Chowk me ODOP center kahan par hai?",
      "750 plus alternative credit score par kya subsidy milegi?"
    ]
  };

  const quickQuestions = quickQuestionsMap[language] || quickQuestionsMap.en;

  // Localized milestones data
  const getMilestones = () => {
    if (language === 'hi') {
      return [
        {
          id: 'digitize',
          title: "नकद लेन-देन को डिजिटल में बदलें",
          description: `उत्पादन के १५% अधिक सौदों को कैश के बजाय पारदर्शी बैंक खातों/यूपीआई/जीपे में स्थानांतरित करें।`,
          targetMetric: `नकद अनुपात ${Math.round(profile.transactionCashRatio*100)}% से कम करके ${Math.max(5, Math.round(profile.transactionCashRatio*100) - 15)}% करें`,
          scoreBoost: 45,
          impactLabel: 'खाता पारदर्शिता बेहतर होगी'
        },
        {
          id: 'shipments',
          title: "उत्पादन और डिलीवरी में देरी कम करें",
          description: "सख्त डिलीवरी समझौते लागू करके समय पर डिस्पैच सुनिश्चित करें ताकि बैकलग सामान्य हो।",
          targetMetric: `डिलीवरी विलंब अनुपात ${Math.round(profile.deliveryDelayRate * 100)}% से हटाकर ५% से कम करें`,
          scoreBoost: 35,
          impactLabel: 'पूर्ति क्षमता इंडेक्स बढ़ेगा'
        },
        {
          id: 'karigars',
          title: "काकोरी बुनकर हब से अतिरिक्त कारीगर जोड़ें",
          description: "त्योहारी शादियों के ऑर्डर समय पर पूरे करने के लिए क्लस्टर से सहायक कारीगर साथियों को काम पर रखें।",
          targetMetric: `सक्रिय कारीगरों की संख्या ${profile.artisanCount} से बढ़ाकर ${profile.artisanCount + 4} करें`,
          scoreBoost: 25,
          impactLabel: 'वित्तीय स्थायित्व इंडेक्स बढ़ेगा'
        }
      ];
    } else if (language === 'hinglish') {
      return [
        {
          id: 'digitize',
          title: "Cash Transactions ko Digital UPI me badlein",
          description: `Busienss ka 15% aur transactions cash ke badle transparent UPI/GooglePay bank account me transfer karein.`,
          targetMetric: `Cash ratio ko ${Math.round(profile.transactionCashRatio*100)}% se kam karke ${Math.max(5, Math.round(profile.transactionCashRatio*100) - 15)}% karein`,
          scoreBoost: 45,
          impactLabel: 'Ledger Transparency behtar banegi'
        },
        {
          id: 'shipments',
          title: "Order Process & Delivery Delay kam karein",
          description: "Strict vendor agreements banayein aur regular dispatch se backlog delivery zero karein.",
          targetMetric: `Delivery delays ko ${Math.round(profile.deliveryDelayRate * 100)}% se kam karke under 5% karein`,
          scoreBoost: 35,
          impactLabel: 'Fulfillment speed up hogi'
        },
        {
          id: 'karigars',
          title: "Kakori cluster se helpers aur weavers onboard karein",
          description: "Peak business bridal season me orders handle karne ke liye cooperative pool se weavers jodein.",
          targetMetric: `Active karigars count ${profile.artisanCount} se bada kar ${profile.artisanCount + 4} weavers karein`,
          scoreBoost: 25,
          impactLabel: 'Business robustness and resilience boost hogi'
        }
      ];
    }

    return [
      {
        id: 'digitize',
        title: "Convert Cash Dependability to Digital Trace",
        description: `Migrate 15% more sales transactions currently handled as physical cash to verified GPay/UPI bank receipts.`,
        targetMetric: `Reduce cash ratio from ${Math.round(profile.transactionCashRatio*100)}% to ${Math.max(5, Math.round(profile.transactionCashRatio*100) - 15)}%`,
        scoreBoost: 45,
        impactLabel: 'Integrity Index jumps higher'
      },
      {
        id: 'shipments',
        title: "Reduce Production & Delivery Delays",
        description: "Establish strict vendor agreements with Lucknow parcel partners to eliminate short-term delivery backlogs.",
        targetMetric: `Reduce late delivery delays from ${Math.round(profile.deliveryDelayRate * 100)}% to under 5%`,
        scoreBoost: 35,
        impactLabel: 'Fulfillment Capacity rises'
      },
      {
        id: 'karigars',
        title: "Link up with Kakori Handloom cluster helper pools",
        description: "Scale your workspace headcounts to cover peak tourist demand spikes of the wedding festive season.",
        targetMetric: `Bring active karigars list count from ${profile.artisanCount} to ${profile.artisanCount + 4} weavers`,
        scoreBoost: 25,
        impactLabel: 'Financial Resiliency index climbs'
      }
    ];
  };

  const milestones = getMilestones();
  const t = translations[language];

  // Recalculate milestone total projection
  const getBoostedScore = () => {
    if (!activeSimulation) return currentScore;
    const selected = milestones.find(m => m.id === activeSimulation);
    if (!selected) return currentScore;
    return Math.min(900, currentScore + selected.scoreBoost);
  };

  const handleAskCounselor = async (query: string) => {
    setIsConsulting(true);
    setChatReply('');
    try {
      const response = await fetch('/api/ai-counsel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, userMessage: query, language })
      });
      const data = await response.json();
      setChatReply(data.reply);
    } catch (e) {
      console.error(e);
      setChatReply(language === 'hi' 
        ? "मैं सलाह दूंगा कि हजरतगंज में स्थानीय सिडबी (SIDBI) शाखा से जुड़ें ताकि ब्याज सब्सिडी के लिए वैकल्पिक बही-खाता पंजीकृत किया जा सके।" 
        : "I suggest connecting with the local SIDBI branch in Hazratganj to register your alternative UPI ledger for concessional credit lines."
      );
    } finally {
      setIsConsulting(false);
    }
  };

  const submitQueryText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    handleAskCounselor(userQuery);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* SECTION 1: MILESTONE BLUEPRINT BUILDER */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-indigo-600 uppercase flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-indigo-600 inline" /> {t.pathfinderTitle}
            </span>
            <h3 className="font-display font-semibold text-stone-900 text-sm mt-0.5">
              {t.pathfinderSubtitle}
            </h3>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-100">
            {language === 'hi' ? 'योग्यता सुधारक' : language === 'hinglish' ? 'Eligibility Improver' : 'Eligibility Optimizer'}
          </span>
        </div>

        <p className="text-xs text-stone-605 leading-relaxed mt-3 font-sans">
          {language === 'hi' 
            ? 'नीचे दिए गए "Simulate Projection" बटन पर क्लिक करके आकलित करें कि मामूली बदलावों से आपके एआई क्रेडिट स्कोर पर क्या प्रभाव पड़ता है:' 
            : language === 'hinglish' 
              ? 'Niche diye gaye "Simulate Projection" card par click karein aur dekhein ki chote badlav se credit limit kitni badegi:' 
              : 'Small steps to unlock access to lower interest nationalized credit schemes. Click "Simulate Projection" below to calculate instant credit uplift estimates:'}
        </p>

        {/* Milestone milestones grids */}
        <div className="space-y-3.5 mt-4 font-sans">
          {milestones.map((mil) => {
            const isSimulated = activeSimulation === mil.id;
            return (
              <div 
                key={mil.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isSimulated 
                    ? 'bg-indigo-50/40 border-indigo-400 shadow-sm'
                    : 'bg-stone-50/50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isSimulated ? 'text-indigo-500' : 'text-stone-300'}`} />
                      {mil.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{mil.description}</p>
                    <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono text-indigo-805 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {language === 'hi' ? 'लक्ष्य' : language === 'hinglish' ? 'Target' : 'Target'}: {mil.targetMetric}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500 italic">
                        {mil.impactLabel}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-emerald-700 font-mono font-bold text-xs block">
                      +{mil.scoreBoost} pts
                    </span>
                    <button
                      onClick={() => setActiveSimulation(isSimulated ? null : mil.id)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded-md mt-2 transition cursor-pointer ${
                        isSimulated
                          ? 'bg-indigo-600 text-white hover:bg-indigo-705'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {isSimulated ? (language === 'hi' ? 'सक्रिय सिमुलेशन' : 'Active Simulation') : (language === 'hi' ? 'प्रक्षेप देखें' : language === 'hinglish' ? 'Projection dekein' : 'Simulate Projection')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulated result target */}
        <div className="bg-stone-900 text-stone-100 rounded-xl p-3.5 mt-4 flex justify-between items-center font-sans">
          <div>
            <span className="text-[9px] font-mono text-white/50 block font-bold uppercase tracking-widest">{t.projectionGoal}</span>
            <span className="text-xs text-white/80">
              {activeSimulation 
                ? (language === 'hi' ? "कार्यवाही उपरांत संभावित वैकल्पिक एआई स्कोर दिखाया जा रहा है" : "Showing potential alternative score profile if milestones are achieved") 
                : (language === 'hi' ? "अनुमान देखने के लिए ऊपर किसी भी माइलस्टोन प्रक्षेप कार्ड को चुनें" : "Select any milestone projection card above to simulate boost trajectory")}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-mono text-emerald-400 block font-bold uppercase tracking-widest">{t.projectedIndexLabel}</span>
            <span className="font-mono text-xl font-bold tracking-tight">
              {currentScore} <ArrowRight className="w-3.5 h-3.5 inline text-emerald-400" /> <span className="text-emerald-400 font-extrabold">{getBoostedScore()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: SMART COUNSEL CHAT WINDOW */}
      <div className="bg-stone-50 rounded-2xl p-4.5 border border-stone-200 font-sans">
        <h4 className="font-display font-semibold text-stone-800 text-xs flex items-center gap-1.5 mb-2.5">
          <MessagesSquare className="w-4 h-4 text-indigo-600" />
          {t.counselorTitle}
        </h4>
        <p className="text-[11px] text-stone-500 leading-relaxed mb-3.5">
          {t.counselorSubtitle}
        </p>

        {/* Suggestion Chips */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {quickQuestions.map((chip, index) => (
            <button
              key={index}
              onClick={() => {
                setUserQuery(chip);
                handleAskCounselor(chip);
              }}
              className="text-[9px] text-stone-700 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 px-2 py-1 rounded-md transition text-left shrink-0 max-w-full cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* AI Answer window */}
        {(chatReply || isConsulting) && (
          <div className="bg-white rounded-xl p-3.5 border border-stone-200/80 mb-4 max-h-56 overflow-y-auto select-text shadow-inner">
            {isConsulting ? (
              <div className="flex items-center gap-2 justify-center py-4 font-mono">
                <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
                <span className="text-[11px] text-stone-400 animate-pulse">{language === 'hi' ? 'सुरक्षित सलाहकार नियमों को खोजा जा रहा है...' : 'Consulting historical registers...'}</span>
              </div>
            ) : (
              <div className="text-[11px] text-stone-700 leading-normal font-sans prose prose-neutral">
                {chatReply.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input submission box */}
        <form onSubmit={submitQueryText} className="flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            disabled={isConsulting}
            className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-indigo-500 font-sans"
            placeholder={language === 'hi' ? "वैकल्पिक ऋण पात्रता के विषय में प्रश्न पूछें..." : language === 'hinglish' ? "Alternative loan eligibility pe question pucho..." : "Ask question about alternative criteria options..."}
          />
          <button
            type="submit"
            disabled={isConsulting || !userQuery.trim()}
            className="bg-indigo-600 hover:bg-indigo-705 text-white px-3 py-2 rounded-xl transition cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
