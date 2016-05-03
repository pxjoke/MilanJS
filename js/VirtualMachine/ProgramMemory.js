function ProgramMemory(maxSize) {
    var self = this;
    var commands = [];
    var MAX_PROGRAM_SIZE = maxSize;

    return {
        put: put,
        commands: commands
    };

    function put(address, operation, argument) {
        if(address < MAX_PROGRAM_SIZE) {
            commands[address] = new Command(operation, argument);
        }
        else {
            //TODO: errorHandler
        }
    }
}