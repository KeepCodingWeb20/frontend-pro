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

const HOUSE_COLORS = {
  Gryffindor: '#7f0909',
  Slytherin:  '#1a472a',
  Hufflepuff: '#ecb939',
  Ravenclaw:  '#0e1a40',
  Unknown:    '#666666',
} satisfies Record<House, string>; // -> string


// El tipo resultante es { Gryffindor: string }
// const c: '#7f0909' = HOUSE_COLORS.Gryffindor;