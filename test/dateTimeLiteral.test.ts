import {expect} from 'chai';
import {dateTimeLiteral} from '../lib';

describe('dateTimeLiteral', () => {
  it('should parse date literals', () => {
    const result = dateTimeLiteral.parseText('date("ala")');

    expect(result.isRight()).to.eql(true);

    result.onRight((state) => {
      expect(state.result.operator).to.eql('date');
      expect(state.result.children).to.eql(['ala']);
      expect(state.col).to.eql(11);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('');
    });
  });

  it('should parse time literals', () => {
    const result = dateTimeLiteral.parseText('time("ala")s');

    expect(result.isRight()).to.eql(true);

    result.onRight((state) => {
      expect(state.result.operator).to.eql('time');
      expect(state.result.children).to.eql(['ala']);
      expect(state.col).to.eql(11);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('s');
    });
  });

  it('should parse duration literals', () => {
    const result = dateTimeLiteral.parseText('duration("ala")s');

    expect(result.isRight()).to.eql(true);

    result.onRight((state) => {
      expect(state.result.operator).to.eql('duration');
      expect(state.result.children).to.eql(['ala']);
      expect(state.col).to.eql(15);
      expect(state.row).to.eql(0);
      expect(state.str).to.eql('s');
    });
  });
});