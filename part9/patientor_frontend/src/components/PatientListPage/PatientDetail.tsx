import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams<{ id: string }>();

  console.log(patient);


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
        {patient.entries[0].date} - {patient.entries[0].description}<br />
        {patient.entries[0].diagnosisCodes.join('/ ')} <br />
      </div>
    </div>
  );
};

export default PatientDetail;
