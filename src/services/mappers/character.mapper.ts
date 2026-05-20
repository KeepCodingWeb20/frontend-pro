
// Un mapper es el unico punto donde tocamos un DTO

import type { HPCharacterDTO } from '../../types/api.types';
import type { Character, House } from '../../types/domain.types';

const HOUSES: House[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']

function toHouse( raw: string ): House {
    return (HOUSES as readonly string[]).includes(raw) ? (raw as House) : 'Unknown';
}

// Versión "no type-safe"
// const HOUSES2: string[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw']

// function toHouse2( raw: string ): House {
//     return HOUSES2.includes(raw) ? (raw as House) : 'Unknown';
// }

// TODO: Tiene sentido parsear la fecha en una función que lo verifique?

export function mapCharacter(dto: HPCharacterDTO): Character {
    return {
        id: dto.id,
        name: dto.name,
        aliases: dto.alternate_names,
        species: dto.species,
        gender: dto.gender,
        house: toHouse(dto.house),
        dateOfBirth: new Date(dto.dateOfBirth),
        yearOfBirth: dto.yearOfBirth,
        wizzard: dto.wizard,
        actor: dto.actor,
        alternateActors: dto.alternate_actors,
        alive: dto.alive,
        image: dto.image
    }
}