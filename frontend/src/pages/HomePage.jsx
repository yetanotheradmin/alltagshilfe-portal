import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

      {/* Portalname und Kommune */}
      <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {settings.portalTitle}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {settings.municipalityName}
        </Typography>

        {/* Begrüßungstext */}
        <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: 600, mx: 'auto' }}>
          {settings.welcomeText}
        </Typography>

        {/* Call-to-Action */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/request')}
          aria-label="Zur Anfrageseite wechseln"
        >
          Hilfe anfragen
        </Button>
      </Box>

      {/* Kontaktdaten */}
      <Box sx={{ textAlign: 'center', mt: 6, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Kontakt</Typography>
        <Typography variant="body2">
          E-Mail:{' '}
          <a href={`mailto:${settings.contactEmail}`}>
            {settings.contactEmail}
          </a>
        </Typography>
        <Typography variant="body2">
          Telefon: {settings.contactPhone}
        </Typography>
      </Box>

    </Container>
  );
}
