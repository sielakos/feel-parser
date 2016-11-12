import {expect} from 'chai';
import {simpleUnaryTests} from '../lib';

describe('simpleUnaryTests', () => {
  it('should parse - test', () => {
    const result = simpleUnaryTests.parseText('- x1');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('dashTest');
      expect(state.result.children.length).to.eql(0);
      expect(state.col).to.eql(2);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('x1');
    });
  });

  it('should parse positive tests list', () => {
    const input = '[1 .. 20], >= 4';
    const result = simpleUnaryTests.parseText(input);

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      const result = state.result;

      expect(result.operator).to.eql('positiveUnaryTests');
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

  it('should parse negative tests list', () => {
    const input = 'not([1 .. 20], >= 4)';
    const result = simpleUnaryTests.parseText(input);

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
});
