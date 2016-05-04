function RuntimeErrorHandler(vm) {
    var self = this;
    var machine = vm;
    this.error = error;
    self.message = "";

    function error(runtimeError) {
        machine.stop();
        self.errorType = runtimeError;
        self.message = self.message + runtimeError.type + ": " + runtimeError.message;
        VMConsole.error(self.message);
    }
}