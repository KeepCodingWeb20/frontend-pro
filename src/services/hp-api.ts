import type { HPCharacter, HPSpell } from '../types/hp.types';
import { apiGet } from '../lib/api';
import type { HPCharacterDTO } from '../types/api.types';
import { mapCharacter } from './mappers/character.mapper';
import type { Character } from '../types/domain.types';

const API_URL = 'https://hp-api.onrender.com/api';

// apiGEt generico. -> cada funcion lo llame.
export type CharacterFetcher = () => Promise<Character[]>;
// TODO: consumir el mapper en getCharacters;
//export const getCharacters: CharacterFetcher = () => apiGet<HPCharacter[]>('/characters');
export async function getCharacters(): Promise<Character[]> {
    const dtos = await apiGet<HPCharacterDTO[]>('/characters');
    return dtos.map(mapCharacter);
};

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