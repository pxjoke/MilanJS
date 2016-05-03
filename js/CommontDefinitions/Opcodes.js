'use strict';

var Opcodes = (function () {

    function Opcode(name, needArgs) {
        this.name = name;
        this.needArgs = needArgs;
    }

    var instance = {
        NOP:      new Opcode('NOP',      false),
        STOP:     new Opcode('STOP',     false),
        LOAD:     new Opcode('LOAD',     true),
        STORE:    new Opcode('STORE',    true),
        BLOAD:    new Opcode('BLOAD',    true),
        BSTORE:   new Opcode('BSTORE',   true),
        PUSH:     new Opcode('PUSH',     true),
        POP:      new Opcode('POP',      false),
        DUP:      new Opcode('DUP',      false),
        ADD:      new Opcode('ADD',      false),
        SUB:      new Opcode('SUB',      false),
        MULT:     new Opcode('MULT',     false),
        DIV:      new Opcode('DIV',      false),
        INVERT:   new Opcode('INVERT',   false),
        COMPARE:  new Opcode('COMPARE',  true),
        JUMP:     new Opcode('JUMP',     true),
        JUMP_YES: new Opcode('JUMP_YES', true),
        JUMP_NO:  new Opcode('JUMP_NO',  true),
        INPUT:    new Opcode('INPUT',    false),
        PRINT:    new Opcode('PRINT',    false)
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();