function VirtualMachine() {
    var MAX_PROGRAM_SIZE = 65536;
    var MAX_DATA_ADDRESS = 65536;
    var MAX_STACK_SIZE = 8192;
    var self = this;
    var programMemory = new ProgramMemory(MAX_PROGRAM_SIZE);
    var dataMemory = new DataMemory(MAX_DATA_ADDRESS);
    var stackWorkspace = new StackWorkspace(MAX_STACK_SIZE);
    var programPointer = 0;
    var isWorking = false;

    return {
        init: init,
        run: run
    };

    function init() {
        // 0:      PUSH     2
        // 1:      STORE   42              ; n := READ
        // 2:      LOAD    14
        // 3:      PUSH     4
        // 4:      LOAD    42
        // 5:      COMPARE  2
        // 6:      JUMP_NO  9
        // 7:      PUSH    10
        // 8:      STORE   42
        // 9:      LOAD    42
        // 10:     STOP
        programMemory.put(0, Opcodes.get().PUSH, 2);
        programMemory.put(1, Opcodes.get().STORE, 42);
        programMemory.put(2, Opcodes.get().LOAD, 14);
        programMemory.put(3, Opcodes.get().PUSH, 4);
        programMemory.put(4, Opcodes.get().LOAD, 42);
        programMemory.put(5, Opcodes.get().COMPARE, 2);
        programMemory.put(6, Opcodes.get().JUMP_NO, 9);
        programMemory.put(7, Opcodes.get().PUSH, 10);
        programMemory.put(8, Opcodes.get().STORE, 42);
        programMemory.put(9, Opcodes.get().LOAD, 42);
        programMemory.put(10, Opcodes.get().STOP);
        console.dir(programMemory.commands);
    }

    function run() {
        isWorking = true;
        while (isWorking && programPointer < MAX_PROGRAM_SIZE) {
            executeCommand();
        }
        console.dir(stackWorkspace);
        console.dir(dataMemory);
    }
    
    function stop() {
        isWorking = false;
    }

    function executeCommand() {
        var command = programMemory.get(programPointer);
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
                stackWorkspace.push(stackWorkspace.pop());
                break;

            case Opcodes.get().ADD:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() + data);
                break;

            case Opcodes.get().SUB:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() - data);
                break;

            case Opcodes.get().MULT:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() * data);
                break;

            case Opcodes.get().DIV:
                data = stackWorkspace.pop();
                if (0 == data) {
                    vm_error(DIVISION_BY_ZERO);
                }
                else {
                    stackWorkspace.push(stackWorkspace.pop() / data);
                }
                break;

            case Opcodes.get().COMPARE:
                data = stackWorkspace.pop();
                switch (command.argument) {
                    case CompareTypes.get().EQ:
                        stackWorkspace.push((stackWorkspace.pop() == data) ? 1 : 0);
                        break;

                    case CompareTypes.get().NE:
                        stackWorkspace.push((stackWorkspace.pop() != data) ? 1 : 0);
                        break;

                    case CompareTypes.get().LT:
                        stackWorkspace.push((stackWorkspace.pop() < data) ? 1 : 0);
                        break;

                    case CompareTypes.get().GT:
                        stackWorkspace.push((stackWorkspace.pop() > data) ? 1 : 0);
                        break;

                    case CompareTypes.get().LE:
                        stackWorkspace.push((stackWorkspace.pop() <= data) ? 1 : 0);
                        break;

                    case CompareTypes.get().GE:
                        stackWorkspace.push((stackWorkspace.pop() >= data) ? 1 : 0);
                        break;

                    default:
                        vm_error(BAD_RELATION);
                }
                break;

            case Opcodes.get().JUMP:
                if (command.argument < MAX_PROGRAM_SIZE) {
                    programPointer = command.argument;                    
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }

                break;

            case Opcodes.get().JUMP_YES:
                if (command.argument < MAX_PROGRAM_SIZE) {
                    data = stackWorkspace.pop();
                    if (data) {
                        programPointer = command.argument;                        
                    }
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.get().JUMP_NO:
                if (command.argument < MAX_PROGRAM_SIZE) {
                    data = stackWorkspace.pop();
                    if (!data) {
                        programPointer = command.argument;                        
                    }
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.get().INPUT:
                stackWorkspace.push(vm_read());
                break;

            case Opcodes.get().PRINT:
                vm_write(stackWorkspace.pop());
                break;

            default:
                vm_error(UNKNOWN_COMMAND);
        }

        ++programPointer;
        return 1;
    }

    function vm_error(a) {

    }
}
