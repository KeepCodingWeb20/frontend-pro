import type { HPCharacter, CharacterState } from '../types/hp.types';
import { Page } from './Page';

type RenderOptions = {
    house?: string;
    limit?: number;
}

type CharacterFetcher = () => Promise<HPCharacter[]>;

export class HomePage extends Page {

    static readonly DEFAULT_LIMIT = 10; // Propiedades de clase o estáticas

    readonly slug = '/';
    readonly title = 'Quidditch Champions - Home';
    private state: CharacterState = { status: 'idle' };

    constructor(
        root: HTMLElement, // Parameter property
        private readonly fetcher: CharacterFetcher, // Inyección de dependencias
    ) {
        super(root); // Obligatorio cuando hay herencia y definimos el constructor.
    }

    private paint(): Promise<void> | void {

        switch (this.state.status) {
            case 'idle':    this.root.textContent = 'Pendiente invocar API HP'; break;
            case 'loading': this.root.textContent = 'Cargando personajes...'; break;
            case 'error':   this.root.textContent = `ERROR: ${this.state.message}`; break;
            case 'success':
                this.root.textContent = `${this.state.data.length} personajes cargados`;
                this.renderCharacters(this.state.data);
                break;
        }
    };

    // getters y setters
    get isLoading(): boolean {
        return this.state.status === 'loading';
    }

    private renderCharacters(characters: HPCharacter[], options: RenderOptions = {}): void {
        const list = document.querySelector<HTMLUListElement>('#characters');
        if (!list) throw new Error('No se encontró #characters');

        // TODO: Amplia esta función para pintar la imagen ANTES de cada elemento LI

        list.replaceChildren();

        // Filters
        let filtered = characters;
        filtered = filtered.filter(i => i.image);

        if (options.house) {
            filtered = filtered.filter(i => i.house === options.house);
        }

        if (options.limit) {
            filtered = filtered.slice(0, options.limit);
        }

        // End Filters

        for (const character of filtered) {
            const li = document.createElement('li');
            li.textContent = `${character.name} - ${character.house || 'Sin Casa' }`;

            // Foto:
            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            img.width = 50;
            li.prepend(img);

            list.appendChild(li);
        }

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
