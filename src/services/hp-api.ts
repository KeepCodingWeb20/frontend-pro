import type { HPCharacter, HPSpell } from '../types/hp.types';
import { apiGet } from '../lib/api';

const API_URL = 'https://hp-api.onrender.com/api';

// apiGEt generico. -> cada funcion lo llame.
export type CharacterFetcher = () => Promise<HPCharacter[]>;
export const getCharacters: CharacterFetcher = () => apiGet<HPCharacter[]>('/characters');

// TODO2: Migra esta funcion
export async function getSpells(): Promise<HPSpell[]> {
    const response = await fetch(`${API_URL}/spells`);
    if (!response.ok) {
        throw new Error(`HTTP${response.status} - ${response.statusText}`);
    }
    return response.json();
}

// TODO2: Crea un método que devuelva todo el personal de Howards
export async function getStaff(): Promise<HPCharacter[]> {
    const response = await fetch(`${API_URL}/staff`);
    if (!response.ok) {
        throw new Error(`HTTP${response.status} - ${response.statusText}`);
    }
    return response.json();
}