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

test('sinon-called-with-diff: calledWith: should show the difference', (t) => {
    const calledWith = sinon.stub();
    const stubFunction = sinon.stub();
    
    stubFunction.calledWith = calledWith;
    
    const stub = sinon.stub()
        .returns(stubFunction);
    
    const sn = {
        stub,
    };
    
    diff(sn);
    
    const fn = sn.stub();
    
    fn('hello');
    fn.calledWith('hello');
    
    t.ok(calledWith.calledWith('hello'), 'should call original calledWith');
    t.end();
});

test('sinon-called-with-diff: calledWith: not called', (t) => {
    const calledWith = sinon.stub();
    const stubFunction = sinon.stub();
    
    stubFunction.calledWith = calledWith;
    
    const stub = sinon.stub()
        .returns(stubFunction);
    
    const sn = {
        stub,
    };
    
    diff(sn);
    
    const fn = sn.stub();
    
    fn.calledWith('hello');
    
    t.ok(calledWith.calledWith('hello'), 'should call original calledWith');
    t.end();
});

test('sinon-called-with-diff: wrong arguments example', (t) => {
    const fn = sinon.stub();
    
    fn('hello');
    
    t.notOk(fn.calledWith('world'), 'should show the differance');
    t.end();
});

test('sinon-called-with-diff: not called example', (t) => {
    const fn = sinon.stub();
    
    t.notOk(fn.calledWith('hello'), 'should output that no called');
    t.end();
});

test('sinon-called-with-diff: a couple arguments example', (t) => {
    const fn = sinon.stub();
    
    fn('hello', 'world');
    
    t.notOk(fn.calledWith('hello'), 'should show diff when not all args equal');
    t.end();
});
