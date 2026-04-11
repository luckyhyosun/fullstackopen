import { useState } from "react";
import patientService from "../../services/patients";
import { EntryForm, HealthCheckRating } from "../../types";

const AddEntryForm = ({ patientId }: { patientId: string }) => {
  const [form, setForm] = useState<EntryForm>({
    type: "HealthCheck",
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: HealthCheckRating.Healthy,
    diagnosisCodes: [],
  });

  const handleInput = <K extends keyof EntryForm>(
    field: K,
    value: EntryForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
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
        <input type="number"
        min={0}
        max={3}
        value={form.healthCheckRating}
        onChange={(e) =>
          handleInput("healthCheckRating", Number(e.target.value))
        }/>
      </div>

      <div>
        Diagnosis Code
        <input type="text"
        value={form.diagnosisCodes?.join(", ") || ""}
        onChange={(e) =>
          handleInput(
            "diagnosisCodes",
            e.target.value.split(",").map(s => s.trim())
          )
        }/>
      </div>

      <button onClick={() => handleAddEntry()}>Add Entry</button>
    </>
  );
};

export default AddEntryForm;
