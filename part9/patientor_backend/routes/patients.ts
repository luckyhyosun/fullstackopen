import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.send(addedPatient);
});

export default router;
