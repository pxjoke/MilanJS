'use strict';
function Scanner(program) {
    var self = this;
    var size = program.length;
    var i = 0;
    var ch = program[i];
    self.token = {};
    self.arithval = {};
    self.intval = {};
    self.strval = {};
    self.errorState = false;
    self.value = {};

    self.getI = function() {
        return i;
    }

    self.nextToken = function () {

        self.value = undefined;

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
                self.token = Tokens.get().MULOP;
                self.value = ArithmeticTypes.get().DIVIDE;
                return;
            }
        }

        skipSpaces();
        if(isDigit(ch)) {
            var value = 0;
            while(isDigit(ch)) {
                value = value * 10 + Number(ch);
                nextChar();
            }
            self.token = Tokens.get().NUMBER;
            self.value = value;
        }
        else if(isIdentifierStart(ch)) {
            var buffer = '';
            while(isIdentifierBody(ch)) {
                buffer = buffer + ch;
                nextChar();
            }

            var identifier = buffer.toUpperCase();
            if(Tokens.isKeyword(identifier)) {
                self.token = Tokens.get()[identifier];
            }
            else {
                self.token = Tokens.get().IDENTIFIER;
                self.value = identifier.toLocaleLowerCase();
            }
        }
        else {
            switch (ch) {
                case '(':
                    nextChar();
                    self.token = Tokens.get().LPAREN;
                    break;

                case ')':
                    nextChar();
                    self.token = Tokens.get().RPAREN;
                    break;

                case ';':
                    nextChar();
                    self.token = Tokens.get().SEMICOLON;
                    break;

                case ':':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.token = Tokens.get().ASSIGN;
                    } else {
                        reportError("':=' expected, but ':' found");
                        nextChar();
                        self.token = Tokens.get().ILLEGAL;
                    }
                    break;

                case '<':
                    self.token = Tokens.get().CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.value = CompareTypes.get().LE;
                    } else {
                        self.value = CompareTypes.get().LT;
                    }
                    break;

                case '>':
                    self.token = Tokens.get().CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.value = CompareTypes.get().GE;
                    } else {
                        self.value = CompareTypes.get().GT;
                    }
                    break;

                case '!':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.token = Tokens.get().CMP;
                        self.value = CompareTypes.get().NE;
                    } else {
                        reportError("'!=' expected, but '!' found");
                        nextChar();
                        self.token = Tokens.get().ILLEGAL;
                    }
                    break;

                case '=':
                    nextChar();
                    self.token = Tokens.get().CMP;
                    self.value = CompareTypes.get().EQ;
                    break;

                case '+':
                    nextChar();
                    self.token = Tokens.get().ADDOP;
                    self.value = ArithmeticTypes.get().PLUS;
                    break;

                case '-':
                    nextChar();
                    self.token = Tokens.get().ADDOP;
                    self.value = ArithmeticTypes.get().MINUS;
                    break;

                case '*':
                    nextChar();
                    self.token = Tokens.get().MULOP;
                    self.value = ArithmeticTypes.get().MULTIPLY;
                    break;

                case '/':
                    nextChar();
                    self.token = Tokens.get().MULOP;
                    self.value = ArithmeticTypes.get().DIVIDE;
                    break;

                case '$':
                    self.token = Tokens.get().EOF;
                    break;

                default:
                    reportError("'%c': illegal character", ch);
                    nextChar();
                    self.token = Tokens.get().ILLEGAL;
            };

        }

    }

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
        console.log(message, ' ', args);
    }
}