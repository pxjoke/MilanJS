function RuntimeErrorHandler() {
    var self = this;
    self.error = error;
    self.warning = warning;
    self.printAllErrors = printAllErrors;
    self.printAllWarnings = printAllWarnings;
    self.isAnyError = isAnyError;
    self.isAnyWarnings = isAnyWarnings;
    self.errors = [];
    self.warnings = [];

    function isAnyError() {
        return self.errors.length !== 0;
    }

    function isAnyWarnings() {
        return self.warnings.length !== 0;
    }

    function warning(runtimeError) {
        self.warnings.push(runtimeError);
    }

    function error(runtimeError) {
        self.errors.push(runtimeError);
    }

    function printAllErrors() {
        for (var i in self.errors) {
            var e = self.errors[i];
            var message = "Runtime Error '" + e.type + "': " + e.message;
            VMConsole.error(message);
        }
    }

    function printAllWarnings() {
        for (var i in self.warnings) {
            var w = self.warnings[i];
            var message = "Runtime Warning '" + w.type + "': " + w.message;
            VMConsole.warning(message);
        }
    }
}











