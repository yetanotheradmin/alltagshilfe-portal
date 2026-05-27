import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { fetchServiceById } from '../api/serviceApi';
import LoadingIndicator from '../components/LoadingIndicator';

/**
 * Detailseite für ein einzelnes Serviceangebot.
 * Die ID wird aus der URL gelesen (/services/:id)
 * und zum Laden der Daten vom Backend verwendet.
 */
export default function ServiceDetailPage() {
  const { id } = useParams(); // ID aus der URL lesen
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceById(id)
      .then(setService)
      .catch(() => setError('Dieses Serviceangebot wurde nicht gefunden.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingIndicator />;

  if (error) return (
    <Container>
      <Typography color="error" role="alert">{error}</Typography>
      <Button onClick={() => navigate('/services')} sx={{ mt: 2 }}>
        Zurück zur Übersicht
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="md">

      {/* Zurück-Link */}
      <Button
        onClick={() => navigate('/services')}
        sx={{ mb: 3 }}
        aria-label="Zurück zur Serviceübersicht"
      >
        ← Zurück zur Übersicht
      </Button>

      {/* Kategorie-Badge */}
      <Chip label={service.category} sx={{ mb: 2 }} />

      {/* Titel und Beschreibung */}
      <Typography variant="h4" component="h1" gutterBottom>
        {service.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {service.description}
      </Typography>

      {/* Anfrage stellen */}
      <Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/request')}
          aria-label={`Anfrage für ${service.title} stellen`}
        >
          Anfrage stellen
        </Button>
      </Box>

    </Container>
  );
}
