'use strict';

var CompareTypes = (function () {
    function CompareType(name, code) {
        this.name = name;
        this.code = code;
    }

    var instance = {
        EQ: new CompareType('EQ', 0),
        NE: new CompareType('NE', 1),
        LT: new CompareType('LT', 2),
        LE: new CompareType('LE', 3),
        GT: new CompareType('GT', 4),
        GE: new CompareType('GE', 5)
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();