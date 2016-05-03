'use strict';

function CodeEmitter(code) {
    var self = this;
    self.code = code?code:'';
    var address = 0;
    var buffer = [];
    var nopCommand = new Command(Opcodes.get().NOP);

    self.emit = function(opcode, arg) {
        address++;
        buffer.push(new Command(opcode, arg));
    };

    self.emitAt = function(addr, opcode, arg) {
        buffer[addr] = new Command(opcode, arg);
    };

    self.makeHole = function () {
        buffer.push(nopCommand);
        return address++;
    };

    self.getCurrentAddress = function () {
        return address;
    };

    self.flush = function () {
        buffer.forEach(function(command, addr) {
            self.code = self.code.concat(command.getStr(addr));
        });
        return self.code;
    };

}