
// Recibe un Character

import type { Character } from '../types/domain.types';

// Devuelve un Elemento HTML (componente) correspondiente a ese character
// Acaba devolviendo una "CARD"
export function renderCharacter(character: Character): HTMLElement {
    const card = document.createElement('article');

    card.className = 'character-card';

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    card.append(img);

    // Nombre h3
    const name = document.createElement('h3');
    name.textContent = character.name;
    card.append(name);

    // House "p" -> clase 'house'
    const house = document.createElement('p');
    house.className = 'house';
    house.textContent = character.house;
    card.append(house);

    // Texto RIP si no alive 'p' -> clase 'rip'
    if (!character.alive) {
        const rip = document.createElement('p');
        rip.className = 'rip';
        rip.textContent = 'RIP';
        card.append(rip);
    }

    return card;
}