// -- Base TS
// Tipos primitivos
const nombre: string = 'Harry'; // const nombre: String
const edad: number = 17; // Number
const estaVivo: boolean = true; // Boolean
const casa: string | null = null;

// Inferencia de tipos
let hose = 'Gryffindor';
// casa = 42; // Devuelve un error
const PI = 3.14; // Inferencia de Literal
let counter = 0; // Inferencia de tipo

// any vs unknown
// any desactiva las caracteristicas de TS
let dato1: any = 'Puede ser cualquier cosa';
// dato1.metodoRandom(); // Error en runtime.
let dato2: unknown = 'Algo desconocido';
// dato2.metodoRandom2(); // TS bloquea la implementación.
if (typeof dato2 === 'string') {
    dato2.toUpperCase();
}

// Interfaces
// Es el contrato de un objeto
interface Personaje {
    id: string;
    nombre: string;
    casa: string;
    estaVivo?: boolean; // Con ? podemos definir una propiedad como opcional
}

const harry: Personaje = {
    id: '1',
    nombre: 'Harry Potter',
    casa: 'Gryffindor',
    // estaVivo: true
};

interface Mago extends Personaje {
    varita: string;
}

interface User {
    id: string;
}

type User2 = {
    id: string;
}

