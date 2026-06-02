const BASE_URL = 'http://localhost:8080/api/auth';

/**
 * Sendet Login-Daten ans Backend.
 * Bei Erfolg gibt das Backend die Benutzerdaten zurück
 * und setzt einen Session-Cookie.
 */
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Session-Cookie mitsenden
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login fehlgeschlagen.');
  }
  return response.json();
}

/**
 * Gibt den aktuell eingeloggten Benutzer zurück.
 * Wird beim Start der App aufgerufen um zu prüfen
 * ob noch eine gültige Session existiert.
 */
export async function fetchCurrentUser() {
  const response = await fetch(`${BASE_URL}/me`, {
    credentials: 'include',
  });
  if (!response.ok) return null;
  return response.json();
}

/**
 * Loggt den aktuellen Benutzer aus.
 */
export async function logout() {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}