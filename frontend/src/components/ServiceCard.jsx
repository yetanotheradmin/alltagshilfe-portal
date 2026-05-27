import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

/**
 * Zeigt ein einzelnes Serviceangebot als Karte an.
 * sx={{ height: '100%' }} sorgt dafür, dass alle Karten
 * im Grid gleich hoch sind, unabhängig vom Textinhalt.
 */
export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          label={service.category}
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          {service.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/services/${service.id}`)}
          aria-label={`Details zu ${service.title} anzeigen`}
        >
          Details ansehen
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate('/request')}
          aria-label={`Anfrage für ${service.title} stellen`}
        >
          Anfragen
        </Button>
      </CardActions>
    </Card>
  );
}
