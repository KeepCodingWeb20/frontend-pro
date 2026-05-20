import type { Character, House } from '../types/domain.types';

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