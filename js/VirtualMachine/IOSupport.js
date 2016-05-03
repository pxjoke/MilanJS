function IOSupport() {
    var self = this;
    self.console = "Output: \n";
    this.write = write;
    this.printToConsole = printToConsole;
    this.input = input;

    function write(data) {
        self.console = self.console + data + "\n";
    }

    function input() {
        return prompt("Type integer", '');
    }

    function printToConsole(data) {
        write(data);
        console.log(self.console);
    }

}