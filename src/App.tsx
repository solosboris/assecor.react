import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPersons } from "./services/rest";
import type { PersonDTO } from "./types/person";
import { SortableTable } from "./components/SortableTable/SortableTable";
import { CreatePersonForm } from "./components/CreatePersonForm/CreatePersonForm";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [persons, setPersons] = useState<PersonDTO[]>([]);
  const noPersonFount: string = "No person has been found right now";

  const onNewPerson = async () => {
    const allPersons = await getAllPersons();
    setPersons(
      allPersons != null && allPersons.length > 0 ?
        allPersons :
        [{id: -1, name: "no person fount", lastName: "", zip: "", city: "", color: ""}]
    );
  };


  useEffect(() => {
    //use the operator ==, not ===
    if (location.pathname == "/") {
      setError(null);
      setLoading(true);
      try {
        getAllPersons()
          .then(setPersons)
          .finally(() => setLoading(false));
      } catch (e) {
        setError(
          "Failed to load persons "
            .concat(String(e))
        );
      } finally {
        setLoading(false);
      }
    }
  }, [location.pathname]);

  return (
    <>
      <h2>Persons</h2>
      { error && <h4 className="error">{error}</h4> }
      <Link to="/create" data-testid="go-to-create">
        Add&nbsp;person
      </Link>

      {loading && <p className="error">Loading…</p>}
      {
        !loading && (persons == null || persons.length === 0)
          && <p className="error">{noPersonFount}</p>
      }

      <Routes>
        <Route path="/"
                element={
                  persons != null && persons.length > 0 ?
                    <SortableTable data={persons} enableContextMenu={true} /> :
                    <p className="error" data-testid="no-person-found">
                      {noPersonFount}
                    </p>
                }
        />
        <Route path="/create" element={
                                <CreatePersonForm onCreated={() => onNewPerson() }/>
                              }
        />
      </Routes>
    </>
  );
}