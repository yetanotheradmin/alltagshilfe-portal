import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import { fetchServices } from '../api/serviceApi';
import { submitRequest } from '../api/requestApi';

/**
 * Anfrageformular für Bürger:innen.
 *
 * Validierung läuft zweistufig:
 * 1. Frontend-Validierung vor dem Absenden (sofortiges Feedback)
 * 2. Backend-Validierung nach dem Absenden (Sicherheitsnetz)
 *
 * Bei Erfolg wird zur Bestätigungsseite weitergeleitet,
 * die Vorgangsnummer wird über den Router-State übergeben.
 */
export default function RequestFormPage() {
  const navigate = useNavigate();

  // Formulardaten
  const [form, setForm] = useState({
    serviceOfferId: '',
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    message: '',
    preferredDate: '',
    accessibilityNeeds: '',
  });

  // Datenschutz-Checkbox separat, weil kein String-Wert
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Validierungsfehler pro Feld
  const [errors, setErrors] = useState({});

  // Allgemeiner Fehler (z.B. Backend nicht erreichbar)
  const [submitError, setSubmitError] = useState(null);

  // Wird während des Absendens auf true gesetzt
  const [loading, setLoading] = useState(false);

  // Serviceangebote für das Dropdown
  const [services, setServices] = useState([]);

  // Serviceangebote beim ersten Rendern laden
  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() => setSubmitError('Serviceangebote konnten nicht geladen werden.'));
  }, []);

  // Einzelnes Formularfeld aktualisieren
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Fehler für dieses Feld zurücksetzen sobald der Nutzer tippt
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  // Frontend-Validierung – gibt true zurück wenn alles valid ist
  function validate() {
    const newErrors = {};

    if (!form.serviceOfferId) {
      newErrors.serviceOfferId = 'Bitte wählen Sie ein Serviceangebot aus.';
    }
    if (!form.requesterName.trim()) {
      newErrors.requesterName = 'Bitte geben Sie Ihren Namen ein.';
    }
    if (!form.requesterEmail.trim()) {
      newErrors.requesterEmail = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.requesterEmail)) {
      newErrors.requesterEmail = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Bitte beschreiben Sie Ihr Anliegen.';
    }
    if (!privacyAccepted) {
      newErrors.privacy = 'Bitte stimmen Sie der Datenverarbeitung zu.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    // Abbrechen wenn Frontend-Validierung fehlschlägt
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await submitRequest(form);
      // Vorgangsnummer zur Bestätigungsseite mitgeben
      navigate('/request/success', { state: { response } });
    } catch (err) {
      // Backend-Validierungsfehler (z.B. { requesterEmail: "..." })
      if (err && typeof err === 'object' && !err.message) {
        setErrors(err);
      } else {
        setSubmitError('Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Anfrage stellen
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Füllen Sie das Formular aus. Wir melden uns schnellstmöglich bei Ihnen.
      </Typography>

      {/* Allgemeiner Fehler oben im Formular */}
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }} role="alert">
          {submitError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>

        {/* Serviceangebot */}
        <TextField
          select
          fullWidth
          required
          label="Serviceangebot"
          name="serviceOfferId"
          value={form.serviceOfferId}
          onChange={handleChange}
          error={!!errors.serviceOfferId}
          helperText={errors.serviceOfferId}
          sx={{ mb: 3 }}
          inputProps={{ 'aria-required': 'true' }}
        >
          <MenuItem value="">— Bitte auswählen —</MenuItem>
          {services.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
          ))}
        </TextField>

        {/* Name */}
        <TextField
          fullWidth
          required
          label="Ihr Name"
          name="requesterName"
          value={form.requesterName}
          onChange={handleChange}
          error={!!errors.requesterName}
          helperText={errors.requesterName}
          sx={{ mb: 3 }}
          inputProps={{ 'aria-required': 'true' }}
        />

        {/* E-Mail */}
        <TextField
          fullWidth
          required
          label="E-Mail-Adresse"
          name="requesterEmail"
          type="email"
          value={form.requesterEmail}
          onChange={handleChange}
          error={!!errors.requesterEmail}
          helperText={errors.requesterEmail}
          sx={{ mb: 3 }}
          inputProps={{ 'aria-required': 'true' }}
        />

        {/* Telefon (optional) */}
        <TextField
          fullWidth
          label="Telefonnummer (optional)"
          name="requesterPhone"
          type="tel"
          value={form.requesterPhone}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        {/* Beschreibung */}
        <TextField
          fullWidth
          required
          multiline
          rows={4}
          label="Ihr Anliegen"
          name="message"
          value={form.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message}
          sx={{ mb: 3 }}
          inputProps={{ 'aria-required': 'true' }}
        />

        {/* Wunschdatum (optional) */}
        <TextField
          fullWidth
          label="Wunschdatum (optional)"
          name="preferredDate"
          type="date"
          value={form.preferredDate}
          onChange={handleChange}
          sx={{ mb: 3 }}
          InputLabelProps={{ shrink: true }}
        />

        {/* Unterstützungsbedarf (optional) */}
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Besondere Unterstützungsbedarfe (optional)"
          name="accessibilityNeeds"
          value={form.accessibilityNeeds}
          onChange={handleChange}
          helperText="z.B. Rollstuhl, Gehilfe, Gebärdensprache"
          sx={{ mb: 3 }}
        />

        {/* Datenschutz-Zustimmung */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (errors.privacy) setErrors(prev => ({ ...prev, privacy: null }));
                }}
                inputProps={{ 'aria-required': 'true' }}
              />
            }
            label="Ich stimme der Verarbeitung meiner Daten zur Bearbeitung dieser Anfrage zu."
          />
          {/* Fehlermeldung für Checkbox – nicht nur farblich, sondern auch als Text */}
          {errors.privacy && (
            <Typography
              variant="caption"
              color="error"
              display="block"
              role="alert"
            >
              {errors.privacy}
            </Typography>
          )}
        </Box>

        {/* Absenden */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Wird gesendet…' : 'Anfrage absenden'}
        </Button>

      </Box>
    </Container>
  );
}