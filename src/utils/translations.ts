export type Language = 'en' | 'hi' | 'hinglish';

export const translations = {
  en: {
    // Header
    projectSubtitle: "Lucknow Alternative Scorecard",
    projectTitle: "Lucknow Artisan Credit Ledger",
    weaverPortal: "Weaver Portal",
    bankerDashboard: "Banker Dashboard",
    
    // Preset Card Selection
    interactiveTitle: "Interactive Audited Masterworks",
    interactiveSubtitle: "Select specialized profiles to instantly evaluate alternate risk metrics",
    karigarsCount: "Karigars",
    lakhs: "L",
    
    // Form Headings
    businessContextTitle: "Artisan Business Context",
    businessContextSubtitle: "Provide alternative metrics to verify workshops and assess risk eligibility.",
    coreIdentity: "Core Workshop Identity",
    
    // Form Labels
    workshopName: "Workshop / MSME Name",
    ownerName: "Lead Artisan / Owner Name",
    emailAccess: "Email Access",
    primaryPhone: "Primary Phone",
    craftSpecialty: "Primary Craft Specialty",
    goldThreadName: "Zardozi (Gold Threads)",
    handStitchName: "Chikankari (Hand stitches)",
    hubLocation: "Lucknowi Hub Location",
    yearEstablished: "Year Established",
    monthlyOverhead: "Monthly Workspace Overhead (Rent in ₹)",
    
    // Alternative parameters
    alternativeParametersTitle: "Alternative Risk parameters (UPI volume, delivery delays)",
    cashTransRatio: "Cash Transaction Ratio",
    cashRatioDesc: "Banks prefer auditable, digital-tracked sales ledger details (UPI/Bank transfers) indicating transparent high income.",
    deliveryDelayRate: "Order Delivery Delay Rate",
    delayRateDesc: "Shipment promptness indicates workspace stability and high operational integrity index inside Lucknow clusters.",
    helpersHeadcount: "Artisans & Helpers Headcount",
    helpersDesc: "Higher headcount minimizes singular-weaver risk in bridal season bottleneck situations.",
    repeatCustomer: "Customer B2B Retention",
    repeatCustomerDesc: "Loyal boutiques and agency retention indicators represent stable pipeline demand patterns.",
    
    // GST Section
    gstTitle: "Verifiable GST Returns Portal Ingestion (Optional)",
    gstDesc: "Upload or select sample GST filing worksheets. The smart parsing engine extracts alternative turnovers and timely submittals instantly to fill out alternative ledger statements.",
    gstInferred: "Underwriting ledger populated successfully",
    gstDragDrop: "Drag & Drop Mock GST Worksheet, or click to browse",
    gstFormats: "Accepts .pdf, image, or excel sheets (Simulates audit extraction)",
    gstParsing: "Evaluating Alternative Ledger Signals via AI...",
    
    // Loan section
    desiredLoanTitle: "Desired Institutional Loan Package",
    requiredCapital: "Required Credit Capital (₹ INR Value)",
    rawMaterialBuffer: "Absorbable Raw Material cost spike buffer",
    bufferOption1: "5% buffer (High raw risk, gold spike will crash margin)",
    bufferOption2: "15% buffer (Moderate warehouse cushion)",
    bufferOption3: "30% buffer (High storage stock cushion, highly resilient)",
    bufferOption4: "50% buffer (Superior cooperative bulk reserve)",
    loanPurpose: "Loan Purpose Statement (Craft Impact)",
    loanPurposeDesc: "Describe how this capital investment will hire master and assistant weavers, or purchase zari braids, and expand local production capacity...",
    
    // Submit Button
    btnCalculate: "Calculate AI Alternative Credit Profile",
    btnCalculating: "Evaluating Alternative Ledger Signals...",
    
    // Guage
    scoreTitle: "AI Credit Merit",
    overallScoreLabel: "Overall Alternative Score",
    ratingExcellent: "Excellent Credit",
    ratingGood: "Good Standing",
    ratingFair: "Moderate Risk",
    ratingAttention: "Needs Attention",
    ratingCritical: "Critical Risk",
    
    // Underwriter Decision card
    decisionTitle: "Underwriting Decision Parameters",
    decisionSub: "Verifiable transactional parameters",
    suggestedSafeCapital: "Suggested Safe Micro-Credit:",
    targetSize: "Applicant Target Size:",
    repaymentBuffer: "Repayment Buffer Ratio:",
    repaymentHigh: "High (2.2x over monthly rent)",
    auditCompliance: "Audit compliance index:",
    onTimeGst: "On-Time GST",
    howAltScoreWorks: "How does this alternative rating boost credit accessibility?",
    howAltScoreWorksDesc: "Small artisans (Chikankari/Zardozi weavers) often lack land collateral. This platform aggregates order records, customer retention delays and on-time GST filing metrics to formulate alternate credit profiles validated securely via AI.",
    
    // Government Scheme Section
    matchedSchemesTitle: "Matched National & State MSME Schemes",
    matchedSchemesSub: "Government schemes customized to match local Lucknowi weavers and zardozi artisans' performance metrics.",
    relevanceLabel: "Reasoning",
    applyBtn: "Apply for Scheme",
    appliedBtn: "Eligible & Pre-Approved",
    bestMatchLabel: "Best Match",
    crore: "Crore",
    lakh: "Lakh",
    subsidyLabel: "Government Subsidy",
    subsidyPercentage: "Money",
    interestConcession: "Interest Concession",
    maxFundingSupport: "Max Funding Support",

    // Banker dashboard
    bankerTitle: "Verified Craft Workshops List",
    bankerSub: "Select to deep audit",
    searchPlaceholder: "Search by workshop or owner name...",
    resetFilters: "Reset Active Filters",
    allSpecialties: "All Craft Specialties",
    chikanSpecialtyOption: "Chikankari shadow embroidery",
    zariSpecialtyOption: "Zardozi metallic gold threads",
    allLocations: "All Locations",
    bankerCardHighGst: "High Audited",
    bankerCardCash: "Cash Reliant",
    bankerCardRent: "Rent overhead",
    bankerCardCapital: "Target Capital",
    noArtisansFound: "No registered Lucknow handicraft workshops match these search terms.",
    bankerSelectPromptTitle: "Select an Artisan Portfolio applicant",
    bankerSelectPromptDesc: "Click on any registered Lucknow craft workshop in the left registry panel to pull up their complete 12-month sales charts, digital trans indicators, risk mitigators, and matched schemes.",
    unnamedCrafts: "Unnamed Lakhnowi Crafts",
    unspecifiedKarigar: "Unspecified Karigar",
    localMarket: "Local Aminabad weavers market",
    upgradeWorkshop: "Upgrade workshop capabilities",
    
    // Footer
    footerRights: "Empowering Lucknow's historic shadow-work Chikankari weavers and Royal gold-thread Zardozi karigars.",
    footerNote: "Alternate underwriting protocol",
    
    // AI Copilot & Stress Tester
    copilotTitle: "Gemini Credit Growth Pathfinder",
    copilotDesc: "AI strategic recommendations to improve structural parameters and secure cheaper institutional rates.",
    pathfinderTitle: "Gemini Credit Growth Pathfinder",
    pathfinderSubtitle: "AI strategic recommendations to improve structural parameters and secure cheaper institutional rates.",
    projectionGoal: "SIMULATED GROWTH TARGET",
    projectedIndexLabel: "PROJECTED BOOST",
    counselorTitle: "Ask Gemini Underwriting Counselor",
    counselorSubtitle: "Ask about SIDBI interest subsidies, alternative UPI transaction verification, or MSME registration.",
    stressTesterTitle: "Capital Cashflow & Supply Stress Simulator",
    stressTesterDesc: "Simulate macro-economic supply shocks in gold zari thread pricing and labor shortages inside Avadh crafts.",
    stressTesterSubtitle: "Simulate macro-economic supply shocks in gold zari thread pricing and labor shortages inside Avadh crafts.",
    
    // Voice Assistant UI elements
    voiceTitle: "Voice Command Assistant",
    voiceDesc: "Speak or choose simulated commands below to instantly control the credit ledger app.",
    voiceMicEnabled: "Listening... speak now!",
    voiceMicDisabled: "Click microphone to start voice commands",
    voicePromptExample: "Try speaking: 'Banker Dashboard' or 'Set loan to 4 Lakh'",
    voiceSimulatedBtn: "Simulated Commands",
    voiceLanguageHint: "Supported in hinglish, hindi or english syntax."
  },
  hi: {
    // Header
    projectSubtitle: "लखनऊ वैकल्पिक स्कोरकार्ड",
    projectTitle: "लखनऊ हस्तशिल्प ऋण बही (Credit Summary)",
    weaverPortal: "कारीगर पोर्टल",
    bankerDashboard: "बैंकर्स डैशबोर्ड",
    
    // Preset Card Selection
    interactiveTitle: "इंटरएक्टिव सत्यापित कारीगर प्रोफाइल",
    interactiveSubtitle: "वैकल्पिक जोखिम मूल्यांकन को तुरंत जाँचने के लिए किसी एक प्रोफाइल को चुनें",
    karigarsCount: "कारीगर संख्या",
    lakhs: "लाख",
    
    // Form Headings
    businessContextTitle: "कारीगर व्यवसाय विवरण",
    businessContextSubtitle: "कार्यशाला की पुष्टि और ऋण पात्रता आकलन के लिए वैकल्पिक डेटा दर्ज करें।",
    coreIdentity: "मूल कार्यशाला पहचान",
    
    // Form Labels
    workshopName: "कार्यशाला / एमएसएमई का नाम",
    ownerName: "मुख्य कारीगर / स्वामी का नाम",
    emailAccess: "ईमेल पता",
    primaryPhone: "प्राथमिक फ़ोन नंबर",
    craftSpecialty: "मुख्य शिल्प विशेषता",
    goldThreadName: "ज़रदोज़ी (सुनहरे धागों की कढ़ाई)",
    handStitchName: "चिकनकारी (हाथ के टांके)",
    hubLocation: "लखनऊ स्थित हब स्थान",
    yearEstablished: "स्थापना वर्ष",
    monthlyOverhead: "मासिक कार्यशाला किराया (रुपये ₹ में)",
    
    // Alternative parameters
    alternativeParametersTitle: "वैकल्पिक जोखिम मानदंड (UPI लेन-देन, डिलीवरी देरी दर)",
    cashTransRatio: "कैश (नकद) लेन-देन अनुपात",
    cashRatioDesc: "बैंक पारदर्शी उच्च आय को दर्शाते हुए ऑडिट करने योग्य डिजिटल यूपीआई खातों को अधिक प्राथमिकता देते हैं।",
    deliveryDelayRate: "ऑर्डर डिलीवरी में देरी की दर",
    delayRateDesc: "डिलीवरी की समयबद्धता लखनऊ क्लस्टरों में कार्यशाला की स्थिरता और विश्वसनीयता को दर्शाती है।",
    helpersHeadcount: "जुड़े हुए सहायक कारीगरों की संख्या",
    helpersDesc: "शिल्पकारों की अधिक संख्या शादी के सीजन में काम के दबाव और जोखिम को कम करती है।",
    repeatCustomer: "दोबारा आने वाले ग्राहक (B2B)",
    repeatCustomerDesc: "स्थायी बुटीक और रीपिट आर्डर व्यापार की स्थिरता को प्रदर्शित करते हैं।",
    
    // GST Section
    gstTitle: "सत्यापित जीएसटी पोर्टल रिटर्न अपलोड (वैकल्पिक)",
    gstDesc: "जीएसटी फाइलिंग वर्कशीट अपलोड करें। स्मार्ट एआई क्रेडेंशियल्स बिना पुराने बही-खातों के आय का विश्लेषण ऑटोमेटिकली कर लेंगे।",
    gstInferred: "जीएसटी आंकड़े बही-खाता शीट में सफलतापूर्वक शामिल कर लिए गए हैं",
    gstDragDrop: "जीएसटी फाइल ड्रैग करें या कंप्यूटर से ब्राउज़ करने के लिए क्लिक करें",
    gstFormats: ".pdf, इमेज या एक्सेल फाइल स्वीकार्य है (सिम्युलेटेड विश्लेषण)",
    gstParsing: "एआई डिजिटल स्कोरकार्ड का विश्लेषण कर रहा है...",
    
    // Loan section
    desiredLoanTitle: "आवश्यक संस्थागत ऋण पैकेज",
    requiredCapital: "आवश्यक ऋण राशि (रुपए ₹ में)",
    rawMaterialBuffer: "कच्चे माल की कीमतों में वृद्धि झेलने का स्तर",
    bufferOption1: "5% बफ़र (उच्च जोखिम, सोने के दाम बढ़ने पर लाभांश कम होगा)",
    bufferOption2: "15% बफ़र (मध्यम कच्चा माल स्टॉक बैकअप)",
    bufferOption3: "30% बफ़र (मजबूत माल स्टॉक बैकअप, अत्यधिक सुरक्षित)",
    bufferOption4: "50% बफ़र (उत्कृष्ट सहकारी थोक आरक्षित भंडार)",
    loanPurpose: "ऋण लेने का उद्देश्य (लखनऊ क्राफ्ट पर प्रभाव)",
    loanPurposeDesc: "वर्णन करें कि यह निवेश और अतिरिक्त कार्यशाला बजट कैसे नए कारीगरों को रोजगार देगा और उत्पादन मजबूती बढ़ाएगा...",
    
    // Submit Button
    btnCalculate: "एआई वैकल्पिक ऋण स्कोर निकालें",
    btnCalculating: "एआई और वैकल्पिक बही-खाते की गणना जारी है...",
    
    // Guage
    scoreTitle: "एआई क्रेडिट रेटिंग",
    overallScoreLabel: "कुल वैकल्पिक क्रेडिट स्कोर",
    ratingExcellent: "उत्कृष्ट क्रेडिट योग्यता",
    ratingGood: "अच्छा रिकॉर्ड",
    ratingFair: "मध्यम जोखिम स्तर",
    ratingAttention: "ध्यान देने की आवश्यकता",
    ratingCritical: "अति संवेदनशील श्रेणी",
    
    // Underwriter Decision card
    decisionTitle: "ऋण हामीदारी (Underwriter) निर्णय मानक",
    decisionSub: "सत्यापित डिजिटल और लेन-देन मापदंड",
    suggestedSafeCapital: "सुरक्षित सुझाई गई ऋण सीमा:",
    targetSize: "आवेदक की मांग राशि:",
    repaymentBuffer: "ऋण पुनर्भुगतान बफ़र अनुपात:",
    repaymentHigh: "उच्च (मासिक किराए का 2.2 गुना)",
    auditCompliance: "जीएसटी अनुपालन सूचकांक (Index):",
    onTimeGst: "समय पर जीएसटी फाइल",
    howAltScoreWorks: "यह वैकल्पिक रेटिंग ऋण पहुंच को कैसे आसान बनाती है?",
    howAltScoreWorksDesc: "छोटे कारीगरों (चिकनकारी/ज़रदोज़ी बुनकरों) के पास अक्सर जमीन या सोने की गिरवी रखने के लिए संपत्ति नहीं होती। यह मंच आर्डर रिकॉर्ड, समयबद्ध जीएसटी और ग्राहक जुड़ाव को मिलाकर एआई द्वारा प्रमाणित विश्वसनीय वित्तीय स्कोर तैयार करता है।",
    
    // Government Scheme Section
    matchedSchemesTitle: "अनुकूल राष्ट्रीय एवं राज्य एमएसएमई योजनाएं",
    matchedSchemesSub: "यह सरकारी योजनाएं लखनऊी कारीगरों के व्यावसायिक स्तर और उनकी उत्पादकता को मजबूती प्रदान करने के लिए उपयुक्त हैं।",
    relevanceLabel: "एआई मिलान कारण",
    applyBtn: "योजना के लिए आवेदन करें",
    appliedBtn: "योग्य और प्री-एप्रूव्ड",
    bestMatchLabel: "सर्वोत्तम मिलान",
    crore: "करोड़",
    lakh: "लाख",
    subsidyLabel: "सरकारी सब्सिडी सहायता",
    subsidyPercentage: "मदद वित्तीय सहायता",
    interestConcession: "ब्याज दर में रियायत छूट",
    maxFundingSupport: "अधिकतम सरकारी अनुदान",

    // Banker dashboard
    bankerTitle: "सत्यापित लखनऊ हस्तशिल्प कार्यशालाएं सूची",
    searchPlaceholder: "कार्यशाला या स्वामी के नाम से खोजें...",
    resetFilters: "फ़िल्टर रिसेट करें",
    allSpecialties: "सभी शिल्प विधाएं",
    chikanSpecialtyOption: "चिकनकारी (परछाई कढ़ाई विधा)",
    zariSpecialtyOption: "ज़रदोज़ी (सुनहरे धागों का जरी काम)",
    allLocations: "सभी लखनऊी क्षेत्र",
    bankerCardHighGst: "सत्यापित बही-खाता",
    bankerCardCash: "नकद लेन-देन अधिक",
    bankerCardRent: "मासिक किराया खर्च",
    bankerCardCapital: "लोन मांग राशि",
    noArtisansFound: "दिए गए विवरण के अनुसार कोई हस्तशिल्प कार्यशाला नहीं मिली।",
    bankerSelectPromptTitle: "सत्यापित कारीगर के आवेदन को चुनें",
    bankerSelectPromptDesc: "बाएं पैनल में सूचीबद्ध लखनऊ की हस्तशिल्प कार्यशालाओं में से किसी को भी चुनकर, आप उनकी 12 माह की बिक्री, नकदी अनुपात, जोखिम जोखिम और अनुकूल सरकारी योजनाओं का विश्लेषण देख सकते हैं।",
    unnamedCrafts: "अनाम लखनवी हस्तशिल्प",
    unspecifiedKarigar: "अनिर्दिष्ट कारीगर",
    localMarket: "अमीनाबाद बुनकर स्थानीय बाजार",
    upgradeWorkshop: "कार्यशाला की क्षमता का विस्तार",
    
    // Footer
    footerRights: "लखनऊ के ऐतिहासिक छायादार चिकनकारी बुनकरों और ज़रदोज़ी शिल्पकारों के सशक्तिकरण हेतु समर्पित डिजिटल बही-खाता।",
    footerNote: "एआई संचालित वैकल्पिक ऋण सुरक्षा मानक",
    
    // AI Copilot & Stress Tester
    copilotTitle: "जेमिनी एआई स्कोर सुधार मार्गदर्शक",
    copilotDesc: "कम ब्याज दरों पर ऋण और बैंक स्वीकृति पाने के लिए एआई आधारित रणनीतिक सुझाव और समाधान।",
    pathfinderTitle: "जेमिनी एआई स्कोर सुधार मार्गदर्शक",
    pathfinderSubtitle: "कम ब्याज दरों पर ऋण और बैंक स्वीकृति पाने के लिए एआई आधारित रणनीतिक सुझाव और समाधान।",
    projectionGoal: "अनुमानित विकास लक्ष्य",
    projectedIndexLabel: "अनुमानित स्कोर बूस्ट (Boost)",
    counselorTitle: "जेमिनी हामीदारी (Underwriter) सलाहकार से पूछें",
    counselorSubtitle: "सिडबी ब्याज सब्सिडी, वैकल्पिक यूपीआई सत्यापन या एमएसएमई पंजीकरण के बारे में प्रश्न पूछें।",
    stressTesterTitle: "बाजार तनाव एवं कच्चा माल संकट कैलकुलेटर (Stress Simulator)",
    stressTesterDesc: "जरी धागों की महंगाई या शादियों के सीजन में अचानक आई कारीगरों की कमी के प्रभाव को सिम्युलेट करें।",
    stressTesterSubtitle: "जरी धागों की महंगाई या शादियों के सीजन में अचानक आई कारीगरों की कमी के प्रभाव को सिम्युलेट करें।",
    
    // Voice Assistant UI elements
    voiceTitle: "आवाज सहायक (Voice Commands)",
    voiceDesc: "नीचे दिए गए प्री-सेट बोलें या वॉयस बटन पर क्लिक करके सीधे बोलकर बही-खाता नियंत्रित करें।",
    voiceMicEnabled: "सुन रहा हूँ... कृपया बोलें!",
    voiceMicDisabled: "आवाज निर्देश शुरू करने के लिए माइक बटन दबाएं",
    voicePromptExample: "बोलने का प्रयास करें: 'Banker Dashboard' या 'लोन को ४ लाख करो'",
    voiceSimulatedBtn: "सिम्युलेटेड वॉयस कमांड्स",
    voiceLanguageHint: "हिंग्लिश, हिंदी या अंग्रेजी भाषाओं के वाक्यों को समझने में सक्षम।"
  },
  hinglish: {
    // Header
    projectSubtitle: "Lucknow Aapka Alternative Scorecard",
    projectTitle: "Lucknow Artisan Credit Ledger (Digital Khata)",
    weaverPortal: "Karigar Portal",
    bankerDashboard: "Banker Dashboard",
    
    // Preset Card Selection
    interactiveTitle: "Interactive Audited Masterworks Profile",
    interactiveSubtitle: "Apna manpasand karigar chunein aur risk score ko live update hote dekhein",
    karigarsCount: "Helper Karigars",
    lakhs: "Lakh",
    
    // Form Headings
    businessContextTitle: "Karigar Business Detail",
    businessContextSubtitle: "Apne workshop ki accurate business metrics daliye aur loan approval chance badhaiye.",
    coreIdentity: "Zaroori Identity details",
    
    // Form Labels
    workshopName: "Workshop / Dukan ka Naam",
    ownerName: "Owner / Mukhiyas ka Naam",
    emailAccess: "Email",
    primaryPhone: "Mobile Number",
    craftSpecialty: "Handicrafts Craft ki Category",
    goldThreadName: "Zardozi (Zari aur Sunehre Taar)",
    handStitchName: "Chikankari (Hath ki Shaded embroidery)",
    hubLocation: "Lucknowi Area Hub",
    yearEstablished: "Estd (Kab chalu hui)",
    monthlyOverhead: "Monthly Dukan Rent (Kharcha ₹)",
    
    // Alternative parameters
    alternativeParametersTitle: "Alternate Risk metrics (Bina collateral ke UPI aur orders data)",
    cashTransRatio: "Cash vs Digital Sale ka Ratio",
    cashRatioDesc: "UPI/GPay payments ratio jitna high hoga, bank ko aapka cashflow utna clear aur transparent dikhega.",
    deliveryDelayRate: "Order Delivery me Delay ki Rate",
    delayRateDesc: "Time par order deliver karne se Lucknow markets me workshop ki credibility badhti hai.",
    helpersHeadcount: "Associated Karigars ki tadad",
    helpersDesc: "Zada helpers hone se bridal season me bulk order lene ka capacity reliable lagta hai.",
    repeatCustomer: "Dupara aane wale B2B Karobari",
    repeatCustomerDesc: "Repeat boutique buyers aapke pipepline business ko steady aur stable banate hain.",
    
    // GST Section
    gstTitle: "Direct GST Portal verification (Mera GST uploaded)",
    gstDesc: "GST filing sheet dalkar smart AI se turn-over assess karein, pichle purane bank papers ki zaroorat nahi.",
    gstInferred: "GST statements se audit data automatically fetch ho gaya hai!",
    gstDragDrop: "GST worksheet file drop karein ya browse karne ke liye click karein",
    gstFormats: ".pdf, PNG photo ya Excel sheets accepted hain",
    gstParsing: "Aapke digital documents se turnover extract ho raha hai...",
    
    // Loan section
    desiredLoanTitle: "Requested Loan Capital",
    requiredCapital: "Loan Amount ki Zaroorat (₹ INR me)",
    rawMaterialBuffer: "Gold Zari ya Resham price spike jhelne ki capacity",
    bufferOption1: "5% buffer (High risk, gold rates badhne par margin khatam)",
    bufferOption2: "15% buffer (Moderate back-up material buffer)",
    bufferOption3: "30% buffer (Strong stock buffer, safe level)",
    bufferOption4: "50% buffer (Bahut solid reserve, shockproof business)",
    loanPurpose: "Loan ka Maksaad (Business plans)",
    loanPurposeDesc: "Is paise se kahan raw material lere hain aur kitne naye assistant karigars ko hire karna hai, detail me likhein...",
    
    // Submit Button
    btnCalculate: "AI Se Alternative Credit Score nikalein",
    btnCalculating: "AI alternative ledger par calculations run kar raha hai...",
    
    // Guage
    scoreTitle: "AI Credit Merit Score",
    overallScoreLabel: "Aapka Alternative score",
    ratingExcellent: "Superb Record",
    ratingGood: "Safe Record",
    ratingFair: "Moderate Risk level",
    ratingAttention: "Sudhar ki Zaroorat",
    ratingCritical: "Critical Risk level",
    
    // Underwriter Decision card
    decisionTitle: "Underwriter Approval Indicators",
    decisionSub: "Verifiable transaction performance indicators",
    suggestedSafeCapital: "Suggested Safe Loan Limit",
    targetSize: "Artisan Requested Goal:",
    repaymentBuffer: "Repayment Buffer Limit:",
    repaymentHigh: "High (Rent ka 2.2 guna backup)",
    auditCompliance: "GST Return Index status",
    onTimeGst: "Time-to-Time GST Filed",
    howAltScoreWorks: "Yeh Alternative Score se loan asan kaise banta hai?",
    howAltScoreWorksDesc: "Lucknowi karigars ke paas zamin ya collateral nahi hota. Yeh portal aapke sunehre orders, time par GST filing aur UPI trans ko analyze karke bankable alternative scorecard banata hai.",
    
    // Government Scheme Section
    matchedSchemesTitle: "Matched Government & MSME Schemes",
    matchedSchemesSub: "Lucknow ke chikankari aur zari karigaron ke business scale ke mutabik customized sarkaari yojnayein.",
    relevanceLabel: "AI Recommendation ka Tarq",
    applyBtn: "Yojna Apply Karein",
    appliedBtn: "Eligible & Pre-Certified",
    bestMatchLabel: "Best Match",
    crore: "Crore",
    lakh: "Lakh",
    subsidyLabel: "Sarkaari subsidy scheme",
    subsidyPercentage: "Chhoot bachat",
    interestConcession: "Byaj Concession",
    maxFundingSupport: "Max Sarkaari Support Limit",

    // Banker dashboard
    bankerTitle: "Audited Lucknowi Artisan Workshops Registry",
    searchPlaceholder: "Workshop ya mukhiya ke name se search karein...",
    resetFilters: "Fiter Clear Karein",
    allSpecialties: "Sari Craft Specialties",
    chikanSpecialtyOption: "Chikankari (Hath ka shadow embroidery)",
    zariSpecialtyOption: "Zardozi embroidery (Gold Taar metallic work)",
    allLocations: "Lucknow ke saare Area",
    bankerCardHighGst: "Zabardast Audited",
    bankerCardCash: "Cash heavy business",
    bankerCardRent: "Monthly rent rent",
    bankerCardCapital: "Target loan",
    noArtisansFound: "Ias search keyword ke mutabik koi workshop register nahi mili.",
    bankerSelectPromptTitle: "Kisi bhi Karigar applicant ko bagal se chunein",
    bankerSelectPromptDesc: "Left side ke registry panel se kisi bhi Lucknow craft workshop par click karein aur unke pichle barah mahine ka UPI sales, risk mitigators aur pre-approved schemes ka live assessment nikalein.",
    unnamedCrafts: "Unnamed Lakhnowi Crafts",
    unspecifiedKarigar: "Unspecified Karigar",
    localMarket: "Aminabad local weavers market",
    upgradeWorkshop: "Workshop me adda tables aur karchob badhana",
    
    // Footer
    footerRights: "Aapki sunehri Avadh kashidakari chikankari aur royal metallic zardozi karigari ko institutional backup dene ke liye alternate platform.",
    footerNote: "Digital ledger compliance policy",
    
    // AI Copilot & Stress Tester
    copilotTitle: "Gemini AI Score Pathfinder",
    copilotDesc: "Score aur badhane aur saste banks-rate par loan lene ke liye strategic AI suggestions.",
    pathfinderTitle: "Gemini AI Score Pathfinder",
    pathfinderSubtitle: "Score aur badhane aur saste banks-rate par loan lene ke liye strategic AI suggestions.",
    projectionGoal: "PROJECTION BOOST TARGET",
    projectedIndexLabel: "ESTIMATED BOOST SCORE",
    counselorTitle: "Ask Gemini Risk Counselor",
    counselorSubtitle: "Subsidies, alternative UPI ledger verification, ya MSME registration ke baare me poochhein.",
    stressTesterTitle: "Market Stress & Gold Rate fluctuation Simulator",
    stressTesterDesc: "Bridal season bottleneck aur metallic gold threads badhne par margin ka stress test simualate karein.",
    stressTesterSubtitle: "Bridal season bottleneck aur metallic gold threads badhne par margin ka stress test simualate karein.",
    
    // Voice Assistant UI elements
    voiceTitle: "Awaaz Assistant (Voice control desk)",
    voiceDesc: "Niche diye commands bole ya mike par click karke pure credit app ko control karein.",
    voiceMicEnabled: "Awaaz suni ja rahi hai... boliye!",
    voiceMicDisabled: "Mike button daba kar boliye",
    voicePromptExample: "Boliye: 'Banker Dashboard' ya 'Loan amount panch lakh karo'",
    voiceSimulatedBtn: "Simulated Commands",
    voiceLanguageHint: "Hinglish, Hindi aur English teeno dialects me active."
  }
};
