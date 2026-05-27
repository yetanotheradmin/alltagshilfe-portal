const BASE_URL = 'http://localhost:8080/api/public';

/**
 * Sendet eine neue Serviceanfrage an das Backend.
 * Gibt die Antwort mit Vorgangsnummer zurück.
 */
export async function submitRequest(data) {
  const response = await fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw error; // Validierungsfehler vom Backend direkt weitergeben
  }
  return response.json();
}
