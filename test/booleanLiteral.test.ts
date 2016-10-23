import {expect} from 'chai';
import {booleanLiteral} from '../lib';

describe('booleanLiteral', () => {
  it('should parse "true"', () => {
    const result = booleanLiteral.parseText('true x');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql([true]);
      expect(state.result.operator).to.eql('boolean');
      expect(state.col).to.eql(4);
      expect(state.row).to.eql(0);
    });
  });

  it('should parse "false"', () => {
    const result = booleanLiteral.parseText('false x');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql([false]);
      expect(state.result.operator).to.eql('boolean');
      expect(state.col).to.eql(5);
      expect(state.row).to.eql(0);
    });
  });
});