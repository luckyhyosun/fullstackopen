import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from "./utils"

import express from 'express';
const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height
  const result = calculateBmi(Number(weight), Number(height))

  if(isNotNumber(weight) || isNotNumber(height)){
    const error = "malformatted parameters"
    res.send({error})
  }

  res.send({
    weight,
    height,
    result
  })
})

app.post('/exercises', (req, _res) => {
  const { daily_exercises, target } = req.body

  console.log(daily_exercises, target );
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
