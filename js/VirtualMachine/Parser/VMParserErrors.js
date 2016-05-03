'use strict';

var VMParserErrors = (function () {
    function VMParserError(type, message) {
        this.type = type;
        this.message = message;
    }

    var instance = {
        ADDRESS_EXPECTED:  new VMParserError('ADDRESS_EXPECTED', "Error: command address expected"),
        OPCODE_EXPECTED:   new VMParserError('OPCODE_EXPECTED', "Error: opcode expected"),
        COLON_EXPECTED:    new VMParserError('COLON_EXPECTED', "Error: colon expected"),
        ARGUMENT_EXPECTED: new VMParserError('ARGUMENT_EXPECTED', "Error: int argument expected")
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();