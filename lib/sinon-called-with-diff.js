'use strict';

/* eslint-disable no-console */

const chalk = require('chalk');
const deepEqual = require('deep-equal');
const json5 = require('json5');

module.exports = (sinon) => {
    check(sinon);
    
    const stub = function() {
        const fn = sinon.stub();
        const {calledWith:original} = fn;
        
        fn.calledWith = (...args) => {
            original.apply(fn, args);
            return calledWith.apply(fn, args);
        };
        
        return fn;
    };
    
    Object.assign(stub, sinon.stub);
    
    return Object.assign({}, sinon, {stub});
};

function calledWith(...args) {
    if (!this.called) {
        write(`expected to call with ${JSON.stringify(args)}, but not called at all\n`);
        return false;
    }
    
    const actual = this.args[this.args.length - 1];
    
    if (deepEqual(actual, args))
        return true;
    
    if (compare(actual, args))
        return true;
    
    write(`wrong arguments in ${this.func.name}`);
    writeObjectActual('actual:', actual);
    writeObjectExpected('expected:', args);
    
    return false;
}

function compare(a, b) {
    let i = a.length;
    
    while (--i > -1) {
        console.log(a[i], b[i]);
        if (typeof a[i] !== typeof b[i])
            return false;
        
        if (typeof a[i] === 'function')
            continue;
        
        if (!deepEqual(a[i], b[i]))
            return false;
    }
    
    return true;
}

function write(str) {
    process.stdout.write(chalk.red(str) + '\n');
}

function writeObjectActual(str, object) {
    const json = json5.stringify(object, null, 2);
    console.log(str, chalk.yellow(json) + '\n');
}

function writeObjectExpected(str, object) {
    const json = json5.stringify(object, null, 2);
    console.log(str, chalk.green(json) + '\n');
}

function check(sinon) {
    if (typeof sinon !== 'object')
        throw Error('sinon should be an object!');
    
}

