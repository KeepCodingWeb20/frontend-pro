import type { Character, House } from '../types/domain.types';
import { HOUSES } from '../types/domain.types';

export function filterByHouse(house: House) {
  return (chars: Character[]): Character[] =>
    chars.filter((c) => c.house === house);
}

export function limitTo(n: number) {
  return <T>(items: T[]): T[] => items.slice(0, n);
}

export function sortByName(chars: Character[]): Character[] {
  return [...chars].sort((a, b) => a.name.localeCompare(b.name));
}

export const aliveOnly = (chars: Character[]): Character[] =>
  chars.filter((c) => c.alive);

export function groupByHouse(chars: Character[]): Record<House, Character[]> {
  const groups: Record<House, Character[]> = {
    Gryffindor: [],
    Slytherin: [],
    Hufflepuff: [],
    Ravenclaw: [],
    Unknown: [],
  };
  for (const c of chars) groups[c.house].push(c);
  return groups;
}

export const KNOWN_HOUSES: readonly House[] = HOUSES;
