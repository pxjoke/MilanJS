'use strict';

var RuntimeErrors = (function () {
    function RuntimeError(type, message) {
        this.type = type;
        this.message = message;
    }

    var instance = {
        BAD_DATA_ADDRESS:    new RuntimeError('BAD_DATA_ADDRESS',    "Illegal data address"),
        BAD_COMMAND_ADDRESS: new RuntimeError('BAD_COMMAND_ADDRESS', "Illegal program address"),
        BAD_CODE_ADDRESS:    new RuntimeError('BAD_CODE_ADDRESS',    "Illegal address in JUMP* instruction"),
        BAD_RELATION:        new RuntimeError('BAD_RELATION',        "Illegal comparison operator"),
        STACK_OVERFLOW:      new RuntimeError('STACK_OVERFLOW',      "Stack overflow"),
        STACK_EMPTY:         new RuntimeError('STACK_EMPTY',         "Stack is empty (no arguments are available)"),
        DIVISION_BY_ZERO:    new RuntimeError('DIVISION_BY_ZERO',    "Division by zero"),
        BAD_INPUT:           new RuntimeError('BAD_INPUT',           "Illegal input"),
        UNKNOWN_COMMAND:     new RuntimeError('UNKNOWN_COMMAND',     "Unknown command, maybe stop is not presented"),
        DEFAULT:             new RuntimeError('DEFAULT',             "Runtime error")
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();