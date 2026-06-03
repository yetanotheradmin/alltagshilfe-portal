import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

/**
 * Globale Navigation mit responsivem Verhalten.
 *
 * Desktop: Alle Navigationspunkte nebeneinander in der AppBar.
 * Mobil:   Hamburger-Icon öffnet ein seitliches Drawer-Menü.
 *
 * Alle interaktiven Elemente sind per Tastatur erreichbar.
 * Das Drawer-Menü kann mit Escape geschlossen werden.
 */

const navItems = [
  { label: 'Startseite', path: '/' },
  { label: 'Serviceangebote', path: '/services' },
  { label: 'Anfrage stellen', path: '/request' },
  { label: 'Barrierefreiheit', path: '/accessibility' },
  { label: 'Admin', path: '/admin' },
];

export default function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleNavigate(path) {
    navigate(path);
    setDrawerOpen(false);
  }

  return (
    <AppBar position="static" component="header">
      <Toolbar>

        {/* Portal-Logo / Name */}
        <Typography
          variant="h6"
          component="span"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          aria-label="Zur Startseite"
        >
          AlltagsHilfe Portal
        </Typography>

        {/* Desktop-Navigation */}
        {!isMobile && (
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
          </Box>
        )}

        {/* Mobile: Hamburger-Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="Navigationsmenü öffnen"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile: Drawer-Menü */}
      <Drawer
        id="mobile-nav"
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          component="nav"
          aria-label="Mobile Navigation"
          role="navigation"
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

    </AppBar>
  );
}