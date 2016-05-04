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