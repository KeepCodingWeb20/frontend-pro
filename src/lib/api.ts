const API_URL = 'https://hp-api.onrender.com/api';

export async function apiGet<T>(path: string): Promise<T> {
    const r = await fetch(`${API_URL}${path}`);
    if (!r.ok) throw new Error(`HTTP${r.status} - ${r.statusText}`);
    return r.json() as Promise<T>;
}