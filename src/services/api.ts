const API_BASE_URL = 'https://api.sdtaxation.com/api/admin';

export interface AdminCompany {
  _id: string;
  company_name: string;
  company_email: string;
}

export interface AdminUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  role: string;
  phone?: string;
  adminArea?: string;
  company?: AdminCompany;
  status?: string;
  lastLogin?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
  token?: string;
  errors?: string[];
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}

export async function adminLogin(email: string, password: string, captcha: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, captcha }),
  });

  const data = (await response.json()) as LoginResponse | ApiError;

  if (!response.ok || !('success' in data) || !data.success) {
    const errors = 'errors' in data && data.errors ? data.errors : undefined;
    throw new Error(errors?.[0] ?? data.message ?? 'Login failed');
  }

  return data as LoginResponse;
}

export async function adminLogout(token?: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
  } catch {
    // Ignore network errors on logout; client will still clear local session
  }
}


