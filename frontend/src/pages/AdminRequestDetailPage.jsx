import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Divider, FormControl, InputLabel,
    MenuItem, Paper, Select, TextField, Typography
} from '@mui/material';
import {
    fetchAdminRequestById,
    updateRequestComment,
    updateRequestStatus,
} from '../api/adminApi';

const STATUS_LABELS = {
    EINGEGANGEN: 'Eingegangen',
    IN_BEARBEITUNG: 'In Bearbeitung',
    RUECKFRAGE: 'Rückfrage',
    ABGESCHLOSSEN: 'Abgeschlossen',
    ABGELEHNT: 'Abgelehnt',
};

export default function AdminRequestDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchAdminRequestById(id).then(r => {
            setRequest(r);
            setStatus(r.status);
            setComment(r.adminComment || '');
        });
    }, [id]);

    const handleSaveStatus = async () => {
        await updateRequestStatus(id, status);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSaveComment = async () => {
        await updateRequestComment(id, comment);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (!request) return null;

    return (
        <Box sx={{ p: 3, maxWidth: 800 }}>
            <Button onClick={() => navigate('/admin/requests')} sx={{ mb: 2 }}>
                ← Zurück zur Übersicht
            </Button>

            <Typography variant="h5" component="h1" gutterBottom>
                Anfrage {request.requestNumber}
            </Typography>

            {saved && (
                <Typography color="success.main" sx={{ mb: 2 }} role="status">
                    Gespeichert.
                </Typography>
            )}

            {/* Antragsdaten */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Antragsdaten</Typography>
                <Divider sx={{ mb: 2 }} />
                <Row label="Service" value={request.serviceTitle} />
                <Row label="Name" value={request.requesterName} />
                <Row label="E-Mail" value={request.requesterEmail} />
                <Row label="Telefon" value={request.requesterPhone || '—'} />
                <Row label="Nachricht" value={request.message} />
                <Row label="Wunschtermin" value={request.preferredDate
                    ? new Date(request.preferredDate).toLocaleDateString('de-DE') : '—'} />
                <Row label="Barrierefreiheit" value={request.accessibilityNeeds || '—'} />
                <Row label="Eingegangen am" value={
                    new Date(request.createdAt).toLocaleString('de-DE')} />
            </Paper>

            {/* Statusänderung */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Status</Typography>
                <Divider sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={e => setStatus(e.target.value)}
                    >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSaveStatus}>
                    Status speichern
                </Button>
            </Paper>

            {/* Admin-Kommentar */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Interner Kommentar</Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Kommentar"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSaveComment}>
                    Kommentar speichern
                </Button>
            </Paper>
        </Box>
    );
}

function Row({ label, value }) {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}