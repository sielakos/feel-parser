import {Parser, keyword, between} from 'parser-lib';
import {positiveUnaryTestsList} from './positiveUnaryTestsList';
import {Tree} from './tree';

export const negativeUnaryTestsList: Parser<any, Tree<boolean | number | string>> =
  keyword('not', false)
    .next(
      between('(', ')', positiveUnaryTestsList)
    )
    .map(tree => new Tree('negativeUnaryTests', tree.children));
