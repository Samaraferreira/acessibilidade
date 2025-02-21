import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { LandingPage } from './pages/LandingPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AccessibilityControls } from './components/AccessibilityControls';

function App() {
  return (
    <AccessibilityProvider>
      <LanguageProvider>
        <Router>
          {/* Skip to main content link */}
          <a href="#main-content" className="skip-link" aria-label="Pular para o conteúdo principal">
            Pular para o conteúdo principal
          </a>
          
          <main id="main-content" role="main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<WorkflowBuilder />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <AccessibilityControls />
        </Router>
      </LanguageProvider>
    </AccessibilityProvider>
  );
}

export default App;