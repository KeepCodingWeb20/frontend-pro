// Contrato de la api de Harry Potter
// URL: https://hp-api.onrender.com/

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
    | { status: 'success', data: HPCharacter[] }
    | { status: 'error', message: string };