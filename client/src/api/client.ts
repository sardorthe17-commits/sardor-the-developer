import type { LinkItem, LinkPayload } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:5000'

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new ApiError(
      `Backendga ulanib bo'lmadi (${API_BASE}). Backend ishga tushganini tekshiring.`,
      0,
    )
  }

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new ApiError(body?.message || `So'rov xato bo'ldi (${res.status})`, res.status)
  }

  return body as T
}

// Backend @Controller() prefiks bermagan, shu sababli Links marshrutlari
// bevosita root ('/') ostida turadi: GET/POST /, PUT/DELETE /:id
export async function fetchLinks(): Promise<LinkItem[]> {
  const res = await request<{ seccuss?: boolean; data?: LinkItem[] }>('/')
  return res.data ?? []
}

export async function createLink(payload: LinkPayload) {
  return request<{ seccuss?: boolean; message?: string }>('/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateLink(id: string, payload: Partial<LinkPayload>) {
  return request<{ seccuss?: boolean; message?: string }>(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteLink(id: string) {
  return request<{ seccuss?: boolean; seccess?: boolean; message?: string }>(`/${id}`, {
    method: 'DELETE',
  })
}

export async function loginAdmin(login: string, parol: string) {
  return request<{ success: boolean; message?: string }>('/login', {
    method: 'POST',
    body: JSON.stringify({ login, parol }),
  })
}

export { ApiError }
