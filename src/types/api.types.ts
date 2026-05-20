export interface HPCharacterDTO {
    id: string,
    name: string,
    alternate_names: string[],
    species: string,
    gender: string,
    house: string,
    dateOfBirth: string,
    yearOfBirth: number,
    wizard: boolean,
    actor: string,
    alternate_actors: string[],
    alive: boolean,
    image: string
  }