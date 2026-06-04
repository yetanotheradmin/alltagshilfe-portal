import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Chip, FormControl, InputLabel, MenuItem,
    Paper, Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import { fetchAdminRequests } from '../api/adminApi';

const STATUS_COLORS = {
    EINGEGANGEN: 'default',
    IN_BEARBEITUNG: 'warning',
    RUECKFRAGE: 'info',
    ABGESCHLOSSEN: 'success',
    ABGELEHNT: 'error',
};

const STATUS_LABELS = {
    EINGEGANGEN: 'Eingegangen',
    IN_BEARBEITUNG: 'In Bearbeitung',
    RUECKFRAGE: 'Rückfrage',
    ABGESCHLOSSEN: 'Abgeschlossen',
    ABGELEHNT: 'Abgelehnt',
};

export default function AdminRequestPage() {
    const [requests, setRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminRequests().then(setRequests);
    }, []);

    const filtered = filterStatus
        ? requests.filter(r => r.status === filterStatus)
        : requests;

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h1">Anfragenverwaltung</Typography>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Status filtern</InputLabel>
                    <Select
                        value={filterStatus}
                        label="Status filtern"
                        onChange={e => setFilterStatus(e.target.value)}
                    >
                        <MenuItem value="">Alle</MenuItem>
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="Anfrageübersicht">
                    <TableHead>
                        <TableRow>
                            <TableCell>Vorgangsnr.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Datum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((r) => (
                            <TableRow
                                key={r.id}
                                hover
                                onClick={() => navigate(`/admin/requests/${r.id}`)}
                                sx={{ cursor: 'pointer' }}
                                aria-label={`Anfrage ${r.requestNumber} öffnen`}
                            >
                                <TableCell>{r.requestNumber}</TableCell>
                                <TableCell>{r.requesterName}</TableCell>
                                <TableCell>{r.serviceTitle}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={STATUS_LABELS[r.status]}
                                        color={STATUS_COLORS[r.status]}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(r.createdAt).toLocaleDateString('de-DE')}
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Keine Anfragen vorhanden
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}