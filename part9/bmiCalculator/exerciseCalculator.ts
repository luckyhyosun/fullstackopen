import { isNotNumber } from "./utils"

interface ExerciseValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Arguments {
  target: number,
  daily_exercises: number[]
}

export const calculateExercises = (args: Arguments): ExerciseValue => {
  const targetNumber = args.target
  const exerciseHours = args.daily_exercises

  const sum = exerciseHours.reduce((a, b) => a + b, 0)
  const average = sum/exerciseHours.length

  const success = () => {
    if(average > targetNumber){
      return true
    }else{
      return false
    }
  }
  const rating = ():[number, string] => {
    if(average <= targetNumber-2){
      return [1, 'quite bad...!']
    }else if(average > targetNumber-2 && average < targetNumber+1){
      return [2, 'not too bad but could be better']
    }else{
      return [3, 'exellent!']
    }
  }

  const trainingDays = (hours:number[]) => {
    return hours.filter(h => h > 0).length;
  }

  return {
    periodLength: exerciseHours.length,
    trainingDays: trainingDays(exerciseHours),
    success: success(),
    rating: rating()[0],
    ratingDescription: rating()[1],
    target: targetNumber,
    average: average
  }
}

if(require.main === module){
  const target = Number(process.argv[2])
  const daily_exercises = process.argv.slice(3).map((arg) => {
  const value = Number(arg);
  if(isNotNumber(value)){
    throw new Error('Provided values were not numbers!')
  }
  return value
})

  const args = { daily_exercises, target}

  console.log(calculateExercises(args))
}
