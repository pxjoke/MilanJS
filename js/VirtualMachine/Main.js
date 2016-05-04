function start(){
    VMConsole.clear();
    var code = document.getElementById('source').value;
    var vm = new VirtualMachine();
    vm.execute(code);
    // vm.printState();

    VMConsole.printToJSConsole();
}

