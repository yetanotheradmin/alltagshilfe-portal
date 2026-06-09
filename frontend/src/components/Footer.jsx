import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings } = useSettings();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      {/* Kontaktdaten aus Portaleinstellungen */}
      {(settings?.contactEmail || settings?.contactPhone) && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {settings.contactEmail && (
            <MuiLink href={`mailto:${settings.contactEmail}`} sx={{ mr: 2 }}>
              {settings.contactEmail}
            </MuiLink>
          )}
          {settings.contactPhone && (
            <span>{settings.contactPhone}</span>
          )}
        </Typography>
      )}

      {/* Navigation */}
      <Typography variant="body2" color="text.secondary">
        <MuiLink component={RouterLink} to="/privacy" sx={{ mr: 2 }}>
          Datenschutz
        </MuiLink>
        <MuiLink component={RouterLink} to="/imprint">
          Impressum
        </MuiLink>
      </Typography>
    </Box>
  );
}