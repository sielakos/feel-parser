import {or, Parser} from 'parser-lib';
import {numericLiteral} from './numericLiteral';
import {stringLiteral} from './stringLiteral';
import {dateTimeLiteral} from './dateTimeLiteral';
import {booleanLiteral} from './booleanLiteral';
import {Tree} from './tree';

export const simpleLiteral = or<any, Tree<string | boolean | number>>(
  numericLiteral,
  stringLiteral,
  dateTimeLiteral,
  booleanLiteral
);