const BASE_URL = 'http://localhost:8080/api/public';

/**
 * Lädt alle aktiven Serviceangebote für die Übersichtsseite.
 */
export async function fetchServices() {
  const response = await fetch(`${BASE_URL}/services`);
  if (!response.ok) throw new Error('Serviceangebote konnten nicht geladen werden.');
  return response.json();
}

/**
 * Lädt ein einzelnes Serviceangebot anhand seiner ID.
 * Wird auf der Detailseite verwendet.
 */
export async function fetchServiceById(id) {
  const response = await fetch(`${BASE_URL}/services/${id}`);
  if (!response.ok) throw new Error('Serviceangebot nicht gefunden.');
  return response.json();
}
