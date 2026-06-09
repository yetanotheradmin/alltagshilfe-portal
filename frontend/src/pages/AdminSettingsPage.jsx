import { useEffect, useState } from 'react';
import {
    Box, Button, Divider, Grid, Paper, TextField, Typography
} from '@mui/material';
import { fetchAdminSettings, updateAdminSettings } from '../api/adminApi';
import { useSettings } from '../context/SettingsContext';

export default function AdminSettingsPage() {
    const [form, setForm] = useState(null);
    const [saved, setSaved] = useState(false);
    const { setSettings } = useSettings();

    useEffect(() => {
        fetchAdminSettings().then(setForm);
    }, []);

    const handleChange = (field) => (e) =>
        setForm({ ...form, [field]: e.target.value });

    const handleSave = async () => {
        const updated = await updateAdminSettings(form);
        setSettings(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (!form) return null;

    return (
        <Box sx={{ p: 3, maxWidth: 800 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Portaleinstellungen
            </Typography>

            {saved && (
                <Typography color="success.main" sx={{ mb: 2 }} role="status">
                    Einstellungen gespeichert.
                </Typography>
            )}

            {/* Allgemein */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Allgemein</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Kommune"
                            value={form.municipalityName || ''}
                            onChange={handleChange('municipalityName')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Portalname"
                            value={form.portalTitle || ''}
                            onChange={handleChange('portalTitle')} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={3} label="Begrüßungstext"
                            value={form.welcomeText || ''}
                            onChange={handleChange('welcomeText')} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Kontakt */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Kontakt</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Kontakt-E-Mail"
                            value={form.contactEmail || ''}
                            onChange={handleChange('contactEmail')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Telefonnummer"
                            value={form.contactPhone || ''}
                            onChange={handleChange('contactPhone')} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Design */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Design</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Primärfarbe (Hex)"
                            value={form.primaryColor || ''}
                            onChange={handleChange('primaryColor')}
                            placeholder="#005EA8" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Sekundärfarbe (Hex)"
                            value={form.secondaryColor || ''}
                            onChange={handleChange('secondaryColor')}
                            placeholder="#FFCC00" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Logo-URL"
                            value={form.logoUrl || ''}
                            onChange={handleChange('logoUrl')} />
                    </Grid>
                </Grid>
            </Paper>

            {/* Rechtliches */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Rechtliches</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={4} label="Impressum"
                            value={form.imprintText || ''}
                            onChange={handleChange('imprintText')} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth multiline rows={4} label="Datenschutztext"
                            value={form.privacyText || ''}
                            onChange={handleChange('privacyText')} />
                    </Grid>
                </Grid>
            </Paper>

            <Button variant="contained" size="large" onClick={handleSave}>
                Einstellungen speichern
            </Button>
        </Box>
    );
}