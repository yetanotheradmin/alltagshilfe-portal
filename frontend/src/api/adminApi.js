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

export async function fetchAdminServices() {
  return adminFetch('/services');
}

export async function fetchAdminServiceById(id) {
  return adminFetch(`/services/${id}`);
}

export async function createAdminService(data) {
  return adminFetch('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateAdminService(id, data) {
  return adminFetch(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteAdminService(id) {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`Fehler: ${response.status}`);
}

export async function fetchAdminRequests() {
  return adminFetch('/requests');
}

export async function fetchAdminRequestById(id) {
  return adminFetch(`/requests/${id}`);
}

export async function updateRequestStatus(id, status) {
  return adminFetch(`/requests/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function updateRequestComment(id, adminComment) {
  return adminFetch(`/requests/${id}/comment`, {
    method: 'PUT',
    body: JSON.stringify({ adminComment }),
  });
}

// ── Benutzerverwaltung ──────────────────────────────────────

export async function fetchAdminUsers() {
  return adminFetch('/users');
}

export async function createAdminUser(data) {
  return adminFetch('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateUserRole(id, role) {
  return adminFetch(`/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });
}

export async function updateUserActive(id, active) {
  return adminFetch(`/users/${id}/active`, {
    method: 'PUT',
    body: JSON.stringify({ active }),
  });
}

// ── Portaleinstellungen (Admin) ─────────────────────────────

export async function fetchAdminSettings() {
  return adminFetch('/settings');
}

export async function updateAdminSettings(data) {
  return adminFetch('/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}