import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
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
import AdminServicePage from './pages/AdminServicePage';
import AdminRequestPage from './pages/AdminRequestPage';
import AdminRequestDetailPage from './pages/AdminRequestDetailPage';
import AdminUserPage from './pages/AdminUserPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

/**
 * Innere App-Komponente — hat Zugriff auf SettingsContext
 * und kann daraus das MUI-Theme dynamisch ableiten.
 */
function AppRoutes() {
  const { settings } = useSettings();

  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: settings?.primaryColor || '#1976d2',
      },
      secondary: {
        main: settings?.secondaryColor || '#dc004e',
      },
    },
  }), [settings?.primaryColor, settings?.secondaryColor]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            <ProtectedRoute><Layout><AdminDashboardPage /></Layout></ProtectedRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedRoute><Layout><AdminServicePage /></Layout></ProtectedRoute>
          } />
          <Route path="/admin/requests" element={
            <ProtectedRoute><Layout><AdminRequestPage /></Layout></ProtectedRoute>
          } />
          <Route path="/admin/requests/:id" element={
            <ProtectedRoute><Layout><AdminRequestDetailPage /></Layout></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute><Layout><AdminUserPage /></Layout></ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute><Layout><AdminSettingsPage /></Layout></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SettingsProvider>
  );
}