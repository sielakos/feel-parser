import {Parser, separatedBy, symbol} from 'parser-lib';
import {name} from './name';

export const qualifiedName: Parser<any, Array<string>> = separatedBy(name, symbol('.'))
  .filter(names => names.length > 0)
  .changeErrorMessage('Expected qualified name');