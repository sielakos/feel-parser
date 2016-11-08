import {separatedBy, Parser} from 'parser-lib';
import {positiveUnaryTest} from './positiveUnaryTest';
import {Tree} from './tree';

export const positiveUnaryTestsList: Parser<any, Tree<boolean | number | string>> =
  separatedBy(positiveUnaryTest, ',')
    .filter(list => list.length > 0, 'Expected simple test')
    .map(list => new Tree('positiveUnaryTests', list));

