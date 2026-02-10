import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import newPatientSchema from '../utils';
import { newPatientEntry, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try{
    newPatientSchema.parse(req.body);
    next();
  }catch(error: unknown){
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, newPatientEntry>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

export default router;
