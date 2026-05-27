import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

/**
 * Globale Fußzeile mit Links zu Datenschutz und Impressum.
 * Verwendet semantisches <footer>-Element.
 */
export default function Footer() {
  const navigate = useNavigate();

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
      <Typography variant="body2" color="text.secondary">
        <Link
          component="button"
          onClick={() => navigate('/privacy')}
          sx={{ mr: 2 }}
        >
          Datenschutz
        </Link>
        <Link
          component="button"
          onClick={() => navigate('/imprint')}
        >
          Impressum
        </Link>
      </Typography>
    </Box>
  );
}
