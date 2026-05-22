import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Layers, Store, Search, Users, Sliders, UserCheck, 
  Briefcase, Plus, FileText, Sparkles, TrendingUp, IndianRupee, HelpCircle, AlertCircle, Building2, MapPin,
  LogIn, LogOut, X, Lock
} from 'lucide-react';
import { mockArtisans } from './data/mockArtisans';
import { MSMEProfile, CreditAnalysisResponse } from './types';
import ScoreGauge from './components/ScoreGauge';
import MSMEForm from './components/MSMEForm';
import ArtisanDetail from './components/ArtisanDetail';
import AIStressTester from './components/AIStressTester';
import AICopilot from './components/AICopilot';
import { Language, translations } from './utils/translations';
import VoiceAssistant from './components/VoiceAssistant';

const loginTranslations = {
  en: {
    signIn: "Sign In / Sign Up",
    signOut: "Sign Out",
    welcome: "Welcome",
    roleWeaver: "Artisan / Weaver",
    roleBanker: "Bank Credit Officer",
    loginAsTitle: "Sign In - Lucknow Artisan Ledger",
    selectArtisanPrompt: "Select registered workshop:",
    orRegisterNew: "Or Register a new workshop to login:",
    workshopName: "Workshop Name",
    ownerName: "Your Full Name",
    location: "Location",
    speciality: "Speciality Specialty",
    loginAsBankerPrompt: "Enter Credit executive credentials:",
    bankerName: "Bank Officer Name",
    pinCode: "Authorization Code (Simulated PIN: 1234)",
    invalidPin: "Invalid PIN. Please use 1234 for simulation.",
    cancel: "Cancel",
    confirmSignIn: "Confirm Sign In",
    authorizedAs: "Authorized as",
    badgeWeaver: "Master Weaver",
    badgeBanker: "SIDBI Chief Officer"
  },
  hi: {
    signIn: "लॉगिन / नया पंजीकरण",
    signOut: "लॉगआउट",
    welcome: "नमस्ते",
    roleWeaver: "कारीगर / बुनकर",
    roleBanker: "बैंकर्स ऋण अधिकारी",
    loginAsTitle: "लॉगिन - लखनऊ हस्तशिल्प ऋण बही",
    selectArtisanPrompt: "पंजीकृत कार्यशाला का चयन करें:",
    orRegisterNew: "या लॉगिन करने के लिए नया कारखाना पंजीकृत करें:",
    workshopName: "कार्यशाला का नाम",
    ownerName: "आपका पूरा नाम",
    location: "मूल स्थान",
    speciality: "शिल्प विधा",
    loginAsBankerPrompt: "ऋण अधिकारी क्रेडेंशियल्स दर्ज करें:",
    bankerName: "बैंक अधिकारी का नाम",
    pinCode: "प्राधिकरण कोड (सिम्युलेटेड पिन: 1234)",
    invalidPin: "अमान्य पिन। कृपया सिमुलेशन के लिए 1234 का उपयोग करें।",
    cancel: "रद्द करें",
    confirmSignIn: "लॉगिन की पुष्टि करें",
    authorizedAs: "प्राधिकृत सदस्य",
    badgeWeaver: "मास्टर कारीगर",
    badgeBanker: "सिडबी मुख्य अधिकारी"
  },
  hinglish: {
    signIn: "Login / Register",
    signOut: "Logout",
    welcome: "Welcome",
    roleWeaver: "Karigar / Weaver",
    roleBanker: "Bank Credit Officer",
    loginAsTitle: "Session Login - Lucknow Artisan Ledger",
    selectArtisanPrompt: "Registered workshop select karein:",
    orRegisterNew: "Ya login ke liye naya karkhana register karein:",
    workshopName: "Workshop ka Naam",
    ownerName: "Aapka Full Name",
    location: "Area Location",
    speciality: "Speciality Specialty",
    loginAsBankerPrompt: "Banker credentials fill karein:",
    bankerName: "Bank Officer Name",
    pinCode: "Auth Code (Use simulated PIN: 1234)",
    invalidPin: "Galat PIN. Simulation ke liye 1234 use karein.",
    cancel: "Cancel",
    confirmSignIn: "Confirm Login",
    authorizedAs: "Authorized profile",
    badgeWeaver: "Master Weaver",
    badgeBanker: "SIDBI Executive Team"
  }
};

export default function App() {
  const [activePortal, setActivePortal] = useState<'artisan' | 'banker'>('artisan');
  const [language, setLanguage] = useState<Language>('en');
  const [artisans, setArtisans] = useState<MSMEProfile[]>([]);
  const [selectedArtisan, setSelectedArtisan] = useState<MSMEProfile | null>(null);
  
  // Scoring API states
  const [scoringResult, setScoringResult] = useState<CreditAnalysisResponse | null>(null);
  const [isScoringLoading, setIsScoringLoading] = useState(false);
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);

  // Banker view filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCraft, setFilterCraft] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');

  // Login Management State
  const [currentUser, setCurrentUser] = useState<{
    role: 'artisan' | 'banker';
    name: string;
    id?: string;
    bankName?: string;
  } | null>(null);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<'artisan' | 'banker'>('artisan');
  const [selectedArtisanIdForLogin, setSelectedArtisanIdForLogin] = useState<string>('');
  const [bankerLoginName, setBankerLoginName] = useState<string>('Alok Mishra');
  const [bankerPin, setBankerPin] = useState<string>('');
  const [bankerPinError, setBankerPinError] = useState<string>('');

  // Register state keys for custom workspace login
  const [newRegName, setNewRegName] = useState('');
  const [newRegOwner, setNewRegOwner] = useState('');
  const [newRegLocation, setNewRegLocation] = useState<'Chowk' | 'Aminabad' | 'Nakhas' | 'Hazratganj' | 'Kakori'>('Chowk');
  const [newRegCraft, setNewRegCraft] = useState<'Chikankari' | 'Zardozi'>('Chikankari');

  // Trigger loading initial artisans from server or mock database
  useEffect(() => {
    fetch('/api/artisans')
      .then(res => res.json())
      .then(data => {
        setArtisans(data);
        if (data.length > 0) {
          setSelectedArtisanIdForLogin(data[0].id);
        }
        
        // Check for persistent session
        const saved = localStorage.getItem('lucknow_artisan_user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setCurrentUser(parsed);
            if (parsed.role === 'banker') {
              setActivePortal('banker');
              if (data.length > 0) {
                triggerScoreAssessment(data[0]);
              }
            } else if (parsed.role === 'artisan' && parsed.id) {
              setActivePortal('artisan');
              const match = data.find((a: any) => a.id === parsed.id);
              if (match) {
                triggerScoreAssessment(match);
              } else if (data.length > 0) {
                triggerScoreAssessment(data[0]);
              }
            }
          } catch (e) {
            console.error("Failed to parse saved session on mount:", e);
            if (data.length > 0) {
              triggerScoreAssessment(data[0]);
            }
          }
        } else {
          if (data.length > 0) {
            triggerScoreAssessment(data[0]);
          }
        }
      })
      .catch(err => {
        console.error("Failed to fetch initial artisans, utilizing static mock data:", err);
        setArtisans(mockArtisans);
        setSelectedArtisanIdForLogin(mockArtisans[0].id);
        
        // Static boundary session parsing
        const saved = localStorage.getItem('lucknow_artisan_user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setCurrentUser(parsed);
            if (parsed.role === 'banker') {
              setActivePortal('banker');
              triggerScoreAssessment(mockArtisans[0]);
            } else if (parsed.role === 'artisan' && parsed.id) {
              setActivePortal('artisan');
              const match = mockArtisans.find(a => a.id === parsed.id);
              if (match) {
                triggerScoreAssessment(match);
              } else {
                triggerScoreAssessment(mockArtisans[0]);
              }
            }
          } catch (e) {
            triggerScoreAssessment(mockArtisans[0]);
          }
        } else {
          triggerScoreAssessment(mockArtisans[0]);
        }
      });
  }, []);

  // Send MSME details to server-side Gemini system score endpoint
  const triggerScoreAssessment = async (profile: Partial<MSMEProfile>) => {
    setIsScoringLoading(true);
    setAppliedSchemes([]);
    
    // Ensure appropriate values are assigned for calculation
    const completeProfile: MSMEProfile = {
      id: profile.id || "msme_temp",
      name: profile.name || "Unnamed Lakhnowi Crafts",
      ownerName: profile.ownerName || "Unspecified Karigar",
      email: profile.email || "contact@lucknowi.in",
      phone: profile.phone || "+91 99999 99999",
      location: profile.location || "Chowk",
      craftType: profile.craftType || "Chikankari",
      foundedYear: profile.foundedYear || 2020,
      artisanCount: profile.artisanCount || 5,
      monthlyRent: profile.monthlyRent || 4000,
      rawMaterialSource: profile.rawMaterialSource || "Local Aminabad weavers market",
      gstFilings: profile.gstFilings || [],
      orders: profile.orders || [],
      monthlySales: profile.monthlySales || [],
      transactionCashRatio: profile.transactionCashRatio !== undefined ? profile.transactionCashRatio : 0.45,
      deliveryDelayRate: profile.deliveryDelayRate !== undefined ? profile.deliveryDelayRate : 0.15,
      customerRetentionRate: profile.customerRetentionRate !== undefined ? profile.customerRetentionRate : 0.70,
      rawMaterialCostIncreaseBuffer: profile.rawMaterialCostIncreaseBuffer !== undefined ? profile.rawMaterialCostIncreaseBuffer : 0.20,
      loanRequirement: profile.loanRequirement || 200000,
      loanPurpose: profile.loanPurpose || "Upgrade workshop capabilities"
    };

    // Update active focus entity
    setSelectedArtisan(completeProfile);

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeProfile)
      });
      const scoreResult: CreditAnalysisResponse = await response.json();
      setScoringResult(scoreResult);
    } catch (e) {
      console.error("Fullstack credit scoring calculation failed:", e);
    } finally {
      setIsScoringLoading(false);
    }
  };

  // Submit custom weaver profile created via form
  const handleAddNewArtisanProfile = async (newProfile: Partial<MSMEProfile>) => {
    try {
      const response = await fetch('/api/artisans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
      if (response.ok) {
        const added: MSMEProfile = await response.json();
        setArtisans(prev => [added, ...prev]);
        triggerScoreAssessment(added);
      } else {
        triggerScoreAssessment(newProfile);
      }
    } catch (err) {
      console.error("Failed to persist newly created artisan profile, evaluating locally:", err);
      const offlineTempProfile: MSMEProfile = {
        id: `msme_off_${Date.now()}`,
        ...newProfile
      } as MSMEProfile;
      setArtisans(prev => [offlineTempProfile, ...prev]);
      triggerScoreAssessment(offlineTempProfile);
    }
  };

  // Quick profile select from sample bar
  const handleSelectSampleArtisan = (artisan: MSMEProfile) => {
    triggerScoreAssessment(artisan);
  };

  // Filter registry applicants
  const filteredArtisans = artisans.filter(art => {
    const matchesSearch = 
      art.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.phone.includes(searchQuery);
    
    const matchesCraft = filterCraft === 'All' || art.craftType === filterCraft;
    const matchesLocation = filterLocation === 'All' || art.location === filterLocation;

    return matchesSearch && matchesCraft && matchesLocation;
  });

  const handleUpdateArtisanParams = (updatedFields: Partial<MSMEProfile>) => {
    if (!selectedArtisan) return;
    const updated = { ...selectedArtisan, ...updatedFields };
    setSelectedArtisan(updated);
    
    // Synchronize within artisans state list so presets / selections don't reset
    setArtisans(prev => prev.map(art => art.id === updated.id ? { ...art, ...updatedFields } : art));
  };

  const handleResetFilters = () => {
    setFilterCraft('All');
    setFilterLocation('All');
    setSearchQuery('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBankerPinError('');

    if (loginRole === 'banker') {
      if (bankerPin !== '1234') {
        const err = language === 'hi' 
          ? 'अमान्य पिन। कृपया सिमुलेशन के लिए 1234 का उपयोग करें।' 
          : language === 'hinglish' 
            ? 'Galat PIN. Simulation ke liye 1234 use karein.' 
            : 'Invalid PIN. Please use 1234 for simulation.';
        setBankerPinError(err);
        return;
      }
      const userObj = {
        role: 'banker' as const,
        name: bankerLoginName,
        bankName: 'SIDBI Lucknow Branch'
      };
      setCurrentUser(userObj);
      localStorage.setItem('lucknow_artisan_user', JSON.stringify(userObj));
      setActivePortal('banker');
      setIsLoginModalOpen(false);
      setBankerPin('');
    } else {
      // Registering a custom workshop
      if (newRegName.trim() && newRegOwner.trim()) {
        const newArtID = `msme_reg_${Date.now()}`;
        const newProfile: MSMEProfile = {
          id: newArtID,
          name: newRegName,
          ownerName: newRegOwner,
          email: `${newRegOwner.toLowerCase().replace(/\s+/g, '')}@lucknowi.in`,
          phone: "+91 99999 00000",
          location: newRegLocation,
          craftType: newRegCraft,
          foundedYear: 2026,
          artisanCount: 5,
          monthlyRent: 4000,
          rawMaterialSource: language === 'hi' ? 'स्थानीय लखनऊ जरी मर्चेंट' : 'Local Aminabad weavers market',
          gstFilings: [
            { quarter: "Q1 - 2026", turnover: 120000, taxPaid: 6000, filingDate: "2026-04-10", status: "Filed-On-Time" }
          ],
          orders: [],
          monthlySales: [
            { month: "Mar 2026", amount: 45000 },
            { month: "Apr 2026", amount: 50000 },
            { month: "May 2026", amount: 55000 }
          ],
          transactionCashRatio: 0.40,
          deliveryDelayRate: 0.10,
          customerRetentionRate: 0.75,
          rawMaterialCostIncreaseBuffer: 0.15,
          loanRequirement: 150000,
          loanPurpose: language === 'hi' ? 'कार्यशाला को अपग्रेड करें और धागे खरीदें' : 'Upgrade workshop capabilities'
        };
        
        setArtisans(prev => [newProfile, ...prev]);
        setSelectedArtisan(newProfile);
        triggerScoreAssessment(newProfile);
        
        const userObj = {
          role: 'artisan' as const,
          name: newRegOwner,
          id: newArtID
        };
        setCurrentUser(userObj);
        localStorage.setItem('lucknow_artisan_user', JSON.stringify(userObj));
        setActivePortal('artisan');
        setIsLoginModalOpen(false);
        setNewRegName('');
        setNewRegOwner('');
      } else {
        // Select existing workshop
        const match = artisans.find(a => a.id === selectedArtisanIdForLogin);
        if (match) {
          const userObj = {
            role: 'artisan' as const,
            name: match.ownerName,
            id: match.id
          };
          setCurrentUser(userObj);
          localStorage.setItem('lucknow_artisan_user', JSON.stringify(userObj));
          setSelectedArtisan(match);
          triggerScoreAssessment(match);
          setActivePortal('artisan');
          setIsLoginModalOpen(false);
        }
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('lucknow_artisan_user');
  };

  const t = translations[language];

  return (
    <div id="app_root" className="min-h-screen bg-[#FAF9F6] text-stone-800 flex flex-col antialiased">
      
      {/* Prime Header Branding */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 px-4 lg:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-display font-medium text-lg shadow-sm border border-indigo-500">
              ल
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-indigo-700 block -mb-0.5">{t.projectSubtitle}</span>
              <h1 className="font-display font-bold text-stone-900 text-lg tracking-tight">{t.projectTitle}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
            {/* Language Selection Segmented Control */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                id="btn_lang_en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                EN
              </button>
              <button
                id="btn_lang_hi"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                हिंदी
              </button>
              <button
                id="btn_lang_hinglish"
                onClick={() => setLanguage('hinglish')}
                className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'hinglish'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* Perspective navigation slider (Banker vs Weaver portals) */}
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 relative">
              <button
                id="tab_portal_artisan"
                onClick={() => setActivePortal('artisan')}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 relative cursor-pointer ${
                  activePortal === 'artisan'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold border border-indigo-700'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                <Store className="w-3.5 h-3.5 shrink-0" />
                <span>{t.weaverPortal}</span>
                {activePortal === 'artisan' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                )}
              </button>
              <button
                id="tab_portal_banker"
                onClick={() => setActivePortal('banker')}
                className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 relative cursor-pointer ${
                  activePortal === 'banker'
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold border border-indigo-700'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>{t.bankerDashboard}</span>
                {activePortal === 'banker' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Login Account / Access control widget */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-150 p-1 rounded-xl shadow-2xs">
                <div className="flex flex-col items-start leading-[1.1] pl-2 pr-1.5">
                  <span className="text-[8px] font-mono font-extrabold text-indigo-700 uppercase tracking-widest">
                    {currentUser.role === 'banker' 
                      ? (language === 'hi' ? 'मुख्य बैंकर' : language === 'hinglish' ? 'SIDBI Officer' : 'SIDBI Officer')
                      : (language === 'hi' ? 'सत्यापित कारीगर' : language === 'hinglish' ? 'Master Weaver' : 'Master Weaver')}
                  </span>
                  <span className="text-[11px] font-bold text-stone-900 truncate max-w-[110px] mt-0.5">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  id="btn_logout_action"
                  onClick={handleLogout}
                  className="p-1 px-1.5 text-stone-400 hover:text-red-650 hover:bg-stone-150 rounded-lg transition cursor-pointer"
                  title={loginTranslations[language].signOut}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="btn_login_modal_trigger"
                onClick={() => {
                  setBankerPinError('');
                  setIsLoginModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-gradient-to-tr from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium text-xs px-3.5 py-2 rounded-xl transition shadow-xs border border-indigo-500 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>{loginTranslations[language].signIn}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        
        {currentUser && (
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between shadow-3xs animate-fade-in relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-605 flex items-center justify-center text-white font-semibold text-lg border border-indigo-500 shadow-sm shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-display font-bold text-stone-900 text-sm">
                  {language === 'hi' 
                    ? `प्रणाम, ${currentUser.name}! बही-खाते में आपका स्वागत है।` 
                    : language === 'hinglish'
                      ? `Pranam, ${currentUser.name}! Aapka portal active ho chuka hai.`
                      : `Pranam, ${currentUser.name}! Welcome back to your dashboard.`}
                </h3>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {currentUser.role === 'banker'
                    ? (language === 'hi' ? 'आप बैंकर्स लॉगिन मोड में हैं। संपूर्ण वैकल्पिक हामीदारी क्रेडेंशियल्स का उपयोग करें।' : language === 'hinglish' ? 'Aap SIDBI Banker mode me hain. Custom underwriting analysis active hai.' : 'You are authorized with SIDBI Banker credentials. Alternate credit assessment modules are fully unlocked.')
                    : (language === 'hi' ? 'आपका वैकल्पिक जोखिम प्रोफाइल सक्रिय है। आप अपनी कार्यशाला बही को संशोधित कर सकते हैं।' : language === 'hinglish' ? 'Aapka Alternate credit score active hai. Apne params adjust karke status check karein.' : 'Your alternate risk profile is active. Adjust your workshop parameters or upload files dynamically.')}
                </p>
              </div>
            </div>
            {currentUser.role === 'banker' ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-100/70 text-indigo-800 uppercase tracking-wider border border-indigo-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                {language === 'hi' ? 'सत्यापित बैंक अधिकारी' : 'SIDBI Underwriter'}
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider border border-emerald-250 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'hi' ? 'सक्रिय बही खता' : 'Active Ledger'}
              </span>
            )}
          </div>
        )}

        {/* Voice Command Assistant Desk */}
        <VoiceAssistant 
          language={language}
          onLanguageChange={setLanguage}
          activePortal={activePortal}
          onPortalChange={setActivePortal}
          selectedArtisan={selectedArtisan}
          onUpdateArtisanParams={handleUpdateArtisanParams}
          onTriggerCalculation={() => {
            if (selectedArtisan) {
              triggerScoreAssessment(selectedArtisan);
            }
          }}
          onResetFilters={handleResetFilters}
        />
        
        {/* Horizontal Artisan Preset Selector (IMMERSIVE INTERACTIVE PROFILES) */}
        <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs relative overflow-hidden">
          {/* subtle gold decorative banner */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
          
          <div className="flex items-center justify-between mb-3.5 pl-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-indigo-700">
                {t.interactiveTitle}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 font-mono hidden md:inline">{t.interactiveSubtitle}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockArtisans.map((art) => {
              const worksZardozi = art.craftType === 'Zardozi';
              const isSelected = selectedArtisan?.id === art.id;
              return (
                <button
                  key={art.id}
                  onClick={() => handleSelectSampleArtisan(art)}
                  className={`relative py-3.5 px-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer outline-none group ${
                    isSelected 
                      ? 'border-indigo-500 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500/30' 
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {/* Subtle active state badge */}
                  {isSelected && (
                    <span className="absolute top-3 right-3 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                  )}

                  {currentUser?.role === 'artisan' && currentUser.id === art.id && (
                    <span className="absolute top-2.5 right-6 text-[7px] font-mono font-extrabold bg-amber-50 text-amber-805 uppercase pb-0.5 px-1.5 rounded border border-amber-250 animate-pulse">
                      {language === 'hi' ? 'मेरा कारखाना' : language === 'hinglish' ? 'Mera Workshop' : 'My Workshop'}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                        worksZardozi 
                          ? 'bg-indigo-50 text-indigo-805 border border-indigo-205' 
                          : 'bg-indigo-100/50 text-indigo-800 border border-indigo-200'
                      }`}>
                        {art.craftType === 'Zardozi' ? t.goldThreadName.split(' ')[0] : t.handStitchName.split(' ')[0]}
                      </span>
                      <span className="text-[8px] font-mono text-stone-400 font-sans">{art.location}</span>
                    </div>

                    <div className="font-display font-semibold text-stone-900 text-xs truncate leading-normal mt-2 group-hover:text-indigo-600 transition-colors">
                      {art.name}
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-stone-200 flex justify-between items-center text-[10px] font-sans">
                    <span className="text-[9px] font-mono text-stone-400 uppercase">{t.karigarsCount}: <strong className="text-stone-700">{art.artisanCount}</strong></span>
                    <span className="text-[9px] font-mono font-bold text-indigo-850 bg-indigo-100 border border-indigo-200 px-1.5 py-0.2 rounded">
                      ₹{art.loanRequirement >= 100000 ? `${art.loanRequirement / 100000}${t.lakhs}` : art.loanRequirement}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dynamic Portal Body Content */}
        {activePortal === 'artisan' ? (
          
          // PORTAL 1: ARTISAN / WEAVER EVALUATOR PORTAL
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left side: Alternative Audit form inputs */}
              <div className="lg:col-span-7">
                <MSMEForm 
                  onSubmitScore={handleAddNewArtisanProfile} 
                  isLoading={isScoringLoading} 
                  language={language}
                  selectedArtisan={selectedArtisan}
                />
              </div>

              {/* Right side: Dynamic circular speedometer and credit report output */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Circular Gauge displaying score */}
                <ScoreGauge 
                  score={scoringResult?.scoring.overallScore || 300} 
                  rating={scoringResult?.scoring.recommendationRating || 'Needs Attention'} 
                  reason={scoringResult?.scoring.assessmentReason || 'Configure MSME Operational details on the left and tap Calculate to compute verified alternate risks.'} 
                  language={language}
                />

                {/* Dynamic recommendation score card */}
                {scoringResult && (
                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                      <h4 className="font-display font-semibold text-stone-900 text-sm">{t.decisionTitle}</h4>
                      <span className="text-[10px] font-mono text-stone-400">{t.decisionSub}</span>
                    </div>

                    <div className="space-y-3.5 text-xs font-sans">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">{t.suggestedSafeCapital}</span>
                        <strong className="text-stone-900 font-mono">₹{scoringResult.scoring.maximumSafeLoanAmount?.toLocaleString('en-IN') || '0'}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">{t.targetSize}</span>
                        <strong className="text-stone-900 font-mono">₹{selectedArtisan?.loanRequirement?.toLocaleString('en-IN') || '0'}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">{t.repaymentBuffer}</span>
                        <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">{t.repaymentHigh}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600">{t.auditCompliance}</span>
                        <span className="font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          {selectedArtisan && selectedArtisan.gstFilings.length > 0 
                            ? `${Math.round(selectedArtisan.gstFilings.filter(f => f.status === 'Filed-On-Time').length / selectedArtisan.gstFilings.length * 100)}% ${t.onTimeGst}` 
                            : (language === 'hi' ? 'कोई फ़ाइलिंग नहीं रिकॉर्ड' : 'No returns found')
                          }
                        </span>
                      </div>
                    </div>

                    {/* Quick-link help box on Lucknow crafts alternative scoring */}
                    <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-250 flex gap-2.5 items-start mt-2 font-sans">
                      <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-stone-600 leading-normal">
                        <strong>{t.howAltScoreWorks}</strong> {t.howAltScoreWorksDesc}
                      </p>
                    </div>
                  </div>
                )}

                {/* Matched Schemes link package */}
                {scoringResult && (
                  <div className="space-y-4 font-sans">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display font-semibold text-stone-900 text-sm">Targeted Government Schemes Linkage</h3>
                      <span className="text-[10px] text-emerald-700 font-semibold">{scoringResult.scoring.overallScore >= 620 ? "Pre-eligible matching active" : "Verify parameters to qualify"}</span>
                    </div>

                    <div className="space-y-4">
                      {scoringResult.recommendedSchemes.slice(0, 2).map((scheme, index) => (
                        <div key={index} className="bg-white border border-stone-200 rounded-xl p-4 relative overflow-hidden">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-[8px] font-mono text-stone-400 font-bold uppercase block">{scheme.agency}</span>
                              <h5 className="text-xs font-bold text-stone-900 font-display mt-0.5">{scheme.name}</h5>
                            </div>
                            <span className="text-[9px] font-mono text-indigo-805 bg-indigo-105 border border-indigo-250 px-2 py-0.5 rounded font-bold">
                              {scheme.matchScore}% match
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-605 leading-normal">{scheme.purpose}</p>
                          <p className="text-[10px] text-indigo-800 italic mt-2 border-l border-indigo-500/40 pl-2">
                            {scheme.relevanceExplanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* TWO UNIQUE AI FEATURES: COGNITIVE SCORE IMPROVEMENT PATHFINDER & ECONOMY REPAYMENT STRESS SIMULATOR */}
            {selectedArtisan && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-stone-200/60 mt-10">
                {/* Column 1: Copilot Pathfinder advising */}
                <div className="space-y-4">
                  <AICopilot 
                    profile={selectedArtisan} 
                    currentScore={scoringResult?.scoring.overallScore || 300} 
                    language={language}
                  />
                </div>
                
                {/* Column 2: Stress Tester simulating crises */}
                <div className="space-y-4">
                  <AIStressTester 
                    profile={selectedArtisan} 
                    language={language}
                  />
                </div>
              </div>
            )}
          </div>

        ) : (
          
          // PORTAL 2: BANKER / AGENCY REGISTRY PORTAL
          <div className="space-y-6">
            
            {/* Top Search & Filter Bar */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Search input keyword */}
              <div className="relative font-sans">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-200 focus:border-indigo-500 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 transition outline-none"
                  placeholder="Search by workshop or owner name..."
                />
              </div>

              {/* Craft Filter */}
              <div>
                <select 
                  value={filterCraft}
                  onChange={e => setFilterCraft(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 transition outline-none"
                >
                  <option value="All">All Craft Specialties</option>
                  <option value="Chikankari">Chikankari shadow embroidery</option>
                  <option value="Zardozi">Zardozi metallic gold threads</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <select 
                  value={filterLocation}
                  onChange={e => setFilterLocation(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 transition outline-none"
                >
                  <option value="All">All Locations</option>
                  <option value="Chowk">Chowk area</option>
                  <option value="Nakhas">Nakhas markets</option>
                  <option value="Aminabad">Aminabad district</option>
                  <option value="Kakori">Kakori clusters</option>
                  <option value="Hazratganj">Hazratganj boutiques</option>
                </select>
              </div>

              {/* Eligibility Indicator */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilterCraft('All');
                    setFilterLocation('All');
                    setSearchQuery('');
                  }}
                  className="w-full bg-stone-100 hover:bg-stone-200 border border-stone-200/50 text-stone-800 font-semibold py-2.5 rounded-xl transition text-xs cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            </div>

            {/* Split Screen Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
              
              {/* Left Column list of registrars */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-display font-semibold text-stone-900 text-sm">
                    Verified Craft Workshops List ({filteredArtisans.length})
                  </h3>
                  <span className="text-[10px] text-stone-400 font-mono">Select to deep audit</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {filteredArtisans.length === 0 ? (
                    <div className="bg-white border border-stone-200 rounded-xl p-8 text-center text-xs text-stone-500">
                      No registered Lucknow handicraft workshops match these search terms.
                    </div>
                  ) : (
                    filteredArtisans.map((art) => {
                      const isTarget = selectedArtisan?.id === art.id;
                      // estimate alternate score
                      const onTimeGST = art.gstFilings.filter(f => f.status === 'Filed-On-Time').length;
                      const hasGoodIntegrity = onTimeGST >= 3 && art.transactionCashRatio < 0.5;
                      
                      return (
                        <div 
                           id={`banker_artisan_card_${art.id}`}
                           key={art.id}
                           onClick={() => triggerScoreAssessment(art)}
                           className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isTarget 
                              ? 'bg-indigo-50/50 border-indigo-500 ring-1 ring-indigo-500/20 shadow-xs' 
                              : 'bg-white border-stone-200 hover:bg-stone-50/50 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-stone-400">{art.craftType} • {art.location}</span>
                              <h4 className="font-display font-semibold text-stone-900 text-xs mt-0.5">{art.name}</h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              hasGoodIntegrity ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' : 'bg-stone-100 text-stone-750 border border-stone-200'
                            }`}>
                              {hasGoodIntegrity ? 'High Audited' : 'Cash Reliant'}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-200 text-[10px] font-sans">
                            <div>
                              <span className="text-stone-450 block uppercase font-mono text-[8px]">Associated Karigars</span>
                              <strong className="text-stone-750">{art.artisanCount} helpers</strong>
                            </div>
                            <div>
                              <span className="text-stone-450 block uppercase font-mono text-[8px]">Target Capital</span>
                              <strong className="text-stone-750">₹{art.loanRequirement / 100000} Lakhs</strong>
                            </div>
                            <div>
                              <span className="text-stone-450 block uppercase font-mono text-[8px]">Rent overhead</span>
                              <strong className="text-stone-750 font-mono">₹{art.monthlyRent}/m</strong>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Deep-dive Analytical profile workspace */}
              <div className="lg:col-span-7">
                {selectedArtisan ? (
                  <ArtisanDetail 
                    profile={selectedArtisan} 
                    analysis={scoringResult} 
                    language={language}
                  />
                ) : (
                  <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-64">
                    <UserCheck className="w-10 h-10 text-stone-300 mb-3" />
                    <h4 className="font-display font-medium text-stone-900 text-sm">Select an Artisan Portfolio applicant</h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed font-sans">
                      Click on any registered Lucknow craft workshop in the left registry panel to pull up their complete 12-month sales charts, digital trans indicators, risk mitigators, and matched schemes.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Decorative footer with Lucknowi design cues */}
      <footer className="bg-white border-t border-stone-200 mt-16 px-4 lg:px-8 py-6 text-center text-stone-500 text-xs shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left font-sans">
            <p className="font-semibold text-stone-850 text-xs">Lucknow Artisan Credit Ledger</p>
            <p className="text-[11px] text-stone-450 mt-0.5">Empowering Lucknow's historic shadow-work Chikankari weavers and Royal gold-thread Zardozi karigars.</p>
          </div>
          <p className="text-[10px] text-stone-400 font-mono">
            Alternate underwriting protocol • local date: 2026-05-22 UTC
          </p>
        </div>
      </footer>

      {/* Login Modal Overlay */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-scale-up font-sans">
            
            {/* Header */}
            <div className="bg-indigo-650 px-6 py-5 text-white relative">
              <button 
                id="btn_close_login_modal"
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer border-none outline-none"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-200" />
                <h3 className="font-display font-medium text-sm tracking-tight">
                  {loginTranslations[language].loginAsTitle}
                </h3>
              </div>
              <p className="text-[10px] text-white/70 mt-1 leading-normal">
                {language === 'hi' ? 'अपनी भूमिका चुनें और डिजिटल क्रेडेंशियल्स दर्ज करें' : 'Select your profile and authenticate to customize variables and verify MSME status.'}
              </p>
            </div>

            {/* Selector Segment Tabs */}
            <div className="p-6 pb-4">
              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 mb-4 relative">
                <button
                  type="button"
                  onClick={() => setLoginRole('artisan')}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    loginRole === 'artisan'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{loginTranslations[language].roleWeaver}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole('banker');
                    setBankerPinError('');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    loginRole === 'banker'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{loginTranslations[language].roleBanker}</span>
                </button>
              </div>

              {/* Form Body fields */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginRole === 'artisan' ? (
                  <div className="space-y-4 text-left">
                    {/* Select Existing profile */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wide font-extrabold text-stone-500 block">
                        {loginTranslations[language].selectArtisanPrompt}
                      </label>
                      <select
                        value={selectedArtisanIdForLogin}
                        onChange={(e) => {
                          setSelectedArtisanIdForLogin(e.target.value);
                          setNewRegName('');
                          setNewRegOwner('');
                        }}
                        className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 outline-none focus:bg-white focus:border-indigo-500 transition cursor-pointer"
                      >
                        {artisans.map(art => (
                          <option key={art.id} value={art.id}>
                            {art.name} ({art.ownerName})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Divider visual */}
                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-stone-200"></div>
                      <span className="flex-shrink mx-3 text-[9px] font-mono text-stone-400 font-extrabold uppercase">
                        {language === 'hi' ? 'अथवा नया' : 'OR REGISTER'}
                      </span>
                      <div className="flex-grow border-t border-stone-200"></div>
                    </div>

                    {/* Quick Register direct Inputs */}
                    <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-200/60 space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-stone-600 block">
                        {loginTranslations[language].orRegisterNew}
                      </span>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-stone-500 font-medium">
                          {loginTranslations[language].workshopName}
                        </label>
                        <input
                          type="text"
                          value={newRegName}
                          onChange={(e) => {
                            setNewRegName(e.target.value);
                            setSelectedArtisanIdForLogin('');
                          }}
                          className="w-full bg-white border border-stone-250 focus:border-indigo-500 rounded-lg px-2.5 py-2 text-xs text-stone-850 outline-none transition"
                          placeholder={language === 'hi' ? 'जैसे: अवध चिकनकारी केंद्र' : "e.g. Awadh Chikankari Center"}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-stone-500 font-medium">
                          {loginTranslations[language].ownerName}
                        </label>
                        <input
                          type="text"
                          value={newRegOwner}
                          onChange={(e) => {
                            setNewRegOwner(e.target.value);
                            setSelectedArtisanIdForLogin('');
                          }}
                          className="w-full bg-white border border-stone-250 focus:border-indigo-500 rounded-lg px-2.5 py-2 text-xs text-stone-850 outline-none transition"
                          placeholder={language === 'hi' ? 'जैसे: शबाना बेगम' : "e.g. Shabana Begum"}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] text-stone-550 font-medium block mb-1">
                            {loginTranslations[language].location}
                          </label>
                          <select
                            value={newRegLocation}
                            onChange={(e: any) => setNewRegLocation(e.target.value)}
                            className="w-full bg-white border border-stone-250 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-indigo-500 cursor-pointer"
                          >
                            <option value="Chowk">Chowk</option>
                            <option value="Aminabad">Aminabad</option>
                            <option value="Nakhas">Nakhas</option>
                            <option value="Hazratganj">Hazratganj</option>
                            <option value="Kakori">Kakori</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-stone-550 font-medium block mb-1">
                            {loginTranslations[language].speciality}
                          </label>
                          <select
                            value={newRegCraft}
                            onChange={(e: any) => setNewRegCraft(e.target.value)}
                            className="w-full bg-white border border-stone-250 rounded-lg px-2 py-1.5 text-xs outline-none focus:border-indigo-500 cursor-pointer"
                          >
                            <option value="Chikankari">Chikankari</option>
                            <option value="Zardozi">Zardozi</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-left">
                    {/* Banker name select */}
                    <div className="space-y-1 focus-within:text-indigo-600">
                      <label className="text-[10px] uppercase font-mono tracking-wide font-extrabold text-stone-500 block">
                        {loginTranslations[language].bankerName}
                      </label>
                      <select
                        value={bankerLoginName}
                        onChange={(e) => setBankerLoginName(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl px-3 py-2.5 text-xs text-stone-800 outline-none focus:bg-white focus:border-indigo-500 transition cursor-pointer"
                      >
                        <option value="Alok Mishra">Alok Mishra (SIDBI Chief Credit Officer)</option>
                        <option value="Preeti Saxena">Preeti Saxena (Senior Supervisor)</option>
                        <option value="Rahul Verma">Rahul Verma (SIDBI Assistant Manager)</option>
                      </select>
                    </div>

                    {/* Pin Input simulation code */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wide font-extrabold text-stone-500 block">
                        {loginTranslations[language].pinCode}
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={bankerPin}
                        onChange={(e) => {
                          setBankerPinError('');
                          setBankerPin(e.target.value.replace(/\D/g, ''));
                        }}
                        className="w-full bg-[#FAF9F6] border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-800 outline-none focus:bg-white focus:border-indigo-500 transition font-mono tracking-widest text-center"
                        placeholder="••••"
                      />
                      {bankerPinError && (
                        <p className="text-[10px] text-red-650 font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          {bankerPinError}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Confirm Sign-In Action button bar */}
                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 rounded-xl transition text-xs cursor-pointer text-center"
                  >
                    {loginTranslations[language].cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-750 text-white font-semibold py-2 rounded-xl shadow-xs transition text-xs cursor-pointer text-center"
                  >
                    {loginTranslations[language].confirmSignIn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
