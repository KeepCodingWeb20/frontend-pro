import { greet } from './utils';


const app = document.querySelector<HTMLHeadingElement>('#app');
// Null-safe control
if (!app) throw new Error('No se encontró #app');
// app.textContent = 'Bienvenidos a Quidditch Champions XX';
app.textContent = greet('Hermione');
