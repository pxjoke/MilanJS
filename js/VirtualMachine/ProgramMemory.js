function ProgramMemory(maxSize, errorHandler) {
    var self = this;
    var commands = [];
    var MAX_PROGRAM_SIZE = maxSize;
    
    return {
        put: put,
        get: get
    };

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
}