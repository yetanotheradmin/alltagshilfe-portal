import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';

/**
 * Bestätigungsseite nach erfolgreich gesendeter Anfrage.
 *
 * Die Vorgangsnummer wird über den Router-State empfangen,
 * den die RequestFormPage beim Weiterleiten mitgibt.
 * Falls jemand die Seite direkt aufruft (kein State),
 * wird ein Hinweis angezeigt.
 */
export default function RequestSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const response = location.state?.response;

  // Direktaufruf ohne vorherige Formularübermittlung abfangen
  if (!response) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Keine Anfragedaten gefunden
        </Typography>
        <Button variant="contained" onClick={() => navigate('/request')}>
          Zum Anfrageformular
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>

      {/* Erfolgsmeldung */}
      <Alert severity="success" sx={{ mb: 4 }}>
        Ihre Anfrage wurde erfolgreich eingereicht.
      </Alert>

      {/* Vorgangsnummer */}
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center', mb: 4 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Ihre Vorgangsnummer
        </Typography>
        <Typography variant="h4" component="p" fontWeight="bold">
          {response.requestNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Bitte notieren Sie diese Nummer für Rückfragen.
        </Typography>
      </Paper>

      {/* Hinweis zur weiteren Bearbeitung */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.
        Bei Fragen erreichen Sie uns über die Kontaktdaten auf der Startseite.
      </Typography>

      {/* Zurück zur Startseite */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Zurück zur Startseite
        </Button>
      </Box>

    </Container>
  );
}