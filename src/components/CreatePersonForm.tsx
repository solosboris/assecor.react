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
      // redirect to main page (App.tsx -> "/")
    } catch (err) {
      console.error("Failed to create person", err);
    }
  };

  return (
    <div>
      <h3>Add&nbsp;Person</h3>
      {Object.entries(form).map(([key, value]) => (
        <input key={key} placeholder={key} value={value}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button type="button"
        onClick={() => {
                  createNewPerson();
                  navigate("/");
                }}
        >Add</button>
      <button type="button" onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}