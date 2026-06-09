import { useEffect, useState } from 'react';
import {
    Box, Button, Chip, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, IconButton, InputLabel, MenuItem,
    Paper, Select, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
    createAdminUser,
    fetchAdminUsers,
    updateUserActive,
    updateUserRole,
} from '../api/adminApi';

const ROLE_LABELS = { USER: 'Benutzer', STAFF: 'Mitarbeiter', ADMIN: 'Admin' };
const ROLE_COLORS = { USER: 'default', STAFF: 'info', ADMIN: 'error' };

const emptyForm = { name: '', email: '', password: '', role: 'STAFF' };

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    const load = () => fetchAdminUsers().then(setUsers);
    useEffect(() => { load(); }, []);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name ist erforderlich';
        if (!form.email.trim()) e.email = 'E-Mail ist erforderlich';
        if (!form.password.trim()) e.password = 'Passwort ist erforderlich';
        return e;
    };

    const handleSave = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        await createAdminUser(form);
        setOpen(false);
        setForm(emptyForm);
        load();
    };

    const handleRoleChange = async (id, role) => {
        await updateUserRole(id, role);
        load();
    };

    const handleToggleActive = async (user) => {
        await updateUserActive(user.id, !user.active);
        load();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h1">Benutzerverwaltung</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Neuer Benutzer
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table aria-label="Benutzerübersicht">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Rolle</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    <Select
                                        size="small"
                                        value={u.role}
                                        onChange={e => handleRoleChange(u.id, e.target.value)}
                                        aria-label={`Rolle von ${u.name}`}
                                    >
                                        {Object.entries(ROLE_LABELS).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>{label}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={u.active ? 'Aktiv' : 'Inaktiv'}
                                        color={u.active ? 'success' : 'default'}
                                        size="small"
                                        onClick={() => handleToggleActive(u)}
                                        aria-label={`${u.name} ${u.active ? 'deaktivieren' : 'aktivieren'}`}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Keine Benutzer vorhanden
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Neuer Benutzer</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="Name *"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                    <TextField
                        label="E-Mail *"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />
                    <TextField
                        label="Passwort *"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Rolle</InputLabel>
                        <Select
                            value={form.role}
                            label="Rolle"
                            onChange={e => setForm({ ...form, role: e.target.value })}
                        >
                            {Object.entries(ROLE_LABELS).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Abbrechen</Button>
                    <Button variant="contained" onClick={handleSave}>Speichern</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}