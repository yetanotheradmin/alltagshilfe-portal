import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { fetchDashboard } from '../../api/adminApi';
import LoadingIndicator from '../../components/LoadingIndicator';

/**
 * Admin-Dashboard mit Kennzahlen zu Anfragen und Services.
 * Zeigt auf einen Blick wie viele Anfragen in welchem Status sind.
 */
export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard()
      .then(setDashboard)
      .catch(() => setError('Dashboard-Daten konnten nicht geladen werden.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  if (loading) return <LoadingIndicator />;

  return (
    <Container maxWidth="lg">

      {/* Header-Bereich */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 4,
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" component="h1">
            Admin-Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Eingeloggt als {user?.name} ({user?.role})
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>
          Abmelden
        </Button>
      </Box>

      {error && (
        <Typography color="error" role="alert" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Kennzahlen */}
      {dashboard && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              label="Neue Anfragen"
              value={dashboard.newRequests}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              label="In Bearbeitung"
              value={dashboard.inProgressRequests}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              label="Abgeschlossen"
              value={dashboard.completedRequests}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              label="Aktive Services"
              value={dashboard.activeServices}
              color="#7b1fa2"
            />
          </Grid>
        </Grid>
      )}

      {/* Navigation zu anderen Admin-Bereichen */}
      <Typography variant="h6" gutterBottom>
        Verwaltung
      </Typography>
      <Grid container spacing={2}>
        {[
          { label: 'Anfragen verwalten', path: '/admin/requests' },
          { label: 'Services verwalten', path: '/admin/services' },
          { label: 'Benutzer verwalten', path: '/admin/users' },
          { label: 'Portaleinstellungen', path: '/admin/settings' },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.path}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate(item.path)}
              sx={{ py: 2 }}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

/**
 * Kleine Hilfkomponente für eine einzelne Kennzahl-Karte.
 * Ausgelagert weil sie viermal mit unterschiedlichen Werten
 * verwendet wird.
 */
function StatCard({ label, value, color }) {
  return (
    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
      <Typography
        variant="h3"
        component="p"
        fontWeight="bold"
        sx={{ color }}
      >
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}