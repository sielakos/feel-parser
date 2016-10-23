import {regularExpression, many1, or, Parser, withDefault} from 'parser-lib';
import {Tree} from './tree';

const nameStart: Parser<any, string> = many1(
  or(
    regularExpression(/^[A-Za-z]/),
    regularExpression(/^[\u00C0-\u00D6]/),
    regularExpression(/^[\u00D8-\u00F6]/),
    regularExpression(/^[\u00F8-\u02FF]/),
    regularExpression(/^[\u0370-\u037D]/),
    regularExpression(/^[\u037F-\u1FFF]/),
    regularExpression(/^[\u200C-\u200D]/),
    regularExpression(/^[\u2070-\u218F]/),
    regularExpression(/^[\u2C00-\u2FEF]/),
    regularExpression(/^[\u3001-\uD7FF]/),
    regularExpression(/^[\uF900-\uFDCF]/),
    regularExpression(/^[\uFDF0-\uFFFD]/),
    regularExpression(/^[_?]/)
  ).map(matched => matched[0])
).map(parts => parts.join(''));

const namePart: Parser<any, string> = many1(
  or(
    or(
      regularExpression(/^[0-9]/),
      regularExpression(/^[\u00B7\u0300-\u036F\u203F-\u2040]/)
    ).map(matched => matched[0]),
    nameStart
  )
).map(parts => parts.join(''));

export const name: Parser<any, Tree<string>> = nameStart
  .flatMap(nameStart => {
    return withDefault(
      namePart
        .map(namePart => nameStart + namePart),
      nameStart
    );
  })
  .map(name => new Tree('name', [name]))
  .changeErrorMessage('Expected name');

