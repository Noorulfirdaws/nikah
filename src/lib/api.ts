// Client for nikah-api. Falls back to a clearly-labeled offline/demo mode
// when no API URL is configured, so the rest of the app never has to guess
// whether a real backend is present.

const API_URL = import.meta.env.VITE_API_URL as string | undefined

export const API_CONNECTED = Boolean(API_URL)

export class ApiError extends Error {
  status: number
  fields?: Record<string, string[] | undefined>
  constructor(message: string, status: number, fields?: Record<string, string[] | undefined>) {
    super(message)
    this.status = status
    this.fields = fields
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new ApiError('No API configured — running in offline demo mode', 0)
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(body.error ?? `Request failed (${res.status})`, res.status, body.fields)
  }
  return body as T
}

export interface AuthUser {
  id: string
  name: string
  email: string
  plan: 'FREE' | 'PREMIUM' | 'FAMILY'
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export function registerAccount(input: {
  name: string
  email: string
  password: string
  gender: 'BROTHER' | 'SISTER'
  country?: string
}): Promise<AuthResponse> {
  return request('/api/auth/register', { method: 'POST', body: JSON.stringify(input) })
}

export function loginAccount(input: { email: string; password: string }): Promise<AuthResponse> {
  return request('/api/auth/login', { method: 'POST', body: JSON.stringify(input) })
}

const TOKEN_KEY = 'nikah_token'

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
