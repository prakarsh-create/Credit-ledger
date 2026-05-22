import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, ChevronRight, CornerDownRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { MSMEProfile } from '../types';

interface VoiceAssistantProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activePortal: 'artisan' | 'banker';
  onPortalChange: (portal: 'artisan' | 'banker') => void;
  selectedArtisan: MSMEProfile | null;
  onUpdateArtisanParams: (updatedFields: Partial<MSMEProfile>) => void;
  onTriggerCalculation: () => void;
  onResetFilters: () => void;
}

export default function VoiceAssistant({
  language,
  onLanguageChange,
  activePortal,
  onPortalChange,
  selectedArtisan,
  onUpdateArtisanParams,
  onTriggerCalculation,
  onResetFilters
}: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedCommand, setParsedCommand] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Suggested preset commands that users can click to simulate speaking
  const simulatedCommands = [
    { text: "Switch to Banker Dashboard", display: { en: "Switch to Banker Dashboard", hi: "बैंकर्स डैशबोर्ड खोलें", hinglish: "Banker Dashboard open karo" } },
    { text: "Set loan to 5 Lakhs", display: { en: "Set loan to 5 Lakhs", hi: "लोन की राशि ५ लाख करो", hinglish: "Loan amount 5 Lakhs karo" } },
    { text: "Boost digital ratio to 90 percent", display: { en: "Boost digital to 90%", hi: "डिजिटल यूपीआई लेन-देन ९०% करो", hinglish: "UPI digital payment 90 percent karo" } },
    { text: "Change language to Hindi", display: { en: "Change language to Hindi", hi: "भाषा हिंदी करो", hinglish: "Language isse Hindi karo" } },
    { text: "Calculate alternative credit score", display: { en: "Calculate score", hi: "नया क्रेडिट स्कोर कैलकुलेट करो", hinglish: "AI credit score calculate karo" } }
  ];

  useEffect(() => {
    // Check Speech Recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    // Dynamically adjust speech locale based on language state
    rec.lang = language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';

    rec.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setParsedCommand(null);
    };

    rec.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      processVoiceCommand(speechToText);
    };

    rec.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        setTranscript('');
        setParsedCommand(null);
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Speech Recognition failed to start:", err);
      }
    }
  };

  // Match voiced intention coordinates and apply states directly to the live App state!
  const processVoiceCommand = (commandText: string) => {
    const text = commandText.toLowerCase().trim();
    let interpretation = "";

    // 1. Portal Switching intent
    if (text.includes("bank") || text.includes("dashboard") || text.includes("बैंक") || text.includes("अधिकारी")) {
      onPortalChange('banker');
      interpretation = language === 'hi' ? "पोर्टल बदलकर 'बैंकर्स डैशबोर्ड' खोला गया।" : "Switched active view to 'Banker Dashboard'.";
    } 
    else if (text.includes("weaver") || text.includes("artisan") || text.includes("karigar") || text.includes("कारीगर") || text.includes("दुकान")) {
      onPortalChange('artisan');
      interpretation = language === 'hi' ? "पोर्टल बदलकर 'कारीगर पोर्टल' खोला गया।" : "Switched active view to 'Weaver Portal'.";
    }

    // 2. Language switching intent
    else if (text.includes("hindi") || text.includes("हिंदी") || text.includes("भाषा हिंदी")) {
      onLanguageChange('hi');
      interpretation = "Language changed to Hindi (हिंदी)";
    }
    else if (text.includes("hinglish") || text.includes("हिंग्लिश") || text.includes("हिंग्लिश भाषा")) {
      onLanguageChange('hinglish');
      interpretation = "Language changed to Hinglish (हिंग्लिश)";
    }
    else if (text.includes("english") || text.includes("अंग्रेजी") || text.includes("अंग्रेज़ी")) {
      onLanguageChange('en');
      interpretation = "Language changed to English";
    }

    // 3. Reset command
    else if (text.includes("reset") || text.includes("clear") || text.includes("साफ") || text.includes("रिसेट")) {
      onResetFilters();
      interpretation = language === 'hi' ? "सभी फ़िल्टर और रिकॉर्ड रिसेट किए गए।" : "Reset all filters and settings.";
    }

    // 4. Calculate command
    else if (text.includes("calculate") || text.includes("score") || text.includes("कैलकुलेट") || text.includes("चेक") || text.includes("निकालो")) {
      onTriggerCalculation();
      interpretation = language === 'hi' ? "एआई वैकल्पिक क्रेडिट स्कोर की गणना शुरू की गई!" : "Triggered alternative credit calculation!";
    }

    // 5. Numerical Parameters intent: Loan targets (Lakhs / Thousands)
    else if (text.includes("loan") || text.includes("लोन") || text.includes("रुपए") || text.includes("capital") || text.includes("पूंजी")) {
      let matchedAmount = 0;
      
      // Look for standard numbers
      const numMatch = text.match(/\d+/);
      if (numMatch) {
        let val = parseInt(numMatch[0]);
        // handle lakhs or thousands
        if (text.includes("lakh") || text.includes("लाख")) {
          matchedAmount = val * 100000;
        } else if (val < 100) { // e.g. "loan 5" implies 5 Lakh
          matchedAmount = val * 100000;
        } else {
          matchedAmount = val;
        }
      } else {
        // verbal matches
        if (text.includes("दो") || text.includes("two") || text.includes("do")) matchedAmount = 200000;
        else if (text.includes("तीन") || text.includes("three") || text.includes("teen")) matchedAmount = 300000;
        else if (text.includes("चार") || text.includes("four") || text.includes("char")) matchedAmount = 400000;
        else if (text.includes("पांच") || text.includes("five") || text.includes("paanch")) matchedAmount = 500000;
        else if (text.includes("दस") || text.includes("ten") || text.includes("das")) matchedAmount = 1000000;
      }

      if (matchedAmount > 0) {
        onUpdateArtisanParams({ loanRequirement: matchedAmount });
        interpretation = language === 'hi' 
          ? `ऋण राशि आवश्यकता को बदलकर ₹${matchedAmount.toLocaleString('en-IN')} किया गया।` 
          : `Updated loan capital requirement value to ₹${matchedAmount.toLocaleString('en-IN')}.`;
      } else {
        interpretation = language === 'hi' ? "लोन कमांड समझी गई, पर वित्तीय आंकड़ा स्पष्ट नहीं था।" : "Recognized loan command, but amount value was ambiguous.";
      }
    }

    // 6. Numerical Parameters intent: UPI / Digital Ratio percentages
    else if (text.includes("digital") || text.includes("percent") || text.includes("upi") || text.includes("प्रतिशत") || text.includes("डिजिटल") || text.includes("cash") || text.includes("नकद")) {
      let cashRatio = 0.40; // Default fallback
      
      const numMatch = text.match(/\d+/);
      if (numMatch) {
        const val = parseInt(numMatch[0]); // e.g. "90 percent digital"
        if (text.includes("cash") || text.includes("नकद") || text.includes("कैश")) {
          cashRatio = val / 100;
        } else {
          // "90% digital" -> 10% Cash
          cashRatio = Math.max(0, (100 - val) / 100);
        }
      } else {
        if (text.includes("ninety") || text.includes("90") || text.includes("नब्बे")) cashRatio = 0.10;
        else if (text.includes("eighty") || text.includes("80") || text.includes("अस्सी")) cashRatio = 0.20;
        else if (text.includes("seventy") || text.includes("70") || text.includes("सत्तर")) cashRatio = 0.30;
        else if (text.includes("fifty") || text.includes("50") || text.includes("पचास")) cashRatio = 0.50;
      }

      onUpdateArtisanParams({ transactionCashRatio: cashRatio });
      interpretation = language === 'hi'
        ? `कैश अनुपात अपडेट किया गया: ${(cashRatio*100).toFixed(0)}% कैश / ${((1-cashRatio)*100).toFixed(0)}% डिजिटल लेन-देन।`
        : `Updated transaction cash ratio parameter to ${(cashRatio * 100).toFixed(0)}% Cash / ${((1 - cashRatio) * 100).toFixed(0)}% Digital.`;
    }

    // Default interpretation if no matches are hit
    if (!interpretation) {
      interpretation = language === 'hi' 
        ? `निर्देश समझा गया: "${commandText}"। कृपया इसे सही प्रपत्र में कहें।` 
        : `Parsed transcription: "${commandText}". Try commands like 'Set loan to 3 Lakh' or 'Switch to Banker'.`;
    }

    setParsedCommand(interpretation);
  };

  // Simulate speaking when pre-recorded button is clicked (Guarantee 100% testability across iframe sandboxes)
  const handleSimulatedClick = (cmdText: string) => {
    setTranscript(cmdText);
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      processVoiceCommand(cmdText);
    }, 850);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
      
      {/* Visual Title Block */}
      <div className="flex justify-between items-start border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/65 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-stone-900 text-sm flex items-center gap-1">
              {language === 'hi' ? translations.hi.voiceTitle : language === 'hinglish' ? translations.hinglish.voiceTitle : translations.en.voiceTitle}
              <span className="text-[8px] tracking-wide font-mono uppercase bg-indigo-100 text-indigo-805 border border-indigo-200/60 px-1.5 py-0.2 rounded">Beta</span>
            </h4>
            <p className="text-[10px] text-stone-400 mt-0.5">
              {language === 'hi' ? translations.hi.voiceLanguageHint : language === 'hinglish' ? translations.hinglish.voiceLanguageHint : translations.en.voiceLanguageHint}
            </p>
          </div>
        </div>

        {/* Dynamic status indicator */}
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-stone-300'}`}></span>
          <span className="text-[9px] font-mono text-stone-400">{isListening ? 'LIVE' : 'IDLE'}</span>
        </div>
      </div>

      {/* Main Microphone Interaction Circle Frame */}
      <div className="flex flex-col sm:flex-row items-center gap-4.5 bg-[#FAF9F6] border border-stone-200 p-4 rounded-xl">
        
        {/* Actual Mic Button toggle */}
        <button
          onClick={toggleListening}
          className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 select-none shadow-sm cursor-pointer outline-none ${
            isListening 
              ? 'bg-red-500 border-red-400 text-white shadow-red-500/10 scale-105' 
              : 'bg-white border-stone-300 hover:border-indigo-400 hover:text-indigo-600 text-stone-605'
          }`}
          title="Click to talk"
        >
          {isListening ? (
            <div className="relative">
              <Mic className="w-6 h-6 animate-bounce" />
              {/* ripple vectors */}
              <span className="absolute -inset-2.5 rounded-full border border-red-400/40 animate-ping"></span>
            </div>
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Dynamic Voice transcription block */}
        <div className="flex-1 space-y-1 w-full text-center sm:text-left">
          <div className="text-xs font-semibold text-stone-701 font-sans">
            {isListening 
              ? (language === 'hi' ? translations.hi.voiceMicEnabled : language === 'hinglish' ? translations.hinglish.voiceMicEnabled : translations.en.voiceMicEnabled)
              : (language === 'hi' ? translations.hi.voiceMicDisabled : language === 'hinglish' ? translations.hinglish.voiceMicDisabled : translations.en.voiceMicDisabled)
            }
          </div>

          <div className="text-[11px] text-stone-600 italic leading-relaxed min-h-6 flex items-center justify-center sm:justify-start">
            {transcript ? (
              <span className="flex items-center gap-1.5 bg-stone-100 border border-stone-200/50 px-2.5 py-1 rounded-md font-mono select-all">
                "<span className="text-stone-900 font-bold font-sans not-italic">{transcript}</span>"
              </span>
            ) : (
              <span className="text-stone-400 font-sans">
                {language === 'hi' ? translations.hi.voicePromptExample : language === 'hinglish' ? translations.hinglish.voicePromptExample : translations.en.voicePromptExample}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Structured Interpretations Logger feedback */}
      {parsedCommand && (
        <div className="bg-emerald-50 border border-emerald-250 p-3 rounded-xl flex gap-2.5 items-start animate-fade-in font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[9px] font-mono font-extrabold uppercase text-emerald-800 tracking-wider">Command Decoded</span>
            <p className="text-xs font-semibold text-emerald-950 leading-relaxed mt-0.5">{parsedCommand}</p>
          </div>
        </div>
      )}

      {/* Simulated voice assistant prompts - Guarantee 100% interactive sandbox success */}
      <div className="space-y-2 pt-2 border-t border-stone-150">
        <span className="text-[9px] font-mono uppercase tracking-widest font-extrabold text-stone-400 block mb-2.5">
          {language === 'hi' ? translations.hi.voiceSimulatedBtn : language === 'hinglish' ? translations.hinglish.voiceSimulatedBtn : translations.en.voiceSimulatedBtn}
        </span>
        
        <div className="flex flex-wrap gap-2 justify-start">
          {simulatedCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleSimulatedClick(cmd.text)}
              className="text-[10px] text-stone-700 bg-stone-50 border border-stone-200 hover:border-indigo-300 hover:bg-indigo-50/20 px-2.5 py-1.5 rounded-lg transition duration-200 text-left flex items-center gap-1 cursor-pointer font-sans"
            >
              <CornerDownRight className="w-2.5 h-2.5 text-stone-400 shrink-0" />
              <span>{language === 'hi' ? cmd.display.hi : language === 'hinglish' ? cmd.display.hinglish : cmd.display.en}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
