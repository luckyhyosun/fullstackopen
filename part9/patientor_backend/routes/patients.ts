import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import newPatientSchema from '../utils';
import { newPatientEntry, PatientEntry } from '../types';
import { z } from 'zod';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);

  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' });
  }

  return res.json(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try{
    newPatientSchema.parse(req.body);
    next();
  }catch(error: unknown){
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, newPatientEntry>, res: Response<PatientEntry>) => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...req.body
  };
  const addedPatient = patientsService.addPatient(newPatient);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
