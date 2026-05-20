export type House = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw' | 'Unknown';

export interface Character {
    id: string;
    name: string;
    aliases: string[];
    species: string;
    gender: string;
    house: House;
    dateOfBirth: Date;
    yearOfBirth: number;
    wizzard: boolean;
    actor: string;
    alternateActors: string[];
    alive: boolean;
    image: string;
}
