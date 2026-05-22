import React from 'react';
import { Award, Layers, IndianRupee, ArrowRight, Sparkles } from 'lucide-react';
import { RecommendedScheme } from '../types';

interface SchemeCardProps {
  scheme: RecommendedScheme;
  onApply: (schemeName: string) => void;
  applied: boolean;
  key?: any;
}

export default function SchemeCard({ scheme, onApply, applied }: SchemeCardProps) {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-indigo-50 text-indigo-805 border-indigo-250';
    if (score >= 80) return 'bg-stone-100/50 text-stone-700 border-stone-250';
    return 'bg-stone-50 text-stone-500 border-stone-200/65';
  };

  return (
    <div 
      id={`scheme_card_${scheme.name.replace(/\s+/g, '_')}`} 
      className={`border rounded-2xl p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        applied 
          ? 'bg-indigo-500/10 border-indigo-500/40 shadow-sm' 
          : 'bg-white border-stone-200 hover:border-indigo-400 hover:shadow-xs'
      }`}
    >
      {scheme.matchScore >= 90 && (
        <div className="absolute top-0 right-0 bg-indigo-700 text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-bl-xl font-bold flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3" /> Best Match
        </div>
      )}

      <div>
        {/* Header containing name and matching score */}
        <div className="flex justify-between items-start mb-3 gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block mb-1">
              {scheme.agency}
            </span>
            <h4 className="font-display font-semibold text-stone-900 text-base leading-snug pr-12">
              {scheme.name}
            </h4>
          </div>
          <div className={`mt-1 shrink-0 border px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${getScoreBadgeColor(scheme.matchScore)}`}>
            {scheme.matchScore}% Match
          </div>
        </div>

        {/* Purpose description */}
        <p className="text-stone-600 text-xs leading-relaxed mb-4 font-sans">
          {scheme.purpose}
        </p>

        {/* Benefits lists */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl mb-4 border border-stone-150">
          <div>
            <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wide">Max Funding Support</span>
            <div className="font-semibold text-stone-800 flex items-center text-xs mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 mt-0.5 text-stone-500" />
              {scheme.maxAmount >= 10000000 
                ? `${scheme.maxAmount / 10000000} Crore` 
                : scheme.maxAmount >= 100000 
                  ? `${scheme.maxAmount / 100000} Lakh` 
                  : scheme.maxAmount.toLocaleString('en-IN')
              }
            </div>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wide">Government Subsidy</span>
            <div className="font-semibold text-stone-800 text-xs mt-0.5 flex items-center">
              <Layers className="w-3.5 h-3.5 mr-1 text-stone-500" />
              {scheme.subsidyPercentage > 0 ? `${scheme.subsidyPercentage}% Money` : 'Interest Concession'}
            </div>
          </div>
        </div>

        {/* Specific alternate credit linkage reasoning */}
        <div className="text-[11px] text-stone-500 italic border-l-2 border-indigo-500/40 pl-2.5 mb-5 leading-normal font-sans">
          &ldquo;{scheme.relevanceExplanation}&rdquo;
        </div>
      </div>

      {/* Primary Application Action helper */}
      <button
        id={`btn_apply_scheme_${scheme.name.replace(/\s+/g, '_')}`}
        onClick={() => onApply(scheme.name)}
        disabled={applied}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
          applied 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-250 cursor-default' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer'
        }`}
      >
        {applied ? (
          <span>✓ Subscribed Eligibility Package</span>
        ) : (
          <>
            <span>Configure Scheme Linkage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}
