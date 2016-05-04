'use strict';

var VMParserErrors = (function () {
    function VMParserError(type, message) {
        this.type = type;
        this.message = message;
    }

    var instance = {
        ADDRESS_EXPECTED:  new VMParserError('ADDRESS_EXPECTED', "Command address expected"),
        OPCODE_EXPECTED:   new VMParserError('OPCODE_EXPECTED', "Opcode expected"),
        COLON_EXPECTED:    new VMParserError('COLON_EXPECTED', "Colon expected"),
        ARGUMENT_EXPECTED: new VMParserError('ARGUMENT_EXPECTED', "Int argument expected"),
        STOP_COMMAND_NOT_PRESENTED: new VMParserError('STOP_COMMAND_NOT_PRESENTED', "STOP command is not presented")
        
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();