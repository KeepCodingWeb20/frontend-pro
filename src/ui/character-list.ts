import type { Character } from '../types/domain.types';
import { renderCharacter } from './character-card';

export function renderCharacterList(characters: Character[]): HTMLElement {
    const ul = document.createElement('ul');
    ul.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0';
    for (const c of characters) {
        const li = document.createElement('li');
        li.append(renderCharacter(c));
        ul.append(li);
    }
    return ul;
}