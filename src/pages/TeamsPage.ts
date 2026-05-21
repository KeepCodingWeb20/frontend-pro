// pages/TeamsPage.ts
import { Page } from './Page';
import { getCharacters } from '../services/hp-api';
import { renderCharacterList } from '../ui/character-list';
import { HOUSES, type Character, type House } from '../types/domain.types';
import { groupByHouse, sortByName } from '../lib/filters';
import { getCSSVar, type ColorToken } from '../types/tokens';
import { renderEmpty } from '../ui/states';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; groups: Record<House, Character[]> }
  | { status: 'error'; message: string };

export class TeamsPage extends Page {
  readonly slug = 'teams';
  readonly title = 'Quidditch Champions · Teams';
  private state: State = { status: 'idle' };

  override async render(): Promise<void> {
    this.state = { status: 'loading' };
    this.paint();
    try {
      const characters = await getCharacters();
      this.state = { status: 'success', groups: groupByHouse(characters.slice(0, 20)) };
    } catch (e: unknown) {
      this.state = { status: 'error', message: e instanceof Error ? e.message : 'Unknown' };
    }
    this.paint();
  }

  private paint(): void {
    this.root.replaceChildren();
    switch (this.state.status) {
      case 'idle':    break;
      case 'loading': this.root.append(text('Cargando equipos...')); break;
      case 'success': {
        const intro = document.createElement('h1');
        intro.className = 'text-2xl font-semibold mb-4 px-4';
        intro.textContent = 'Equipos por casa';
        this.root.append(intro);
        for (const house of HOUSES) {
          const players = sortByName(this.state.groups[house] ?? []);
          const section = document.createElement('section');
          section.className = 'house-section mt-6 pt-4 border-t-4 px-4';
          section.style.borderTopColor = getCSSVar(`color-${house.toLowerCase()}` as ColorToken);

          const h2 = document.createElement('h2');
          h2.className = 'text-xl font-semibold mb-3';
          h2.textContent = `${house} · ${players.length}`;
          section.append(h2);

          if (players.length === 0) {
            section.append(renderEmpty({ label: `Sin personajes de ${house}` }));
          } else {
            section.append(renderCharacterList(players));
          }

          this.root.append(section);
        }
        break;
      }
      case 'error':   this.root.append(text(`${this.state.message}`)); break;
    }
  }
}

function text(s: string): Text { return document.createTextNode(s); }