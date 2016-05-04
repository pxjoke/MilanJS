function start() {
    VMConsole.clear();
    var code = document.getElementById('source').value;
    var vm = new VirtualMachine();
    vm.execute(code);
    // vm.printState();
    
    VMConsole.printToJSConsole();
}

// var e = new VMParserErrorHandler();

// e.warning(VMParserErrors.get().ADDRESS_EXPECTED);
// e.warning(VMParserErrors.get().OPCODE_EXPECTED, "Lalka");
// e.warning(VMParserErrors.get().COLON_EXPECTED, "&");
// console.log(e.isAnyWarnings());
// e.printAllWarnings();
// VMConsole.printToJSConsole();
//
// var e = new RuntimeErrorHandler();
// e.error(RuntimeErrors.get().BAD_DATA_ADDRESS);
// e.error(RuntimeErrors.get().BAD_COMMAND_ADDRESS);
// e.error(RuntimeErrors.get().DEFAULT);
// e.warning(RuntimeErrors.get().BAD_INPUT);
// e.warning(RuntimeErrors.get().DIVISION_BY_ZERO);
// e.printAllErrors();
// e.printAllWarnings();
// VMConsole.printToJSConsole();