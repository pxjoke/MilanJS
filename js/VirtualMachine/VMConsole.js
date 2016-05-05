var VMConsole = (function () {
    var infoBuffer = "";


    function write(msg) {
        infoBuffer = infoBuffer + msg + "<br>";
    }

    function error(msg) {
        infoBuffer = infoBuffer + msg + "<br>";
    }

    function warning(msg) {
        infoBuffer = infoBuffer + msg + "<br>";
    }

    function getInt() {
        return parseInt(prompt("Type integer", ''));
    }

    function printToJSConsole() {
        console.log(infoBuffer);
    }

    function getBuffer() {
        return infoBuffer;
    }

    function clear() {
        infoBuffer = "";
    }

    return {
        write: write,
        error: error,
        printToJSConsole: printToJSConsole,
        getInt: getInt,
        getBuffer: getBuffer,
        clear: clear,
        warning: warning
    };
})();