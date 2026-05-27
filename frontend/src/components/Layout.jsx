import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';

/**
 * Grundlegendes Seitenlayout mit Header, Hauptinhalt und Footer.
 * Alle Seiten werden in dieses Layout eingebettet.
 *
 * Die semantische Struktur (header, main, footer) ist wichtig
 * für Screenreader und die WCAG-Konformität.
 */
export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
