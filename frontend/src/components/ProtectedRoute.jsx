import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingIndicator from './LoadingIndicator';

/**
 * Schützt Admin-Seiten vor unbefugtem Zugriff.
 *
 * Ist der Benutzer eingeloggt → Seite wird angezeigt.
 * Ist der Benutzer nicht eingeloggt → Weiterleitung zur Login-Seite.
 *
 * Das kurze Laden beim ersten Aufruf ist nötig, weil der
 * AuthContext beim Start erst die Session vom Backend prüft.
 * Ohne diese Wartezeit würde jeder kurz zur Login-Seite
 * weitergeleitet, auch wenn er eingeloggt ist.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  // Session wird noch geprüft – kurz warten
  if (user === undefined) return <LoadingIndicator />;

  // Nicht eingeloggt → zur Login-Seite
  if (!user) return <Navigate to="/login" replace />;

  // Rolle prüfen falls angegeben
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}