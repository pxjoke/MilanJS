'use strict';

var CompareTypes = (function () {
    function CompareTypes(name, code) {
        this.name = name;
        this.code = code;
    }

    var instance = {
        EQ: new CompareTypes('EQ', 0),
        NE: new CompareTypes('NE', 1),
        LT: new CompareTypes('LT', 2),
        LE: new CompareTypes('LE', 3),
        GT: new CompareTypes('GT', 4),
        GE: new CompareTypes('GE', 5)
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();