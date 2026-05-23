import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, CheckCircle2, CornerDownRight, RefreshCw, MessageSquare } from 'lucide-react';
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
  const [voiceAiResponse, setVoiceAiResponse] = useState<string | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speakTextRef = useRef<(text: string) => void>(() => {});

  // Suggested preset commands that users can click to simulate speaking
  const simulatedCommands = [
    { text: "Switch to Banker Dashboard", display: { en: "Switch to Banker Dashboard", hi: "बैंकर्स डैशबोर्ड खोलें", hinglish: "Banker Dashboard open karo" } },
    { text: "Set loan to 5 Lakhs", display: { en: "Set loan to 5 Lakhs", hi: "लोन की राशि ५ लाख करो", hinglish: "Loan amount 5 Lakhs karo" } },
    { text: "Boost digital ratio to 90 percent", display: { en: "Boost digital to 90%", hi: "डिजिटल यूपीआई लेन-देन ९०% करो", hinglish: "UPI digital payment 90 percent karo" } },
    { text: "How can I bypass traditional land security and collateral?", display: { en: "How to avoid collateral?", hi: "बिना गारंटी लोन कैसे मिलेगा?", hinglish: "Bina collateral loan kaise milega?" } },
    { text: "Tell me about interest subsidies under PM Vishwakarma scheme.", display: { en: "About PM Vishwakarma?", hi: "पीएम विश्वकर्मा योजना क्या है?", hinglish: "PM Vishwakarma ke kya benefits hain?" } }
  ];

  // Set up Speech Synthesis reference
  useEffect(() => {
    speakTextRef.current = (text: string) => {
      if (!('speechSynthesis' in window)) return;
      
      // Cancel any ongoing speaking
      window.speechSynthesis.cancel();
      
      if (!isMuted) {
        // Strip markdown elements for clear vocalization
        const voiceText = text
          .replace(/\*\*/g, '')
          .replace(/__/g, '')
          .replace(/#/g, '')
          .replace(/-/g, '')
          .trim();
        
        const utterance = new SpeechSynthesisUtterance(voiceText);
        const voices = window.speechSynthesis.getVoices();
        
        // Find best match matching the current theme/language accent context
        let matchedVoice = null;
        if (language === 'hi' || language === 'hinglish') {
          matchedVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN'));
        } else {
          matchedVoice = voices.find(v => v.lang.startsWith('en') && (v.lang.includes('IN') || v.lang.includes('US') || v.lang.includes('GB')));
        }
        
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
        
        utterance.lang = language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';
        utterance.rate = 1.05; // Slightly swifter for dynamic flow
        utterance.pitch = 1.0;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    };
  }, [language, isMuted]);

  // Handle Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    // Adjust speech locale
    rec.lang = language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';

    rec.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setParsedCommand(null);
      setVoiceAiResponse(null);
      
      // Stop ongoing voice syntheses
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
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
        setVoiceAiResponse(null);
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Speech Recognition failed to start:", err);
      }
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Match voiced intention coordinates and apply states directly to the live App state!
  const processVoiceCommand = async (commandText: string) => {
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

    // Default: Send to Gemini Counselor backend to act as full-functioning counselor!!
    if (!interpretation) {
      setIsConsulting(true);
      setParsedCommand(null);
      setVoiceAiResponse(null);
      
      try {
        const response = await fetch('/api/ai-counsel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            profile: selectedArtisan || {
              name: "Lucknow Craft MSME",
              craftType: "Chikankari shadow embroidery",
              location: "Chowk, Lucknow",
              artisanCount: 5,
              transactionCashRatio: 0.40,
              rawMaterialCostIncreaseBuffer: 0.15,
              monthlyRent: 4000,
              loanRequirement: 300000,
              loanPurpose: "Expand Workshop"
            }, 
            userMessage: commandText, 
            language 
          })
        });
        const data = await response.json();
        if (data.reply) {
          setVoiceAiResponse(data.reply);
          // Play out loud immediately unless muted!
          speakTextRef.current(data.reply);
        }
      } catch (err) {
        console.error("Voice command AI counselor session failed:", err);
        const failMessage = language === 'hi' 
          ? "सर्वर सिंक करने में कठिनाई हो रही है, कृपया दोबारा प्रयास करें।" 
          : "Synch streaming timed out. Please retry speaking.";
        setVoiceAiResponse(failMessage);
        speakTextRef.current(failMessage);
      } finally {
        setIsConsulting(false);
      }
    } else {
      setParsedCommand(interpretation);
      setVoiceAiResponse(null);
      // Play system command success out loud
      speakTextRef.current(interpretation);
    }
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

  const t = translations[language] || translations.en;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
      
      {/* Visual Title Block */}
      <div className="flex justify-between items-start border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/65 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-stone-900 text-sm flex items-center gap-1.5">
              {t.voiceTitle}
              <span className="text-[8px] tracking-wide font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded font-extrabold animate-pulse">
                Conversational AI
              </span>
            </h4>
            <p className="text-[10px] text-stone-400 mt-0.5">
              {t.voiceLanguageHint}
            </p>
          </div>
        </div>

        {/* Controls and Speaker Status Indicators */}
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button 
              onClick={stopSpeaking}
              className="px-2 py-0.5 text-[8px] font-mono text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition cursor-pointer"
            >
              Stop Speaking
            </button>
          )}
          <button
            onClick={() => {
              const nextMute = !isMuted;
              setIsMuted(nextMute);
              if (nextMute) stopSpeaking();
            }}
            className={`p-1.5 rounded-lg border transition duration-200 cursor-pointer ${
              isMuted 
                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' 
                : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-indigo-600 hover:bg-stone-100'
            }`}
            title={isMuted ? "Unmute Voice responses" : "Mute Voice responses"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <div className="flex items-center gap-1 bg-stone-50 border border-stone-200/50 px-2 py-1 rounded-md">
            <span className={`h-1.5 w-1.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : isSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`}></span>
            <span className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">{isListening ? 'Listening' : isSpeaking ? 'Speaking' : 'Idle'}</span>
          </div>
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
              <Mic className="w-6 h-6 animate-pulse" />
              {/* ripple vectors */}
              <span className="absolute -inset-2 rounded-full border border-red-400/30 animate-ping"></span>
            </div>
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {/* Dynamic Voice transcription block */}
        <div className="flex-1 space-y-1 w-full text-center sm:text-left">
          <div className="text-xs font-semibold text-stone-701 font-sans">
            {isListening ? t.voiceMicEnabled : t.voiceMicDisabled}
          </div>

          <div className="text-[11px] text-stone-600 italic leading-relaxed min-h-6 flex items-center justify-center sm:justify-start">
            {transcript ? (
              <span className="flex items-center gap-1.5 bg-stone-100 border border-stone-200/50 px-2.5 py-1 rounded-md font-mono select-all">
                "<span className="text-stone-900 font-bold font-sans not-italic">{transcript}</span>"
              </span>
            ) : (
              <span className="text-stone-400 font-sans">
                {t.voicePromptExample}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Loading Spinner for AI Counselor Call */}
      {isConsulting && (
        <div className="bg-indigo-50/40 border border-indigo-100/80 p-4 rounded-xl flex items-center justify-center gap-2.5 font-sans animate-pulse">
          <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
          <span className="text-xs text-indigo-900 font-medium font-mono">
            {language === 'hi' ? 'जेमिनी एआई सलाहकार आपके प्रश्न का उत्तर तैयार कर रहा है...' : 'Gemini AI Counselor is preparing audio answer...'}
          </span>
        </div>
      )}

      {/* Display freeform Gemini Underwriting advice response */}
      {voiceAiResponse && !isConsulting && (
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4.5 space-y-2 animate-fade-in shadow-inner">
          <div className="flex items-center gap-1.5 pb-1.5 border-b border-indigo-100/50">
            <span className="p-1 rounded bg-indigo-100 text-indigo-600">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-mono font-bold text-indigo-800 uppercase tracking-wider">
              {language === 'hi' ? translations.hi.counselorTitle : translations.en.counselorTitle}
            </span>
          </div>
          <div className="text-xs text-stone-800 leading-relaxed font-sans max-h-48 overflow-y-auto select-text font-medium whitespace-pre-line">
            {voiceAiResponse}
          </div>
          {isMuted && (
            <div className="text-[9px] text-rose-500 italic font-mono flex items-center gap-1 mt-1 pt-1 border-t border-indigo-100/30">
              <span>● Sound is muted. To hear response, click the volume icon on top.</span>
            </div>
          )}
        </div>
      )}

      {/* Structured Interpretations Logger feedback */}
      {parsedCommand && !isConsulting && (
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex gap-2.5 items-start animate-fade-in font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-650 shrink-0 mt-0.5" />
          <div>
            <span className="text-[9px] font-mono font-extrabold uppercase text-emerald-800 tracking-wider">Command Decoded</span>
            <p className="text-xs font-semibold text-emerald-950 leading-relaxed mt-0.5">{parsedCommand}</p>
          </div>
        </div>
      )}

      {/* Simulated voice assistant prompts - Guarantee 100% interactive sandbox success */}
      <div className="space-y-2 pt-2 border-t border-stone-150">
        <span className="text-[9px] font-mono uppercase tracking-widest font-extrabold text-stone-400 block mb-2.5">
          {t.voiceSimulatedBtn}
        </span>
        
        <div className="flex flex-wrap gap-2 justify-start">
          {simulatedCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleSimulatedClick(cmd.text)}
              className="text-[10px] text-stone-700 bg-stone-50 border border-stone-200 hover:border-indigo-300 hover:bg-indigo-50/20 px-2.5 py-1.5 rounded-lg transition duration-200 text-left flex items-center gap-1 cursor-pointer font-sans"
            >
              <CornerDownRight className="w-2.5 h-2.5 text-stone-405 shrink-0" />
              <span>{language === 'hi' ? cmd.display.hi : language === 'hinglish' ? cmd.display.hinglish : cmd.display.en}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
