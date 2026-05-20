// Contrato de la api de Harry Potter
// URL: https://hp-api.onrender.com/

import type { Character } from './domain.types';

// Interfaces

// DTO
// Mappers

export type house = 'Gryffindor';

// Api: DTO -> mapper -> Interfaz (Dominio)
export interface HPCharacter {
    id: string;
    name: string;
    house: string;
    alive: boolean;
    image: string;
}

export interface HPSpell {
    id: string;
    name: string;
    description: string;
}


export type CharacterState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success', data: Character[] }
    | { status: 'error', message: string };