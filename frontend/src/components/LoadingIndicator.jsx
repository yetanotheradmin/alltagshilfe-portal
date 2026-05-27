import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Wird angezeigt während Daten vom Backend geladen werden.
 * Zentriert auf der Seite, mit aria-label für Screenreader.
 */
export default function LoadingIndicator() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      role="status"
      aria-label="Inhalte werden geladen"
    >
      <CircularProgress />
    </Box>
  );
}
