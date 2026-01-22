import express from 'express';
import getAllPatients from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getAllPatients.getPatients());
});

export default router;
