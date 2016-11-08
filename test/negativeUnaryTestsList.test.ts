import {expect} from 'chai';
import {negativeUnaryTestsList} from '../lib';

describe('negativeUnaryTestsList', () => {
  it('should parse list of positive unary tests', () => {
    const input = 'not([1 .. 20], >= 4)';
    const result = negativeUnaryTestsList.parseText(input);

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      const result = state.result;

      expect(result.operator).to.eql('negativeUnaryTests');
      expect(result.children.length).to.eql(2);
      expect(result.treeChildren[0].operator).to.eql('interval');
      expect(result.treeChildren[0].treeChildren[0].operator).to.eql('closed');
      expect(result.treeChildren[0].treeChildren[0].treeChildren[0].children).to.eql([1]);
      expect(result.treeChildren[0].treeChildren[0].treeChildren[0].operator).to.eql('numeric');
      expect(result.treeChildren[0].treeChildren[1].treeChildren[0].children).to.eql([20]);
      expect(result.treeChildren[0].treeChildren[1].treeChildren[0].operator).to.eql('numeric');
      expect(result.treeChildren[0].treeChildren[1].operator).to.eql('closed');
      expect(result.treeChildren[1].operator).to.eql('>=');
      expect(result.treeChildren[1].treeChildren[0].operator).to.eql('numeric');
      expect(result.treeChildren[1].treeChildren[0].children).to.eql([4]);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse single test', () => {
    const input = 'not([1 .. 20])';
    const result = negativeUnaryTestsList.parseText(input);

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      const result = state.result;

      expect(result.operator).to.eql('negativeUnaryTests');
      expect(result.children.length).to.eql(1);
      expect(result.treeChildren[0].operator).to.eql('interval');
      expect(result.treeChildren[0].treeChildren[0].operator).to.eql('closed');
      expect(result.treeChildren[0].treeChildren[0].treeChildren[0].children).to.eql([1]);
      expect(result.treeChildren[0].treeChildren[0].treeChildren[0].operator).to.eql('numeric');
      expect(result.treeChildren[0].treeChildren[1].treeChildren[0].children).to.eql([20]);
      expect(result.treeChildren[0].treeChildren[1].treeChildren[0].operator).to.eql('numeric');
      expect(result.treeChildren[0].treeChildren[1].operator).to.eql('closed');
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should fail on incorrect input', () => {
    const input = 'not(df)';
    const result = negativeUnaryTestsList.parseText(input);

    expect(result.isRight()).to.eql(false);

    result.onRight(state => {
      expect(state.col).to.eql(0);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(input);
    });
  });
});
