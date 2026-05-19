import type { HPCharacter, HPSpell } from '../types/hp.types';
import { apiGet } from '../lib/api';

const API_URL = 'https://hp-api.onrender.com/api';

// apiGEt generico. -> cada funcion lo llame.
export type CharacterFetcher = () => Promise<HPCharacter[]>;
export const getCharacters: CharacterFetcher = () => apiGet<HPCharacter[]>('/characters');

export type SpellFetcher = () => Promise<HPSpell[]>;
export const getSpells: SpellFetcher = () => apiGet<HPSpell[]>('/spells');

// TODO2: Crea un método que devuelva todo el personal de Howards
export async function getStaff(): Promise<HPCharacter[]> {
    const response = await fetch(`${API_URL}/staff`);
    if (!response.ok) {
        throw new Error(`HTTP${response.status} - ${response.statusText}`);
    }
    return response.json();
}