import type { Character } from '../types/domain.types';
import { renderCharacter } from './character-card';

export function renderCharacterList(characters: Character[]): HTMLElement {
    const ul = document.createElement('ul');
    ul.className = 'character-list';
    for (const c of characters) {
        const li = document.createElement('li');
        li.append(renderCharacter(c));
        ul.append(li);
    }
    return ul;
}