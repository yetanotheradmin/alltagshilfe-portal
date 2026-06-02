const BASE_URL = 'http://localhost:8080/api/admin';

/**
 * Hilfsfunktion für authentifizierte Admin-Anfragen.
 * Schickt immer den Session-Cookie mit und wirft einen
 * Fehler wenn der Server 401 oder 403 zurückgibt.
 */
async function adminFetch(path, options = {}) {
    console.log('Fetching:', `${BASE_URL}${path}`); // temporär
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  console.log('Response status:', response.status); // temporär
  if (!response.ok) throw new Error(`Fehler: ${response.status}`);
  return response.json();
}

export async function fetchDashboard() {
  return adminFetch('/dashboard');
}