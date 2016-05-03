var code =
    "0: PUSH 12\n" +
    "1: POP\n" +
    "2: INPUT\n" +
    "3: STOP\n";

var scanner = new VMScanner(code);

while (true) {
    scanner.nextToken();

    if (scanner.token === VMTokens.get().OPCODE) {
        console.log(scanner.value);
        if (scanner.value === Opcodes.get().STOP) {
            break;
        }
    }
    else {
        console.log(scanner.value);
        console.log(scanner.token);
    }

}