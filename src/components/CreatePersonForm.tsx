import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPerson } from "../services/rest";

export function CreatePersonForm() {

  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    zip: "",
    city: "",
    color: "",
  });

  const createNewPerson = async () => {
    try {
      await addPerson(form);
    } catch (err) {
      console.error("Failed to create person", err);
    }
  };

  return (
    <div>
      <h3>Add Person</h3>
      {Object.entries(form).map(([key, value]) => (
        <input key={key} placeholder={key} value={value}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}
      <button data-testid="submit-person" type="button"
          onClick={() => { createNewPerson(); navigate("/"); }}>
        Add
      </button>
      <button type="button" onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}