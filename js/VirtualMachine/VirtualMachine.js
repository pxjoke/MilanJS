function VirtualMachine() {
    var self = this;

    var errorHandler = new RuntimeErrorHandler();
    var programMemory = new ProgramMemory(Constants.get().MAX_PROGRAM_SIZE, errorHandler);
    var dataMemory = new DataMemory(Constants.get().MAX_DATA_ADDRESS, errorHandler);
    var stackWorkspace = new StackWorkspace(Constants.get().MAX_STACK_SIZE, errorHandler);
    var scanner;
    var parser;
    var isWorking = false;
    var programPointer = 0;

    self.compile = compile;
    self.execute = execute;
    self.stop = stop;
    self.getProgramPointer = getProgramPointer;
    self.printProgramCommands = printProgramCommands;
    self.printMemoryDump = printMemoryDump;
    self.printStack = printStack;
    self.printState = printState;
    self.getCommandsDump = getCommandsDump;
    self.executeCommand = executeCommand;
    
    
    function getCommandsDump() {
        return programMemory.getDump();
    }
    
    function compile(source) {
        scanner = new VMScanner(source);
        parser = new VMParser(scanner, programMemory);
        parser.parse();
    }


    function getProgramPointer() {
        return programPointer;
    }

    function printMemoryDump() {
        VMConsole.write("Memory:");
        VMConsole.write("");
        dataMemory.printMemoryDump();
        VMConsole.write("");
        VMConsole.write("------------------------------");        
        
    }

    function printProgramCommands() {
        VMConsole.write("Program:");
        VMConsole.write("");
        programMemory.printCommands();
        VMConsole.write("");
        VMConsole.write("------------------------------");
    }

    function printStack() {
        VMConsole.write("Stack:");
        VMConsole.write("");
        stackWorkspace.printStack();
        VMConsole.write("");
        VMConsole.write("------------------------------");
    }

    function printState() {
        printProgramCommands();
        printMemoryDump();
        printStack();
    }

    function execute() {
        if (!parser.isAnyError())
            isWorking = true;
        while (isWorking && programPointer < Constants.get().MAX_PROGRAM_SIZE && !errorHandler.isAnyError()) {
            executeCommand();
        }
        errorHandler.printAllErrors();
        errorHandler.printAllWarnings();
    }

    function stop() {
        isWorking = false;
    }

    function executeCommand() {
        var command = programMemory.get(programPointer);
        if (!command) {
            stop();
            errorHandler.error(RuntimeErrors.get().UNKNOWN_COMMAND);
            return;
        }
        var data = 0;
        switch (command.opcode) {
            case Opcodes.get().NOP:
                break;

            case Opcodes.get().STOP:
                stop();
                break;

            case Opcodes.get().LOAD:
                stackWorkspace.push(dataMemory.load(command.argument));
                break;

            case Opcodes.get().STORE:
                dataMemory.store(command.argument, stackWorkspace.pop());
                break;

            case Opcodes.get().BLOAD:
                stackWorkspace.push(dataMemory.load(command.argument + stackWorkspace.pop()));
                break;

            case Opcodes.get().BSTORE:
                data = stackWorkspace.pop();
                dataMemory.store(command.argument + data, stackWorkspace.pop());
                break;

            case Opcodes.get().PUSH:
                stackWorkspace.push(command.argument);
                break;

            case Opcodes.get().POP:
                stackWorkspace.pop();
                break;

            case Opcodes.get().DUP:
                data = stackWorkspace.pop();
                stackWorkspace.push(data);
                stackWorkspace.push(data);
                break;

            case Opcodes.get().INVERT:
                stackWorkspace.push(-1 * stackWorkspace.pop());
                break;

            case Opcodes.get().ADD:
                data = parseInt(stackWorkspace.pop());
                stackWorkspace.push(parseInt(stackWorkspace.pop()) + data);
                break;

            case Opcodes.get().SUB:
                data = parseInt(stackWorkspace.pop());
                stackWorkspace.push(parseInt(stackWorkspace.pop()) - data);
                break;

            case Opcodes.get().MULT:
                data = parseInt(stackWorkspace.pop());
                stackWorkspace.push(parseInt(stackWorkspace.pop()) * data);
                break;

            case Opcodes.get().DIV:
                data = parseInt(stackWorkspace.pop());
                if (0 == data) {
                    errorHandler.error(RuntimeErrors.get().DIVISION_BY_ZERO);
                }
                else {
                    stackWorkspace.push(parseInt(stackWorkspace.pop()) / data);
                }
                break;

            case Opcodes.get().COMPARE:
                data = parseInt(stackWorkspace.pop());
                switch (parseInt(command.argument)) {
                    case CompareTypes.get().EQ.code:
                        stackWorkspace.push((stackWorkspace.pop() === data) ? 1 : 0);
                        break;

                    case CompareTypes.get().NE.code:
                        stackWorkspace.push((stackWorkspace.pop() !== data) ? 1 : 0);
                        break;

                    case CompareTypes.get().LT.code:
                        stackWorkspace.push((stackWorkspace.pop() < data) ? 1 : 0);
                        break;

                    case CompareTypes.get().GT.code:
                        stackWorkspace.push((stackWorkspace.pop() > data) ? 1 : 0);
                        break;

                    case CompareTypes.get().LE.code:
                        stackWorkspace.push((stackWorkspace.pop() <= data) ? 1 : 0);
                        break;

                    case CompareTypes.get().GE.code:
                        stackWorkspace.push((stackWorkspace.pop() >= data) ? 1 : 0);
                        break;

                    default:
                        errorHandler.error(RuntimeErrors.get().BAD_RELATION);
                }
                break;

            case Opcodes.get().JUMP:
                if (parseInt(command.argument) < Constants.get().MAX_PROGRAM_SIZE) {
                    programPointer = parseInt(command.argument) - 1;
                }
                else {
                    errorHandler.error(RuntimeErrors.get().BAD_CODE_ADDRESS);
                }

                break;

            case Opcodes.get().JUMP_YES:
                if (parseInt(command.argument) < Constants.get().MAX_PROGRAM_SIZE) {
                    data = parseInt(stackWorkspace.pop());
                    if (data !== 0) {
                        programPointer = parseInt(command.argument) - 1;
                    }
                }
                else {
                    errorHandler.error(RuntimeErrors.get().BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.get().JUMP_NO:
                if (parseInt(command.argument) < Constants.get().MAX_PROGRAM_SIZE) {
                    data = parseInt(stackWorkspace.pop());
                    if (data === 0) {
                        programPointer = parseInt(command.argument) - 1;
                    }
                }
                else {
                    errorHandler.error(RuntimeErrors.get().BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.get().INPUT:
                stackWorkspace.push(VMConsole.getInt());
                break;

            case Opcodes.get().PRINT:
                VMConsole.write(stackWorkspace.pop());
                break;

            default:
                errorHandler.error(RuntimeErrors.get().UNKNOWN_COMMAND);
        }

        ++programPointer;
    }
}
