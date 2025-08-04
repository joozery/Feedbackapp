import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import FeedbackForm from './FeedbackForm';
import ParticipationForm from './ParticipationForm';
import SubRoomForm from './SubRoomForm';
import ExhibitionForm from './ExhibitionForm';
import WorkshopSatisfactionForm from './WorkshopSatisfactionForm';
import AboutSACITForm from './AboutSACITForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/participation" element={<ParticipationForm />} />
          <Route path="/subroom" element={<SubRoomForm />} />
          <Route path="/exhibition" element={<ExhibitionForm />} />
          <Route path="/workshop-satisfaction" element={<WorkshopSatisfactionForm />} />
          <Route path="/about-sacit" element={<AboutSACITForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
