'use strict';
function Scanner(program) {
    program = program + '$';
    var self = this;
    var size = program.length;
    var i = 0;
    var ch = program[i];
    var unit;
    
    self.arithval = {};
    self.intval = {};
    self.strval = {};
    self.errorState = false;

    self.getI = function() {
        return i;
    }

    self.getNext = function () {

        // unit.value = undefined;
        unit = new Unit();
        skipSpaces();
        if(ch === '/') {
            nextChar();
            if (ch === '*') {
                nextChar();
                while (true) {
                    while (ch !== '*') nextChar();
                    nextChar();
                    if (ch === '/') break;
                }
                nextChar();
            }
            else {
                unit.token = Tokens.get().MULOP;
                unit.value = ArithmeticTypes.get().DIVIDE;
                return unit;
            }
        }

        skipSpaces();
        if(isDigit(ch)) {
            var value = 0;
            while(isDigit(ch)) {
                value = value * 10 + Number(ch);
                nextChar();
            }
            unit.token = Tokens.get().NUMBER;
            unit.value = value;
        }
        else if(isIdentifierStart(ch)) {
            var buffer = '';
            while(isIdentifierBody(ch)) {
                buffer = buffer + ch;
                nextChar();
            }

            var identifier = buffer.toUpperCase();
            if(Tokens.isKeyword(identifier)) {
                unit.token = Tokens.get()[identifier];
            }
            else {
                unit.token = Tokens.get().IDENTIFIER;
                unit.value = identifier.toLocaleLowerCase();
            }
        }
        else {
            switch (ch) {
                case '(':
                    nextChar();
                    unit.token = Tokens.get().LPAREN;
                    break;

                case ')':
                    nextChar();
                    unit.token = Tokens.get().RPAREN;
                    break;

                case ';':
                    nextChar();
                    unit.token = Tokens.get().SEMICOLON;
                    break;

                case ':':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        unit.token = Tokens.get().ASSIGN;
                    } else {
                        reportError("':=' expected, but ':' found");
                        nextChar();
                        unit.token = Tokens.get().ILLEGAL;
                    }
                    break;

                case '<':
                    unit.token = Tokens.get().CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        unit.value = CompareTypes.get().LE;
                    } else {
                        unit.value = CompareTypes.get().LT;
                    }
                    break;

                case '>':
                    unit.token = Tokens.get().CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        unit.value = CompareTypes.get().GE;
                    } else {
                        unit.value = CompareTypes.get().GT;
                    }
                    break;

                case '!':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        unit.token = Tokens.get().CMP;
                        unit.value = CompareTypes.get().NE;
                    } else {
                        reportError("'!=' expected, but '!' found");
                        nextChar();
                        unit.token = Tokens.get().ILLEGAL;
                    }
                    break;

                case '=':
                    nextChar();
                    unit.token = Tokens.get().CMP;
                    unit.value = CompareTypes.get().EQ;
                    break;

                case '+':
                    nextChar();
                    unit.token = Tokens.get().ADDOP;
                    unit.value = ArithmeticTypes.get().PLUS;
                    break;

                case '-':
                    nextChar();
                    unit.token = Tokens.get().ADDOP;
                    unit.value = ArithmeticTypes.get().MINUS;
                    break;

                case '*':
                    nextChar();
                    unit.token = Tokens.get().MULOP;
                    unit.value = ArithmeticTypes.get().MULTIPLY;
                    break;

                case '/':
                    nextChar();
                    unit.token = Tokens.get().MULOP;
                    unit.value = ArithmeticTypes.get().DIVIDE;
                    break;

                case '$':
                    unit.token = Tokens.get().EOF;
                    break;

                default:
                    reportError("'%c': illegal character", ch);
                    nextChar();
                    unit.token = Tokens.get().ILLEGAL;
            }

        }
        return unit;
    };

    function nextChar() {
        i++;
        ch = program[i];
    }

    function skipSpaces() {
        while(isSpace(ch)) {
            nextChar();
        }
    }

    function isSpace(c) {
        return (c.match(/\s/));
    }

    function isDigit(c) {
        return c.match(/\d/);
    }

    function isIdentifierStart(c) {
        return c.match(/[a-zA-Z]/);
    }

    function isIdentifierBody(c) {
        return c.match(/\w/);
    }

    function reportError(message, args) {
        self.errorState = true;
        VMConsole.error(message+ ' '+ args);
    }
}