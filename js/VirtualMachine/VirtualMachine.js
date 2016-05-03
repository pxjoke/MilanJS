function VirtualMachine() {
    var self = this;
    var programMemory = new ProgramMemory(65536);
    var dataMemory = new DataMemory(65536);
    var stackWorkspace = new StackWorkspace(8192);
    
    return {
        init:init
    };
    
    function init(){
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
        programMemory.put(0, Operations().INPUT);
        programMemory.put(1, Operations().STORE, 42);
        programMemory.put(2, Operations().LOAD, 14);
        programMemory.put(3, Operations().PUSH, 4);
        programMemory.put(4, Operations().LOAD, 42);
        programMemory.put(5, Operations().COMPARE, 2);
        programMemory.put(6, Operations().JUMP_NO, 9);
        programMemory.put(7, Operations().PUSH, 10);
        programMemory.put(8, Operations().STORE, 42);
        programMemory.put(9, Operations().LOAD, 42);
        programMemory.put(10, Operations().PRINT);
        programMemory.put(11, Operations().STOP);
        console.dir(programMemory.commands);
    }
}
