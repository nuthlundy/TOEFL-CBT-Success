/**
 * TWE (Test of Written English) Workspace Component
 * Dedicated 30-minute timed writing environment with:
 * - 10 Keys to Writing the TWE Essay
 * - Model Essays with outline notes
 * - Timed Writing test area with Notes Scratchpad, Essay Editor, Word Count, Timer
 * - Rubric evaluation labeled "AI Practice Feedback — Not an Official TOEFL Score"
 * - Essay submission history
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  RotateCcw,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle2,
  FileText,
  Send,
  History,
  Info,
} from 'lucide-react';
import {
  TWE_TEN_KEYS,
  MODEL_ESSAYS,
  TWE_PRACTICE_TOPICS,
  TWE_RUBRIC,
  evaluateTweEssay,
  TweTopicPrompt,
} from '../../data/tweData';
import { TweSubmission } from '../../types/toefl';

interface TweWorkspaceProps {
  onSaveSubmission: (sub: TweSubmission) => void;
  submissions: TweSubmission[];
}

export const TweWorkspace: React.FC<TweWorkspaceProps> = ({
  onSaveSubmission,
  submissions,
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'keys' | 'models' | 'history'>('write');
  const [selectedTopic, setSelectedTopic] = useState<TweTopicPrompt>(TWE_PRACTICE_TOPICS[0]);
  const [notes, setNotes] = useState('');
  const [essay, setEssay] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining]);

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartTimer = () => {
    setTimerRunning(true);
  };

  const handleReset = () => {
    setTimerRunning(false);
    setSecondsRemaining(30 * 60);
    setNotes('');
    setEssay('');
    setEvaluationResult(null);
  };

  const handleSubmitEssay = () => {
    setTimerRunning(false);
    const evalData = evaluateTweEssay(essay, notes);
    setEvaluationResult(evalData);

    const submission: TweSubmission = {
      id: `twe_sub_${Date.now()}`,
      topicId: selectedTopic.id,
      topicTitle: selectedTopic.title,
      prompt: selectedTopic.prompt,
      notes,
      essay,
      wordCount,
      timestamp: Date.now(),
      timeSpentSeconds: 30 * 60 - secondsRemaining,
      estimatedScore: evalData.score,
      feedback: {
        strengths: evalData.strengths,
        weaknesses: evalData.weaknesses,
        scoreDescription: evalData.scoreDescription,
      },
    };

    onSaveSubmission(submission);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header with notice */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Guide to the Test of Written English</span>
            <span aria-hidden="true">·</span>
            <span>Book pp. 368–389</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            TWE Writing Practice Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Practice 30-minute essay composition using authentic ETS criteria and the 10 Keys to TWE Success.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'write' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Timed Writing
          </button>
          <button
            onClick={() => setActiveTab('keys')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'keys' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            The 10 Keys
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'models' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Model Essays
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'history' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            History ({submissions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: TIMED WRITING */}
      {activeTab === 'write' && (
        <div className="space-y-6">
          {/* Topic Selector & Timer Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Select Topic:</span>
                <select
                  value={selectedTopic.id}
                  onChange={(e) => {
                    const top = TWE_PRACTICE_TOPICS.find((t) => t.id === e.target.value);
                    if (top) {
                      setSelectedTopic(top);
                      handleReset();
                    }
                  }}
                  className="bg-slate-800 text-white text-xs border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  {TWE_PRACTICE_TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      TWE Topic {t.topicNumber}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-mono text-sm px-3 py-1 bg-slate-800 rounded-lg text-blue-400 border border-slate-700">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(secondsRemaining)}</span>
                </div>

                {!timerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Timer (30 min)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setTimerRunning(false)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Pause
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset Timer and Draft"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Selected Topic Prompt Display */}
            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-sm font-serif text-slate-100 leading-relaxed">
              <strong className="font-sans text-xs text-blue-400 block mb-1">
                Essay Topic {selectedTopic.topicNumber} (Source: Book p. {selectedTopic.sourcePage}):
              </strong>
              {selectedTopic.prompt}
            </div>
          </div>

          {/* Two-Zone Layout: Notes (Left) + Writing Area (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Notes / Planning Area (4 cols) */}
            <div className="md:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Planning & Notes (Key #4)</span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-500">
                Spend 3 minutes brainstorming pros/cons and outlining your 4 paragraphs.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Intro thesis:&#10;- Point 1:&#10;- Point 2:&#10;- Conclusion summary:"
                rows={14}
                className="w-full text-xs p-3 font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
              />
            </div>

            {/* Essay Composition Area (8 cols) */}
            <div className="md:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Essay Writing Space
                </h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-slate-600">
                    Words: <strong className="text-slate-900">{wordCount}</strong> / 250–300
                  </span>
                </div>
              </div>

              <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Begin your essay here. Organize into 4 or 5 clear paragraphs: an introduction with thesis statement, two supporting body paragraphs with specific examples, and a concluding evaluation."
                rows={16}
                className="w-full text-sm font-serif leading-relaxed p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-400">
                  Target: 200–300 words · 4–5 paragraphs · 30 minutes
                </p>
                <button
                  onClick={handleSubmitEssay}
                  disabled={wordCount < 20}
                  className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-xs rounded-xl shadow-sm transition-colors ${
                    wordCount >= 20
                      ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Practice Review</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Practice Feedback Evaluation Box */}
          {evaluationResult && (
            <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">
                      AI Practice Feedback — Not an Official TOEFL Score
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluated against the official 6-point ETS TWE Scoring Guide (Peterson’s p. 368).
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-3 py-1.5 rounded-xl border border-blue-200">
                  <span className="text-xs uppercase font-semibold">Estimated Level:</span>
                  <strong className="text-lg font-bold font-mono">
                    {evaluationResult.score} / 6.0
                  </strong>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">
                  ETS Band Description (Score {evaluationResult.score}):
                </span>
                {evaluationResult.scoreDescription}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Identified Strengths:</span>
                  </span>
                  <ul className="space-y-1 text-emerald-800">
                    {evaluationResult.strengths.map((s: string, idx: number) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Suggestions for Improvement:</span>
                  </span>
                  <ul className="space-y-1 text-amber-800">
                    {evaluationResult.weaknesses.map((w: string, idx: number) => (
                      <li key={idx}>• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: THE 10 KEYS */}
      {activeTab === 'keys' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              The Ten Keys to Writing the TWE Essay
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Peterson’s proven framework for scoring 5.0 to 6.0 on the Test of Written English (Book pp. 375–378).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TWE_TEN_KEYS.map((key) => (
              <div
                key={key.number}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                    {key.number}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{key.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">{key.text}</p>
              </div>
            ))}
          </div>

          {/* Scoring Rubric Reference */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Official ETS TWE Holistic Scoring Scale (1 to 6)
            </h3>
            <div className="space-y-2">
              {TWE_RUBRIC.map((level) => (
                <div
                  key={level.score}
                  className="p-3 border border-slate-200 rounded-lg text-xs flex items-start gap-3 bg-white"
                >
                  <span className="w-7 h-7 rounded bg-slate-900 text-white font-mono font-bold flex items-center justify-center shrink-0">
                    {level.score}
                  </span>
                  <div>
                    <strong className="text-slate-900">{level.label}: </strong>
                    <span className="text-slate-600">{level.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODEL ESSAYS */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          {MODEL_ESSAYS.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    {model.topicType}
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {model.topicTitle}
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">Score: 6.0 Model</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 italic">
                "{model.prompt}"
              </div>

              {/* Notes Scratchpad Preview */}
              <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-xl space-y-1.5 text-xs text-amber-950 font-mono">
                <span className="font-bold text-amber-900 block font-sans">
                  Author's Planning Notes Outline:
                </span>
                <p>• Intro: {model.notesOutline.intro}</p>
                <p>• Body 1: {model.notesOutline.bodyPart1}</p>
                <p>• Body 2: {model.notesOutline.bodyPart2}</p>
                <p>• Conclusion: {model.notesOutline.conclusion}</p>
              </div>

              {/* Model Essay Text */}
              <div className="space-y-3 font-serif text-sm leading-relaxed text-slate-800 p-4 border border-slate-200 rounded-xl bg-slate-50/30 whitespace-pre-line">
                {model.essayText}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950">
                <strong>Analysis:</strong> {model.commentary}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: SUBMISSION HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Your Submitted TWE Essays</h2>
          {submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-900">{sub.topicTitle}</span>
                    <span>
                      {new Date(sub.timestamp).toLocaleDateString()} · {sub.wordCount} words
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-serif line-clamp-3">
                    {sub.essay}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <span className="text-blue-700 font-semibold font-mono">
                      Estimated Score: {sub.estimatedScore} / 6.0
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              <History className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>No essays submitted yet. Start a timed writing session above!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
