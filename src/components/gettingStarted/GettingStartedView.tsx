/**
 * Getting Started & Red Alert View
 * Directly presents Peterson's orientation materials, CAT explanations,
 * TOEFL Q&A, and the Twelve Keys to High Scores.
 */

import React, { useState } from 'react';
import {
  Compass,
  HelpCircle,
  Key,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { GETTING_STARTED_CONTENT, HISTORICAL_NOTICE } from '../../data/gettingStartedData';

export const GettingStartedView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'what-is-cat' | 'q-and-a' | 'twelve-keys' | 'section-alerts'>('what-is-cat');
  const [expandedQaIndex, setExpandedQaIndex] = useState<number | null>(null);

  const toggleQa = (index: number) => {
    setExpandedQaIndex(expandedQaIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Orientation & Foundations</span>
            <span aria-hidden="true">·</span>
            <span>Peterson’s Red Alert Guide</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Getting Started: What is Computer-Based TOEFL?
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Essential testing mechanics, adaptive algorithms, score calculation, and strategic keys.
          </p>
        </div>

        {/* Sub-tab buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('what-is-cat')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'what-is-cat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            What is CAT?
          </button>
          <button
            onClick={() => setActiveSubTab('q-and-a')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'q-and-a' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TOEFL Q&A
          </button>
          <button
            onClick={() => setActiveSubTab('twelve-keys')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'twelve-keys' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            12 Keys to High Scores
          </button>
          <button
            onClick={() => setActiveSubTab('section-alerts')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSubTab === 'section-alerts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Section Tactics
          </button>
        </div>
      </div>

      {/* Historical Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">{HISTORICAL_NOTICE.title}: </span>
          <span className="text-amber-800">{HISTORICAL_NOTICE.text}</span>
        </div>
      </div>

      {/* TAB 1: WHAT IS CAT & TEST FORMAT */}
      {activeSubTab === 'what-is-cat' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">
              Understanding the Computer-Adaptive Test (CAT)
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {GETTING_STARTED_CONTENT.redAlert1.whatIsCat}
            </p>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2 text-xs text-slate-800">
              <strong className="text-blue-900 block text-sm">
                Critical Test-Taking Rule for CAT Sections:
              </strong>
              <p className="leading-relaxed">
                In CAT sections (Listening Comprehension and Structure), questions at the <em>beginning</em> of a section affect your score significantly more than those at the end. Once the computer determines your general ability bracket, later questions only fine-tune your score. Therefore, take extra care to answer the opening 10 to 15 questions accurately.
              </p>
            </div>
          </div>

          {/* Format Comparison Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Standard Form vs. Long Form TOEFL CBT Structure
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-4">Standard Form Items</th>
                    <th className="py-3 px-4">Standard Time</th>
                    <th className="py-3 px-4">Test Nature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">1. Listening Comprehension</td>
                    <td className="py-3 px-4 font-mono">30–50 items</td>
                    <td className="py-3 px-4 font-mono">40–60 minutes</td>
                    <td className="py-3 px-4 text-blue-700 font-medium">Computer-Adaptive (CAT)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">2. Structure & Written Expression</td>
                    <td className="py-3 px-4 font-mono">20–25 items</td>
                    <td className="py-3 px-4 font-mono">15–20 minutes</td>
                    <td className="py-3 px-4 text-blue-700 font-medium">Computer-Adaptive (CAT)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">3. Reading Comprehension</td>
                    <td className="py-3 px-4 font-mono">44–60 items</td>
                    <td className="py-3 px-4 font-mono">70–90 minutes</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">Linear Computerized Test</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-900">Test of Written English (TWE)</td>
                    <td className="py-3 px-4 font-mono">1 Essay Topic</td>
                    <td className="py-3 px-4 font-mono">30 minutes</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">Productive Writing (Scale 1–6)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              {GETTING_STARTED_CONTENT.redAlert1.scoringExplanation}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUESTIONS AND ANSWERS */}
      {activeSubTab === 'q-and-a' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions About TOEFL
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Source: Peterson’s TOEFL CBT Success (Book pp. 3–7)
            </p>
          </div>

          <div className="space-y-3">
            {GETTING_STARTED_CONTENT.redAlert1.questionsAndAnswers.map((qa, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleQa(idx)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{qa.question}</span>
                  </span>
                  {expandedQaIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {expandedQaIndex === idx && (
                  <div className="p-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {qa.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TWELVE KEYS TO HIGH SCORES */}
      {activeSubTab === 'twelve-keys' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              The Twelve Keys to High Scores on TOEFL
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bruce Rogers' classroom-proven test-taking methodology (Book pp. 8–12).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GETTING_STARTED_CONTENT.redAlert1.twelveKeys.map((k) => (
              <div
                key={k.number}
                className="p-5 border border-slate-200 rounded-xl bg-slate-50/40 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="w-6 h-6 rounded bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {k.number}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{k.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-8">
                    {k.description}
                  </p>
                </div>
                {k.tips && (
                  <ul className="pl-8 pt-2 space-y-1 text-[11px] text-slate-500">
                    {k.tips.map((t, tIdx) => (
                      <li key={tIdx}>• {t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECTION RED ALERTS */}
      {activeSubTab === 'section-alerts' && (
        <div className="space-y-4">
          {[
            GETTING_STARTED_CONTENT.redAlert2,
            GETTING_STARTED_CONTENT.redAlert3,
            GETTING_STARTED_CONTENT.redAlert4,
          ].map((alert) => (
            <div
              key={alert.title}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900">{alert.title}</h3>
                <span className="text-xs text-slate-400 font-mono">
                  Source: Book p. {alert.sourcePage}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Tactics & Strategies:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {alert.tactics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
