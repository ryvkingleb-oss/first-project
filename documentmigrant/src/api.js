async function request(path, options) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Не получилось выполнить запрос");
  return data;
}

export const api = {
  me: () => request("/api/me"),
  register: (body) => request("/api/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/api/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/api/logout", { method: "POST", body: "{}" }),
  documents: () => request("/api/documents"),
  createDocument: (procedureId) =>
    request("/api/documents", { method: "POST", body: JSON.stringify({ procedureId }) }),
  document: (id) => request(`/api/documents/${id}`),
  saveDocument: (id, values, step) =>
    request(`/api/documents/${id}`, { method: "PUT", body: JSON.stringify({ values, step }) }),
  quote: (id) => request(`/api/documents/${id}/quote`),
  checkout: (id) =>
    request(`/api/documents/${id}/checkout`, { method: "POST", body: JSON.stringify({ confirm: true }) }),
  email: (id, to) =>
    request(`/api/documents/${id}/email`, { method: "POST", body: JSON.stringify({ to }) }),
};
