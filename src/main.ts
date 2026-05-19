import { Page } from './pages/Page';
import { getCharacters } from './services/hp-api';



// Identificar cual es el selector principal de HTML
const app = document.querySelector<HTMLHeadingElement>('#app');
if (!app) throw new Error('No se encontró #app');
// Instanciar la clase correspondiente a la pagina
const home = new Page(app, getCharacters); // HomePage();
// Llamar al método principal de esa pagina
home.mount();
console.log('Loading home: ' + home.isLoading);
