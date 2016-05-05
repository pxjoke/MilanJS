

var vm = null;

$("#sourceCompileBtn").on('click', compile);
$("#sourceRunBtn").on('click', run);

function printVMConsoleToOutput(){
    $("#output").html(VMConsole.getBuffer());
}


function run(){
    vm.execute();
    printVMConsoleToOutput();

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