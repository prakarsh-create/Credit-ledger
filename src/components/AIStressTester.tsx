import React, { useState } from 'react';
import { ShieldAlert, TrendingDown, RefreshCw, HelpCircle, AlertCircle, Sparkles, Sliders } from 'lucide-react';
import { MSMEProfile } from '../types';
import { Language, translations } from '../utils/translations';

interface AIStressTesterProps {
  profile: MSMEProfile;
  language: Language;
}

export default function AIStressTester({ profile, language }: AIStressTesterProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stressResult, setStressResult] = useState<{
    scenarioName: string;
    impactScoreChange: number;
    simulatedScore: number;
    repaymentHealthForecast: string;
    mitigationBlueprint: string;
  } | null>(null);

  const t = translations[language];

  // Helper translations for scenarios depending on language
  const scenariosMap = {
    en: [
      { id: 'monsoon_delays', title: "1. Monsoon Delays", desc: "Flooded markets + 3 wk weaving lag" },
      { id: 'price_surges', title: "2. Zari Inflation", desc: "Zari input material surges +25%" },
      { id: 'tourism_dip', title: "3. Tourism Drop", desc: "Avadh tourist footfall slump -45%" }
    ],
    hi: [
      { id: 'monsoon_delays', title: "१. मानसून विलंब", desc: "बाढ़ की स्थिति + ३ हफ्ते की बुनाई देरी" },
      { id: 'price_surges', title: "२. ज़री की महंगाई", desc: "ज़री शिल्प कच्चे माल में +२५% की वृद्धि" },
      { id: 'tourism_dip', title: "३. पर्यटकों में गिरावट", desc: "अवध पर्यटन फुटफॉल में -४५% की गिरावट" }
    ],
    hinglish: [
      { id: 'monsoon_delays', title: "1. Monsoon Delays", desc: "Baadh + 3 weeks weaving delay" },
      { id: 'price_surges', title: "2. Zari Inflation", desc: "Zari raw material expensive +25%" },
      { id: 'tourism_dip', title: "3. Tourism Drop", desc: "Lucknow tourism footfall -45% kam" }
    ]
  };

  const currentScenarios = scenariosMap[language] || scenariosMap.en;

  const handleSimulate = async (scenario: string) => {
    setSelectedScenario(scenario);
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-stress-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, scenarioId: scenario, language })
      });
      const data = await response.json();
      setStressResult(data);
    } catch (err) {
      console.error("Stress simulation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
      {/* Title block */}
      <div className="flex justify-between items-center pb-3 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-mono tracking-wider font-extrabold text-indigo-600 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 inline" /> {t.stressTesterTitle}
          </span>
          <h3 className="font-display font-semibold text-stone-900 text-sm mt-0.5">
            {t.stressTesterSubtitle}
          </h3>
        </div>
        <HelpCircle className="w-4 h-4 text-stone-400" title="Evaluate cashflow resiliency against unforeseen local economic bottlenecks" />
      </div>

      <p className="text-xs text-stone-605 leading-relaxed font-sans">
        {language === 'hi' 
          ? 'जांचें कि स्थानीय लखनऊ बाजार के उतार-चढ़ाव को वैकल्पिक क्रेडिट सिस्टम कैसे संभालेगा। जोखिम शमन मार्गदर्शिका देखने के लिए एक तनावपूर्ण स्थिति का चयन करें:'
          : language === 'hinglish'
            ? 'Test karein ki local shocks ke bad credit score kitna girega. Diagnostic report generate karne ke liye niche click karein:'
            : 'Test how alternative scoring indexes absorb local Lucknow market shocks. Choose a stressful catalyst below to evaluate score degradation and generate custom risk mitigations:'}
      </p>

      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans">
        {currentScenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => handleSimulate(scen.id)}
            disabled={isLoading}
            className={`px-3 py-3 rounded-xl border text-left text-xs font-medium cursor-pointer transition-all duration-200 ${
              selectedScenario === scen.id
                ? 'bg-indigo-50 border-indigo-400 ring-1 ring-indigo-300'
                : 'bg-stone-50/50 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span className="block font-bold text-stone-800">{scen.title}</span>
            <span className="text-[9px] text-stone-505 block mt-0.5">{scen.desc}</span>
          </button>
        ))}
      </div>

      {/* Loading state spinner */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8 gap-2.5 font-mono text-xs">
          <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin" />
          <span className="text-indigo-600 animate-pulse font-semibold">{language === 'hi' ? 'मोन्टे कार्लो सिमुलेशन की गणना चालू है...' : 'Running Monte Carlo simulation...'}</span>
        </div>
      )}

      {/* Interactive scoring output */}
      {stressResult && !isLoading && (
        <div className="bg-stone-50 rounded-2xl p-4.5 border border-stone-200/80 space-y-4 animate-fade-in font-sans">
          
          {/* Header comparison line */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200/60 pb-3">
            <div>
              <span className="text-[9px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">
                {language === 'hi' ? 'जोखिम तनाव सक्रिय' : 'Stress Active'}
              </span>
              <h4 className="text-xs font-bold text-stone-800 mt-1">{stressResult.scenarioName}</h4>
            </div>
            
            {/* Impact score circle display */}
            <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200 font-mono">
              <span className="text-stone-500 text-[10px]">{language === 'hi' ? 'प्रभाव' : 'Impact'}:</span>
              <span className="font-black text-rose-600 text-sm flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                {stressResult.impactScoreChange}
              </span>
              <span className="h-4 w-[1px] bg-stone-200"></span>
              <span className="text-stone-800 text-xs font-bold font-mono">
                {language === 'hi' ? 'नया स्कोर' : 'New'}: <span className="text-indigo-600 font-extrabold">{stressResult.simulatedScore}</span>
              </span>
            </div>
          </div>

          {/* AI generated stress commentary */}
          <div className="space-y-3.5 font-sans">
            <div>
              <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold tracking-wide">{language === 'hi' ? 'पुनर्भुगतान संवेदनशीलता' : 'Repayment Vulnerability & Offsets'}</span>
              <p className="text-xs text-stone-700 leading-relaxed mt-1 font-sans">
                {stressResult.repaymentHealthForecast}
              </p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-stone-400 block uppercase font-bold tracking-wide">{language === 'hi' ? 'प्रस्तावित सुरक्षात्मक बफर उपाय' : 'Recommended Protective Buffer actions'}</span>
              <div className="text-xs text-stone-800 leading-relaxed max-h-40 overflow-y-auto pr-1 select-text bg-white p-3 rounded-xl border border-stone-200/50 mt-1 font-sans">
                {stressResult.mitigationBlueprint.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-1.5 last:mb-0">
                    {line.startsWith('**') || line.includes('**') ? (
                      <span className="font-semibold text-stone-900">{line.replace(/\*\*/g, '')}</span>
                    ) : line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1 border-t border-stone-200/40 font-mono">
            <span>{language === 'hi' ? 'सुरक्षित सैंडबॉक्स सिमुलेशन' : 'Safe Sandbox Simulation'}</span>
            <span>Repayment Ratio: 1.4x (Stressed)</span>
          </div>

        </div>
      )}

    </div>
  );
}
