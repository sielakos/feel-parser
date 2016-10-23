import {expect} from 'chai';
import {qualifiedName} from '../lib';

describe('qualifiedName', () => {
  it('should be able to parse simple name', () => {
    const result = qualifiedName.parseText('ali1ł d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql(['ali1ł']);
      expect(state.result.operator).to.eql('qualifiedName');
      expect(state.col).to.eql(5);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' d');
    });
  });

  it('should be able to parse dot separated name', () => {
    const result = qualifiedName.parseText('a.li.d1ł d');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.children).to.eql(['a', 'li', 'd1ł']);
      expect(state.result.operator).to.eql('qualifiedName');
      expect(state.col).to.eql(8);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' d');
    });
  });

  it('should fail for wrong name', () => {
    const result = qualifiedName.parseText('1ali1ł d');

    expect(result.isRight()).to.eql(false);

    result.onLeft(error => {
      const state = error.state;

      expect(state.col).to.eql(0);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('1ali1ł d');
    });
  });
});