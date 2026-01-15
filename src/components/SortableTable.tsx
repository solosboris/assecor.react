import { useState } from "react";
import type { PersonDTO } from "../types/person";

import { getPersonById, getPersonsByColor, getPersonsByColorCount } from "../services/rest";

interface Props {
  data: PersonDTO[];
  enableContextMenu?: boolean;
}

export function SortableTable({
  data,
  enableContextMenu = false
}: Props) {
  const [sortKey, setSortKey] = useState<keyof PersonDTO>("id");
  const [asc, setAsc] = useState(true);
  const [searchResult, setSearchResult] = useState<PersonDTO[] | null>(null);

  const sorted = [...(data ?? [])].sort((a, b) => {
    const value1 = a[sortKey];
    const value2 = b[sortKey];
    if (value1 === value2) {
        return 0;
    }
    return asc ?
            String(value1).localeCompare(String(value2)) :
            String(value2).localeCompare(String(value1));
  });

  const searchById = async (id: number) => {
    const p = await getPersonById(String(id));
    setSearchResult([p]);
    console.log(searchResult);
  };

  const searchByColor = async (color: string) => {
    const count = await getPersonsByColorCount(color);
    if (count > 1) {
      const list = await getPersonsByColor(color);
      setSearchResult(list);
      console.log(searchResult);
    }
  };
  
  return (
    <div>
      <table border={1} width="100%">
        <thead>
          <tr>
            {Object.keys(data[0] ?? {}).map((k) => (
              <th key={k} onClick={() => {
                  setSortKey(k as keyof PersonDTO);
                  setAsc(!asc);
                }}
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr data-testid="person-row" key={p.id} onContextMenu={(e) => {
                if (!enableContextMenu) {
                  return;
                }
                e.preventDefault();
                const menu = window.confirm(`Search by ID? (Cancel = color)`);
                if (menu) {
                  searchById(p.id!);
                } else {
                  searchByColor(p.color);
                }
              }}
            >
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.lastName}</td>
              <td>{p.zip}</td>
              <td>{p.city}</td>
              <td>{p.color}</td>
            </tr>
          ))}
        </tbody>
      </table>          
    </div>
  );
}