/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SubjectHub from './pages/SubjectHub';
import ChapterDetail from './pages/ChapterDetail';
import Solutions from './pages/Solutions';
import Notes from './pages/Notes';
import Exemplar from './pages/Exemplar';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/exemplar" element={<Exemplar />} />
        <Route path="/:classLevel/:subjectSlug/:resourceType?" element={<SubjectHub />} />
        <Route path="/chapter/:id" element={<ChapterDetail />} />
      </Routes>
    </Router>
  );
}

