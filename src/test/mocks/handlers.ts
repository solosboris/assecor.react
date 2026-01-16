import { http, HttpResponse } from "msw";
import type { PersonDTO } from "../../types/person";

export const mockPersons: PersonDTO[] = [
  {
    id: 1,
    name: "John",
    lastName: "Doe",
    zip: "12345",
    city: "Berlin",
    color: "blue",
  },
  {
    id: 2,
    name: "Alice",
    lastName: "William",
    zip: "67890",
    city: "London",
    color: "red",
  }
];

export const handlers = [
  http.get("**/persons", () => {
    return HttpResponse.json(mockPersons);
  }),

  http.post("**/persons/person", async () => {
    return HttpResponse.json({ id: 3 });
  }),
];