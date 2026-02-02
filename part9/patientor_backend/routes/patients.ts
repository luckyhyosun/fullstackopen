import express from 'express';
import getAllPatients from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getAllPatients.getPatients());
});

router.post('/', (req, res) => {
  res.send(req.body);
});

export default router;
