import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { Patient, Diagnosis } from "../../types";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const { id } = useParams<{ id: string }>();

  console.log(patient);

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
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
          <div key={entry.id}>
            {entry.date} - {entry.description}<br />
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDetail;
