import {expect} from 'chai';
import {name} from '../lib';

describe('name', () => {
  it('should parse name starts with latin characters', () => {
    const result = name.parseText('alinaZS');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql('');
      expect(state.col).to.eql(7);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('alinaZS');
    });
  });

  it('should accept _ and ?', () => {
    const result = name.parseText('_?d d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(3);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('_?d');
    });
  });

  it('should accept unicode', () => {
    const result = name.parseText('\u00D8\u00F1 d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(2);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('\u00D8\u00F1');
    });
  });

  it('should accept digits in middle of name', () => {
    const result = name.parseText('a1a d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(3);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('a1a');
    });
  });

  it('should accept \u00B7 in middle of name', () => {
    const result = name.parseText('a\u00B7a d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(3);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('a\u00B7a');
    });
  });

  it('should fail for wrong name', () => {
    const result = name.parseText('1ali1ł d');

    expect(result.isRight()).to.eql(false);

    result.onLeft(error => {
      const state = error.state;

      console.log(error);

      expect(state.col).to.eql(0);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('1ali1ł d');
    });
  });
});