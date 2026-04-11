import { useState } from "react";
import patientService from "../../services/patients";

const AddEntryForm = ({ patientId }: { patientId: string }) => {
  const [form, setForm] = useState({
    description: "",
    date: "",
    specialist: "",
    rating: "",
    code: "",
  });

  const handleInput = (field: keyof typeof form, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleAddEntry = async () => {
    const entryValues = form;
    const newEntry = await patientService.addEntry(patientId, entryValues);

    console.log(newEntry);

  };

  return (
    <>
      <h3>New HealthCare Entry</h3>

      <div>
        Description
        <input type="text"
        value={form.description}
        onChange={(e) => handleInput("description", e.target.value)}/>
      </div>

      <div>
        Date
        <input type="text"
        placeholder="2026-01-03"
        value={form.date}
        onChange={(e) => handleInput("date", e.target.value)}/>
      </div>

      <div>
        Specialist
        <input type="text"
        value={form.specialist}
        onChange={(e) => handleInput("specialist", e.target.value)} />
      </div>

      <div>
        HealthCheck rating
        <input type="text"
        value={form.rating}
        onChange={(e) => handleInput("rating", e.target.value)}/>
      </div>

      <div>
        Diagnosis Code
        <input type="text"
        value={form.code}
        onChange={(e) => handleInput("code", e.target.value)}/>
      </div>

      <button onClick={() => handleAddEntry()}>Add Entry</button>
    </>
  );
};

export default AddEntryForm;
