import {Parser, separatedBy, symbol} from 'parser-lib';
import {name} from './name';
import {Tree} from './tree';

export const qualifiedName: Parser<any, Tree<string>> = separatedBy(name, symbol('.'))
  .filter(names => names.length > 0)
  .map((nameTrees: Array<Tree<string>>) => {
    const names: Array<string> = nameTrees
      .map((name: Tree<string>) => {
        const child = name.children[0]; //there will be only one child and it will be string

        if (typeof child === 'string') {
          return child;
        }

        // something went terribly wrong, but it is rather very unlikely
        throw `Expected ${child} to be string`;
      });

    return new Tree<string>(
      'qualifiedName',
      names
    );
  })
  .changeErrorMessage('Expected qualified name');