import {expect} from 'chai';
import {simpleLiteral} from '../lib';

describe('simpleLiteral', () => {
  it('should parse string literals', () => {
    const result = simpleLiteral.parseText('"str"d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('string');
      expect(state.result.children).to.eql(['str']);
      expect(state.col).to.eql(5);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');
    });
  });

  it('should parse datetime literals', () => {
    const result = simpleLiteral.parseText('date("str")d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('date');
      expect(state.result.children).to.eql(['str']);
      expect(state.col).to.eql(11);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');
    });
  });

  it('should parse boolean literals', () => {
    const result = simpleLiteral.parseText('false');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('boolean');
      expect(state.result.children).to.eql([false]);
      expect(state.col).to.eql(5);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse numeric literals', () => {
    const result = simpleLiteral.parseText('1233');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('numeric');
      expect(state.result.children).to.eql([1233]);
      expect(state.col).to.eql(4);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });
});