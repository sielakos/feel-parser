import {expect} from 'chai';
import {positiveUnaryTest} from '../lib';

describe('positiveUnaryTest', () => {
  it('should parse interval', () => {
    const input = '[12 .. 14.3]';
    const result = positiveUnaryTest.parseText(input);

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.treeChildren.length).to.eql(2);
      expect(state.result.treeChildren[0].operator).to.eql('closed');
      expect(state.result.treeChildren[0].treeChildren[0].operator).to.eql('numeric');
      expect(state.result.treeChildren[0].treeChildren[0].children).to.eql([12]);
      expect(state.result.treeChildren[1].operator).to.eql('closed');
      expect(state.result.treeChildren[1].treeChildren[0].operator).to.eql('numeric');
      expect(state.result.treeChildren[1].treeChildren[0].children).to.eql([14.3]);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse >= 4', () => {
    const input = '>= 4';
    const result = positiveUnaryTest.parseText(input + ' 45');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('>=');
      expect(state.result.treeChildren.length).to.eql(1);
      expect(state.result.treeChildren[0].operator).to.eql('numeric');
      expect(state.result.treeChildren[0].children).to.eql([4]);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' 45');
    });
  });

  it('should parse > d.a1', () => {
    const input = '> d.a1';
    const result = positiveUnaryTest.parseText(input + ' 45');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('>');
      expect(state.result.treeChildren.length).to.eql(1);
      expect(state.result.treeChildren[0].operator).to.eql('qualifiedName');
      expect(state.result.treeChildren[0].children).to.eql(['d', 'a1']);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' 45');
    });
  });

  it('should parse <= 4', () => {
    const input = '<= 4';
    const result = positiveUnaryTest.parseText(input + ' 45');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('<=');
      expect(state.result.treeChildren.length).to.eql(1);
      expect(state.result.treeChildren[0].operator).to.eql('numeric');
      expect(state.result.treeChildren[0].children).to.eql([4]);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' 45');
    });
  });

  it('should parse < 4', () => {
    const input = '< 4';
    const result = positiveUnaryTest.parseText(input + ' 45');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('<');
      expect(state.result.treeChildren.length).to.eql(1);
      expect(state.result.treeChildren[0].operator).to.eql('numeric');
      expect(state.result.treeChildren[0].children).to.eql([4]);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql(' 45');
    });
  });
});
