// src/components/SortableTable/SortableTable.tsx
import { useState } from "react";
import type { PersonDTO } from "../../types/person";
import { getPersonById, getPersonsByColor, getPersonsByColorCount } from "../../services/rest";
interface SortableTableProps {
  data: PersonDTO[];
  enableContextMenu?: boolean;
}

export function SortableTable({
    data,
    enableContextMenu = false }: SortableTableProps
) {
  const [ascending, setAscending] = useState(true);
  const [sortKey, setSortKey] = useState<keyof PersonDTO | null>(null);
  const [searchResult, setSearchResult] = useState<PersonDTO[] | null>(null);

  // Sort data safely
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue === undefined || bValue === undefined) {
      return 0;
    }
    if (typeof aValue === "number"
        && typeof bValue === "number") {
      return ascending ?
              aValue - bValue :
              bValue - aValue;
    }
    return ascending ?
      String(aValue).localeCompare(String(bValue)) :
      String(bValue).localeCompare(String(aValue));
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

  const keys = data?.[0] ?
                Object.keys(data[0]) : [];

  return (
    <table data-testid="person-table">
      <thead>
        <tr>
          {keys.map((k) => (
            <th key={k} onClick={() => {
                if (sortKey === k) {
                  setAscending(!ascending);
                } else {
                  setSortKey(k as keyof PersonDTO);
                  setAscending(true);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {k}
              {sortKey === k ? (ascending ? " ▲" : " ▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody data-testid="person-body">
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan={keys.length}>No&nbsp;data&nbsp;available</td>
          </tr>
        ) : (
          sortedData.map((person) => (
            <tr data-testid="person-row" key={person.id} 
              onContextMenu={(e) => {
                if (!enableContextMenu) {
                  return;
                }
                e.preventDefault();
                if (window.confirm(`Search by ID? (Cancel = color)`)) {
                  searchById(person.id!);
                } else {
                  searchByColor(person.color);
                }
              }}
            >
              {keys.map((k) => (
                <td key={k}>{person[k as keyof PersonDTO]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}