import type { HPCharacter, CharacterState } from '../types/hp.types';

export class Page {

    private slug: string = '/';
    private title: string = 'Quidditch Champions - Home';
    private state: CharacterState;

    constructor() {
        this.state = { status: 'idle' };
    }

    private render(): Promise<void> | void {
        const app = document.querySelector<HTMLHeadingElement>('#app');

        if (!app) return;

        switch (this.state.status) {
            case 'idle':    app.textContent = 'Pendiente invocar API HP'; break;
            case 'loading': app.textContent = 'Cargando personajes...'; break;
            case 'error':   app.textContent = `ERROR: ${this.state.message}`; break;
            case 'success':
                app.textContent = `${this.state.data.length} personajes cargados`;
                // renderCharacters(state.data);
                break;
        }
    };

    // TODO: Crea una funcion que renderice los characters para poder eliminar el código de main.ts

    public async mount(): Promise<void> {
        document.title = this.title;
        console.log(`[Page] mounting home`);
        await this.render();
    }

}
