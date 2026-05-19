import { Page } from './pages/Page';



// Identificar cual es el selector principal de HTML
const app = document.querySelector<HTMLHeadingElement>('#app');
if (!app) throw new Error('No se encontró #app');
// Instanciar la clase correspondiente a la pagina
const home = new Page(app); // HomePage();
// Llamar al método principal de esa pagina
home.mount();
