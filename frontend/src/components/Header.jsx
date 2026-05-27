import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

/**
 * Globale Navigation der Anwendung.
 * Verwendet semantisches <header>-Element.
 * Alle Navigationspunkte sind per Tastatur erreichbar.
 */
export default function Header() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Startseite', path: '/' },
    { label: 'Serviceangebote', path: '/services' },
    { label: 'Anfrage stellen', path: '/request' },
    { label: 'Barrierefreiheit', path: '/accessibility' },
  ];

  return (
    <AppBar position="static" component="header">
      <Toolbar>
        <Typography
          variant="h6"
          component="span"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          AlltagsHilfe Portal
        </Typography>
        <Box component="nav" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={() => navigate('/login')}>
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
