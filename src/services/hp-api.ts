import type { HPCharacter } from '../types/hp.types';

const API_URL = 'https://hp-api.onrender.com/api';

export async function getCharacters(): Promise<HPCharacter[]> {
    const response = await fetch(`${API_URL}/characters`);
    if (!response.ok) {
        throw new Error(`HTTP${response.status} - ${response.statusText}`);
    }
    return response.json();
}