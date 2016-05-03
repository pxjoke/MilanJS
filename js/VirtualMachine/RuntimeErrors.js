'use strict';

var RuntimeErrors = (function () {
    function RuntimeError(type, message) {
        this.type = type;
        this.message = message;
    }

    var instance = {
        BAD_DATA_ADDRESS:    new RuntimeError('BAD_DATA_ADDRESS',    "Error: illegal data address"),
        BAD_COMMAND_ADDRESS: new RuntimeError('BAD_COMMAND_ADDRESS', "Error: illegal program address"),
        BAD_CODE_ADDRESS:    new RuntimeError('BAD_CODE_ADDRESS',    "Error: illegal address in JUMP* instruction"),
        BAD_RELATION:        new RuntimeError('BAD_RELATION',        "Error: illegal comparison operator"),
        STACK_OVERFLOW:      new RuntimeError('STACK_OVERFLOW',      "Error: stack overflow"),
        STACK_EMPTY:         new RuntimeError('STACK_EMPTY',         "Error: stack is empty (no arguments are available)"),
        DIVISION_BY_ZERO:    new RuntimeError('DIVISION_BY_ZERO',    "Error: division by zero"),
        BAD_INPUT:           new RuntimeError('BAD_INPUT',           "Error: illegal input"),
        UNKNOWN_COMMAND:     new RuntimeError('UNKNOWN_COMMAND',     "Error: unknown command, unable to execute"),
        DEFAULT:             new RuntimeError('DEFAULT',             "Error: runtime error")
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();