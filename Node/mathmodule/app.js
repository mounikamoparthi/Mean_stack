var mathlib = require('./mathlib')();
const num1 = 3;
const num2 = 198;
console.log(mathlib);
console.log(
  `The sum of ${num1} and ${num2} is ${mathlib.add(num1,num2)}.`
);
mathlib.multiply(5,8);
mathlib.square(7);
mathlib.random(1,35);