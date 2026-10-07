/**
 * About & Book Provenance View
 * Outlines the source authority and historical context for all 3 preparation volumes:
 * 1. Peterson's TOEFL CBT Success (Bruce Rogers, Thomson Learning)
 * 2. Cliffs TOEFL Preparation Guide (Michael A. Pyle & Mary Ellen Muñoz Page, Cliffs Notes)
 * 3. CliffsTestPrep TOEFL CBT (Michael A. Pyle, IDG Books Worldwide)
 */

import React from 'react';
import { BookOpen, AlertTriangle, ShieldCheck, User, Building, Library } from 'lucide-react';
import { HISTORICAL_NOTICE } from '../../data/gettingStartedData';
import { getAllBooks } from '../../data/bookRegistry';

export const AboutView: React.FC = () => {
  const books = getAllBooks();

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
          TOEFL Multi-Source Digital Preparation Suite
        </h1>
        <p className="text-xs text-slate-500">
          Authoritative interactive course platform preserving the complete instructional works of Peterson's and Cliffs Notes test-preparation experts.
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

      {/* 3 Source Books In-Depth Provenance */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Library className="w-5 h-5 text-blue-600" />
          <span>Integrated Source Volumes</span>
        </h2>

        {/* Volume 1: Peterson's CBT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Volume 1 · CBT Format</span>
              <h3 className="text-base font-bold text-slate-900">Peterson's TOEFL CBT Success</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">2002 Edition · ISBN 0-7689-0824-8</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Author: Bruce Rogers</span>
              </h4>
              <p className="leading-relaxed">
                Taught ESL and test-preparation at the Economics Institute in Boulder, Colorado; National Economics University in Hanoi, Vietnam; Yonsei University in Seoul, South Korea; and author of <em>The Complete Guide to TOEIC</em>.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Publisher: Thomson Learning / Peterson's</span>
              </h4>
              <p className="leading-relaxed">
                Founded in 1966, Peterson's is a leading publisher of educational prep and test-taking reference guides serving over 55 million learners annually.
              </p>
            </div>
          </div>
        </div>

        {/* Volume 2: Cliffs TOEFL Preparation Guide */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Volume 2 · PBT Format</span>
              <h3 className="text-base font-bold text-slate-900">Cliffs TOEFL Preparation Guide</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">5th Edition (1995) · ISBN 0-8220-2081-5</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>Authors: Michael A. Pyle & Mary Ellen Muñoz Page</span>
              </h4>
              <p className="leading-relaxed">
                Michael Pyle served as reading and grammar coordinator at University of Florida’s English Language Institute. Mary Ellen Muñoz Page taught ESL at Valencia Community College and conducted international TESOL workshops.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-600" />
                <span>Publisher: Cliffs Notes, Inc. / IDG Books</span>
              </h4>
              <p className="leading-relaxed">
                Series editor Jerry Bobrow, Ph.D. Famous for intensive 29-topic grammar formulas, pattern practice, and cross-referenced practice tests.
              </p>
            </div>
          </div>
        </div>

        {/* Volume 3: CliffsTestPrep TOEFL CBT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Volume 3 · CBT Format</span>
              <h3 className="text-base font-bold text-slate-900">CliffsTestPrep TOEFL CBT</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">2001 Edition · ISBN 0-7645-8609-2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Author: Michael A. Pyle</span>
              </h4>
              <p className="leading-relaxed">
                Linguistics and ESL testing specialist with audio production by Constance Carlisle. Features comprehensive reviews of Listening, Structure with 6 quizzes, Reading, and Writing.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Publisher: IDG Books Worldwide, Inc.</span>
              </h4>
              <p className="leading-relaxed">
                Published in 2001 under the CliffsTestPrep imprint, providing 6 full-length simulated CBT exams and 0–300 scaled score conversion tables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
