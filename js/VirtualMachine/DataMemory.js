function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var words = [];
    var MAX_ADDRESS = MAX_ADDRESS;
    
    return {
        load: load,
        store: store
    };
    
    function load(address) {
        if (address < MAX_ADDRESS) {
            return words[address];
        }
        else {
            //TODO: handle error
            return 0;
        }
    }

    function store(address, word) {
        if (address < MAX_ADDRESS) {
            words[address] = word;
        }
        else {
            //TODO: handle error BAD_DATA_ADDRESS
        }
    }
}