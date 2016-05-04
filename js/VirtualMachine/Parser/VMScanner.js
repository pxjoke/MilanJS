function VMScanner(source) {
    var self = this;
    var sourceCode = source;
    var cursor = 0;
    var ch = sourceCode[cursor];
    self.token = {};
    self.value = {};
    

    self.nextToken = nextToken;

    function nextToken() {
        skipSpaces();

        if (isDigit(ch)) {
            var value = 0;
            while (isDigit(ch)) {
                value = value * 10 + parseInt(ch);
                nextChar();
            }
            self.token = VMTokens.get().INT;
            self.value = value;
        }
        else if (isLetter(ch)) {
            var buffer = '';
            while (isLetter(ch)) {
                buffer = buffer + ch;
                nextChar();
            }

            var value = buffer.toUpperCase();
            if (Opcodes.get()[value]) {
                self.token = VMTokens.get().OPCODE;
                self.value = Opcodes.get()[value];
            }
            else {
                self.token = VMTokens.get().ILLEGAL;
                self.value = value;
            }
        }
        else if (isColon(ch)) {
            self.token = VMTokens.get().COLON;
            self.value = ch;
            nextChar();
        }
        else if (isEOF(ch)) {
            self.token = VMTokens.get().EOF;
            self.value = ch;
        }
        else {
            self.token = VMTokens.get().ILLEGAL;
            self.value = ch;
        }
    }

    function nextChar() {
        cursor++;
        if (cursor === sourceCode.length)
            ch = '$';
        else
            ch = sourceCode[cursor];

    }

    function skipSpaces() {
        while (isSpace(ch)) {
            nextChar();
        }
    }

    function isSpace(c) {
        return (c.match(/\s/));
    }

    function isDigit(c) {
        return c.match(/\d/);
    }

    function isLetter(c) {
        return c.match(/[a-zA-Z_]/);
    }

    function isColon(c) {
        return c === ":";
    }

    function isEOF(c) {
        return c === '$';
    }

}