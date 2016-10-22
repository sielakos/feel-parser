import {regularExpression, many1, or, Parser, symbol} from 'parser-lib';

export const nameStart: Parser<any, string> = many1(
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