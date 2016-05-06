function VMParserErrorHandler() {
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
        return self.errors.length > 0;
    }

    function isAnyWarnings() {
        return self.warnings.length > 0;
    }

    function warning(vmParserError, instead) {
        self.warnings.push({parserError: vmParserError, instead: instead});
    }


    function error(vmParserError, instead) {
        self.errors.push({parserError: vmParserError, instead: instead});
    }

    function printAllErrors() {
        for (var i in self.errors) {
            var e = self.errors[i];
            var message = "Parser Error '" + e.parserError.type + "': "
                + e.parserError.message;
            if (e.instead)
                message = message + " but '" + e.instead + "' found instead.";
            VMConsole.error(message);
        }
    }

    function printAllWarnings() {
        for (var i in self.warnings) {
            var w = self.warnings[i];
            var message = "Parser Warning '" + w.parserError.type + "': "
                + w.parserError.message;
            if (w.instead)
                message = message + " but '" + w.instead + "' found instead.";
            VMConsole.warning(message);
        }
    }

}