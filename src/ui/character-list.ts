import type { Character } from '../types/domain.types';
import { renderCharacterCard } from './character-card';

export function renderCharacterList(characters: Character[]): HTMLElement {
  const ul = document.createElement('ul');
  ul.className = 'character-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0';

  if (characters.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'character-list__empty';
    empty.textContent = 'Sin personajes';
    ul.append(empty);
    return ul;
  }

  for (const character of characters) {
    const li = document.createElement('li');
    li.append(renderCharacterCard(character));
    ul.append(li);
  }
  return ul;
}
