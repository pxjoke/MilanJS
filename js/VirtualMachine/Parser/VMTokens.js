'use strict';

var VMTokens = (function () {
    function VMToken(name) {
        this.name = name;
    }

    var instance = {
        INT:    new VMToken('INT'),
        COLON:  new VMToken('COLON'),
        OPCODE: new VMToken('OPCODE'),
        ILLEGAL: new VMToken('ILLEGAL')
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };

})();

