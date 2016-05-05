

var vm = null;

$("#sourceCompileBtn").on('click', compile);
$("#sourceRunBtn").on('click', run);
$("#sourceStepByStepBtn").on('click', stepByStep);
$("#nextCommandBtn").on('click', step);

function printVMConsoleToOutput(){
    $("#output").html(VMConsole.getBuffer());
}

function printStack() {
    $("#stack").html(vm.getStackDump());
}

function printMemory() {
    $("#memory").html(vm.getMemoryDump());
}

function print() {
    printVMConsoleToOutput();
    printMemory();
    printStack();
}


function run(){
    vm.execute();
    print();
}

function stepByStep() {
    step();
}

function step() {
    vm.executeCommand();
    print();
}

function compile() {
    var sourceCode = sourceEditor.getValue();
    var sourceScanner = new Scanner(sourceCode);
    var sourceParser = new Parser(sourceScanner, '');
    var compiledSource = sourceParser.parse();
    var varTable = sourceParser.getVarTable();

    vm = new VirtualMachine();
    vm.compile(compiledSource);
    machineCodeEditor.setValue(vm.getCommandsDump());

    printVMConsoleToOutput();


}