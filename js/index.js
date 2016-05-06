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
setDownloadLink();
sourceEditor.gotoLine(0);
var vm = null;

$("#sourceCompileBtn").on('click', compile);
$("#sourceRunBtn").on('click', run);
$("#sourceStepByStepBtn").on('click', stepByStep);
$("#nextCommandBtn").on('click', step);
$("#download").on('mouseenter', function () {
    setDownloadLink();
});

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
    vm.resetProgramPointer();
    vm.execute();
    print();
}

function stepByStep() {
    vm.resetProgramPointer();
    // machineCodeEditor.find(vm.getProgramPointer()+':');
    machineCodeEditor.gotoLine(1);

}

function step() {
    vm.executeCommand();
    machineCodeEditor.gotoLine(vm.getProgramPointer() + 1);
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
    setDownloadLink();


}

function fileUpload(evt) {
    var files = evt.target.files;
    var f = files[0];
    console.dir(f);
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
            // Render thumbnail.
            console.dir(e.target);
            sourceEditor.setValue(e.target.result);
            setDownloadLink();
        };
    })(f);
    reader.readAsText(f);
}

document.getElementById('files').addEventListener('change', fileUpload, false);

function setDownloadLink() {
    $("#download").html(
        '<a id="downloadLink" href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(sourceEditor.getValue()) + '" download="program.mil">download</a>'
    );
}

