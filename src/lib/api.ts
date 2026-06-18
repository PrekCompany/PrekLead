const API_BASE = "/api";

async function request<T = any>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("auth-token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options?.headers as Record<string, string>) || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `Request failed (${res.status})`);
  }

  return res.json();
}

export const api = {
  // ─── Auth ────────────────────────────────────────────
  register: (data: { email: string; password: string; name?: string; lastname?: string; business_name?: string; business_type?: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  logout: () =>
    request("/auth/logout", { method: "POST" }),

  verifyOTP: (data: { email: string; code: string }) =>
    request("/auth/verify-otp", { method: "POST", body: JSON.stringify(data) }),

  resetPasswordRequest: (data: { email: string }) =>
    request("/auth/reset-password/request", { method: "POST", body: JSON.stringify(data) }),

  resetPasswordConfirm: (data: { email: string; code: string; newPassword: string }) =>
    request("/auth/reset-password/confirm", { method: "POST", body: JSON.stringify(data) }),

  // ─── User ────────────────────────────────────────────
  getProfile: () =>
    request("/users/profile"),

  updateProfile: (data: { name?: string; lastname?: string; business_name?: string; business_type?: string }) =>
    request("/users/profile", { method: "PUT", body: JSON.stringify(data) }),

  deleteAccount: () =>
    request("/users/account", { method: "DELETE" }),

  // ─── Leads ───────────────────────────────────────────
  getLeads: (params?: Record<string, string>) => {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    return request(`/leads${qs}`);
  },

  createLead: (data: { name?: string; email?: string; phone?: string; source?: string; score?: number; notes?: string }) =>
    request("/leads", { method: "POST", body: JSON.stringify(data) }),

  updateLeadStatus: (data: { id: string; status?: string; notes?: string; score?: number }) =>
    request("/leads/status", { method: "PUT", body: JSON.stringify(data) }),

  deleteLead: (data: { id: string }) =>
    request("/leads", { method: "DELETE", body: JSON.stringify(data) }),

  // ─── CRM ─────────────────────────────────────────────
  getCustomers: () =>
    request("/crm/customers"),

  getCustomerHistory: (leadId: string) =>
    request(`/crm/history?lead_id=${leadId}`),

  addNote: (data: { lead_id: string; note: string }) =>
    request("/crm/notes", { method: "POST", body: JSON.stringify(data) }),

  getCRMStats: () =>
    request("/crm/stats"),

  // ─── Subscriptions ───────────────────────────────────
  getSubscription: () =>
    request("/subscriptions"),

  updatePlan: (data: { plan: string }) =>
    request("/subscriptions/plan", { method: "PUT", body: JSON.stringify(data) }),

  getUsage: () =>
    request("/subscriptions/usage"),

  trackUsage: (data: { type: string; count?: number }) =>
    request("/subscriptions/track", { method: "POST", body: JSON.stringify(data) }),

  // ─── Analytics ───────────────────────────────────────
  getAnalyticsSummary: () =>
    request("/analytics/summary"),

  getConversionRate: () =>
    request("/analytics/conversion"),

  // ─── Telegram ────────────────────────────────────────
  connectTelegram: (data: { phone: string; sessionData: string }) =>
    request("/telegram/connect", { method: "POST", body: JSON.stringify(data) }),

  disconnectTelegram: () =>
    request("/telegram/disconnect", { method: "POST" }),

  getTelegramStatus: () =>
    request("/telegram/status"),

  // ─── Upload ──────────────────────────────────────────
  uploadFile: async (formData: FormData) => {
    const token = localStorage.getItem("auth-token");
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Upload failed" }));
      throw new Error(err.error || "Upload failed");
    }
    return res.json();
  },

  // ─── Webhook / AI ────────────────────────────────────
  processMessage: (data: { text: string; lead_id?: string; user_id?: string; channel?: string }) =>
    request("/webhook/message", { method: "POST", body: JSON.stringify(data) }),

  generateReply: (data: { message: string; context?: any }) =>
    request("/webhook/reply", { method: "POST", body: JSON.stringify(data) }),
};

export function setAuthToken(token: string) {
  localStorage.setItem("auth-token", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("auth-token");
}

export function clearAuthToken() {
  localStorage.removeItem("auth-token");
}
