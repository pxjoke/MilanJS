function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var memory = [];
    self.memory = memory;
    var MAX_ADDRESS = maxAddress;

    self.load = load;
    self.store = store;
    self.printMemoryDump = printMemoryDump;
    self.getDump = getDump;

    function load(address) {
        if (parseInt(address) < MAX_ADDRESS) {
            return parseInt(memory[address]);
        }
        else {
            errorHandler.error(RuntimeErrors.get().BAD_DATA_ADDRESS);
            return 0;
        }
    }

    function store(address, word) {
        if (parseInt(address) < MAX_ADDRESS) {
            memory[address] = parseInt(word);
        }
        else {
            errorHandler.error(RuntimeErrors.get().BAD_DATA_ADDRESS);
        }
    }

    function printMemoryDump() {
        for (i in memory) {
            VMConsole.write(memory[i]);
        }
    }

    function getDump(varTable) {
        var buffer = '';
        varTable.forEach(function (item, i) {
            buffer += '<li class="list-group-item"><span class="label label-default">0x' + i + '</span> ' +'<span class="label label-info">'+ item + '  := ' + (memory[i] ? memory[i] : '') + '</span></li>';
        });
        return buffer;
    }
}