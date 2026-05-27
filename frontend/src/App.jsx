import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import RequestFormPage from './pages/RequestFormPage';
import RequestSuccessPage from './pages/RequestSuccessPage';
import AccessibilityPage from './pages/AccessibilityPage';
import PrivacyPage from './pages/PrivacyPage';
import ImprintPage from './pages/ImprintPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

/**
 * Hauptkomponente der Anwendung.
 * Definiert alle Routen und bettet jede Seite in das gemeinsame Layout ein.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/services/:id" element={<Layout><ServiceDetailPage /></Layout>} />
        <Route path="/request" element={<Layout><RequestFormPage /></Layout>} />
        <Route path="/request/success" element={<Layout><RequestSuccessPage /></Layout>} />
        <Route path="/accessibility" element={<Layout><AccessibilityPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/imprint" element={<Layout><ImprintPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboardPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
