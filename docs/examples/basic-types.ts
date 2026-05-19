interface CharacterI {
    name: string;
    house: string;
}

type CharacterT = {
    name: string;
    house: string;
};

const a: CharacterI = {
    name: 'Harry',
    house: 'Gryffindor',
};

const b: CharacterT = {
    name: 'Harry', 
    house: 'Gryffindor'
}

interface User {
    name: string;
}

// Declaration merging
interface User {
    email: string;
}

const u: User = {
    name: 'Hermione',
    email: 'h@howards.com',
}

// Express (ejemplo)
interface Request {
    body: unknown,
    headeres: Object
}

// Quiero añadir una sesion

interface Request {
    session: Object,
}

type UserT = {
    name: string
}
type UserT = {
    email: string;
}


// Cosas que SOLO puedo hacer con types
// Union types
type ID = string | number;
// Tuple type
type Coord = [number, number];

// Intersección Genérica
type WithId<T> = T & { id: number };

interface Character {
    name: string,
    house: string,
}
const resultCharacter: WithId<Character> = {
    name: 'Harry',
    house: 'Gryffindor',
    id: 1
};

// --> Quiero crear un Character: Envio Character
// <-- Backend Crea Character y devuelve resultado: WithId<Character>

// Unión de literales
type House = 'Gryffindor' | 'Slythering' // ...

// Diferencia entre & y extends

interface Animal {
    legs: number;
}

interface Dog extends Animal {
    bread: string;
}

const animalA: Dog = {
    legs: 1,
    bread: ''
}

type AnimalT = {
    legs: number,
}

 type DogT = AnimalT & {
    breed: string,
 };




