import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPerson } from "../../services/rest";

export function CreatePersonForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    zip: "",
    city: "",
    color: "",
  });

  const createPerson = async () => {
    try {
      const personId = await addPerson(form);
      console.log(
        "new created person id "
          .concat(String(personId))
      )
      onCreated();
    } catch (e) {
      console.log(
        "person creation error or mock case"
          .concat(String(e))
      )
    }
  };

  return (
    <div>
      <h3>Add Person</h3>

      {Object.entries(form).map(([key, value]) => (
        <input key={key} placeholder={key} value={value}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button data-testid="submit-person" type="button" onClick={
            async () => {
              await createPerson();
              navigate("/");
            }
          }>
        Add
      </button>

      <button data-testid="cancel" type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}