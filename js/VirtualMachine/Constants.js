'use strict';

var Constants = (function () {

    var instance = {
        MAX_PROGRAM_SIZE: 65536,
        MAX_DATA_ADDRESS: 65536,
        MAX_STACK_SIZE: 8192
    };

    function get() {
        return instance;
    }

    return {
        get: get
    };
})();