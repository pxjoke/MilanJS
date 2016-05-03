'use strict';

var ArithmeticTypes = (function () {
    function ArithmeticTypes(name) {
        this.name = name;
    }

    var instance = {
        PLUS: new ArithmeticTypes('PLUS'),
        MINUS: new ArithmeticTypes('MINUS'),
        MULTIPLY: new ArithmeticTypes('MULTIPLY'),
        DIVIDE: new ArithmeticTypes('DIVIDE')
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();