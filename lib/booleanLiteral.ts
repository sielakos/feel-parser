import {symbol, or, Parser} from 'parser-lib';
import {Tree} from './tree';

export const booleanLiteral: Parser<any, Tree<boolean>> = or(
  symbol('true').map(() => true),
  symbol('false').map(() => false)
).map(boolean => new Tree('boolean', [boolean]));