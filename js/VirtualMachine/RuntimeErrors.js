'use strict';

var RuntimeErrors = (function () {
    function RuntimeErrors(type, message) {
        this.type = type;
        this.message = message;
    }

    var instance = {
        BAD_DATA_ADDRESS:    new RuntimeErrors('BAD_DATA_ADDRESS',    "Error: illegal data address"),
        BAD_COMMAND_ADDRESS: new RuntimeErrors('BAD_COMMAND_ADDRESS', "Error: illegal program address"),
        BAD_CODE_ADDRESS:    new RuntimeErrors('BAD_CODE_ADDRESS',    "Error: illegal address in JUMP* instruction"),
        BAD_RELATION:        new RuntimeErrors('BAD_RELATION',        "Error: illegal comparison operator"),
        STACK_OVERFLOW:      new RuntimeErrors('STACK_OVERFLOW',      "Error: stack overflow"),
        STACK_EMPTY:         new RuntimeErrors('STACK_EMPTY',         "Error: stack is empty (no arguments are available)"),
        DIVISION_BY_ZERO:    new RuntimeErrors('DIVISION_BY_ZERO',    "Error: division by zero"),
        BAD_INPUT:           new RuntimeErrors('BAD_INPUT',           "Error: illegal input"),
        UNKNOWN_COMMAND:     new RuntimeErrors('UNKNOWN_COMMAND',     "Error: unknown command, unable to execute"),
        DEFAULT:             new RuntimeErrors('DEFAULT',             "Error: runtime error")
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();