function VMParserErrorHandler() {
    var self = this;
    self.error = error;
    self.message = "ParserError: ";
    self.isAnyError = false;


    function error(vmParserError, instead) {
        self.isAnyError = true;
        self.errorType = vmParserError;
        self.message = self.message + vmParserError.type + ": " + vmParserError.message;
        if (instead) {
            self.message = self.message + "\n But " + instead + "found instead."
        }
        VMConsole.error(self.message);
    }
}