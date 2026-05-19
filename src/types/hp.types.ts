// Contrato de la api de Harry Potter
// URL: https://hp-api.onrender.com/

export interface HPCharacter {
    id: string;
    name: string;
    house: string;
    alive: boolean;
    image: string;
}


export type CharacterState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success', data: HPCharacter[] }
    | { status: 'error', message: string };