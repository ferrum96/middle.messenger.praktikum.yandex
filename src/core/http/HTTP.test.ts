import { expect } from 'chai';
import HTTP from './HTTP';

describe('HTTP class', () => {
  it('should initialize with a default path', () => {
    const http = new HTTP();
    expect(http._path).to.equal('');
  });

  it('should initialize with a specified path', () => {
    const path = '/test';
    const http = new HTTP(path);
    expect(http._path).to.equal(path);
  });
});
