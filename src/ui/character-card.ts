
// Recibe un Character

import type { Character } from '../types/domain.types';

// Devuelve un Elemento HTML (componente) correspondiente a ese character
// Acaba devolviendo una "CARD"
export function renderCharacter(character: Character): HTMLElement {
    const card = document.createElement('article');

    card.className = 'character-card flex gap-3 p-4 rounder-lg bg-white shadow-sm border-l-4 hover:shadow-md transition-shadow cursor-pointer';

    // TODO
    // With 16*
    //. Height 16*
    // Border radius 50%
    // Object-fit COVER
    // Flex shrink: 0
    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    img.className = 'w-16 h-16 rounded-full object-cover flex-shrink-0'
    card.append(img);

    // Nombre h3
    const name = document.createElement('h3');
    name.textContent = character.name;
    name.classList = 'font-semibold text-base';
    card.append(name);

    // House "p" -> clase 'house'
    const house = document.createElement('p');
    house.className = 'text-sm test-muted';
    house.textContent = character.house;
    card.append(house);

    // Texto RIP si no alive 'p' -> clase 'rip'
    if (!character.alive) {
        const rip = document.createElement('p');
        rip.className = 'rip character-card__rip';
        rip.textContent = 'RIP';
        card.append(rip);
    }

    return card;
}