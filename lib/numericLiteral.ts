import {number, integer, symbol, or, Parser} from 'parser-lib';
import {Tree} from "./tree";

const positive = integer.filter(num => num > 0);

const realPart = symbol('.')
  .next(positive)
  .map(num => +`0.${num}`);

export const numericLiteral: Parser<any, Tree<number>> = or(
    number,
    realPart,
    symbol('-')
      .next(realPart)
      .map(num => -num)
  )
  .map(num => new Tree('numeric', [num]));