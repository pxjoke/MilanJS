function StackWorkspace(maxSize, errorHandler) {
    var self = this;
    var MAX_STACK_SIZE = maxSize;
    self.stackPointer = 0;
    var stack = [];
    self.stack = stack;


    self.getStackPointer = getStackPointer;
    self.pop = pop;
    self.push = push;
    self.printStack = printStack;
    
    function printStack() {
        for(i in stack){
            VMConsole.write(stack[i]);
        }
    }

    function pop() {
        if (self.stackPointer > 0) {
            return parseInt(stack[--self.stackPointer]);
        }
        else {
            errorHandler.error(RuntimeErrors.get().STACK_EMPTY);
            return 0;
        }
    }

    function push(word) {
        if (self.stackPointer < MAX_STACK_SIZE) {
            stack[self.stackPointer++] = parseInt(word);
        }
        else {
            errorHandler.error(RuntimeErrors.get().STACK_OVERFLOW);
        }
    }

    function getStackPointer() {
        return self.stackPointer;
    }

}