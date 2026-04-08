const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export type Mission = {
  id: number;
  client: number;
  vehicle: number;
  formula: 'essentiel' | 'premium';
  address: string;
  scheduled_at: string;
  status: 'pending' | 'assigned' | 'en_route' | 'on_site' | 'washing' | 'completed' | 'cancelled';
};

export type DashboardStats = {
  date: string;
  bookings_today: number;
  bookings_by_status: Record<string, number>;
  active_missions: number;
};

async function fetcher<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Erreur API');
  }

  return res.json();
}

export const api = {
  getDashboardStats: () => fetcher<DashboardStats>('/ops/dashboard'),
  getBookings: () => fetcher<Mission[]>('/bookings/'),
  getBooking: (id: number) => fetcher<Mission>(`/bookings/${id}/`),
};
