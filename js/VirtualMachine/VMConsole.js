var VMConsole = (function () {
    var infoBuffer = "Output: \n";



    function write(msg) {
        infoBuffer = infoBuffer + msg + "\n";
    }

    function error(msg) {
        infoBuffer = infoBuffer + msg + "\n";
    }

    function getInt() {
        return parseInt(prompt("Type integer", ''));
    }

    function printToJSConsole() {
        console.log(infoBuffer);
    }

    function getConsole() {
        return infoBuffer;
    }

    return {
        write: write,
        error:error,
        printToJSConsole: printToJSConsole,
        getInt: getInt,
        getConsole: getConsole
    };
})();