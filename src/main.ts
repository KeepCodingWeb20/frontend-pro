import { greet } from './utils';
import { pickRandomHouse } from './random';
import { getCharacters } from './services/hp-api';
import type { HPCharacter } from './types/hp.types';
import { Page } from './pages/Page';

type RenderOptions = {
    house?: string;
    limit?: number;
}

type CharacterState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success', data: HPCharacter[] }
    | { status: 'error', message: string };

let state: CharacterState = { status: 'idle' };

function render(): void {
    const app = document.querySelector<HTMLHeadingElement>('#app');
    if (!app) return;

    switch (state.status) {
        case 'idle':    app.textContent = 'Pendiente invocar API HP'; break;
        case 'loading': app.textContent = 'Cargando personajes...'; break;
        case 'error':   app.textContent = `ERROR: ${state.message}`; break;
        case 'success':
            app.textContent = `${state.data.length} personajes cargados`;
            renderCharacters(state.data);
            break;
    }
};

function renderCharacters(characters: HPCharacter[], options: RenderOptions = {}): void {
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

async function load(): Promise<void> {
    state = { status: 'loading' };
    render();
    try {
        const data = await getCharacters();
        state = { status: 'success', data: data };
    } catch (e: unknown) {
        state = { status: 'error', message: e instanceof Error ? e.message : 'Unknown error' }
    }
    render();
}

load();

// Identificar cual es el selector principal de HTML
const app = document.querySelector<HTMLHeadingElement>('#app');
if (!app) throw new Error('No se encontró #app');
// Instanciar la clase correspondiente a la pagina
const home = new Page(); // HomePage();
// Llamar al método principal de esa pagina
home.mount();
