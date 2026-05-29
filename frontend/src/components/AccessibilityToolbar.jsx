import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/**
 * Barrierefreiheits-Toolbar mit Schriftgrößensteuerung
 * und Kontrastmodus-Umschalter.
 *
 * Einstellungen werden in localStorage gespeichert,
 * damit sie nach einem Neuladen erhalten bleiben.
 *
 * Die Toolbar ist vollständig per Tastatur bedienbar –
 * alle Buttons sind fokussierbar und haben aria-labels.
 */

// Verfügbare Schriftgrößen in Pixeln
const FONT_SIZES = {
  small: 14,
  normal: 16,
  large: 20,
};

export default function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);

  // Gespeicherte Einstellungen beim ersten Laden wiederherstellen
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    const savedContrast = localStorage.getItem('highContrast') === 'true';

    setFontSize(savedFontSize);
    setHighContrast(savedContrast);
    applyFontSize(savedFontSize);
    applyContrast(savedContrast);
  }, []);

  function applyFontSize(size) {
    // Schriftgröße direkt auf das <html>-Element setzen,
    // damit alle rem-Werte relativ dazu skalieren
    document.documentElement.style.fontSize = `${FONT_SIZES[size]}px`;
  }

  function applyContrast(enabled) {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  function handleFontSize(size) {
    setFontSize(size);
    applyFontSize(size);
    localStorage.setItem('fontSize', size);
  }

  function handleContrastToggle() {
    const newValue = !highContrast;
    setHighContrast(newValue);
    applyContrast(newValue);
    localStorage.setItem('highContrast', String(newValue));
  }

  return (
    <Box
      component="aside"
      aria-label="Barrierefreiheitseinstellungen"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 0.5,
        backgroundColor: '#e3f2fd',
        borderBottom: '1px solid #bbdefb',
        flexWrap: 'wrap',
      }}
    >
      {/* Label */}
      <Typography variant="caption" sx={{ mr: 1, fontWeight: 'bold' }}>
        Barrierefreiheit:
      </Typography>

      {/* Schriftgrößen-Buttons */}
      <Tooltip title="Schrift verkleinern">
        <Button
          size="small"
          variant={fontSize === 'small' ? 'contained' : 'outlined'}
          onClick={() => handleFontSize('small')}
          aria-label="Schrift verkleinern"
          aria-pressed={fontSize === 'small'}
          sx={{ minWidth: 36, fontWeight: 'bold', fontSize: '0.75rem' }}
        >
          A−
        </Button>
      </Tooltip>

      <Tooltip title="Standardgröße">
        <Button
          size="small"
          variant={fontSize === 'normal' ? 'contained' : 'outlined'}
          onClick={() => handleFontSize('normal')}
          aria-label="Standardschriftgröße"
          aria-pressed={fontSize === 'normal'}
          sx={{ minWidth: 36, fontWeight: 'bold', fontSize: '0.875rem' }}
        >
          A
        </Button>
      </Tooltip>

      <Tooltip title="Schrift vergrößern">
        <Button
          size="small"
          variant={fontSize === 'large' ? 'contained' : 'outlined'}
          onClick={() => handleFontSize('large')}
          aria-label="Schrift vergrößern"
          aria-pressed={fontSize === 'large'}
          sx={{ minWidth: 36, fontWeight: 'bold', fontSize: '1rem' }}
        >
          A+
        </Button>
      </Tooltip>

      {/* Trennlinie */}
      <Box sx={{ width: '1px', height: '24px', backgroundColor: '#90caf9', mx: 1 }} />

      {/* Kontrastmodus */}
      <Tooltip title={highContrast ? 'Normalmodus aktivieren' : 'Hohen Kontrast aktivieren'}>
        <Button
          size="small"
          variant={highContrast ? 'contained' : 'outlined'}
          onClick={handleContrastToggle}
          aria-label={highContrast ? 'Normalmodus aktivieren' : 'Hohen Kontrast aktivieren'}
          aria-pressed={highContrast}
          sx={{ fontWeight: 'bold' }}
        >
          {highContrast ? 'Kontrast: AN' : 'Kontrast: AUS'}
        </Button>
      </Tooltip>

    </Box>
  );
}