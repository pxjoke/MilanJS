'use strict';
function Operations() {
 
    this.NOP      = {name: "NOP",      takesArguments: false};
    this.STOP     = {name: "STOP",     takesArguments: false};
    this.LOAD     = {name: "LOAD",     takesArguments: true };
    this.STORE    = {name: "STORE",    takesArguments: true };
    this.BLOAD    = {name: "BLOAD",    takesArguments: true };
    this.BSTORE   = {name: "BSTORE",   takesArguments: true };
    this.PUSH     = {name: "PUSH",     takesArguments: true };
    this.POP      = {name: "POP",      takesArguments: false};
    this.DUP      = {name: "DUP",      takesArguments: false};
    this.INVERT   = {name: "INVERT",   takesArguments: false};
    this.ADD      = {name: "ADD",      takesArguments: false};
    this.SUB      = {name: "SUB",      takesArguments: false};
    this.MULT     = {name: "MULT",     takesArguments: false};
    this.DIV      = {name: "DIV",      takesArguments: false};
    this.COMPARE  = {name: "COMPARE",  takesArguments: true };
    this.JUMP     = {name: "JUMP",     takesArguments: true };
    this.JUMP_YES = {name: "JUMP_YES", takesArguments: true };
    this.JUMP_NO  = {name: "JUMP_NO",  takesArguments: true };
    this.INPUT    = {name: "INPUT",    takesArguments: false};
    this.PRINT    = {name: "PRINT",    takesArguments: false};

}