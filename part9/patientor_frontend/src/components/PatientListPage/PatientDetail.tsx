import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Patient, Diagnosis } from "../../types";
import EntryDetail from "./EntryDetail";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [addEntryText, setAddEntryText] = useState("");

  const { id } = useParams<{ id: string }>();

  console.log(patient);

  const hanleAddEntryText = (text: string) => {
    setAddEntryText(text);
  };

  useEffect(() => {
  const fetchDiagnoses = async () => {
      const data = await diagnosisService.getAll();
      setDiagnoses(data);
    };

    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    if (!id) return;

    patientService.getById(id).then((data) => {
      setPatient(data);
    });
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient</h1>
      <div>
        {patient.name}<br />
        {patient.ssn}<br />
        {patient.gender}<br />
        {patient.occupation}

        <hr />
        {patient.entries.map(entry => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
        <input type="text" value= {addEntryText} onChange={e => hanleAddEntryText(e.target.value)}/>
        <button>Add Entry</button>
      </div>
    </div>
  );
};

export default PatientDetail;
