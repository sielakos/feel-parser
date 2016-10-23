import {expect} from 'chai';
import {stringLiteral} from '../lib';

describe('stringLiteral', () => {
  it('should parse strings enclosed in "', () => {
    const value = 'ala ma kota';
    const rest = ' rest';
    const result = stringLiteral.parseText(`"${value}"${rest}`);

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql([value]);
      expect(state.result.operator).to.eql('stringLiteral');
      expect(state.col).to.eql(value.length + 2);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(rest);
    });
  });

  it('should fail if enter is inside string literal', () => {
    const value = 'ala ma \n kota';
    const rest = ' rest';
    const result = stringLiteral.parseText(`"${value}"${rest}`);

    expect(result.isRight()).to.eql(false);

    result.onLeft(error => {
      const {state} = error;

      expect(state.col).to.eql(0);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(`"${value}"${rest}`);
    });
  });
});