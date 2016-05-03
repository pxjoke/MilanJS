function RuntimeErrorHandler(vm) {
    var stackPointer = 0;
    var programPointer = 0;
    var message;
    var errorType;
    var machine = vm;
    function error(runtimeError){
        stackPointer = machine.getStackPointer();
        programPointer = machine.getProgramPointer();
        machine.stop();
        
    }
}