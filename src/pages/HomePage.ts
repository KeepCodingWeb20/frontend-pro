import type { CharacterFetcher } from '../services/hp-api';
import type { Character } from '../types/domain.types';
import { renderCharacter } from '../ui/character-card';
import { renderCharacterList } from '../ui/character-list';
import { renderError, renderLoading } from '../ui/states';
import { Page } from './Page';

type RenderOptions = {
    house?: string;
    limit?: number;
}

type State = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success', data: Character[] }
    | { status: 'error', message: string };

export class HomePage extends Page {

    static readonly DEFAULT_LIMIT = 10; // Propiedades de clase o estáticas

    readonly slug = 'home';
    readonly title = 'Quidditch Champions - Home';
    private state: State = { status: 'idle' };

    constructor(
        root: HTMLElement, // Parameter property
        private readonly fetcher: CharacterFetcher, // Inyección de dependencias
    ) {
        super(root); // Obligatorio cuando hay herencia y definimos el constructor.
    }

    private paint(): Promise<void> | void {
        this.root.replaceChildren();
        switch (this.state.status) {
            case 'idle':    this.root.textContent = 'Pendiente invocar API HP'; break;
            case 'loading': this.root.append(renderLoading('Cargando personajes...')); break;
            case 'error':   this.root.append(renderError(this.state.message)); break;
            case 'success':
                this.root.textContent = `${this.state.data.length} personajes cargados`;
                this.root.replaceChildren();
                this.root.appendChild(renderCharacterList(this.state.data.slice(0, HomePage.DEFAULT_LIMIT)));
                break;
        }
    };

    // getters y setters
    get isLoading(): boolean {
        return this.state.status === 'loading';
    }

    override async render(): Promise<void> {
        this.state = { status: 'loading' };
        this.paint();
        try {
            const data = await this.fetcher();
            this.state = { status: 'success', data: data };
        } catch (e: unknown) {
            this.state = { status: 'error', message: e instanceof Error ? e.message : 'Unknown error' }
        }
        this.paint();
    }

}
