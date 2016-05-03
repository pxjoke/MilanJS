function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var words = [];
    self.MAX_ADDRESS = MAX_ADDRESS;

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
        if (address < self.MAX_ADDRESS) {
            words[address] = word;
        }
        else {
            //TODO: handle error BAD_DATA_ADDRESS
        }
    }
}