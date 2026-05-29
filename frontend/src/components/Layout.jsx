import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import AccessibilityToolbar from './AccessibilityToolbar';

/**
 * Grundlegendes Seitenlayout.
 *
 * Reihenfolge der Elemente:
 * 1. Skip-Link (versteckt, erscheint bei Tab-Fokus)
 * 2. Accessibility-Toolbar
 * 3. Header mit Navigation
 * 4. Hauptinhalt (main)
 * 5. Footer
 *
 * Der Skip-Link ermöglicht es Tastaturnutzer:innen,
 * die Navigation zu überspringen und direkt zum
 * Hauptinhalt zu springen.
 */
export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Skip-Link – nur bei Tastaturfokus sichtbar */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {/* Barrierefreiheits-Toolbar */}
      <AccessibilityToolbar />

      {/* Hauptnavigation */}
      <Header />

      {/* Seiteninhalt – id für Skip-Link Ziel */}
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ flexGrow: 1, p: 3 }}
      >
        {children}
      </Box>

      <Footer />

    </Box>
  );
}