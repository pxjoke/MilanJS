'use strict';

function Command(opcode, arg) {
    this.opcode = opcode;
    this.arg = arg?arg:0;
    var self = this;
    
    this.getStr = function (adress) {
        return adress+': '+self.opcode.name+(self.opcode.needArgs?' '+self.arg:'')+ '\n';
    }
}