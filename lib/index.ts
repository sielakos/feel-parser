import {chainLeft, operator, number} from 'parser-lib';

const simpleParser = chainLeft(
  number,
  operator(
    '+',
    (a, b) => ({'+': [a, b]})
  )
);

console.log(simpleParser.parseText('1 + 2 + 3'));