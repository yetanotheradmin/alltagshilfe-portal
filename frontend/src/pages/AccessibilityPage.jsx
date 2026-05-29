import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Informationsseite über die Barrierefreiheitsfunktionen des Portals.
 * Erklärt Tastatursteuerung, Schriftgröße und Kontrastmodus.
 */
export default function AccessibilityPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Barrierefreiheit
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Dieses Portal wurde mit dem Ziel entwickelt, für alle Menschen
        zugänglich zu sein – unabhängig von körperlichen oder technischen
        Einschränkungen.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Schriftgröße anpassen
        </Typography>
        <Typography variant="body1">
          Über die Toolbar oben auf der Seite können Sie die Schriftgröße
          mit den Schaltflächen A−, A und A+ anpassen.
          Die Einstellung wird gespeichert und bleibt beim nächsten Besuch erhalten.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Hoher Kontrast
        </Typography>
        <Typography variant="body1">
          Mit der Schaltfläche „Kontrast" in der Toolbar aktivieren Sie einen
          Hochkontrastmodus mit schwarzem Hintergrund und hellem Text.
          Auch diese Einstellung wird gespeichert.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Tastaturbedienung
        </Typography>
        <Typography variant="body1">
          Die gesamte Anwendung ist ohne Maus bedienbar.
          Verwenden Sie die Tab-Taste zum Navigieren zwischen Elementen
          und Enter oder Leertaste zum Aktivieren von Schaltflächen.
          Der aktuelle Fokus wird durch einen sichtbaren Rahmen angezeigt.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Zum Hauptinhalt springen
        </Typography>
        <Typography variant="body1">
          Beim ersten Drücken der Tab-Taste erscheint oben links ein Link
          „Zum Hauptinhalt springen". Damit können Sie die Navigation
          überspringen und direkt mit dem Seiteninhalt beginnen.
        </Typography>
      </Box>
    </Container>
  );
}