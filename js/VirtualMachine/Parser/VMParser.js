function VMParser(scanner, programMemory) {
    var self = this;
    var errorHandler = new VMParserErrorHandler();
    var isWorking = false;
    var address;
    var opcode;
    var argument;
    
    self.stop = stop;
    self.parse = parse;
    self.getErrorHandler = getErrorHandler;
    self.isAnyError = isAnyError;

    function stop() {
        isWorking = false;
    }

    function parse() {
        isWorking = true;

        while (isWorking) {
            address = null;
            opcode = null;
            argument = null;
            scanner.nextToken();
            if (scanner.token === VMTokens.get().EOF) {
                stop();
                break;
            }
            if (scanner.token === VMTokens.get().INT) {
                address = scanner.value;
                scanner.nextToken();
            }
            else {
                errorHandler.error(VMParserErrors.get().ADDRESS_EXPECTED, scanner.value);
                break;
            }

            if (scanner.token === VMTokens.get().COLON) {
                scanner.nextToken();
            }
            else {
                errorHandler.error(VMParserErrors.get().COLON_EXPECTED, scanner.value);
                break;
            }

            if (scanner.token === VMTokens.get().OPCODE) {
                opcode = scanner.value;
            }
            else {
                errorHandler.error(VMParserErrors.get().OPCODE_EXPECTED, scanner.value);
                break;
            }
            if (opcode.needArgs === true) {
                scanner.nextToken();
                if (scanner.token === VMTokens.get().INT) {
                    argument = scanner.value;
                }
                else {
                    errorHandler.error(VMParserErrors.get().ARGUMENT_EXPECTED, scanner.value);
                    break;
                }

            }
            programMemory.put(address, opcode, argument);
        }
    }

    function getErrorHandler() {
        return errorHandler;
    }
    
    function isAnyError() {
        return errorHandler.isAnyError;
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