const calculateBmi = (args: string[]): string=> {
  const squaredHeight = Math.pow(Number(args[0])/100, 2)
  const bmi = Number(args[1]) / squaredHeight
  const result = parseFloat(bmi.toFixed(2))

  let range;
  if(result < 18.5){
    range = 'Underweight range'
  }else if(result > 19 || result < 24.9 ){
    range = 'Normal range'
  }else if(result > 25.0 || result < 29.9){
    range = 'Overweight range'
  }else {
    range = 'Obesity range'
  }

  return range
}

console.log(calculateBmi(process.argv))
