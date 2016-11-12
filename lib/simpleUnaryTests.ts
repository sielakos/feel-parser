import {or, keyword, Parser} from 'parser-lib';
import {positiveUnaryTestsList} from './positiveUnaryTestsList';
import {negativeUnaryTestsList} from './negativeUnaryTestsList';
import {Tree} from './tree';

export const simpleUnaryTests: Parser<any, Tree<boolean | number | string>> =
  or(
    positiveUnaryTestsList,
    negativeUnaryTestsList,
    keyword('-', false).map(() => new Tree('dashTest', []))
  );
