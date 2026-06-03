import { useEffect, useState } from 'react';
import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, IconButton, Paper, Switch,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  fetchAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from '../api/adminApi';

const emptyForm = { title: '', description: '', category: '', active: true };

export default function AdminServicePage() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const load = () =>
    fetchAdminServices().then(setServices);

  useEffect(() => { load(); }, []);

  const handleOpen = (service = null) => {
    if (service) {
      setEditId(service.id);
      setForm({
        title: service.title,
        description: service.description,
        category: service.category || '',
        active: service.active,
      });
    } else {
      setEditId(null);
      setForm(emptyForm);
    }
    setErrors({});
    setOpen(true);
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Titel ist erforderlich';
    if (!form.description.trim()) e.description = 'Beschreibung ist erforderlich';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    if (editId) {
      await updateAdminService(editId, form);
    } else {
      await createAdminService(form);
    }
    setOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Service wirklich löschen?')) return;
    await deleteAdminService(id);
    load();
  };

  const handleToggleActive = async (service) => {
    await updateAdminService(service.id, {
      ...service,
      active: !service.active,
    });
    load();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">Serviceverwaltung</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Neuer Service
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="Serviceübersicht">
          <TableHead>
            <TableRow>
              <TableCell>Titel</TableCell>
              <TableCell>Kategorie</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.title}</TableCell>
                <TableCell>{s.category || '—'}</TableCell>
                <TableCell>
                  <Chip
                    label={s.active ? 'Aktiv' : 'Inaktiv'}
                    color={s.active ? 'success' : 'default'}
                    size="small"
                    onClick={() => handleToggleActive(s)}
                    aria-label={`Status ${s.active ? 'deaktivieren' : 'aktivieren'}`}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label={`${s.title} bearbeiten`}
                    onClick={() => handleOpen(s)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={`${s.title} löschen`}
                    onClick={() => handleDelete(s.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Noch keine Services vorhanden
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Service bearbeiten' : 'Neuer Service'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Titel *"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <TextField
            label="Beschreibung *"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Kategorie"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.active}
                onChange={e => setForm({ ...form, active: e.target.checked })}
              />
            }
            label="Service aktiv"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Abbrechen</Button>
          <Button variant="contained" onClick={handleSave}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}