var codeSample = "/* Code sample */\n" +
    "begin\n" +
    "   a := 100;\n" +
    "   b := 35;\n" +
    "   if a < b then\n" +
    "       write(a)\n" +
    "   else\n" +
    "       write(b)\n" +
    "   fi\n" +
    "end\n";

sourceEditor.setValue(codeSample);
sourceEditor.gotoLine(0);
var vm = null;

$("#sourceCompileBtn").on('click', compile);
$("#sourceRunBtn").on('click', run);
$("#sourceStepByStepBtn").on('click', stepByStep);
$("#nextCommandBtn").on('click', step);
$("#continueBtn").on('click', continueExecution);
$("#clearOutputBtn").on('click', clearOutput);
$('#file').change(fileUpload);
$('#file').bootstrapFileInput();
$('#nextCommandBtn').addClass('disabled');
$('#continueBtn').addClass('disabled');


function clearOutput() {
    VMConsole.clear();
    printVMConsoleToOutput();
}

function printVMConsoleToOutput() {
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


function run() {
    compile();
    vm.execute();
    print();
}

function stepByStep() {
    compile();
    machineCodeEditor.gotoLine(1);
    $('#nextCommandBtn').removeClass('disabled');
    $('#continueBtn').removeClass('disabled');

}

function step() {
    if (!vm.isWorking()) {
        $('#nextCommandBtn').addClass('disabled');
        $('#continueBtn').addClass('disabled');
        return;
    }
    vm.executeCommand();
    machineCodeEditor.gotoLine(vm.getProgramPointer() + 1);
    print();
}

function continueExecution() {
    if (!vm.isWorking()) {
        $('#nextCommandBtn').addClass('disabled');
        $('#continueBtn').addClass('disabled');
        return;
    }
    vm.execute();
    print();
    machineCodeEditor.gotoLine(vm.getProgramPointer() + 1);
    $('#nextCommandBtn').addClass('disabled');
    $('#continueBtn').addClass('disabled');
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
    machineCodeEditor.gotoLine(0);

    printVMConsoleToOutput();


}

function fileUpload(evt) {
    var files = evt.target.files[0];
    var f = files;
    console.dir(f);
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {
            // Render thumbnail.
            console.dir(e.target);
            sourceEditor.setValue(e.target.result);
            sourceEditor.gotoLine(0);
        };
    })(f);
    reader.readAsText(f);
}

