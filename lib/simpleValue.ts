import {or, Parser} from 'parser-lib';
import {simpleLiteral} from './simpleLiteral';
import {qualifiedName} from './qualifiedName';
import {Tree} from './tree';

export const simpleValue: Parser<any, Tree<string | number | boolean>> = or<any, Tree<string | number | boolean>>(
  simpleLiteral,
  qualifiedName
);