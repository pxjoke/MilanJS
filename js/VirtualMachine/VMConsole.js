var VMConsole = (function () {
    var infoBuffer = "";


    function write(msg) {
        infoBuffer = infoBuffer +'<li class="list-group-item list-group-item-success">' + msg + '</li>';
    }

    function error(msg) {
        infoBuffer = infoBuffer + '<li class="list-group-item list-group-item-danger">' + msg + '</li>';
    }

    function warning(msg) {
        infoBuffer = infoBuffer + '<li class="list-group-item list-group-item-warning">' + msg + '</li>';
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