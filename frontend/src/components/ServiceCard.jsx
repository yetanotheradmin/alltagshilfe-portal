import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

/**
 * Zeigt ein einzelnes Serviceangebot als Karte an.
 * Wird auf der Übersichtsseite für jedes Angebot gerendert.
 */
export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {service.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.category}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {service.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/services/${service.id}`)}
          aria-label={`Details zu ${service.title} anzeigen`}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
