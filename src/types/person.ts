export interface PersonDTO {
  id?: number;
  name: string;
  lastName: string;
  zip: string;
  city: string;
  color: string;
}

export interface DTOsContainer {
  dtos: PersonDTO[];
}