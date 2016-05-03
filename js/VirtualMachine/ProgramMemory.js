function ProgramMemory(maxSize, errorHandler) {
    var self = this;
    var commands = [];
    var MAX_PROGRAM_SIZE = maxSize;

    self.put = put;
    self.get = get;
    self.memory = commands;
    self.printToConsole = printToConsole;

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

    function printToConsole() {
        for(var i in commands){
            console.log(commands[i].address + ": " + commands[i].opcode.name + " " + commands[i].argument);
        }

    }
}