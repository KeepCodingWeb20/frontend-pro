export type House = 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw';

const HOUSES: House[] = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

export function pickRandomHouse(): House {
  const index = Math.floor(Math.random() * HOUSES.length);
  return HOUSES[index]!; // non-null assertion. Index siempre es válido
}