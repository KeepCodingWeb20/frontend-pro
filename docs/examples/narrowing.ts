// Uniones avanzadas -> uniones discriminadas

// Narrowing


interface Character {}

// Quiero tipar el estado de mi aplicacion
interface UIState {
    isLoading: boolean,
    isError: boolean,
    characters: Character[],
    errorMessage: string;
}

const state: UIState = {
    isLoading: true,
    isError: true,
    characters: [

    ],
    errorMessage: ''
};

// Esto esta cargando y con error a la vez

// Union discriminada 
type CharacterState = 
    { status: 'idle' } |
    { status: 'loading' } |
    { status: 'success', data: Character[] } |
    { status: 'error', message: string };

const characterStatus: CharacterState = {
    status: 'error', message: ''
}

function renderState(state: CharacterState): string {
    switch (state.status) {
        case 'idle':
            return 'Pendiente iniciar';
        case 'loading':
            //return state.data; // detecta el estado
            return 'Cargando...';
        case 'success':
            return `${state.data.length} personajes`;
        case 'error':
            return `Error: ${state.message}`;
    }
}






function greet(name: string): string {
    return 'Hola ' + name;
}

const app = document.querySelector<HTMLHeadingElement>('#app');

async function main() { // bootstrap()
    const characters: any[] = []
    // TODO: verifica que la api funciona y en caso que no sea así, muestra un mensaje de Error
    try {
        // console.log(characters);
        app!.textContent = `${greet('Hermione')} - ${characters.length} personajes cargados`;

        //renderCharacters(characters, { limit: 20, house: 'Slytherin' });
    } catch(ex: unknown) {
        let mensaje = 'Error al cargar personajes';

        if (ex instanceof Error) {
            mensaje = ex.message;
        }

        app!.textContent = `🚨ERROR: ${mensaje}`;
        console.error(ex);
    }
}