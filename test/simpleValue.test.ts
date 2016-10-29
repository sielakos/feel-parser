import {expect} from 'chai';
import {simpleValue} from '../lib';

describe('simpleValue', () => {
  it('should parse qualified name', () => {
    const result = simpleValue.parseText('alina.d.d12');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('qualifiedName');
      expect(state.result.children).to.eql(['alina', 'd', 'd12']);
      expect(state.col).to.eql(11);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse "time" as name', () => {
    const result = simpleValue.parseText('time');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('qualifiedName');
      expect(state.result.children).to.eql(['time']);
      expect(state.col).to.eql(4);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse numeric literal', () => {
    const result = simpleValue.parseText('-234.34');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('numeric');
      expect(state.result.children).to.eql([-234.34]);
      expect(state.col).to.eql(7);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse boolean literal', () => {
    const result = simpleValue.parseText('true');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('boolean');
      expect(state.result.children).to.eql([true]);
      expect(state.col).to.eql(4);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse dateTime literal', () => {
    const result = simpleValue.parseText('time("ala")s');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('time');
      expect(state.result.children).to.eql(['ala']);
      expect(state.col).to.eql(11);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('s');
    });
  });


  it('should parse string literal', () => {
    const result = simpleValue.parseText('"ss"');

    expect(result.isRight()).to.eql(true);

    result.onRight(state => {
      expect(state.result.operator).to.eql('string');
      expect(state.result.children).to.eql(['ss']);
      expect(state.col).to.eql(4);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });
});