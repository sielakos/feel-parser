import {keyword, or, Parser, namedSequence} from 'parser-lib';
import {Tree} from './tree';
import {simpleValue} from './simpleValue';

const openIntervalStart = or(
  keyword('(', false),
  keyword(']', false)
).map(() => new Tree('open', []));

const openIntervalEnd = or(
  keyword(')', false),
  keyword('[', false)
).map(() => new Tree('open', []));

const closedIntervalStart = keyword('[', false)
  .map(() => new Tree('closed', []));

const closedIntervalEnd = keyword(']', false)
  .map(() => new Tree('closed', []));


export const interval: Parser<any, Tree<boolean | number | string>> = namedSequence(
  {
    openBracket: or(
      openIntervalStart,
      closedIntervalStart
    ),
    start: simpleValue,
    dash: keyword('..', false).map(() => new Tree('', [])),
    end: simpleValue,
    closeBracket: or(
      openIntervalEnd,
      closedIntervalEnd
    )
  }
).map((result: {[key: string]: Tree<boolean | number | string>}) => {
  return new Tree(
    'interval',
    [
      new Tree(result['openBracket'].operator, result['start'].children),
      new Tree(result['closeBracket'].operator, result['end'].children)
    ]
  );
});
