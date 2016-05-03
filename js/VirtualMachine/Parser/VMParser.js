function VMParser(scanner, programMemory, errorHandler) {
    var self = this;
    var errorHandler = new VMParserErrorHandler(self);
    var isWorking = false;
    var address;
    var opcode;
    var argument;

    self.stop = stop;

    function stop() {
        isWorking = false;
    }

    function parse() {
        isWorking = true;
        scanner.nextToken();
        while (isWorking) {
            if (scanner.token === VMTokens.get().INT) {
                address = scanner.value;
                scanner.nextToken();
            }
            else {
                errorHandler.error(VMParserErrors.get().ADDRESS_EXPECTED, scanner.value);
            }

            if (scanner.token === VMTokens.get().COLON) {
                scanner.nextToken();
            }
            else {
                errorHandler.error(VMParserErrors.get().COLON_EXPECTED, scanner.value);
            }

            if (scanner.token === VMTokens.get().OPCODE) {
                opcode = scanner.value;
            }
            else {
                errorHandler.error(VMParserErrors.get().OPCODE_EXPECTED, scanner.value);
            }
            if (opcode.needArgs === true) {
                scanner.nextToken();
                if (scanner.token === VMTokens.get().INT) {
                    argument = scanner.value;
                }
                else {
                    errorHandler.error(VMParserErrors.get().ARGUMENT_EXPECTED, scanner.value);
                }

            }

            programMemory.put(address, opcode, argument);

        }
    }

    function see(token) {
        return scanner.token === token;
    }

    function match(token) {
        if (see(token)) {
            scanner.nextToken();
            return true;
        }
        return false;
    }

    function mustBe(token) {
        if (scanner.token === token) {
            scanner.nextToken();
        }
        else {
            isWorking = false;
        }
    }
}