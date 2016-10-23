import {numericLiteral} from '../lib';
import {expect} from 'chai';

describe('numericLiteral', () => {
  it('should parser real', () => {
    const result = numericLiteral.parseText('-1003.23');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql([-1003.23]);
      expect(state.result.operator).to.eql('numeric');
      expect(state.col).to.eql(8);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse numbers like .45', () => {
    const result = numericLiteral.parseText('.45d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql([0.45]);
      expect(state.result.operator).to.eql('numeric');
      expect(state.col).to.eql(3);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');
    });
  });
});