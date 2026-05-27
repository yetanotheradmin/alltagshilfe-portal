import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { fetchServices } from '../api/serviceApi';
import ServiceCard from '../components/ServiceCard';
import LoadingIndicator from '../components/LoadingIndicator';

/**
 * Übersichtsseite aller aktiven Serviceangebote.
 * Lädt die Angebote vom Backend und zeigt sie als Kachelraster an.
 * Deaktivierte Angebote werden vom Backend bereits herausgefiltert.
 */
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setError('Serviceangebote konnten nicht geladen werden.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingIndicator />;

  if (error) return (
    <Container>
      <Typography color="error" role="alert">{error}</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Unsere Serviceangebote
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Wählen Sie ein Angebot aus, um mehr zu erfahren oder eine Anfrage zu stellen.
        </Typography>
      </Box>

      {/* Responsive Kachelraster – 1 Spalte auf Mobil, 3 auf Desktop */}
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>

      {/* Direkter Einstieg ins Formular */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/request')}
        >
          Direkt Anfrage stellen
        </Button>
      </Box>
    </Container>
  );
}
