/**
 * Mini-Tests Hub Component
 * Lists all 8 Mini-Tests from Peterson's TOEFL CBT Success
 */

import React from 'react';
import {
  CheckSquare,
  Clock,
  Play,
  CheckCircle2,
  BookOpen,
  Headphones,
  FileCode,
} from 'lucide-react';
import { MINI_TESTS } from '../../data/miniTestsData';
import { MiniTest, TestResultRecord } from '../../types/toefl';

interface MiniTestsViewProps {
  onStartMiniTest: (miniTest: MiniTest) => void;
  testResults: TestResultRecord[];
}

export const MiniTestsView: React.FC<MiniTestsViewProps> = ({
  onStartMiniTest,
  testResults,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Periodic Review Evaluations</span>
            <span aria-hidden="true">·</span>
            <span>All 8 Mini-Tests Ingested</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <span>Mini-Tests (Review Tests 1–8)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Standardized mini-tests reviewing points practiced in preceding lessons under authentic timed conditions.
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MINI_TESTS.map((test) => {
          const result = testResults.find((r) => r.testId === test.id);
          const Icon =
            test.section === 'listening'
              ? Headphones
              : test.section === 'structure'
              ? FileCode
              : BookOpen;

          return (
            <div
              key={test.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-bold font-mono">
                      {test.number}
                    </span>
                    <span className="uppercase font-semibold text-slate-700">
                      {test.section}
                    </span>
                  </div>
                  <span className="font-mono text-slate-400">
                    Source: Book p. {test.sourcePage}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {test.instructions}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {test.timeLimitMinutes} minutes
                  </span>
                  <span>·</span>
                  <span className="font-mono">{test.questions.length} questions</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  {result ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-blue-700 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Score: {result.rawTotal} / {result.maxTotal}
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Not taken yet</span>
                  )}
                </div>

                <button
                  onClick={() => onStartMiniTest(test)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{result ? 'Retake' : 'Start Mini-Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
