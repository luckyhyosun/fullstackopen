export const calculateBmi = (weight:number, height:number): string=> {
  const squaredHeight = Math.pow(height/100, 2)
  const bmi = weight/ squaredHeight
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

if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('Please provide height and weight as arguments')
  }

  const height = Number(args[0])
  const weight = Number(args[1])

  if (isNaN(height) || isNaN(weight)) {
    console.error('Height and weight must be valid numbers')
  }

  console.log(calculateBmi(weight, height))
}
