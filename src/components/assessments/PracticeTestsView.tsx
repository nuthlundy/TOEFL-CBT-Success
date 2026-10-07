/**
 * Full-Length Practice Tests Hub
 * Features Practice Test 1, 2, and 3 with full exam mode, section-by-section mode,
 * and the authoritative ETS Score Conversion Table from Peterson's book p. 391.
 */

import React, { useState } from 'react';
import {
  Award,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  Table,
  BookOpen,
} from 'lucide-react';
import { PRACTICE_TESTS, SCORE_CONVERSION_TABLE } from '../../data/practiceTestsData';
import { PracticeTest, TestResultRecord, BookId } from '../../types/toefl';

interface PracticeTestsViewProps {
  onStartFullTest: (test: PracticeTest) => void;
  onStartSectionTest: (test: PracticeTest, sectionKey: 'listening' | 'structure' | 'reading') => void;
  testResults: TestResultRecord[];
  practiceTests?: PracticeTest[];
  activeBookId?: BookId;
  bookTitle?: string;
}

export const PracticeTestsView: React.FC<PracticeTestsViewProps> = ({
  onStartFullTest,
  onStartSectionTest,
  testResults,
  practiceTests = PRACTICE_TESTS,
  activeBookId = 'PETERSONS-CBT-SUCCESS',
  bookTitle = "Peterson's TOEFL CBT Success",
}) => {
  const [showTableModal, setShowTableModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{bookTitle}</span>
            <span aria-hidden="true">·</span>
            <span>{practiceTests.length} Full Practice Exams</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            <span>Full Practice Tests</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Simulate the full TOEFL test experience across all sections with strict timing, question palettes, and scoring.
          </p>
        </div>

        <button
          onClick={() => setShowTableModal(!showTableModal)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
        >
          <Table className="w-3.5 h-3.5 text-slate-500" />
          <span>View Score Conversion Table</span>
        </button>
      </div>

      {/* Tests Showcase Cards */}
      <div className="space-y-6">
        {practiceTests.map((test) => {
          const pastResults = testResults.filter((r) => r.testId === test.id);
          const latestResult = pastResults[0];

          return (
            <div
              key={test.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-blue-700">Full-Length CBT Exam</span>
                    <span aria-hidden="true">·</span>
                    <span>Book pp. {test.sourcePages.start}–{test.sourcePages.end}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {test.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {latestResult && (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Estimated Score
                      </span>
                      <span className="text-sm font-bold font-mono text-blue-700">
                        {latestResult.totalScaledRange}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => onStartFullTest(test)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{latestResult ? 'Retake Full Exam' : 'Start Full Exam'}</span>
                  </button>
                </div>
              </div>

              {/* 3 Sections breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Section 1 Listening */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Section 1
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      Listening Comprehension
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {test.sections.listening.questions.length} Questions · {test.sections.listening.timeLimitMinutes} Mins · Dialogs & Talks
                    </p>
                  </div>
                  <button
                    onClick={() => onStartSectionTest(test, 'listening')}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    Practice Section 1 Only
                  </button>
                </div>

                {/* Section 2 Structure */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Section 2
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      Structure & Written Expression
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {test.sections.structure.questions.length} Questions · {test.sections.structure.timeLimitMinutes} Mins · Grammar & Usage
                    </p>
                  </div>
                  <button
                    onClick={() => onStartSectionTest(test, 'structure')}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    Practice Section 2 Only
                  </button>
                </div>

                {/* Section 3 Reading */}
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Section 3
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      Reading Comprehension
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {test.sections.reading.questions.length} Questions · {test.sections.reading.timeLimitMinutes} Mins · Academic Texts
                    </p>
                  </div>
                  <button
                    onClick={() => onStartSectionTest(test, 'reading')}
                    className="w-full py-1.5 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    Practice Section 3 Only
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Score Conversion Table Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Official Score Conversion Table
                </h3>
                <p className="text-xs text-slate-500">
                  Source: Peterson’s TOEFL CBT Success (Book p. 391)
                </p>
              </div>
              <button
                onClick={() => setShowTableModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-3 py-1 bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Calculation Method:</strong> The scaled scores from each section are added together, multiplied by 10, and divided by 3: <br />
              <code>Total Score = (Section 1 Scaled + Section 2 Scaled + Section 3 Scaled) × 10 ÷ 3</code>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Section 1 Raw</th>
                    <th className="py-2.5 px-3">Sec 1 Scaled</th>
                    <th className="py-2.5 px-3">Section 2 Raw</th>
                    <th className="py-2.5 px-3">Sec 2 Scaled</th>
                    <th className="py-2.5 px-3">Section 3 Raw</th>
                    <th className="py-2.5 px-3">Sec 3 Scaled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {SCORE_CONVERSION_TABLE.listening.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3">{row.minRaw}–{row.maxRaw}</td>
                      <td className="py-2 px-3 text-blue-700 font-bold">{row.scaledMin}–{row.scaledMax}</td>
                      <td className="py-2 px-3">
                        {SCORE_CONVERSION_TABLE.structure[idx]?.minRaw}–{SCORE_CONVERSION_TABLE.structure[idx]?.maxRaw}
                      </td>
                      <td className="py-2 px-3 text-indigo-700 font-bold">
                        {SCORE_CONVERSION_TABLE.structure[idx]?.scaledMin}–{SCORE_CONVERSION_TABLE.structure[idx]?.scaledMax}
                      </td>
                      <td className="py-2 px-3">
                        {SCORE_CONVERSION_TABLE.reading[idx]?.minRaw}–{SCORE_CONVERSION_TABLE.reading[idx]?.maxRaw}
                      </td>
                      <td className="py-2 px-3 text-cyan-700 font-bold">
                        {SCORE_CONVERSION_TABLE.reading[idx]?.scaledMin}–{SCORE_CONVERSION_TABLE.reading[idx]?.scaledMax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
