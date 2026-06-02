import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

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
 *
 * AuthProvider umschließt die gesamte App, damit alle
 * Komponenten auf den Login-Status zugreifen können.
 *
 * ProtectedRoute schützt alle Admin-Seiten –
 * nicht eingeloggte Benutzer werden zur Login-Seite weitergeleitet.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Öffentliche Seiten */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/services/:id" element={<Layout><ServiceDetailPage /></Layout>} />
          <Route path="/request" element={<Layout><RequestFormPage /></Layout>} />
          <Route path="/request/success" element={<Layout><RequestSuccessPage /></Layout>} />
          <Route path="/accessibility" element={<Layout><AccessibilityPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
          <Route path="/imprint" element={<Layout><ImprintPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />

          {/* Geschützte Admin-Seiten */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout><AdminDashboardPage /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}