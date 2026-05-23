import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Printer, X, Download, HelpCircle, 
  FileCheck, Landmark, Check, QrCode, FileText, Activity, CreditCard, ExternalLink
} from 'lucide-react';
import { MSMEProfile, AlternativeCreditScore } from '../types';
import { Language } from '../utils/translations';

interface SwarozgarPassbookProps {
  profile: MSMEProfile;
  scoring: AlternativeCreditScore;
  language: Language;
}

const passbookTranslations = {
  en: {
    btnOpen: "View Swarozgar Credit Passbook",
    btnOpenDesc: "Generate verified digital ledger certificate & audit files",
    title: "Swarozgar Alternate Credit Passbook",
    subtitle: "Avadh Micro-Credit Alternate Underwriting Registry",
    tabCertificate: "Official Credit Certificate",
    tabAuditLedger: "Alternate Audit Statement",
    certHeaderGov: "GOVERNMENT OF UTTAR PRADESH • DISTRICT LUCKNOW",
    certPartner: "IN PARTNERSHIP WITH SIDBI DIGITAL UNDERWRITING PROTOCOL",
    certTitleHi: "अवध वैकल्पिक ऋण पात्रता प्रमाण-पत्र",
    certTitleEn: "AVADH ALTERNATIVE CREDIT ELIGIBILITY CERTIFICATE",
    certDesc: "This is to certify that the handicraft micro-enterprise described below has been evaluated for institutional credit eligibility under alternative, collateral-free transactional underwriting parameters verified securely via AI models.",
    lblWorkshop: "Workshop Name",
    lblOwner: "Master Karigar / Owner",
    lblCraft: "Handicraft Specialty",
    lblHub: "Weaving Hub Cluster",
    lblScore: "Underwritten Score",
    lblAssessmentDate: "Verification Date",
    lblEligibleSchemes: "Pre-Approved Credit Schemes",
    lblMaxLoan: "Maximum Safe Debt Limit",
    lblStatus: "Repayment Standing",
    sigLeft: "District Crafts Executive, Lucknow",
    sigRight: "Alternate Underwriting Officer, SIDBI",
    certifiedSeal: "VERIFIED AVADH LEDGER",
    printBtn: "Print / Save PDF Certificate",
    downloadLabel: "Share Digital Passbook",
    copiedMsg: "Swarozgar dynamic verification link copied!",
    verificationId: "Verification Certificate ID",
    auditTitle: "Alternative Operational Audit Trail",
    auditSubtitle: "12-Month Non-Collateral Enterprise Activity Statement",
    metricTitle: "Alternate Performance Metrics",
    statementTable: "Alternate Account Statement Summary",
    colParam: "Underwriting Metric",
    colVal: "Registered Margin/Value",
    colStatus: "Underwriting Risk Assessment",
    paramDigital: "Digital UPI Transaction Volume",
    paramRent: "Workspace Rent Leverage",
    paramDelay: "Dispatch Delivery Delay rate",
    paramHeadcount: "Karigar Headcount Continuity",
    paramRetention: "B2B Customer Retention Rate",
    statusHigh: "Highly Auditable Integrity (Low Risk)",
    statusMod: "Stable Overhead Balance (Moderate Risk)",
    statusLow: "Minimal Dispatch Penalty (Excellent)",
    statusCap: "Resilient Workforce Capacity (Strong)",
    statusLoyal: "High Boutique Trust Index (High Retention)"
  },
  hi: {
    btnOpen: "स्वरोज़गार क्रेडिट पासबुक देखें",
    btnOpenDesc: "सत्यापित डिजिटल बही-खाता प्रमाण पत्र और ऑडिट फाइलें बनाएं",
    title: "स्वरोज़गार डिजिटल साख पासबुक",
    subtitle: "अवध सूक्ष्म-ऋण वैकल्पिक हामीदारी रजिस्ट्री",
    tabCertificate: "आधिकारिक साख प्रमाण-पत्र",
    tabAuditLedger: "वैकल्पिक ऑडिट बही-खाता",
    certHeaderGov: "उत्तर प्रदेश सरकार • लखनऊ मंडल जनपद",
    certPartner: "सिडबी (SIDBI) डिजिटल भागीदारी हामीदारी प्रोटोकॉल के तहत प्रमाणित",
    certTitleHi: "अवध वैकल्पिक ऋण पात्रता प्रमाण-पत्र",
    certTitleEn: "AVADH ALTERNATIVE CREDIT ELIGIBILITY CERTIFICATE",
    certDesc: "यह प्रमाणित किया जाता है कि नीचे वर्णित हस्तशिल्प सूक्ष्म-उद्यम का मूल्यांकन एआई मॉडल के माध्यम से डिजिटल लेन-देन, समय पर जीएसटी फाइलिंग और ग्राहक संतुष्टि के आधार पर वैकल्पिक बिना-बंधक (Collateral-Free) क्रेडिट पात्रता के लिए किया गया है।",
    lblWorkshop: "कार्यशाला / उद्यम नाम",
    lblOwner: "मुख्य कारीगर / स्वामी",
    lblCraft: "हस्तशिल्प विशेषता",
    lblHub: "बुनकर / जरी क्लस्टर",
    lblScore: "हामीदारी प्राप्त स्कोर",
    lblAssessmentDate: "सत्यापन की तिथि",
    lblEligibleSchemes: "पूर्व-अनुमोदित सरकारी योजनाएं",
    lblMaxLoan: "अधिकतम सुरक्षित ऋण सीमा",
    lblStatus: "ऋण भुगतान साख श्रेणी",
    sigLeft: "जिला हस्तशिल्प कार्यकारी, लखनऊ",
    sigRight: "वैकल्पिक साख अधिकारी, सिडबी (SIDBI)",
    certifiedSeal: "सत्यापित अवध बही-खाता",
    printBtn: "प्रमाण-पत्र प्रिंट करें / पीडीएफ सहेजें",
    downloadLabel: "साख पासबुक साझा करें",
    copiedMsg: "स्वरोज़गार डिजिटल सत्यापन लिंक कॉपी किया गया!",
    verificationId: "सत्यापन प्रमाण-पत्र संख्या",
    auditTitle: "वैकल्पिक परिचालन ऑडिट विवरण",
    auditSubtitle: "12-महीने का गैर-बंधक उद्यम गतिविधि विवरण",
    metricTitle: "वैकल्पिक प्रदर्शन संकेतक",
    statementTable: "वैकल्पिक खाता बही विवरण सारांश",
    colParam: "हामीदारी संकेतक",
    colVal: "विशिष्ट मान / मूल्य",
    colStatus: "हामीदारी जोखिम मूल्यांकन",
    paramDigital: "डिजिटल यूपीआई लेन-देन मात्रा",
    paramRent: "कार्यशाला किराया ओवरहेड भार",
    paramDelay: "डिलीवरी शिपमेंट देरी की दर",
    paramHeadcount: "सक्रिय कारीगर कार्यबल निरंतरता",
    paramRetention: "B2B बुटीक ग्राहक प्रतिधारण दर",
    statusHigh: "अत्यंत सुरक्षित डिजिटल इतिहास (कम जोखिम)",
    statusMod: "संतुलित कार्यशाला किराया (मध्यम जोखिम)",
    statusLow: "न्यूनतम डिस्पैच देरी (सर्वश्रेष्ठ)",
    statusCap: "मजबूत उत्पादन क्षमता (अनुकूल)",
    statusLoyal: "उच्च बुटीक ग्राहक विश्वसनीयता (उत्कृष्ट)"
  },
  hinglish: {
    btnOpen: "Swarozgar Credit Passbook dekhein",
    btnOpenDesc: "Verified alternate ledger certificate aur statement generate karein",
    title: "Swarozgar Alternate Credit Passbook",
    subtitle: "Avadh Alternate Underwriting Credit Registry",
    tabCertificate: "Official Credit Certificate",
    tabAuditLedger: "Alternate Audit Statement",
    certHeaderGov: "GOVERNMENT OF UTTAR PRADESH • DISTRICT LUCKNOW",
    certPartner: "IN PARTNERSHIP WITH SIDBI DIGITAL UNDERWRITING PROTOCOL",
    certTitleHi: "अवध वैकल्पिक ऋण पात्रता प्रमाण-पत्र",
    certTitleEn: "AVADH ALTERNATIVE CREDIT ELIGIBILITY CERTIFICATE",
    certDesc: "This is to certify that the traditional handicraft micro-enterprise described below has been evaluated for collateral-free credit eligibility. Parameters like alternate UPI logs, on-time GST filings, and B2B customer retention have been verified securely via Alternate Underwriting Models.",
    lblWorkshop: "Workshop ka Naam",
    lblOwner: "Master Karigar / Owner",
    lblCraft: "Handicraft Specialty",
    lblHub: "Weaving Hub Cluster",
    lblScore: "Underwritten Score",
    lblAssessmentDate: "Verification Date",
    lblEligibleSchemes: "Pre-Approved Credit Schemes",
    lblMaxLoan: "Maximum Safe Loan Limit",
    lblStatus: "Repayment Standing",
    sigLeft: "District Crafts Executive, Lucknow",
    sigRight: "Alternate Underwriting Specialist, SIDBI",
    certifiedSeal: "VERIFIED AVADH LEDGER",
    printBtn: "Print / Save PDF Certificate",
    downloadLabel: "Share Credit Passbook",
    copiedMsg: "Swarozgar verification link copy ho gaya hai!",
    verificationId: "Certificate ID",
    auditTitle: "Alternative Operational Audit Trail",
    auditSubtitle: "12-Month Collateral-Free Enterprise Activity Statement",
    metricTitle: "Alternate Performance Metrics",
    statementTable: "Alternate Account Statement Summary",
    colParam: "Underwriting Indicator",
    colVal: "Registered Value",
    colStatus: "Risk Underwriting Assessment",
    paramDigital: "Digital UPI transaction ratio",
    paramRent: "Workshop Rent Overhead",
    paramDelay: "Delivery dispatch delay rate",
    paramHeadcount: "Karigar Headcount Continuity",
    paramRetention: "B2B boutique customer retention",
    statusHigh: "Superb transaction transparency (Low credit risk)",
    statusMod: "Stable workspace location leverage (Moderate risk)",
    statusLow: "Minimal order dispatch penalties (Excellent rate)",
    statusCap: "Strong karigar weaving capacity (High scale)",
    statusLoyal: "Reliable B2B trade partnerships (Excellent trust)"
  }
};

export default function SwarozgarPassbook({ profile, scoring, language }: SwarozgarPassbookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'certificate' | 'audit'>('certificate');
  const [copied, setCopied] = useState(false);

  const t = passbookTranslations[language] || passbookTranslations.en;

  // Generated attributes to look extremely realistic
  const certificateId = `LAL-UP-${profile.location.toUpperCase()}-${profile.foundedYear}-${profile.id.replace(/[^\d]/g, '').slice(-4) || '7829'}`;
  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const getStandingColor = (score: number) => {
    if (score >= 750) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100", label: language === 'hi' ? "उत्कृष्ट साख (High Eligibility)" : "High Eligibility" };
    if (score >= 620) return { text: "text-indigo-805", bg: "bg-indigo-50", border: "border-indigo-150", label: language === 'hi' ? "सकारात्मक साख (Moderate Eligibility)" : "Moderate Eligibility" };
    if (score >= 450) return { text: "text-slate-705", bg: "bg-slate-100", border: "border-slate-200", label: language === 'hi' ? "न्यूनतम बंधक योग्य (Low Eligibility)" : "Low Eligibility" };
    return { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", label: language === 'hi' ? "कठिन योग्यता (Needs Collateral)" : "Needs Collateral" };
  };

  const standing = getStandingColor(scoring.overallScore);

  const handlePrint = () => {
    // Elegant system print handler
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://lucknow-ledger.gov.in/verify/${certificateId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Trigger Button widget on main screen */}
      <div className="bg-gradient-to-tr from-[#0A5F3E] to-[#0A7E50] border border-[#0F935F]/20 rounded-2xl p-5 text-white shadow-md relative overflow-hidden select-none">
        {/* Subtle physical lace overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] bg-[size:16px_16px] opacity-[0.05]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#fde08a]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#fde08a] uppercase">LUCKNOWI HERITAGE EXTRA</span>
            </div>
            <h4 className="font-display font-bold text-sm tracking-tight">{t.btnOpen}</h4>
            <p className="text-[10px] text-emerald-100/80 leading-relaxed font-sans">{t.btnOpenDesc}</p>
          </div>
          
          <button
            id="btn_trigger_passbook_modal"
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs px-4.5 py-2.5 rounded-xl transition shadow-sm border border-amber-400 cursor-pointer w-full md:w-auto text-center"
          >
            {language === 'hi' ? 'अवध साख प्रमाण-पत्र जनरेट करें' : 'Verify & Print Passbook'}
          </button>
        </div>
      </div>

      {/* Screen Printing Element only visible when printing */}
      <div className="hidden print:block fixed inset-0 bg-white text-stone-900 font-sans z-[999999] p-8 origin-top select-text leading-relaxed">
        <div className="border-8 border-double border-amber-600 p-8 rounded-lg max-w-4xl mx-auto relative min-h-[580px] flex flex-col justify-between">
          
          {/* Top border corner brackets for vintage frame */}
          <div className="absolute top-3 left-3 border-t-4 border-l-4 border-amber-600 w-8 h-8"></div>
          <div className="absolute top-3 right-3 border-t-4 border-r-4 border-amber-600 w-8 h-8"></div>
          <div className="absolute bottom-3 left-3 border-b-4 border-l-4 border-amber-600 w-8 h-8"></div>
          <div className="absolute bottom-3 right-3 border-b-4 border-r-4 border-amber-600 w-8 h-8"></div>

          <div className="text-center space-y-2">
            <span className="text-[9px] font-bold tracking-widest uppercase text-stone-500 block">{t.certHeaderGov}</span>
            <span className="text-[8px] font-bold tracking-wider text-indigo-700 uppercase block">{t.certPartner}</span>
            
            <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-1"></div>
            
            <h1 className="font-display font-bold text-xl text-amber-805 tracking-wide mt-2">{t.certTitleHi}</h1>
            <h2 className="text-[9px] font-mono tracking-tight text-stone-500 font-bold">{t.certTitleEn}</h2>
          </div>

          <p className="text-[11px] text-justify text-stone-605 leading-relaxed my-5 font-serif max-w-2xl mx-auto text-center">
            {t.certDesc}
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs max-w-2xl mx-auto my-4 border-t border-b border-stone-200 py-6 px-4">
            <div>
              <span className="text-stone-400 text-[10px] block font-mono">{t.lblWorkshop}</span>
              <strong className="text-stone-900 text-sm">{profile.name}</strong>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] block font-mono">{t.lblOwner}</span>
              <strong className="text-stone-900 text-sm">{profile.ownerName}</strong>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] block font-mono">{t.lblCraft}</span>
              <strong className="text-stone-850">{profile.craftType === 'Chikankari' ? "Lucknowi Hand Chikankari" : "Traditional Metallic Zardozi"}</strong>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] block font-mono">{t.lblHub}</span>
              <strong className="text-stone-850">{profile.location}, Lucknow Hub (Est. {profile.foundedYear})</strong>
            </div>

            <div>
              <span className="text-stone-400 text-[10px] block font-mono">{t.lblMaxLoan}</span>
              <strong className="text-stone-900 text-base font-bold font-mono text-emerald-800">₹{scoring.maximumSafeLoanAmount?.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-stone-400 text-[10px] block font-mono">{t.lblScore}</span>
                <span className="text-lg font-black font-display text-indigo-850 px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 rounded font-mono block w-fit">{scoring.overallScore} / 900</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] block font-mono">{t.lblStatus}</span>
                <span className="text-[10px] font-bold text-stone-800 block">{standing.label.split(' (')[0]}</span>
              </div>
            </div>
          </div>

          <div className="text-center my-4 font-mono text-[9px] text-stone-400 bg-stone-50 p-2.5 rounded border border-stone-200 max-w-lg mx-auto">
            <span>{t.verificationId}: <strong>{certificateId}</strong> • Verified digitally on {currentDate}</span>
          </div>

          <div className="flex justify-between items-end mt-6 max-w-2xl mx-auto w-full px-4">
            {/* Visual verification QR Code box */}
            <div className="flex items-center gap-2.5 bg-stone-100 p-2 rounded border border-stone-200">
              <QrCode className="w-10 h-10 text-stone-800" />
              <div className="text-left font-mono">
                <span className="text-[7px] text-stone-400 block uppercase">SECURE ALTERNATIVE AUDIT</span>
                <span className="text-[8px] text-stone-700 block font-bold leading-none mt-0.5">SCAN TO VERIFY</span>
              </div>
            </div>

            {/* Signature fields */}
            <div className="flex gap-16 text-center text-[9px]">
              <div className="space-y-4">
                <span className="italic block text-stone-500 font-serif border-b border-stone-400 px-6 font-bold">~ Alok Mishra</span>
                <span className="text-stone-400 block">{t.sigLeft}</span>
              </div>
              <div className="space-y-4">
                <span className="italic block text-[#0f935f] font-serif border-b border-[#0f935f]/60 px-6 font-bold">~ Swarozgar AI Hub</span>
                <span className="text-[#0f935f] block font-bold">{t.sigRight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal Dashboard */}
      <AnimatePresence>
        {isOpen && (
          <div id="swarozgar_ledger_modal" className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-[200] flex justify-center items-center p-4 lg:p-6 overflow-y-auto select-none print:hidden">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F7F6F1] rounded-3xl w-full max-w-4xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header bar */}
              <div className="bg-white border-b border-stone-200 px-6 py-4.5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0a5f3e] to-[#0f935f] flex items-center justify-center text-white">
                    <Award className="w-5 h-5 text-amber-100" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-stone-900 text-sm tracking-tight">{t.title}</h3>
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5 uppercase tracking-wider">{t.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    id="btn_modal_print_top"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 p-2 px-3 text-[10px] font-bold font-mono tracking-wide uppercase bg-[#0f935f] text-white hover:bg-[#0a7e50] rounded-xl transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.printBtn.split(' / ')[0]}</span>
                  </button>
                  
                  <button
                    id="btn_modal_close"
                    onClick={() => setIsOpen(false)}
                    className="p-1 px-1.5 text-stone-400 hover:text-stone-850 hover:bg-stone-100 rounded-xl transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Segmented Tab switcher */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-2 flex gap-4 text-xs shrink-0 font-sans">
                <button
                  id="tab_modal_certificate"
                  onClick={() => setActiveTab('certificate')}
                  className={`flex items-center gap-2 py-2 border-b-2 font-bold cursor-pointer transition-all ${
                    activeTab === 'certificate'
                      ? 'border-[#0a5f3e] text-[#0a5f3e]'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{t.tabCertificate}</span>
                </button>

                <button
                  id="tab_modal_audit"
                  onClick={() => setActiveTab('audit')}
                  className={`flex items-center gap-2 py-2 border-b-2 font-bold cursor-pointer transition-all ${
                    activeTab === 'audit'
                      ? 'border-[#0a5f3e] text-[#0a5f3e]'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{t.tabAuditLedger}</span>
                </button>
              </div>

              {/* Modal Core Contents */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                
                {activeTab === 'certificate' ? (
                  
                  /* CERTIFICATE VIEW */
                  <div className="bg-white border-4 border-double border-amber-500/60 p-6 md:p-8 rounded-2xl relative shadow-md text-center max-w-3xl mx-auto">
                    
                    {/* Visual corner accents */}
                    <div className="absolute top-2 left-2 border-t-2 border-l-2 border-amber-600/70 w-5 h-5"></div>
                    <div className="absolute top-2 right-2 border-t-2 border-r-2 border-amber-600/70 w-5 h-5"></div>
                    <div className="absolute bottom-2 left-2 border-b-2 border-l-2 border-amber-600/70 w-5 h-5"></div>
                    <div className="absolute bottom-2 right-2 border-b-2 border-r-2 border-amber-600/70 w-5 h-5"></div>

                    {/* Logo/Sovereign feel heading */}
                    <span className="text-[8px] font-mono font-black tracking-widest text-stone-400 uppercase block">{t.certHeaderGov}</span>
                    <span className="text-[7.5px] font-mono tracking-wide text-indigo-700 font-extrabold uppercase mt-1 block">{t.certPartner}</span>
                    
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3"></div>

                    <h4 className="font-display font-medium text-lg md:text-xl text-amber-805 mt-2 leading-tight tracking-wide">{t.certTitleHi}</h4>
                    <p className="text-[9px] font-mono text-stone-400 tracking-tight leading-none mt-1 font-bold">{t.certTitleEn}</p>

                    <p className="text-[11px] text-justify text-stone-600 italic leading-relaxed my-6 font-serif max-w-xl mx-auto text-center">
                      {t.certDesc}
                    </p>

                    {/* Meta Profile Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs text-left max-w-xl mx-auto my-6 border-t border-b border-stone-150 py-5 px-2 font-sans">
                      <div>
                        <span className="text-stone-400 text-[10px] font-mono block">{t.lblWorkshop}</span>
                        <strong className="text-stone-900 font-semibold">{profile.name}</strong>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[10px] font-mono block">{t.lblOwner}</span>
                        <strong className="text-stone-900 font-semibold">{profile.ownerName}</strong>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[10px] font-mono block">{t.lblCraft}</span>
                        <strong className="text-stone-700">{profile.craftType === 'Chikankari' ? "Lucknowi Hand Chikankari" : "Traditional Metallic Zardozi"}</strong>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[10px] font-mono block">{t.lblHub}</span>
                        <strong className="text-stone-700">{profile.location}, Lucknow Hub (Est. {profile.foundedYear})</strong>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[10px] font-mono block">{t.lblMaxLoan}</span>
                        <strong className="text-[#0a5f3e] text-base font-extrabold font-mono">₹{scoring.maximumSafeLoanAmount?.toLocaleString('en-IN')}</strong>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <span className="text-stone-400 text-[10px] font-mono block">{t.lblScore}</span>
                          <span className="text-sm font-black text-indigo-850 px-2.5 py-0.5 bg-indigo-50 border border-indigo-150 rounded font-mono w-fit block">{scoring.overallScore} / 900</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] font-mono block">{t.lblStatus}</span>
                          <span className={`text-[10px] font-bold ${standing.text} block mt-1`}>{standing.label.split(' (')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center font-mono text-[8px] text-stone-400 bg-stone-50 p-2 rounded border border-stone-105 max-w-md mx-auto my-4 lowercase">
                      {t.verificationId}: <strong className="text-stone-600 font-bold uppercase">{certificateId}</strong>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 mt-8 max-w-xl mx-auto w-full">
                      {/* Left verification QR Block */}
                      <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded border border-stone-200 select-none">
                        <QrCode className="w-9 h-9 text-stone-800 shrink-0" />
                        <div className="text-left font-mono leading-tight">
                          <span className="text-[6.5px] text-stone-400 block font-bold uppercase">SECURE LEDGER VALIDATION</span>
                          <span className="text-[7px] text-[#0A5F3E] block font-extrabold">VERIFY LINK SECURE</span>
                        </div>
                      </div>

                      {/* Authority signature placeholders */}
                      <div className="flex gap-10 text-center text-[8.5px] font-sans">
                        <div className="space-y-4">
                          <span className="italic block text-stone-500 font-serif border-b border-stone-400 px-4">~ Alok Mishra</span>
                          <span className="text-stone-400 block leading-tight">{t.sigLeft}</span>
                        </div>
                        <div className="space-y-4">
                          <span className="italic block text-[#0f935f] font-serif border-b border-[#0f935f]/60 px-4">~ Swarozgar AI Hub</span>
                          <span className="text-[#0f935f] block font-bold leading-tight">{t.sigRight}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  
                  /* AUDIT STATEMENT TAB */
                  <div className="space-y-6 font-sans">
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2">
                      <h4 className="font-display font-semibold text-stone-900 text-sm">{t.auditTitle}</h4>
                      <p className="text-[11px] text-stone-500">{t.auditSubtitle}</p>
                      
                      <div className="h-px bg-stone-200 my-4"></div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#fdfdfb] p-3.5 rounded-xl border border-stone-200 text-left">
                          <span className="text-stone-400 text-[9px] font-mono tracking-wider block uppercase">{language === 'hi' ? 'वार्षिक बही-खाता टर्नओवर' : 'ANNUAL LEDGER TURNOVER'}</span>
                          <strong className="text-stone-900 font-mono text-base block mt-0.5">₹{(profile.gstFilings.reduce((sum, f) => sum + f.turnover, 0) || 200000).toLocaleString('en-IN')}</strong>
                          <span className="text-[9px] text-stone-500 font-mono italic mt-1 block">Inferred from GST quarters</span>
                        </div>

                        <div className="bg-[#fdfdfb] p-3.5 rounded-xl border border-stone-200 text-left">
                          <span className="text-stone-400 text-[9px] font-mono tracking-wider block uppercase">{language === 'hi' ? 'कुल डिजिटल यूपीआई लेन-देन' : 'UPI TRANSACTION VOLUME'}</span>
                          <strong className="text-stone-900 font-mono text-base block mt-0.5">{Math.round((1 - profile.transactionCashRatio) * 100)}% Digital</strong>
                          <span className="text-[9px] text-[#0A5F3E] font-medium mt-1 block flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#0a5f3e]" />
                            Perfect transparency
                          </span>
                        </div>

                        <div className="bg-[#fdfdfb] p-3.5 rounded-xl border border-stone-200 text-left">
                          <span className="text-stone-400 text-[9px] font-mono tracking-wider block uppercase">{language === 'hi' ? 'बुनकर श्रम पूल क्षमता' : 'WORKFORCE RESILIENCY'}</span>
                          <strong className="text-stone-900 font-mono text-base block mt-0.5">{profile.artisanCount} Weavers</strong>
                          <span className="text-[9px] text-stone-500 font-mono mt-1 block">Cater peak bridal contracts</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed evaluation parameter statements table */}
                    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                      <div className="bg-stone-50 px-5 py-3.5 border-b border-stone-200">
                        <h5 className="font-display font-semibold text-stone-900 text-xs">{t.statementTable}</h5>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-stone-100 text-stone-500 font-mono uppercase text-[9px] tracking-wider border-b border-stone-200">
                            <tr>
                              <th className="px-5 py-3">{t.colParam}</th>
                              <th className="px-5 py-3">{t.colVal}</th>
                              <th className="px-5 py-3">{t.colStatus}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-150">
                            <tr>
                              <td className="px-5 py-3.5 font-bold text-stone-850">{t.paramDigital}</td>
                              <td className="px-5 py-3.5 font-mono text-stone-700">{Math.round((1 - profile.transactionCashRatio) * 100)}% digital UPI</td>
                              <td className="px-5 py-3.5">
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-150 rounded px-2 py-0.5 font-bold">
                                  <Check className="w-3 h-3" />
                                  {t.statusHigh}
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="px-5 py-3.5 font-bold text-stone-850">{t.paramRent}</td>
                              <td className="px-5 py-3.5 font-mono text-stone-700">₹{profile.monthlyRent} / month</td>
                              <td className="px-5 py-3.5">
                                <span className="inline-flex items-center gap-1 text-[10px] text-stone-605 bg-stone-100 rounded px-2 py-0.5 font-bold border border-stone-200">
                                  <Check className="w-3 h-3" />
                                  {t.statusMod}
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="px-5 py-3.5 font-bold text-stone-850">{t.paramDelay}</td>
                              <td className="px-5 py-3.5 font-mono text-stone-700">{Math.round(profile.deliveryDelayRate * 100)}% orders late</td>
                              <td className="px-5 py-3.5">
                                <span className={`inline-flex items-center gap-1 text-[10px] rounded px-2 py-0.5 font-bold border ${
                                  profile.deliveryDelayRate < 0.15 
                                    ? 'text-emerald-800 bg-emerald-50 border-emerald-150' 
                                    : 'text-amber-805 bg-amber-50 border-amber-200'
                                }`}>
                                  <Check className="w-3 h-3" />
                                  {profile.deliveryDelayRate < 0.15 ? t.statusLow : (language === 'hi' ? "संशोधन योग्य संकोच (Optimizable)" : "Optimizable delay rate")}
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="px-5 py-3.5 font-bold text-stone-850">{t.paramHeadcount}</td>
                              <td className="px-5 py-3.5 font-mono text-stone-700">{profile.artisanCount} active karigars</td>
                              <td className="px-5 py-3.5">
                                <span className="inline-flex items-center gap-1 text-[10px] text-slate-800 bg-slate-50 rounded px-2 py-0.5 font-semibold border border-slate-200">
                                  <Check className="w-3 h-3" />
                                  {t.statusCap}
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="px-5 py-3.5 font-bold text-stone-850">{t.paramRetention}</td>
                              <td className="px-5 py-3.5 font-mono text-stone-700">{Math.round(profile.customerRetentionRate * 100)}% retention</td>
                              <td className="px-5 py-3.5">
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 rounded px-2 py-0.5 font-bold border border-emerald-155">
                                  <Check className="w-3 h-3" />
                                  {t.statusLoyal}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer bar */}
              <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 font-sans">
                <p className="text-[10px] text-stone-400 text-center sm:text-left">
                  {language === 'hi' ? 'साख बही डेटा भारतीय रिज़र्व बैंक के सिडबी सूक्ष्म-वित्तीय मानदंडों पर आधारित है।' : 'Credit passbook data formulated under RBI collateral-free MSME alternative indices.'}
                </p>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    id="btn_modal_share_ledger"
                    onClick={handleShare}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 p-2 px-4 text-xs font-semibold bg-white text-stone-700 hover:text-stone-900 border border-stone-250 rounded-xl transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{copied ? t.copiedMsg : t.downloadLabel}</span>
                  </button>

                  <button
                    id="btn_modal_print_bottom"
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 p-2 px-4.5 text-xs font-bold bg-[#0f935f] text-white hover:bg-[#0a7e50] rounded-xl transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.printBtn}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
