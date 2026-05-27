// Basis-URL des Backends – in Produktion würde hier die echte Domain stehen
const BASE_URL = 'http://localhost:8080/api/public';

/**
 * Lädt die White-Label-Portaleinstellungen vom Backend.
 * Wird beim Start der App aufgerufen, um Portalname,
 * Farben und Kontaktdaten zu laden.
 */
export async function fetchSettings() {
  const response = await fetch(`${BASE_URL}/settings`);
  if (!response.ok) throw new Error('Portaleinstellungen konnten nicht geladen werden.');
  return response.json();
}
