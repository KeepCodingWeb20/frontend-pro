import { greet } from './utils';
import { pickRandomHouse } from './random';
import type { HPCharacter } from './types/hp.types';

async function loadData(): Promise<HPCharacter[]> {
    const res = await fetch('https://hp-api.onrender.com/api/characters');
    return res.json();
}

async function boostrap() {
    const data = await loadData();
    console.log(data[0]?.image);
}

boostrap();

const app = document.querySelector<HTMLHeadingElement>('#app');
// Null-safe control
if (!app) throw new Error('No se encontró #app');
// app.textContent = 'Bienvenidos a Quidditch Champions XX';
app.textContent = `${greet('Hermione')} - Hoy gana: ${pickRandomHouse()}`;

// TODO:
// Crear un módulo src/random.ts con una función pickRandomHouse() que:
// 1. Devuelva una de las4 casas al azar
// 2. Tiene que estar tipado de manera estricta <---
// 3. Importar esa función
