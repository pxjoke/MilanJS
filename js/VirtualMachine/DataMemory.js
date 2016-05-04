function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var memory = [];
    var MAX_ADDRESS = maxAddress;

    self.load = load;
    self.store = store;
    self.printMemoryDump = printMemoryDump;

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
}