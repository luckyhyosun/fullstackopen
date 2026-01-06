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

const calculateExercises = (hours:number[], targetNumber: number): ExerciseValue => {
  const sum = hours.reduce((a, b) => a + b, 0)
  const average = sum/hours.length
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
    periodLength: hours.length,
    trainingDays: trainingDays(hours),
    success: success(),
    rating: rating()[0],
    ratingDescription: rating()[1],
    target: targetNumber,
    average: average
  }
}

try {
  console.log(calculateExercises(exerciseHours, 2))
}catch (error: unknown) {
  let errorMessage = 'Error occurs!'
  if(error instanceof Error) {
    errorMessage += error.message
  }

  console.log(errorMessage);
}
