import axios from "axios";
import type { PersonDTO, DTOsContainer } from "../types/person";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAllPersons = async (): Promise<PersonDTO[]> => {
  const res = await api.get<DTOsContainer>("/persons");
  return res.data.dtos;
};

export const getPersonById = async (id: string): Promise<PersonDTO> => {
  const res = await api.get<PersonDTO>(`/persons/person/${id}`);
  return res.data;
};

export const getPersonsByColor = async (color: string): Promise<PersonDTO[]> => {
  const res = await api.get<DTOsContainer>(`/persons/color/${color}`);
  return res.data.dtos;
};

export const getPersonsByColorCount = async (color: string): Promise<number> => {
  const res = await api.get<number>(`/persons/colorcounter/${color}`);
  return res.data;
};

export const addPerson = async (person: Omit<PersonDTO, "id">): Promise<number> => {
  const res = await api.post<number>("/persons/person", person);
  return res.data;
};