function StackWorkspace(maxSize) {
    var self = this;
    var MAX_STACK_SIZE = maxSize;
    var stackPointer = 0;
    var stack = [];

    return {
        getStackPointer: getStackPointer,
        pop: pop,
        push: push
    };

    function pop() {
        if (stackPointer > 0) {
            return stack[--stackPointer];
        }
        else {
            //TODO: errorHandler STACK_EMPTY
            return 0;
        }
    }

    function push(word) {
        if (stackPointer < MAX_STACK_SIZE) {
            stack[stackPointer++] = word;
        }
        else {
            //TODO: errorHandler STACK_OVERFLOW
        }
    }

    function getStackPointer() {
        return stackPointer;
    }

}