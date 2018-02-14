'use strict';

/* eslint-disable no-console */

const chalk = require('chalk');

module.exports = (sinon) => {
    check(sinon);
    
    const stub = function() {
        const fn = sinon.stub();
        const {calledWith:original} = fn;
        
        fn.calledWith = (...args) => {
            if (original.apply(fn, args))
                return true;
            
            return calledWith.apply(fn, args);
        };
        
        return fn;
    };
    
    Object.assign(stub, sinon.stub);
    
    return Object.assign({}, sinon, {stub});
};

function calledWith(...args) {
    if (!this.called) {
        write(`expected to call with ${JSON.stringify(this.args)}, but not called at all\n`);
        return false;
    }
    
    const actual = this.args.pop();
    
    write(`wrong arguments in ${this.func.name}`);
    writeObjectActual('actual:', actual);
    writeObjectExpected('expected:', args);
    
    return false;
}

function write(str) {
    process.stdout.write(chalk.red(str) + '\n');
}

function writeObjectActual(str, object) {
    const json = JSON.stringify(object, null, 2);
    console.log(str, chalk.yellow(json) + '\n');
}

function writeObjectExpected(str, object) {
    const json = JSON.stringify(object, null, 2);
    console.log(str, chalk.green(json) + '\n');
}

function check(sinon) {
    if (typeof sinon !== 'object')
        throw Error('sinon should be an object!');
    
}

