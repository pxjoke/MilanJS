function RuntimeErrorHandler(vm) {
    var self = this;
    var machine = vm;
    this.error = error;

    function error(runtimeError) {
        self.stackPointer = machine.getStackPointer();
        self.programPointer = machine.getProgramPointer();
        machine.stop();
        self.errorType = runtimeError;
    }
}