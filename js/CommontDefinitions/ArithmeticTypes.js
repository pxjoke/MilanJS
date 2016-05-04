'use strict';

var ArithmeticTypes = (function () {
    function ArithmeticType(name) {
        this.name = name;
    }

    var instance = {
        PLUS:     new ArithmeticType('PLUS'),
        MINUS:    new ArithmeticType('MINUS'),
        MULTIPLY: new ArithmeticType('MULTIPLY'),
        DIVIDE:   new ArithmeticType('DIVIDE')
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();