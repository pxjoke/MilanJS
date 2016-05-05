'use strict';

function Parser(scanner, out) {
    var self = this;
    var emitter = new CodeEmitter(out);
    var variables = {};
    var nextVarAddr = 0;
    var isRecovered = true;
    var error = false;
    var unit = scanner.getNext();

    self.parse = function () {
        if (!see(Tokens.get().EOF))
            program();
        mustBe(Tokens.get().EOF);
        if (!error)
            out = emitter.flush();
        return out;
    };

    self.getVarTable = function () {
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
        if (see(Tokens.get().IDENTIFIER)) {
            var varAddr = getVarAddr(unit.value);
            unit = scanner.getNext();
            mustBe(Tokens.get().ASSIGN);
            expression();
            emitter.emit(Opcodes.get().STORE, varAddr);
        }
        else if (match(Tokens.get().IF)) {
            relationalExpression();
            var jumpNo = emitter.makeHole();
            mustBe(Tokens.get().THEN);
            statementList();
            if (match(Tokens.get().ELSE)) {
                var jump = emitter.makeHole();
                emitter.emitAt(jumpNo, Opcodes.get().JUMP_NO, emitter.getCurrentAddress());
                statementList();
                emitter.emitAt(jump, Opcodes.get().JUMP, emitter.getCurrentAddress());
            }
            else {
                emitter.emitAt(jumpNo, Opcodes.get().JUMP_NO, emitter.getCurrentAddress());
            }
            mustBe(Tokens.get().FI);
        }
        else if (match(Tokens.get().WHILE)) {
            var cond = emitter.getCurrentAddress();
            relationalExpression();
            var jumpNo = emitter.makeHole();
            mustBe(Tokens.get().DO);
            statementList();
            mustBe(Tokens.get().OD);
            emitter.emit(Opcodes.get().JUMP, cond);
            emitter.emitAt(jumpNo, Opcodes.get().JUMP_NO, emitter.getCurrentAddress());
        }
        else if (match(Tokens.get().WRITE)) {
            mustBe(Tokens.get().LPAREN);
            expression();
            mustBe(Tokens.get().RPAREN);
            emitter.emit(Opcodes.get().PRINT);
        }
        else {
            reportError(unit.token.name + ' found while STATEMENT is expected!')
        }
    }

    function expression() {
        var more = true;
        term();
        while (more) {
            if (see(Tokens.get().ADDOP)) {
                var op = unit.value;
                unit = scanner.getNext();
                term();
                if (op === ArithmeticTypes.get().PLUS)
                    emitter.emit(Opcodes.get().ADD);
                else if (op === ArithmeticTypes.get().MINUS)
                    emitter.emit(Opcodes.get().SUB);
                else reportError('Unexpected ' + op.name + ' found while PLUS or MINUS are expected!')
            }
            else
                more = false;
        }
    }

    function relationalExpression() {
        expression();
        if (see(Tokens.get().CMP)) {
            var op = unit.value;
            unit = scanner.getNext();
            expression();
            emitter.emit(Opcodes.get().COMPARE, op.code);
        }
        else {
            error = true;
            reportError("Relational operator required, but " + unit.token.name + " found.");
        }
    }

    function term() {
        var more = true;
        factor();
        while (more) {
            if (see(Tokens.get().MULOP)) {
                var op = unit.value;
                unit = scanner.getNext();
                factor();
                if (op === ArithmeticTypes.get().MULTIPLY)
                    emitter.emit(Opcodes.get().MULT);
                else if (op === ArithmeticTypes.get().DIVIDE)
                    emitter.emit(Opcodes.get().DIV);
                else
                    reportError('Unexpected ' + op.name + ' found while MULTIPLY or DIVIDE are expected!')
            }
            else
                more = false;
        }
    }

    function factor() {
        if (see(Tokens.get().IDENTIFIER)) {
            emitter.emit(Opcodes.get().LOAD, getVarAddr(unit.value));
            unit = scanner.getNext();
        }
        else if (see(Tokens.get().NUMBER)) {
            emitter.emit(Opcodes.get().PUSH, unit.value);
            unit = scanner.getNext();
        }
        else if (see(Tokens.get().READ)) {
            emitter.emit(Opcodes.get().INPUT);
            unit = scanner.getNext();
        }
        else if (match(Tokens.get().LPAREN)) {
            expression();
            mustBe(Tokens.get().RPAREN);
        }
        else if (see(Tokens.get().ADDOP) && unit.value == ArithmeticTypes.get().MINUS) {
            unit = scanner.getNext();
            factor();
            emitter.emit(Opcodes.get().INVERT);
        }
        else {
            error = true;
            reportError("Expected identifier, number, READ, '(' or unary minus, but " + unit.token.name + " found.");
        }
    }


    function getVarAddr(name) {
        if (variables[name] != undefined)
            return variables[name];
        variables[name] = nextVarAddr;
        return nextVarAddr++;
    }

    function see(token) {
        return unit.token === token;
    }

    function match(token) {
        if (see(token)) {
            unit = scanner.getNext();
            return true;
        }
        return false;
    }

    function mustBe(token) {
        if (see(token)) {
            unit = scanner.getNext();
            isRecovered = true;
        }
        else {
            error = true;
            if (isRecovered) {
                isRecovered = false;
                error = true;
                reportError(unit.token.name + ' is found while ' + token.name + ' is expected!');
            }
            else {
                while (unit.token !== token && unit.token !== Tokens.get().EOF)
                    unit = scanner.getNext();
                if (see(token)) {
                    unit = scanner.getNext();
                    isRecovered = true;
                }
            }
        }
    }

    function reportError(message) {
        VMConsole.error(message);
    };

}