import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, Compass, Calendar, AlertOctagon, 
  CheckCircle, ArrowRightLeft, Users, ShieldAlert, Award, FileSpreadsheet, Printer 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import { CreditAnalysisResponse, MSMEProfile } from '../types';
import SchemeCard from './SchemeCard';
import { Language, translations } from '../utils/translations';

interface ArtisanDetailProps {
  profile: MSMEProfile;
  analysis: CreditAnalysisResponse | null;
  onGoBack?: () => void;
  language: Language;
}

export default function ArtisanDetail({ profile, analysis, onGoBack, language }: ArtisanDetailProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const t = translations[language];

  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center flex flex-col items-center justify-center min-h-64">
        <Briefcase className="w-12 h-12 text-stone-300 animate-pulse mb-3" />
        <h4 className="font-display font-medium text-stone-900 text-sm">{language === 'hi' ? 'एआई क्रेडिट स्कोरिंग रिपोर्ट का इंतज़ार है...' : language === 'hinglish' ? 'AI Credit score report ka wait ho raha hai...' : 'Waiting for AI Credit scoring report...'}</h4>
        <p className="text-xs text-stone-500 mt-1 max-w-sm">
          {language === 'hi' 
            ? 'वैकल्पिक सूचकांक विश्लेषण चालू करने के लिए बाएं पैनल में "Calculate AI Alternative Credit Profile" पर क्लिक करें।' 
            : language === 'hinglish' 
              ? 'Alternative analysis shuru karne ke liye left panel me "Calculate AI Alternative Credit Profile" click karein.' 
              : 'Please trigger "Calculate AI Alternative Credit Profile" inside the left panel to output structured risk evaluation metrics.'}
        </p>
      </div>
    );
  }

  const { scoring, recommendedSchemes, riskAnalysis, customReportSummary } = analysis;

  // Prepare Pie chart data for Cash vs Digital
  const transactionData = [
    { name: 'Direct UPI/Bank Digital', value: Math.round((1 - profile.transactionCashRatio) * 100), color: '#10b981' },
    { name: 'Physical Cash Volume', value: Math.round(profile.transactionCashRatio * 100), color: '#f59e0b' }
  ];

  // Prepare status summaries
  const deliveredCount = profile.orders.filter(o => o.status === 'Delivered').length;
  const inProductionCount = profile.orders.filter(o => o.status === 'In-Production').length;
  const deliveryMetCount = profile.orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length;

  const handlePrintCertificate = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
    }, 1200);
  };

  return (
    <div id="artisan_scoring_report" className="space-y-6">
      {/* Detail Core Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md mb-2 inline-block">
            {profile.craftType} {language === 'hi' ? 'वर्कशॉप बही खाता' : language === 'hinglish' ? 'Workshop Bahi Khata' : 'Workshop Ledger'}
          </span>
          <h2 className="font-display font-bold text-stone-900 text-2xl tracking-tight mt-1">{profile.name}</h2>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            {language === 'hi' ? `पंजीकृत: ${profile.location} लखनऊ हब • स्थापना वर्ष: ${profile.foundedYear} • लीड कारीगर: ${profile.ownerName}` : language === 'hinglish' ? `Registered: ${profile.location} Lucknow Hub • Established: ${profile.foundedYear} • Lead Artisan: ${profile.ownerName}` : `Registered: ${profile.location} Lucknow Hub • Established: ${profile.foundedYear} • Lead Artisan: ${profile.ownerName}`}
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto font-sans">
          {onGoBack && (
            <button 
              onClick={onGoBack} 
              className="flex-1 md:flex-none border border-stone-200 hover:border-stone-300 text-stone-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
            >
              {language === 'hi' ? 'बही-खाता साफ़ करें' : language === 'hinglish' ? 'Audit Clear Karein' : 'Reset Audit'}
            </button>
          )}

          <button 
            id="btn_print_audit"
            onClick={handlePrintCertificate}
            className="flex-1 md:flex-none bg-indigo-600 text-white hover:bg-indigo-705 font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isDownloading ? (language === 'hi' ? 'पीडीएफ तैयार हो रहा है...' : 'Structuring PDF...') : (language === 'hi' ? 'क्रेडिट सर्टिफिकेट प्रिंट करें' : language === 'hinglish' ? 'Credit Certificate Print Karein' : 'Print Credit Certificate')}</span>
          </button>
        </div>
      </div>

      {/* Grid: 4 Micro alternative indices indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up font-sans">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs hover:border-emerald-300 transition-all group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">{language === 'hi' ? 'बहीखाता शुद्धता सूचकांक' : language === 'hinglish' ? 'Ledger Truth Score' : 'Trust Integrity Index'}</span>
            <div className="p-1 px-2 rounded-md bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-150">{language === 'hi' ? 'स्थिर' : 'Stable'}</div>
          </div>
          <div className="font-display font-extrabold text-stone-950 text-3xl mt-3 tracking-tight group-hover:text-emerald-750 transition-colors">
            {scoring.integrityScore}<span className="text-stone-300 text-xs font-normal">/100</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${scoring.integrityScore}%` }} className="h-full bg-emerald-500 transition-all duration-1000"></div>
          </div>
          <p className="text-[9px] text-stone-500 mt-2.5 leading-relaxed font-sans">{language === 'hi' ? 'जीएसटी फाइलिंग और बैंक डिपोजिट की साख से विश्लेषणित।' : 'Derived from audited GST filing timeliness & transparent bank deposits.'}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs hover:border-indigo-300 transition-all group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">{language === 'hi' ? 'ऑर्डर पूर्ति क्षमता' : language === 'hinglish' ? 'Delivery Capacity' : 'Fulfillment Threshold'}</span>
            <div className="p-1 px-2 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[9px] font-bold border border-indigo-150">{language === 'hi' ? 'सक्रिय' : 'Vibrant'}</div>
          </div>
          <div className="font-display font-extrabold text-stone-950 text-3xl mt-3 tracking-tight group-hover:text-indigo-750 transition-colors">
            {scoring.fulfillmentCapacity}<span className="text-stone-300 text-xs font-normal">/100</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${scoring.fulfillmentCapacity}%` }} className="h-full bg-indigo-505 transition-all duration-1000"></div>
          </div>
          <p className="text-[9px] text-stone-500 mt-2.5 leading-relaxed font-sans">{language === 'hi' ? 'सक्रिय बुनकर साथियों, लॉजिस्टिक्स देरी और ऑर्डर पूर्णता पर आधारित।' : 'Calculated based on logistical delays, active weavers pool & order completion.'}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs hover:border-indigo-300 transition-all group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">{language === 'hi' ? 'वित्तीय सुरक्षा दायरा' : language === 'hinglish' ? 'Financial Buffer' : 'Financial Cushion'}</span>
            <div className="p-1 px-2 rounded-md bg-indigo-50 text-indigo-805 font-mono text-[9px] font-bold border border-indigo-150">{language === 'hi' ? 'मजबूत' : 'Resilient'}</div>
          </div>
          <div className="font-display font-extrabold text-stone-950 text-3xl mt-3 tracking-tight group-hover:text-indigo-700 transition-colors">
            {scoring.financialHealth}<span className="text-stone-300 text-xs font-normal">/100</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${scoring.financialHealth}%` }} className="h-full bg-indigo-600 transition-all duration-1000"></div>
          </div>
          <p className="text-[9px] text-stone-500 mt-2.5 leading-relaxed font-sans">{language === 'hi' ? 'रेंटल ओवरहेड सुरक्षा, बार-बार आने वाले खरीदार और बचत बफ़र।' : 'Measures rental-overhead safety limits, repeat B2B retention, and buffer margin.'}</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-xs hover:border-rose-300 transition-all group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">{language === 'hi' ? 'मांग और बाजार ग्रोथ' : language === 'hinglish' ? 'Market Demand Growth' : 'Market Trend Index'}</span>
            <div className="p-1 px-2 rounded-md bg-rose-50 text-rose-700 font-mono text-[9px] font-bold border border-rose-150">{language === 'hi' ? 'बढ़त पर' : 'Climbing'}</div>
          </div>
          <div className="font-display font-extrabold text-stone-950 text-3xl mt-3 tracking-tight group-hover:text-rose-750 transition-colors">
            {scoring.marketTrendIndex}<span className="text-stone-300 text-xs font-normal">/100</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${scoring.marketTrendIndex}%` }} className="h-full bg-rose-500 transition-all duration-1000"></div>
          </div>
          <p className="text-[9px] text-stone-500 mt-2.5 leading-relaxed font-sans">{language === 'hi' ? 'ऐतिहासिक बिक्री पैटर्न और लखनऊ पर्यटन कढ़ाई मांग संकेत।' : 'Factors historical growth patterns and Avadh tourist embroidery traction.'}</p>
        </div>
      </div>

      {/* Charts section: Alternate Sales Trends & Transaction audit trails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
        
        {/* Sales trends Recharts */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 font-sans">
            <div>
              <h3 className="font-display font-semibold text-stone-900 text-sm">{language === 'hi' ? '१२-माह बिक्री वैकल्पिक बहीखाता' : language === 'hinglish' ? '12-Month Sales Alternate Ledger' : '12-Month Sales Alternate Ledger'}</h3>
              <p className="text-[10px] text-stone-500 mt-0.5">{language === 'hi' ? 'तिमाही जीएसटी + बी2बी बैंक जमा से पुर्नगठित बिक्री आंकड़े।' : 'Continuous sales record reconstructed from quarterly GST + B2B bank depositions.'}</p>
            </div>
            <span className="text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-150 px-2 py-0.5 rounded flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-indigo-600 font-bold" /> +{Math.round(profile.customerRetentionRate * 12)}% {language === 'hi' ? 'बढ़ोतरी' : 'Growth'}
            </span>
          </div>

          <div className="w-full h-56 font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profile.monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="month" stroke="#78716c" fontSize={9} />
                <YAxis stroke="#78716c" fontSize={9} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e7e5e4', color: '#1c1917' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cash vs Verifiable Digital Transaction Distribution */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-stone-900 text-sm">{language === 'hi' ? 'लेन-देन बहीखाता पारदर्शिता' : language === 'hinglish' ? 'Transaction Audit Trail Index' : 'Auditability Index'}</h3>
            <p className="text-[10px] text-stone-500 mt-0.5">{language === 'hi' ? 'यूपीआई और बैंक ट्रांसफर बनाम कैश वॉल्यूम।' : 'UPI and bank wire receipts compared against raw cash operations.'}</p>
          </div>

          {/* Simple Visual split representation */}
          <div className="my-6 space-y-4">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {language === 'hi' ? 'डिजिटल यूपीआई' : 'Digital'}: {100 - Math.round(profile.transactionCashRatio*100)}%
              </span>
              <span className="text-stone-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400"></span> {language === 'hi' ? 'कैश / नगद' : 'Cash'}: {Math.round(profile.transactionCashRatio*100)}%
              </span>
            </div>

            {/* Split Bar */}
            <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden flex border border-stone-200/50">
              <div 
                style={{ width: `${(1 - profile.transactionCashRatio) * 100}%` }} 
                className="h-full bg-emerald-500 transition-all duration-1000"
              ></div>
              <div 
                style={{ width: `${profile.transactionCashRatio * 105}%` }} 
                className="h-full bg-stone-300 transition-all duration-1000"
              ></div>
            </div>

            <p className="text-[10px] text-stone-600 leading-relaxed text-center italic bg-[#FAF9F6] p-3.5 rounded-xl border border-stone-200">
              {profile.transactionCashRatio > 0.50 
                ? (language === 'hi' ? "नकद लेन-देन अधिक है। यूपीआई अपनाने से स्कोर में बढ़ोतरी हो सकती है।" : "Highly dependent on cash. Encouraging UPI adoption could boost score.")
                : (language === 'hi' ? "शानदार डिजिटल पारदर्शिता। यूपीआई डेटा आधारित वित्तीय साख मजबूत है।" : "Excellent digital transparency. Verifiable transaction trail mitigates traditional balance sheet requirements.")
              }
            </p>
          </div>

          {/* Core operational characteristics */}
          <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs">
            <span className="text-stone-400">{language === 'hi' ? 'ऑर्डर विलंब अनुपात:' : 'Logistics delay buffer:'}</span>
            <span className="font-mono font-bold text-stone-800">{(profile.deliveryDelayRate * 100).toFixed(0)}% {language === 'hi' ? 'विलंब' : 'Delayed'}</span>
          </div>
        </div>
      </div>

      {/* Grid: AI Risk Analysis & Mitigators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        
        {/* Mitigators and Strengths */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h3 className="font-display font-semibold text-stone-900 text-sm mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 font-bold" />
            {language === 'hi' ? 'वैकल्पिक क्रेडिट प्लस पॉइंट (मजबूत पक्ष)' : 'Alternative Credit Mitigators (Strengths)'}
          </h3>
          <ul className="space-y-3">
            {riskAnalysis.mitigators.map((mit, index) => (
              <li key={index} className="flex gap-3 text-xs text-stone-650">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center shrink-0 text-emerald-700 font-mono font-bold text-[9px] mt-0.5">
                  ✓
                </span>
                <span className="leading-normal">{mit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk factors and Vulnerabilities */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h3 className="font-display font-semibold text-stone-900 text-sm mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            {language === 'hi' ? 'एआई जोखिम और अंडरराइटिंग चिंताएं' : 'Underwriting Risk Concerns (Assessments)'}
          </h3>
          <ul className="space-y-3">
            {riskAnalysis.riskFactors.map((risk, index) => (
              <li key={index} className="flex gap-3 text-xs text-stone-650">
                <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-250 flex items-center justify-center shrink-0 text-indigo-705 font-mono font-bold text-[9px] mt-0.5">
                  !
                </span>
                <span className="leading-normal">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dynamic Recommendation Summary Box */}
      <div className="bg-white border border-stone-200 text-stone-900 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-[0.015] text-indigo-600 pointer-events-none transform translate-y-6 translate-x-4">
          <Award className="w-56 h-56" />
        </div>

        <div className="relative z-10 space-y-4 font-sans">
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-indigo-700 uppercase">{language === 'hi' ? 'एआई मूल्यांकन' : 'AI Institutional Appraisal'}</span>
              <h3 className="font-display font-semibold text-stone-900 text-base">{language === 'hi' ? 'अंडरराइटर रिपोर्ट सारांश' : 'Underwriter Summary'}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 block font-mono">{language === 'hi' ? 'अधिकतम सुरक्षित क्रेडिट लिमिट' : 'Max Suggested Safe Limit'}</span>
              <span className="text-indigo-900 font-mono font-bold text-lg">₹{scoring.maximumSafeLoanAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-xs text-stone-700 leading-relaxed font-sans select-text">
            {customReportSummary.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-2 last:mb-0">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-sans">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span>{language === 'hi' ? 'जेमिनी ३.५ वैकल्पिक वित्तीय विश्लेषण सिंक सफल।' : 'Gemini 3.5 alternate parsing protocol applied successfully.'}</span>
            </div>
            
            <div className="text-xs bg-stone-50 text-stone-700 px-3 py-1.5 rounded-lg border border-stone-200 font-medium">
              {language === 'hi' ? 'वित्तीय लक्ष्य आवश्यकता:' : 'Assessed Goal:'} <strong className="text-stone-900">₹{profile.loanRequirement?.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Schemes grid list */}
      <div className="space-y-4 font-sans border-t border-stone-200 pt-6">
        <div>
          <h3 className="font-display font-semibold text-stone-900 text-lg tracking-tight">{language === 'hi' ? 'अनुकूलित एमएसएमई और सरकारी योजनाएं' : 'Matched National & State MSME Schemes'}</h3>
          <p className="text-xs text-stone-500">{language === 'hi' ? 'लखनऊ के विशेष चिकनकारी और ज़रदोज़ी बुनकरों की पात्रता के लिए योजनाएं।' : "Government schemes customized to match local Lucknowi weavers and zardozi artisans' performance metrics."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedSchemes.map((scheme, index) => (
            <SchemeCard 
              key={index} 
              scheme={scheme} 
              onApply={() => {}} 
              applied={scoring.overallScore >= 620 && scheme.matchScore >= 85} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
