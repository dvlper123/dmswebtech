const API_ROOT = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchJson(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error(`API request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getServices() {
  return fetchJson(`${API_ROOT}/api/services/`);
}

export function getServiceBySlug(slug) {
  return fetchJson(`${API_ROOT}/services/${slug}/`);
}

export function getTestimonials() {
  return fetchJson(`${API_ROOT}/testimonials/`);
}

export function getCompanyInfo() {
  return fetchJson(`${API_ROOT}/company-info/`);
}

export function submitContact(data) {
  return fetchJson(`${API_ROOT}/contacts/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
