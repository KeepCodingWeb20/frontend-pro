import type { Page } from './pages/Page';
import { HomePage } from './pages/HomePage';
import { TeamsPage } from './pages/TeamsPage';
import { getCharacters } from './services/hp-api';

// Creamos una SPA sin framework
// midominio.com/ -> Home
// midominio.com/#/teams -> Teams
// ...

// Identificar cual es el selector principal de HTML
const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('No se encontró #app');


const pages: Page[] = [
    new HomePage(app, getCharacters),
    new TeamsPage(app)
];

// 0.1 routing sin librerias
// no tenemos history api, etc
function navigate(): void {
    const slug = (window.location.hash.slice(1) || 'home');
    const page = pages.find(p => p.slug === slug);
    console.log({slug, page});
    if (page) {
        page.mount();
    }
}

window.addEventListener('hashchange', navigate);
navigate();

