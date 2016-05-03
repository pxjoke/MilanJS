function VirtualMachine() {
    var MAX_PROGRAM_SIZE = 65536;
    var MAX_DATA_ADDRESS = 65536;
    var MAX_STACK_SIZE = 8192;
    var self = this;
    var programMemory = new ProgramMemory(MAX_PROGRAM_SIZE);
    var dataMemory = new DataMemory(MAX_DATA_ADDRESS);
    var stackWorkspace = new StackWorkspace(MAX_STACK_SIZE);
    var programPointer = 0;

    return {
        init: init
    };

    function init() {
        // 0:      INPUT
        // 1:      STORE   42              ; n := READ
        // 2:      LOAD    14
        // 3:      PUSH     4
        // 4:      LOAD    42
        // 5:      COMPARE  2
        // 6:      JUMP_NO  9
        // 7:      PUSH    10
        // 8:      STORE   42
        // 9:      LOAD    42
        // 10:     PRINT
        // 11:     STOP
        programMemory.put(0, Opcodes.get().INPUT);
        programMemory.put(1, Opcodes.get().STORE, 42);
        programMemory.put(2, Opcodes.get().LOAD, 14);
        programMemory.put(3, Opcodes.get().PUSH, 4);
        programMemory.put(4, Opcodes.get().LOAD, 42);
        programMemory.put(5, Opcodes.get().COMPARE, 2);
        programMemory.put(6, Opcodes.get().JUMP_NO, 9);
        programMemory.put(7, Opcodes.get().PUSH, 10);
        programMemory.put(8, Opcodes.get().STORE, 42);
        programMemory.put(9, Opcodes.get().LOAD, 42);
        programMemory.put(10, Opcodes.get().PRINT);
        programMemory.put(11, Opcodes.get().STOP);
        console.dir(programMemory.commands);
    }

    function run() {
        while (programPointer < MAX_PROGRAM_SIZE) {
            if (!executeCommand())
                break;
        }
    }

    function executeCommand() {
        var command = programMemory.get(programPointer);
        var data = 0;
        switch (command.opcode) {
            case Opcodes.NOP:
                /* Ничего не делаем */
                break;

            case Opcodes.STOP:
                return 0;
                break;

            case Opcodes.LOAD:
                stackWorkspace.push(dataMemory.load(command.argument));
                break;

            case Opcodes.STORE:
                dataMemory.store(command.argument, stackWorkspace.pop());
                break;

            case Opcodes.BLOAD:
                stackWorkspace.push(dataMemory.load(command.argument + stackWorkspace.pop()));
                break;

            case Opcodes.BSTORE:
                data = stackWorkspace.pop();
                dataMemory.store(command.argument + data, stackWorkspace.pop());
                break;

            case Opcodes.PUSH:
                stackWorkspace.push(command.argument);
                break;

            case Opcodes.POP:
                stackWorkspace.pop();
                break;

            case Opcodes.DUP:
                data = stackWorkspace.pop();
                stackWorkspace.push(data);
                stackWorkspace.push(data);
                break;

            case Opcodes.INVERT:
                stackWorkspace.push(stackWorkspace.pop());
                break;

            case Opcodes.ADD:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() + data);
                break;

            case Opcodes.SUB:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() - data);
                break;

            case Opcodes.MULT:
                data = stackWorkspace.pop();
                stackWorkspace.push(stackWorkspace.pop() * data);
                break;

            case Opcodes.DIV:
                data = stackWorkspace.pop();
                if (0 == data) {
                    vm_error(DIVISION_BY_ZERO);
                }
                else {
                    stackWorkspace.push(stackWorkspace.pop() / data);
                }
                break;

            case Opcodes.COMPARE:
                data = stackWorkspace.pop();
                switch (arg) {
                    case CompareTypes.EQ:
                        stackWorkspace.push((stackWorkspace.pop() == data) ? 1 : 0);
                        break;

                    case CompareTypes.NE:
                        stackWorkspace.push((stackWorkspace.pop() != data) ? 1 : 0);
                        break;

                    case CompareTypes.LT:
                        stackWorkspace.push((stackWorkspace.pop() < data) ? 1 : 0);
                        break;

                    case CompareTypes.GT:
                        stackWorkspace.push((stackWorkspace.pop() > data) ? 1 : 0);
                        break;

                    case CompareTypes.LE:
                        stackWorkspace.push((stackWorkspace.pop() <= data) ? 1 : 0);
                        break;

                    case CompareTypes.GE:
                        stackWorkspace.push((stackWorkspace.pop() >= data) ? 1 : 0);
                        break;

                    default:
                        vm_error(BAD_RELATION);
                }
                break;

            case Opcodes.JUMP:
                if (arg < MAX_PROGRAM_SIZE) {
                    vm_command_pointer = arg;
                    return 1;
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }

                break;

            case Opcodes.JUMP_YES:
                if (arg < MAX_PROGRAM_SIZE) {
                    data = stackWorkspace.pop();
                    if (data) {
                        vm_command_pointer = arg;
                        return 1;
                    }
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.JUMP_NO:
                if (arg < MAX_PROGRAM_SIZE) {
                    data = stackWorkspace.pop();
                    if (!data) {
                        vm_command_pointer = arg;
                        return 1;
                    }
                }
                else {
                    vm_error(BAD_CODE_ADDRESS);
                }
                break;

            case Opcodes.INPUT:
                stackWorkspace.push(vm_read());
                break;

            case Opcodes.PRINT:
                vm_write(stackWorkspace.pop());
                break;

            default:
                vm_error(UNKNOWN_COMMAND);
        }

        ++vm_command_pointer;
        return 1;
    }
}
