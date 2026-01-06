// how to run terminal
// npm run ts-node -- multiplier.ts

const multiplicator = (a: number, b:number, printText: string) => {
  console.log(printText,  a * b);
}

multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');


// Type Alias
type Operation = 'multiply' | 'add' | 'divide';
// type Result = 'number' | 'string'

// const calculator = (a: number, b: number, op: Operation): Result => {
const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b
    case 'add':
      return a + b
    case 'divide':
      if(b === 0 ) throw new Error('Can\'t divide by 0!');
      return a / b
    default:
      throw new Error('Operation is not multiply, add or divide!')
  }
}

try {
  console.log(calculator(1, 0, 'divide'))
}catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
