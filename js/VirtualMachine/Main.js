var code =
    "0: INPUT " +
    "1: STORE 0 " +
    "2: INPUT " +
    "3: STORE 1 " +
    "4: LOAD 1 " +
    "5: PUSH 3 " +
    "6: PUSH 6 " +
    "7: LOAD 0 " +
    "8: SUB " +
    "9: MULT " +
    "10: PUSH 241 " +
    "11: DIV " +
    "12: SUB " +
    "13: STORE 1 " +
    "14: LOAD 0 " +
    "15: LOAD 1 " +
    "16: SUB " +
    "17: STORE 0 " +
    "18: PUSH 4 " +
    "19: INVERT " +
    "20: INVERT " +
    "21: INVERT " +
    "22: INVERT " +
    "23: INVERT " +
    "24: STORE 0 " +
    "25: STOP ";
// var programMemory = new ProgramMemory(6000);
// var scanner = new VMScanner(code);
// var parser = new VMParser(scanner, programMemory);
// parser.parse();
// programMemory.printToConsole();
var a = VMConsole.getInt();
VMConsole.error(a);
VMConsole.printToJSConsole();
