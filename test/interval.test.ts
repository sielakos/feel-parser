import {expect} from 'chai';
import {interval, Tree} from '../lib';

describe('interval', () => {
  it('should parse () interval', () => {
    const input = '(11 .. 12)';
    const result = interval.parseText(input + 'd');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.children.length).to.eql(2);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');

      const [first, second] = state.result.children;

      if (first instanceof Tree && second instanceof Tree) {
        expect(first.operator).to.eql('open');
        expect(first.treeChildren[0].children).to.eql([11]);

        expect(second.operator).to.eql('open');
        expect(second.treeChildren[0].children).to.eql([12]);
      } else {
        expect(false, 'Expected children to be instances od Tree').to.eql(true);
      }
    });
  });

  it('should parse ][ interval', () => {
    const input = ']11 .. 12[';
    const result = interval.parseText(input + 'd');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.children.length).to.eql(2);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');

      const [first, second] = state.result.children;

      if (first instanceof Tree && second instanceof Tree) {
        expect(first.operator).to.eql('open');
        expect(first.treeChildren[0].children).to.eql([11]);

        expect(second.operator).to.eql('open');
        expect(second.treeChildren[0].children).to.eql([12]);
      } else {
        expect(false, 'Expected children to be instances od Tree').to.eql(true);
      }
    });
  });

  it('should parse ([ interval', () => {
    const input = '(11 .. 12[';
    const result = interval.parseText(input + 'd');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.children.length).to.eql(2);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');

      const [first, second] = state.result.children;

      if (first instanceof Tree && second instanceof Tree) {
        expect(first.operator).to.eql('open');
        expect(first.treeChildren[0].children).to.eql([11]);

        expect(second.operator).to.eql('open');
        expect(second.treeChildren[0].children).to.eql([12]);
      } else {
        expect(false, 'Expected children to be instances od Tree').to.eql(true);
      }
    });
  });

  it('should parse [] interval', () => {
    const input = '[name.d .. 12]';
    const result = interval.parseText(input + 'd');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.children.length).to.eql(2);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');

      const [first, second] = state.result.children;

      if (first instanceof Tree && second instanceof Tree) {
        expect(first.operator).to.eql('closed');
        expect(first.treeChildren[0].children).to.eql(['name', 'd']);

        expect(second.operator).to.eql('closed');
        expect(second.treeChildren[0].children).to.eql([12]);
      } else {
        expect(false, 'Expected children to be instances od Tree').to.eql(true);
      }
    });
  });

  it('should parse [) interval', () => {
    const input = '[name.d .. 12)';
    const result = interval.parseText(input + 'd');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('interval');
      expect(state.result.children.length).to.eql(2);
      expect(state.col).to.eql(input.length);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('d');

      const [first, second] = state.result.children;

      if (first instanceof Tree && second instanceof Tree) {
        expect(first.operator).to.eql('closed');
        expect(first.treeChildren[0].children).to.eql(['name', 'd']);

        expect(second.operator).to.eql('open');
        expect(second.treeChildren[0].children).to.eql([12]);
      } else {
        expect(false, 'Expected children to be instances od Tree').to.eql(true);
      }
    });
  });
});
