import express from 'express';
import getAllDiagnoses from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getAllDiagnoses.getDiagnoses());
});

export default router;
