/**
 * About & Book Provenance View
 * Outlines the source authority: Peterson's TOEFL CBT Success by Bruce Rogers
 */

import React from 'react';
import { BookOpen, AlertTriangle, ShieldCheck, User, Building } from 'lucide-react';
import { HISTORICAL_NOTICE } from '../../data/gettingStartedData';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>About This Application</span>
          <span aria-hidden="true">·</span>
          <span>Educational Provenance</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Peterson’s TOEFL CBT Success Digital Learning System
        </h1>
        <p className="text-xs text-slate-500">
          Authoritative interactive course based on the complete instructional work by Bruce Rogers.
        </p>
      </div>

      {/* Historical TOEFL Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">{HISTORICAL_NOTICE.title}: </span>
          <span className="text-amber-800">{HISTORICAL_NOTICE.text}</span>
        </div>
      </div>

      {/* Author & Publisher Provenance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <User className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">About the Author</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Bruce Rogers</strong> has taught English as a second language and test-preparation courses at the Economics Institute in Boulder, Colorado, since 1979. He has also taught in special programs at Bank Indonesia and Bank Negara Indonesia in Jakarta; at the National Economics University in Hanoi, Vietnam; at Yonsei University in Seoul, South Korea; and at the Samsung Human Resources Development Center in Yong-in, South Korea.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            He is also the author of <em>The Complete Guide to TOEIC</em> and <em>The Complete Guide to TOEFL: Practice Tests</em>.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Building className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">About Peterson's & Thomson</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Founded in 1966, <strong>Peterson's</strong> (a division of Thomson Learning) is a leading provider of lifelong learning resources, software, and reference guides. Peterson's serves more than 55 million education consumers annually.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 font-mono">
            <div>ISBN: 0-7689-0682-4 (text with CD)</div>
            <div>ISBN: 0-7689-0764-0 (text with audiocassettes)</div>
            <div>Copyright © 2001 by Bruce Rogers</div>
          </div>
        </div>
      </div>

      {/* System Integrity & Rules */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Educational Integrity & Primary Source Policy</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            • <strong>Original Terminology & Organization:</strong> All lesson names, section divisions, question types, and explanations are preserved directly from the physical textbook.
          </p>
          <p>
            • <strong>No Fabricated Content:</strong> Questions and answer keys originate strictly from the authorized text. Items requiring missing audio sources are explicitly identified with <code>AUDIO_SOURCE_REQUIRED</code> placeholders.
          </p>
          <p>
            • <strong>Pedagogical Progression:</strong> The 7-step lesson player (Learn → Example → Try → Submit → Feedback → Explanation → Continue) ensures deliberate conceptual mastery rather than passive reading.
          </p>
        </div>
      </div>
    </div>
  );
};
