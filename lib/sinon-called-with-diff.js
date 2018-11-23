'use strict';

const calledWith = require('@cloudcmd/stub/lib/called-with');

module.exports = (sinon) => {
    check(sinon);
    
    const stub = function() {
        const fn = sinon.stub();
        const {calledWith:original} = fn;
        
        fn.calledWith = function (...args) {
            original.apply(fn, args);
            const calledArgs = this.args[this.args.length - 1];
            
            return calledWith({
                called: fn.called,
                args,
                calledArgs,
            });
        };
        
        return fn;
    };
    
    return {
        ...sinon,
        stub,
    };
};

function check(sinon) {
    if (typeof sinon !== 'object')
        throw Error('sinon should be an object!');
    
}

