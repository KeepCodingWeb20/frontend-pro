import { greet } from './utils';
import { pickRandomHouse } from './random';
import { getCharacters } from './services/hp-api';
import type { HPCharacter } from './types/hp.types';

// textContent + createElement

const app = document.querySelector<HTMLHeadingElement>('#app');
// Null-safe control
if (!app) throw new Error('No se encontró #app');
// app.textContent = 'Bienvenidos a Quidditch Champions XX';
app.textContent = `${greet('Hermione')} - cargando personajes...`;


type RenderOptions = {
    house?: string;
    limit?: number;
    // TODO: implementa una propiedad image: boolean
    // en caso que este rellenada:
    // 1. filtramos los elementos con imagen
    // 2. añadimos las imagenes
    // En cualquier otro caso, no aplicamos ese filtro
}


// TODO: 
// una función renderCharacters 
// reciba todos los personajes
// localice la lista en el dom
// inserte los elementos de los personajes
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


async function main() { // bootstrap()
    // TODO: verifica que la api funciona y en caso que no sea así, muestra un mensaje de Error
    try {
        const characters = await getCharacters();
        // console.log(characters);
        app!.textContent = `${greet('Hermione')} - ${characters.length} personajes cargados`;

        renderCharacters(characters, { limit: 20, house: 'Slytherin' });
    } catch(ex: unknown) {
        let mensaje = 'Error al cargar personajes';

        if (ex instanceof Error) {
            mensaje = ex.message;
        }

        app!.textContent = `🚨ERROR: ${mensaje}`;
        console.error(ex);
    }
}

main();

// TODO:
// Crear un módulo src/random.ts con una función pickRandomHouse() que:
// 1. Devuelva una de las4 casas al azar
// 2. Tiene que estar tipado de manera estricta <---
// 3. Importar esa función
