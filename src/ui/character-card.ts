import type { Character } from '../types/domain.types';
import { type ColorToken, getCSSVar } from '../types/tokens';

export function renderCharacterCard(character: Character): HTMLElement {
  const houseToken = `color-${character.house.toLowerCase()}` as ColorToken;

  const card = document.createElement('article');
  card.className = 'character-card flex gap-3 p-4 rounded-lg bg-white shadow-sm border-l-4';
  card.style.borderLeftColor = getCSSVar(houseToken);

  const img = document.createElement('img');
  img.src = character.image;
  img.alt = character.name;
  img.loading = 'lazy';
    img.className = 'w-16 h-16 rounded-full object-cover flex-shrink-0';
  card.append(img);

  const body = document.createElement('div');
  body.className = 'character-card__body flex flex-col gap-1 flex-1';

  const name = document.createElement('h3');
  name.className = 'font-semibold text-base';
  name.textContent = character.name;
  body.append(name);

  const house = document.createElement('p');
  house.className = 'character-card__house text-sm text-muted';
  house.textContent = character.house;
  body.append(house);

  if (!character.alive) {
    const rip = document.createElement('p');
    rip.className = 'character-card__rip';
    rip.textContent = 'RIP';
    body.append(rip);
  }

  card.append(body);
  return card;
}
