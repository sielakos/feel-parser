import {Parser, regularExpression} from 'parser-lib';
import {Tree} from './tree';

export const stringLiteral: Parser<any, Tree<string>> = regularExpression(/^"([^\n]*)"/)
  .map(matched => new Tree('stringLiteral', [matched[1]]))
  .changeErrorMessage('Expected string literal');