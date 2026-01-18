import express from 'express';
import getNonSensitiveEntries from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getNonSensitiveEntries.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
