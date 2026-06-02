import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context/AuthContext';

/**
 * Login-Seite für den Adminbereich.
 *
 * Nach erfolgreichem Login wird zur Admin-Dashboard-Seite
 * weitergeleitet. Falsche Zugangsdaten zeigen eine
 * verständliche Fehlermeldung.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin-Login
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nur für autorisierte Mitarbeiter:innen
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} role="alert">
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            required
            label="E-Mail-Adresse"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            inputProps={{ 'aria-required': 'true' }}
            autoComplete="email"
          />
          <TextField
            fullWidth
            required
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            inputProps={{ 'aria-required': 'true' }}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Wird angemeldet…' : 'Anmelden'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}