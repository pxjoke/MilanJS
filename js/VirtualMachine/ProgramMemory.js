function ProgramMemory(maxSize, errorHandler) {
    var self = this;
    var commands = [];
    var MAX_PROGRAM_SIZE = maxSize;

    self.put = put;
    self.get = get;
    self.printCommands = printCommands;
    self.getDump = getDump;

    function put(address, opcode, argument) {
        if (parseInt(address) < MAX_PROGRAM_SIZE) {
            commands[address] = new Command(parseInt(address), opcode, parseInt(argument));
        }
        else {
            errorHandler.error(RuntimeErrors.get().BAD_COMMAND_ADDRESS);
        }
    }

    function get(programPointer) {
        return commands[programPointer];
    }

    function printCommands() {
        for (var i in commands) {
            VMConsole.write(commands[i].address + ": " + commands[i].opcode.name + " " + commands[i].argument);
        }
    }

    function getDump() {
        var buffer = "";
        for (var i in commands) {
            buffer += (commands[i].address + ": " + commands[i].opcode.name + " " + (commands[i].opcode.needArgs ? commands[i].argument : '') + "\n");
        }
        return buffer;
    }

}