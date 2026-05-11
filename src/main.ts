import { greet } from './utils';
import { pickRandomHouse } from './random';
import { getCharacters } from './services/hp-api';

const app = document.querySelector<HTMLHeadingElement>('#app');
// Null-safe control
if (!app) throw new Error('No se encontró #app');
// app.textContent = 'Bienvenidos a Quidditch Champions XX';
app.textContent = `${greet('Hermione')} - cargando personajes...`;


async function main() { // bootstrap()
    const characters = await getCharacters();
    // console.log(characters);
    app!.textContent = `${greet('Hermione')} - ${characters.length} personajes cargados`;
}

main();

// TODO:
// Crear un módulo src/random.ts con una función pickRandomHouse() que:
// 1. Devuelva una de las4 casas al azar
// 2. Tiene que estar tipado de manera estricta <---
// 3. Importar esa función
