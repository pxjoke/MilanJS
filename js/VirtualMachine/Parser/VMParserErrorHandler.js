function VMParserErrorHandler(parser) {
    var self = this;
    self.error = error;
    self.message = "";

    function error(vmParserError, instead) {
        self.errorType = vmParserError;
        self.message = vmParserError.type + ": " + vmParserError.message;
        if (instead) {
            self.message = self.message + "\n But " + instead + "found instead."
        }
        parser.stop();
    }
}