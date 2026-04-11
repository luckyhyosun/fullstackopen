import { useState, useEffect } from "react";
import { Diagnosis, Entry } from "../../types";
import diagnosisService from "../../services/diagnosis";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
  const fetchDiagnoses = async () => {
      const data = await diagnosisService.getAll();
      setDiagnoses(data);
    };

    void fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown diagnosis';
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>Hospital 🏥</p>
          <p>{entry.date} {entry.description}</p>
          <p>Discharge: {entry.discharge.date}</p>
          {entry.diagnosisCodes?.map(code => (
            <li key={code}>
              {code} - {getDiagnosisName(code)}
            </li>
          ))}
        </div>
      );

    case "OccupationalHealthcare":
      return (
        <div>
          <p>Healthcare 🩺</p>
          <p>{entry.date} {entry.description}</p>
          <p>Employer: {entry.employerName}</p>
          {entry.diagnosisCodes?.map(code => (
            <li key={code}>
              {code} - {getDiagnosisName(code)}
            </li>
          ))}
        </div>
      );

    case "HealthCheck":
      return (
        <div>
          <p>HealthCheck 🩻</p>
          <p>{entry.date} {entry.description}</p>
          <p>Health rating: {entry.healthCheckRating}</p>
          {entry.diagnosisCodes?.map(code => (
            <li key={code}>
              {code} - {getDiagnosisName(code)}
            </li>
          ))}
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
