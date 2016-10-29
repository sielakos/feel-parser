import {symbol, between, or, Parser} from 'parser-lib';
import {stringLiteral} from './stringLiteral';
import {Tree} from './tree';

export const dateTimeLiteral: Parser<any, Tree<string>> = or(
  symbol('date'),
  symbol('time'),
  symbol('duration')
).flatMap(operator => {
  return between('(', ')', stringLiteral)
    .map(stringTree => new Tree(operator, stringTree.children));
});