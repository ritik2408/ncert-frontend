/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SubjectHub from './pages/SubjectHub';
import ChapterDetail from './pages/ChapterDetail';
import ChapterResourceDetail from './pages/ChapterResourceDetail';
import Solutions from './pages/Solutions';
import Notes from './pages/Notes';
import Exemplar from './pages/Exemplar';
import Books from './pages/Books';
import FormulaSheets from './pages/FormulaSheets';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/exemplar" element={<Exemplar />} />
        <Route path="/books" element={<Books />} />
        <Route path="/formulas" element={<FormulaSheets />} />
        <Route path="/:classLevel/:subjectSlug/:resourceType?" element={<SubjectHub />} />
        <Route path="/chapter/:id" element={<ChapterDetail />} />
        <Route path="/chapter/:id/solutions" element={<ChapterDetail />} />
        <Route path="/chapter/:id/:resourceType" element={<ChapterResourceDetail />} />
      </Routes>
    </Router>
  );
}

