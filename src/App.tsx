import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { getAllPersons } from "./services/rest";
import type { PersonDTO } from "./types/person";
import { SortableTable } from "./components/SortableTable";
import { CreatePersonForm } from "./components/CreatePersonForm";

function AppContent() {

  const [persons, setPersons] = useState<PersonDTO[]>([]);
  const location = useLocation();

  const loadAll = async () => {
    setPersons(await getAllPersons());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      loadAll();
    }
  }, [location.pathname]);

  return (
    <>
      <h2>Persons</h2>
      <Link to="/create">Add&nbsp;new&nbsp;person</Link>
      <Routes>
        <Route path="/" element={
            <>
              <h3>All&nbsp;persons</h3>
              <SortableTable data={persons} enableContextMenu />
            </>
          }
        />
        <Route path="/create" element={<CreatePersonForm />} />
      </Routes>
    </>
  );

}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}