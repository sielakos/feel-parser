import {expect} from 'chai';
import {nameStart} from '../lib';

describe('nameStart', () => {
  it('should parse name starts with latin characters', () => {
    const result = nameStart.parseText('alinaZS');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql('');
      expect(state.col).to.eql(7);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('alinaZS');
    });
  });

  it('should accept _ and ?', () => {
    const result = nameStart.parseText('_?d d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(3);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('_?d');
    });
  });

  it('should accept unicode', () => {
    const result = nameStart.parseText('\u00D8\u00F1 d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.str).to.eql(' d');
      expect(state.col).to.eql(2);
      expect(state.row).to.eql(0);
      expect(state.result).to.eql('\u00D8\u00F1');
    });
  });
});