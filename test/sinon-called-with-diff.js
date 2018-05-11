'use strict';

const test = require('tape');
const diff = require('..');

const sinon = diff(require('sinon'));

test('sinon-called-with-diff: no arguments', (t) => {
    t.throws(diff, /sinon should be an object!/, 'should throw when no sinon');
    t.end();
});

test('sinon-called-with-diff: returns', (t) => {
    const sinon = {};
    const result = diff(sinon);
    
    t.ok(typeof result.stub, 'function', 'should override stub');
    t.end();
});

test('sinon-called-with-diff: calledWith', (t) => {
    const calledWith = sinon.stub();
    const stub = sinon.stub()
        .returns({
            calledWith,
        });
    
    const sn = {
        stub,
    };
    
    const expected = diff(sn);
    
    t.notEqual(expected.calledWith, calledWith, 'should patch sinon.stub');
    t.end();
});

test('sinon-called-with-diff', (t) => {
    const fn = sinon.stub();
    
    fn('hello');
    
    t.ok(fn.calledWith('hello'), 'should return true');
    t.end();
});

test('sinon-called-with-diff: wrong arguments example', (t) => {
    const fn = sinon.stub();
    
    fn('hello');
    
    fn.calledWith('world');
    t.pass('should show the differance');
    t.end();
});

test('sinon-called-with-diff: not called example', (t) => {
    const fn = sinon.stub();
    
    fn.calledWith('hello');
    t.pass('should output that no called');
    t.end();
});

