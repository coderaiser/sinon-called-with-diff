'use strict';

const diff = require('jest-diff');
const strip = require('strip-ansi');
const chalk = require('chalk');

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
    
    return {
        ...sinon,
        stub,
    };
};

function calledWith(...args) {
    if (!this.called) {
        write(`expected to call with ${JSON.stringify(args)}, but not called at all\n`);
        return false;
    }
    
    const actual = this.args[this.args.length - 1];
    
    const msg = diff(actual, args);
    const striped = strip(msg);
    
    if (striped === 'Compared values have no visual difference.')
        return true;
    
    console.log(msg);
    
    return false;
}

function check(sinon) {
    if (typeof sinon !== 'object')
        throw Error('sinon should be an object!');
    
}

function write(str) {
    process.stdout.write(chalk.red(str) + '\n');
}

