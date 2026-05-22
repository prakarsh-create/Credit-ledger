import React, { useState, useRef, useEffect } from 'react';
import { Upload, HelpCircle, FileText, IndianRupee, Users, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MSMEProfile } from '../types';
import { Language, translations } from '../utils/translations';

interface MSMEFormProps {
  onSubmitScore: (profile: Partial<MSMEProfile>) => void;
  isLoading: boolean;
  language: Language;
  selectedArtisan?: MSMEProfile | null;
}

export default function MSMEForm({ onSubmitScore, isLoading, language, selectedArtisan }: MSMEFormProps) {
  const [name, setName] = useState('Chowk Zardozi Splendors');
  const [ownerName, setOwnerName] = useState('Mukhtar Ansari');
  const [email, setEmail] = useState('mukhtar.ansari@lucknowkarigar.in');
  const [phone, setPhone] = useState('+91 95540 66321');
  const [location, setLocation] = useState<'Chowk' | 'Aminabad' | 'Nakhas' | 'Hazratganj' | 'Kakori'>('Nakhas');
  const [craftType, setCraftType] = useState<'Chikankari' | 'Zardozi'>('Zardozi');
  const [foundedYear, setFoundedYear] = useState(2019);
  const [artisanCount, setArtisanCount] = useState(12);
  const [monthlyRent, setMonthlyRent] = useState(6500);
  const [rawMaterialSource, setRawMaterialSource] = useState('Nakhas Market Metal Wires Hub');
  
  // Alternate Parameters
  const [transactionCashRatio, setTransactionCashRatio] = useState(0.40); // 40% cash
  const [deliveryDelayRate, setDeliveryDelayRate] = useState(0.12); // 12% delay
  const [customerRetentionRate, setCustomerRetentionRate] = useState(0.70); // 70% retention
  const [rawMaterialCostIncreaseBuffer, setRawMaterialCostIncreaseBuffer] = useState(0.15); // 15% buffer
  
  // Custom Loan Setup
  const [loanRequirement, setLoanRequirement] = useState(250000);
  const [loanPurpose, setLoanPurpose] = useState('Expanding zardozi wooden work frames (adda tables) and onboarding 4 women embroidery helpers from rural Kakori clusters.');

  // GST State
  const [gstRecords, setGstRecords] = useState<any[]>([
    { quarter: "Q1 - 2026", turnover: 180000, taxPaid: 9000, filingDate: "2026-04-14", status: "Filed-On-Time" },
    { quarter: "Q4 - 2025", turnover: 240000, taxPaid: 12000, filingDate: "2026-01-18", status: "Filed-On-Time" },
    { quarter: "Q3 - 2025", turnover: 150000, taxPaid: 7500, filingDate: "2025-10-15", status: "Filed-On-Time" },
    { quarter: "Q2 - 2025", turnover: 130000, taxPaid: 6500, filingDate: "2025-07-28", status: "Filed-Late" }
  ]);
  const [parsingGst, setParsingGst] = useState(false);
  const [parsingStep, setParsingStep] = useState('');
  const [parsedFileName, setParsedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if selectedArtisan changes (crucial for Voice Command sync)
  useEffect(() => {
    if (selectedArtisan) {
      if (selectedArtisan.name) setName(selectedArtisan.name);
      if (selectedArtisan.ownerName) setOwnerName(selectedArtisan.ownerName);
      if (selectedArtisan.email) setEmail(selectedArtisan.email);
      if (selectedArtisan.phone) setPhone(selectedArtisan.phone);
      if (selectedArtisan.location) setLocation(selectedArtisan.location as any);
      if (selectedArtisan.craftType) setCraftType(selectedArtisan.craftType as any);
      if (selectedArtisan.foundedYear) setFoundedYear(selectedArtisan.foundedYear);
      if (selectedArtisan.artisanCount) setArtisanCount(selectedArtisan.artisanCount);
      if (selectedArtisan.monthlyRent) setMonthlyRent(selectedArtisan.monthlyRent);
      if (selectedArtisan.rawMaterialSource) setRawMaterialSource(selectedArtisan.rawMaterialSource);
      if (selectedArtisan.transactionCashRatio !== undefined) setTransactionCashRatio(selectedArtisan.transactionCashRatio);
      if (selectedArtisan.deliveryDelayRate !== undefined) setDeliveryDelayRate(selectedArtisan.deliveryDelayRate);
      if (selectedArtisan.customerRetentionRate !== undefined) setCustomerRetentionRate(selectedArtisan.customerRetentionRate);
      if (selectedArtisan.rawMaterialCostIncreaseBuffer !== undefined) setRawMaterialCostIncreaseBuffer(selectedArtisan.rawMaterialCostIncreaseBuffer);
      if (selectedArtisan.loanRequirement !== undefined) setLoanRequirement(selectedArtisan.loanRequirement);
      if (selectedArtisan.loanPurpose) setLoanPurpose(selectedArtisan.loanPurpose);
      if (selectedArtisan.gstFilings && selectedArtisan.gstFilings.length > 0) {
        setGstRecords(selectedArtisan.gstFilings);
      }
    }
  }, [selectedArtisan]);

  const t = translations[language];

  // Simulated GST OCR Upload Parsing Handler
  const handleGstFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingGst(true);
    setParsedFileName(file.name);
    setParsingStep(language === 'hi' ? 'दस्तावेज़ को अपलोड किया जा रहा है...' : 'Uploading tax file to secure staging...');

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setParsingStep(language === 'hi' ? 'एआई इंजन डेटा निकाल रहा है...' : 'Running OCR neural parser...');
      await new Promise(resolve => setTimeout(resolve, 600));
      setParsingStep(language === 'hi' ? 'लखनऊ सरकारी जीएसटी डेटाबेस को चेक किया जा रहा है...' : 'Matching Lucknow government GST portal receipts...');
      
      const response = await fetch('/api/analyze-gst-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileContentBase64: 'simulated-payload' })
      });
      const data = await response.json();
      if (data.success) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setParsingStep(language === 'hi' ? 'वैकल्पिक वित्तीय बही-खाता को सिंक किया जा रहा है...' : 'Calibrating alternate ledger turnovers...');
        await new Promise(resolve => setTimeout(resolve, 500));
        setGstRecords(data.parsedFilings);
      }
    } catch (err) {
      console.error("GST document simulation parsing failed:", err);
    } finally {
      setParsingGst(false);
      setParsingStep('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const mockEvent = {
        target: { files: e.dataTransfer.files }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleGstFileUpload(mockEvent);
    }
  };

  // Compile final profiles and submit score calculation API trigger
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    // Fabricate orders that correspond to delay benchmarks
    const ordersMock = [
      { id: "ord_usr_1", buyerName: "Hazratganj Ethnic Boutique", orderDate: "2026-03-05", deliveryDate: "2026-04-01", actualDeliveryDate: deliveryDelayRate > 0.20 ? "2026-04-12" : "2026-03-31", amount: 80000, itemsCount: 40, status: "Delivered", embroiderersAssign: Math.round(artisanCount * 0.5), craftType },
      { id: "ord_usr_2", buyerName: "Kora Cotton House", orderDate: "2026-04-10", deliveryDate: "2026-05-15", actualDeliveryDate: "2026-05-14", amount: 65000, itemsCount: 30, status: "Delivered", embroiderersAssign: Math.round(artisanCount * 0.4), craftType },
      { id: "ord_usr_3", buyerName: "Lucknow Crafts Cooperative", orderDate: "2026-05-02", deliveryDate: "2026-05-30", actualDeliveryDate: "2026-05-30", amount: 42000, itemsCount: 20, status: "In-Production", embroiderersAssign: Math.round(artisanCount * 0.3), craftType }
    ];

    // Compute sales volume over past 12 months built on GST Q1 averages
    const medianQuarterSales = gstRecords.reduce((total, r) => total + r.turnover, 0) / 4;
    const months = ["Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026"];
    const baseVal = Math.round(medianQuarterSales / 3);
    const monthlySales = months.map((m, index) => {
      let multiplier = 1.0;
      if (index === 4 || index === 5 || index === 6 || index === 10) multiplier = 1.45;
      if (index === 1 || index === 7) multiplier = 0.70;
      return { month: m, amount: Math.round(baseVal * multiplier) };
    });

    const newProfile: Partial<MSMEProfile> = {
      id: selectedArtisan?.id || `msme_off_${Date.now()}`,
      name,
      ownerName,
      email,
      phone,
      location,
      craftType,
      foundedYear: Number(foundedYear),
      artisanCount: Number(artisanCount),
      monthlyRent: Number(monthlyRent),
      rawMaterialSource,
      gstFilings: gstRecords,
      orders: ordersMock as any,
      monthlySales,
      transactionCashRatio,
      deliveryDelayRate,
      customerRetentionRate,
      rawMaterialCostIncreaseBuffer,
      loanRequirement: Number(loanRequirement),
      loanPurpose
    };

    onSubmitScore(newProfile);
  };

  return (
    <form id="msme_audit_form" onSubmit={handleFormSubmission} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:p-8 space-y-8">
      {/* Title */}
      <div>
        <h3 className="font-display font-semibold text-stone-900 text-xl tracking-tight">{t.businessContextTitle}</h3>
        <p className="text-xs text-stone-500 mt-1">
          {t.businessContextSubtitle}
        </p>
      </div>

      {/* Grid: Core Workspace Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.workshopName}</label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none" 
            placeholder="e.g., Avadh Silk Exquisites"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.ownerName}</label>
          <input 
            type="text" 
            required 
            value={ownerName} 
            onChange={e => setOwnerName(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none" 
            placeholder="e.g., Mohammad Salim"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.emailAccess}</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
            placeholder="owner@domain.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.primaryPhone}</label>
          <input 
            type="text" 
            required 
            value={phone} 
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.craftSpecialty}</label>
          <div className="flex gap-4">
            <label className="flex-1 flex items-center justify-between cursor-pointer border border-stone-200 hover:border-indigo-300 p-3 rounded-xl bg-[#FAF9F6]">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                {t.goldThreadName}
              </span>
              <input 
                type="radio" 
                name="craftType" 
                checked={craftType === 'Zardozi'} 
                onChange={() => setCraftType('Zardozi')} 
                className="accent-indigo-500"
              />
            </label>

            <label className="flex-1 flex items-center justify-between cursor-pointer border border-stone-200 hover:border-indigo-300 p-3 rounded-xl bg-[#FAF9F6]">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                {t.handStitchName}
              </span>
              <input 
                type="radio" 
                name="craftType" 
                checked={craftType === 'Chikankari'} 
                onChange={() => setCraftType('Chikankari')} 
                className="accent-indigo-500"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">{t.hubLocation}</label>
          <select 
            value={location} 
            onChange={e => setLocation(e.target.value as any)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
          >
            <option value="Chowk">Chowk ({language === 'hi' ? 'चिकनकारी ऐतिहासिक हब' : 'Historic Chikankari Hub'})</option>
            <option value="Nakhas">Nakhas ({language === 'hi' ? 'ज़रदोज़ी जस्ता बाजार' : 'Zardozi Metallic Artisans Market'})</option>
            <option value="Aminabad">Aminabad ({language === 'hi' ? 'कपड़ा थोक व्यापार केंद्र' : 'Commercial Clothing Retail District'})</option>
            <option value="Kakori">Kakori ({language === 'hi' ? 'हैंड ब्लॉक प्रिंट बुनकर क्लस्टर' : 'Cluster Development & Hand block prints'})</option>
            <option value="Hazratganj">Hazratganj ({language === 'hi' ? 'फैशन बुटीक आउटलेट्स' : 'High-street Boutique outlets'})</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-605 uppercase tracking-wider mb-2">{t.yearEstablished}</label>
          <input 
            type="number" 
            required 
            value={foundedYear} 
            onChange={e => setFoundedYear(Number(e.target.value))}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-605 uppercase tracking-wider mb-2">{t.monthlyOverhead}</label>
          <input 
            type="number" 
            required 
            value={monthlyRent} 
            onChange={e => setMonthlyRent(Number(e.target.value))}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
          />
        </div>
      </div>

      {/* Interactive Sliders: Alternative Business Indicators */}
      <div className="border-t border-stone-200 pt-6 font-sans">
        <h4 className="font-display font-semibold text-stone-800 text-sm mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          {t.alternativeParametersTitle}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Cash vs Digital Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-stone-700">{t.cashTransRatio}</span>
              <span className="font-mono font-bold text-indigo-805 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
                {(transactionCashRatio * 100).toFixed(0)}% Cash / {((1 - transactionCashRatio) * 100).toFixed(0)}% Digital
              </span>
            </div>
            <input 
              type="range" 
              min="0.0" 
              max="1.0" 
              step="0.05" 
              value={transactionCashRatio}
              onChange={e => setTransactionCashRatio(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-stone-500">
              {t.cashRatioDesc}
            </p>
          </div>

          {/* Slider 2: Delay Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-stone-700">{t.deliveryDelayRate}</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${deliveryDelayRate > 0.25 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                {(deliveryDelayRate * 100).toFixed(0)}% Delay
              </span>
            </div>
            <input 
              type="range" 
              min="0.0" 
              max="0.5" 
              step="0.01" 
              value={deliveryDelayRate}
              onChange={e => setDeliveryDelayRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-stone-500">
              {t.delayRateDesc}
            </p>
          </div>

          {/* Slider 3: Associated Weavers Pool Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-stone-700">{t.helpersHeadcount}</span>
              <span className="font-mono font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded flex items-center gap-1 border border-stone-200">
                <Users className="w-3 h-3 text-stone-500" /> {artisanCount} Karigars
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              step="1" 
              value={artisanCount}
              onChange={e => setArtisanCount(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-stone-500">
              {t.helpersDesc}
            </p>
          </div>

          {/* Slider 4: Return Customers Retention */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-stone-700">{t.repeatCustomer}</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                {(customerRetentionRate * 100).toFixed(0)}% Repeat Buyers
              </span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.05" 
              value={customerRetentionRate}
              onChange={e => setCustomerRetentionRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <p className="text-[10px] text-stone-500">
              {t.repeatCustomerDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated GST Ingestion Drag & Drop */}
      <div className="border-t border-stone-200 pt-6 font-sans">
        <h4 className="font-display font-semibold text-stone-800 text-sm mb-3">
          {t.gstTitle}
        </h4>
        <p className="text-[11px] text-stone-500 mb-4 leading-relaxed font-sans">
          {t.gstDesc}
        </p>

        {/* Drag Drop Simulator Frame */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
            parsingGst 
              ? 'border-indigo-500 bg-indigo-50/40' 
              : parsedFileName 
                ? 'border-emerald-500/50 bg-emerald-50/30' 
                : 'border-stone-200 hover:border-indigo-400 bg-stone-50/50'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleGstFileUpload} 
            className="hidden" 
            accept=".pdf,.png,.jpg,.jpeg,.xlsx" 
          />

          {parsingGst ? (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
              <span className="text-xs font-semibold text-indigo-700 font-mono tracking-wide animate-pulse">{parsingStep}</span>
              <span className="text-[10px] text-stone-500">{language === 'hi' ? "सुरक्षित क्रेडेंशियल्स क्रेडिट विश्लेषक क्षेत्र" : "Secure Sandboxed Credit Evaluator Workspace"}</span>
            </div>
          ) : parsedFileName ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
              <span className="text-xs font-bold text-emerald-800 font-mono">{parsedFileName} {language === 'hi' ? "विश्लेषण और पुष्टि सफल!" : "parsed and verified!"}</span>
              <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">{t.gstInferred}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              <span className="text-xs font-semibold text-stone-700">{t.gstDragDrop}</span>
              <span className="text-[10px] text-stone-400">{t.gstFormats}</span>
            </div>
          )}
        </div>

        {/* GST filings ledger grid preview */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
          {gstRecords.map((r, i) => (
            <div key={i} className="border border-stone-200 bg-stone-50 p-3 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-stone-400 uppercase tracking-widest">{r.quarter}</span>
                <span className={`block text-[10px] font-semibold ${r.status === 'Filed-On-Time' ? 'text-emerald-700' : 'text-stone-500'}`}>{r.status === 'Filed-On-Time' ? t.onTimeGst : language === 'hi' ? "विलंबित फाइल" : "Filed Late"}</span>
              </div>
              <div className="text-xs font-bold text-stone-900 mt-2">
                ₹{r.turnover.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Loan and usage purposes */}
      <div className="border-t border-stone-200 pt-6 space-y-4 font-sans">
        <h4 className="font-display font-semibold text-stone-800 text-sm">{t.desiredLoanTitle}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-stone-605 uppercase tracking-wider mb-2">{t.requiredCapital}</label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-stone-500 font-semibold text-xs">₹</span>
              <input 
                type="number" 
                required 
                value={loanRequirement} 
                onChange={e => setLoanRequirement(Number(e.target.value))}
                className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl pl-8 pr-4 py-2.5 text-xs font-mono font-semibold text-stone-900 transition-all outline-none" 
                placeholder="200000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-605 uppercase tracking-wider mb-2">{t.rawMaterialBuffer}</label>
            <select 
              value={rawMaterialCostIncreaseBuffer} 
              onChange={e => setRawMaterialCostIncreaseBuffer(parseFloat(e.target.value))}
              className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 transition-all outline-none"
            >
              <option value="0.05">{t.bufferOption1}</option>
              <option value="0.15">{t.bufferOption2}</option>
              <option value="0.30">{t.bufferOption3}</option>
              <option value="0.50">{t.bufferOption4}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-605 uppercase tracking-wider mb-2">{t.loanPurpose}</label>
          <textarea 
            required
            rows={3}
            value={loanPurpose} 
            onChange={e => setLoanPurpose(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white text-xs text-stone-900 rounded-xl px-4 py-2.5 transition-all outline-none resize-none" 
            placeholder={t.loanPurposeDesc}
          />
        </div>
      </div>

      {/* Button Submission triggers */}
      <button
        id="btn_calculate_alt_score"
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 border border-transparent hover:bg-indigo-700 disabled:bg-stone-200 disabled:text-stone-400 text-white font-display py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider transition-all duration-200 uppercase flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            <span>{t.gstParsing}</span>
          </>
        ) : (
          <span>{t.btnCalculate}</span>
        )}
      </button>
    </form>
  );
}
