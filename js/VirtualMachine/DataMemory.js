function DataMemory(maxAddress, errorHandler) {
    var self = this;
    var words = [];
    self.maxAddress = maxAddress;
    function load(address) {
        if (address < maxAddress) {
            return words[address];
        }
        else {
            
        }

    }


}