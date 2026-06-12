import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { fetchSettings } from '../api/settingsApi';
import LoadingIndicator from '../components/LoadingIndicator';

/**
 * Startseite des Portals.
 * Lädt beim ersten Rendern die Portaleinstellungen vom Backend
 * und zeigt Begrüßungstext, Kontaktdaten und einen
 * Call-to-Action-Button an.
 */
export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings()
      .then(setSettings)
      .catch(() => setError('Portaleinstellungen konnten nicht geladen werden.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingIndicator />;
  if (error) return (
    <Container>
      <Typography color="error" role="alert">{error}</Typography>
    </Container>
  );

  return (
    <Container maxWidth="md">

      {/* Hero-Bereich */}
      <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 8 }, mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
        >
          {settings.portalTitle}
        </Typography>
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom>
          {settings.municipalityName}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, mb: 4, maxWidth: 600, mx: 'auto' }}
        >
          {settings.welcomeText}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/request')}
          aria-label="Zur Anfrageseite wechseln"
        >
          Hilfe anfragen
        </Button>
      </Box>

      {/* Kontaktbereich */}
      <Paper elevation={1} sx={{ p: { xs: 2, md: 4 }, mt: 6 }}>
        <Typography variant="h6" component="h2" gutterBottom textAlign="center">
          Kontakt
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" color="primary" aria-hidden="true" />
              <a href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" color="primary" aria-hidden="true" />
              <Typography variant="body2">{settings.contactPhone}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

    </Container>
  );
}