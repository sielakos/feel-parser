import {or, keyword, Parser} from 'parser-lib';
import {Tree} from './tree';
import {interval} from './interval';
import {simpleValue} from './simpleValue';

const singleSidedComparasion = or(
  keyword('<=', false),
  keyword('>=', false),
  keyword('<', false),
  keyword('>', false)
).flatMap(operator => {
  return simpleValue.map(value => new Tree(operator, [value]));
});

export const positiveUnaryTest: Parser<any, Tree<boolean | number | string>> = or(
  singleSidedComparasion,
  interval
);
