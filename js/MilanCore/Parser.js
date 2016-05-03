'use strict';

function Parser(scanner, out) {
    var self = this;
    var emitter = new CodeEmitter(out);
    var variables = {};
    var nextVarAddr = 0;
    var isRecovered = true;
    var error = false;
    scanner.nextToken();

    self.parse = function () {
        program();
        mustBe(Tokens.get().EOF);
        // if (!error)
            out = emitter.flush();
        return out;
    };

    self.getVarTable = function() {
        return variables;
    }

    function program() {
        mustBe(Tokens.get().BEGIN);
        statementList();
        mustBe(Tokens.get().END);
        emitter.emit(Opcodes.get().STOP);
    }

    function statementList() {
        if (see(Tokens.get().END) || see(Tokens.get().OD) || see(Tokens.get().ELSE) || see(Tokens.get().FI)) {
            return; // Список операторов пуст
        }
        else {
            var more = true;
            while (more) {
                statement();
                more = match(Tokens.get().SEMICOLON);
            }
        }
    }

    function statement() {
        if (match(Tokens.get().IDENTIFIER)) {
            var varAddr = getVarAddr(scanner.value);
            mustBe(Tokens.get().ASSIGN);
            expression();
            emitter.emit(Opcodes.get().STORE, varAddr);
        }
    }

    function expression() {
        var more = true;
        term();
        while (more) {
            if (match(Tokens.get().ADDOP)) {
                term();
                if (scanner.value === ArithmeticTypes.get().PLUS)
                    emitter.emit(Opcodes.get().ADD);
                if (scanner.value === ArithmeticTypes.get().MINUS)
                    emitter.emit(Opcodes.get().SUB);
                else reportError('Unexpected ' + scanner.value.name + 'found while \'+\' or \'-\' is expected!')
            }
            else
                more = false;
        }
    }

    function term() {
        var more = true;
        factor();
        while (more) {
            if (match(Tokens.get().MULOP)) {
                factor();
                if (scanner.value === ArithmeticTypes.get().MULTIPLY)
                    emitter.emit(Opcodes.get().MULT);
                if (scanner.value === ArithmeticTypes.get().DIVIDE)
                    emitter.emit(Opcodes.get().DIV);
                else reportError('Unexpected ' + scanner.value.name + 'found while \'*\' or \'/\' is expected!')
            }
            else
                more = false;
        }
    }

    function factor() {
        if(match(Tokens.get().IDENTIFIER)) {
            emitter.emit(Opcodes.get().LOAD, getVarAddr(scanner.value));
        }
        else if(match(Tokens.get().NUMBER)) {
            emitter.emit(Opcodes.get().PUSH, scanner.value());
        }
        else if(match(Tokens.get().READ)) {
            emitter.emit(Opcodes.get().INPUT);
        }
        else if(match(Tokens.get().LPAREN)) {
            expression();
            mustBe(Tokens.get().RPAREN);
        }
        else if(match(Tokens.get().ADDOP) && scanner.value == ArithmeticTypes.get().MINUS) {
            factor();
            emitter.emit(Opcodes.get().INVERT);
        }
        else {
            this.error = true;
            reportError("Expected identifier, number, READ, '(' or unary minus, but "+scanner.value+" found.");
        }
    }


    function getVarAddr(name) {
        if (variables[name])
            return variables[name];
        console.log(name);
        variables[name] = nextVarAddr;
        return nextVarAddr++;
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
            isRecovered = true;
        }
        else {
            error = true;
            if (isRecovered) {
                isRecovered = false;
                error = true;
                reportError(scanner.token.name + ' is found while ' + token.name + ' is expected!');
            }
            else {
                while (scanner.token !== token && scanner.token !== Tokens.get().EOF)
                    scanner.nextToken();
                if (scanner.token === token) {
                    scanner.nextToken();
                    isRecovered = true;
                }
            }
        }
    }

    function reportError(message) {
        console.log(message);
    };

}