var code =
    "0: PUSH 12\n" +
    "1: POP\n" +
    "2: INPUT\n" +
    "3: STOP\n";
var programMemory = new ProgramMemory(6000);
var scanner = new VMScanner(code);
var parser = new VMParser(scanner, programMemory);
parser.parse();
programMemory.printToConsole();
