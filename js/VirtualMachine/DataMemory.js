function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var words = [];
    var MAX_ADDRESS = maxAddress;

    return {
        load: load,
        store: store
    };

    function load(address) {
        if (parseInt(address) < MAX_ADDRESS) {
            return parseInt(words[address]);
        }
        else {
            errorHandler.error(RuntimeErrors.get().BAD_DATA_ADDRESS);
            return 0;
        }
    }

    function store(address, word) {
        if (parseInt(address) < MAX_ADDRESS) {
            words[address] = parseInt(word);
        }
        else {
            errorHandler.error(RuntimeErrors.get().BAD_DATA_ADDRESS);
        }
    }
}