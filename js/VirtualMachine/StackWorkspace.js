function StackWorkspace(maxSize, errorHandler) {
    var self = this;
    var MAX_STACK_SIZE = maxSize;
    var stack = [];
    self.stack = stack;


    self.pop = pop;
    self.push = push;
    self.printStack = printStack;
    self.getDump = getDump;
    
    function printStack() {
        for(i in stack){
            VMConsole.write(stack[i]);
        }
    }

    function pop() {
        if (stack.length > 0) {
            return parseInt(stack.pop());
        }
        else {
            errorHandler.error(RuntimeErrors.get().STACK_EMPTY);
            return 0;
        }
    }

    function push(word) {
        if (stack.length  < MAX_STACK_SIZE) {
            stack.push(parseInt(word));
        }
        else {
            errorHandler.error(RuntimeErrors.get().STACK_OVERFLOW);
        }
    }

    function getDump() {
        var buffer = '';
        stack.forEach(function(item) {
            buffer += item+'<br>';
        });
        return buffer;
    }

}