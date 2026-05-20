// pages/TeamsPage.ts
import { Page } from './Page';
import { getCharacters } from '../services/hp-api';
import { renderCharacterList } from '../ui/character-list';
import type { Character, House } from '../types/domain.types';
import { groupByHouse } from '../lib/filters';

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
        for (const house of ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'] as const) {
          const section = document.createElement('section');
          const h2 = document.createElement('h2');
          h2.textContent = house;
          section.append(h2, renderCharacterList(this.state.groups[house]));
          this.root.append(section);
        }
        break;
      }
      case 'error':   this.root.append(text(`${this.state.message}`)); break;
    }
  }
}

function text(s: string): Text { return document.createTextNode(s); }