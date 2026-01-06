interface ExerciseValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1]

const calculateExercises = (hours:number[]): ExerciseValue => {

  return {
    periodLength: undefined,
    trainingDays: undefined,
    success: undefined,
    rating: undefined,
    ratingDescription: undefined,
    target: undefined,
    average: undefined
  }
}

try {
  console.log(calculateExercises(exerciseHours))
}catch (error: unknown) {
  let errorMessage = 'Error occurs!'
  if(error instanceof Error) {
    errorMessage += error.message
  }

  console.log(errorMessage);
}
