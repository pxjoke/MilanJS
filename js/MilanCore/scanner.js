'use strict';
function Scanner(program) {
    var self = this;
    var size = program.length;
    var i = 0;
    var tokens = new Token();
    var arithmetic = new Arithmetic();
    var cmp = new Cmp();
    var keywords = new Keywords();
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
                self.token = tokens.MULOP;
                self.value = arithmetic.DIVIDE;
                nextChar();
            }
        }

        skipSpaces();
        if(isDigit(ch)) {
            var value = 0;
            while(isDigit(ch)) {
                value = value * 10 + Number(ch);
                nextChar();
            }
            self.token = tokens.NUMBER;
            self.value = value;
        }
        else if(isIdentifierStart(ch)) {
            var buffer = '';
            while(isIdentifierBody(ch)) {
                buffer = buffer + ch;
                nextChar();
            }

            var identifier = buffer.toLowerCase();
            if(keywords[identifier]) {
                self.token = keywords[identifier];
            }
            else {
                self.token = tokens.IDENTIFIER;
                self.value = identifier;
            }
        }
        else {
            switch (ch) {
                case '(':
                    nextChar();
                    self.token = tokens.LPAREN;
                    break;

                case ')':
                    nextChar();
                    self.token = tokens.RPAREN;
                    break;

                case ';':
                    nextChar();
                    self.token = tokens.SEMICOLON;
                    break;

                case ':':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.token = tokens.ASSIGN;
                    } else {
                        reportError("':=' expected, but ':' found");
                        nextChar();
                        self.token = tokens.ILLEGAL;
                    }
                    break;

                case '<':
                    self.token = tokens.CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.value = cmp.LE;
                    } else {
                        self.value = cmp.LT;
                    }
                    break;

                case '>':
                    self.token = tokens.CMP;
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.value = cmp.GE;
                    } else {
                        self.value = cmp.GT;
                    }
                    break;

                case '!':
                    nextChar();
                    if (ch == '=') {
                        nextChar();
                        self.token = tokens.CMP;
                        self.value = cmp.NE;
                    } else {
                        reportError("'!=' expected, but '!' found");
                        nextChar();
                        self.token = tokens.ILLEGAL;
                    }
                    break;

                case '=':
                    nextChar();
                    self.token = tokens.CMP;
                    self.value = cmp.EQ;
                    break;

                case '+':
                    nextChar();
                    self.token = tokens.ADDOP;
                    self.value = arithmetic.PLUS;
                    break;

                case '-':
                    nextChar();
                    self.token = tokens.ADDOP;
                    self.value = arithmetic.MINUS;
                    break;

                case '*':
                    nextChar();
                    self.token = tokens.MULOP;
                    self.value = arithmetic.MULTIPLY;
                    break;

                case '/':
                    nextChar();
                    self.token = tokens.MULOP;
                    self.value = arithmetic.DIVIDE;
                    break;

                case '$':
                    self.token = tokens.EOF;
                    break;

                default:
                    reportError("'%c': illegal character", ch);
                    nextChar();
                    self.token = tokens.ILLEGAL;
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