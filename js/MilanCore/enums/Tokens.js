'use strict';

var Tokens = (function () {
    function Token(name, isKeyword) {
        this.name = name;
        var isKeyword = isKeyword;
        this.isKeyword = function() {
            return isKeyword;
        }
    }

    var instance = {
        EOF        : new Token('EOF',        false), // Признак конца файла
        ILLEGAL    : new Token('ILLEGAL',    false), // Признак недопустимого символа
        IDENTIFIER : new Token('IDENTIFIER', false), // Идентификатор
        NUMBER     : new Token('NUMBER',     false), // Целочисленный литерал
        BEGIN      : new Token('BEGIN',      true),  // Ключевое слово "begin"
        END        : new Token('END',        true),  // Ключевое слово "end"
        IF         : new Token('IF',         true),  // Ключевое слово "if"
        THEN       : new Token('THEN',       true),  // Ключевое слово "then"
        ELSE       : new Token('ELSE',       true),  // Ключевое слово "else"
        FI         : new Token('FI',         true),  // Ключевое слово "fi"
        WHILE      : new Token('WHILE',      true),  // Ключевое слово "while"
        DO         : new Token('DO',         true),  // Ключевое слово "do"
        OD         : new Token('OD',         true),  // Ключевое слово "od"
        WRITE      : new Token('WRITE',      true),  // Ключевое слово "write"
        READ       : new Token('READ',       true),  // Ключевое слово "read"
        FOR        : new Token('FOR',        true),  // Ключевое слово "for"
        ASSIGN     : new Token('ASSIGN',     false), // Оператор ":="
        THREEDOT   : new Token('THREEDOT',   false), // Оператор "..."
        ADDOP      : new Token('ADDOP',      false), // Сводная лексема для "+" и "-"
        MULOP      : new Token('MULOP',      false), // Сводная лексема для "*" и "/"
        CMP        : new Token('CMP',        false), // Сводная лексема для операторов отношения
        LPAREN     : new Token('LPAREN',     false), // Открывающая скобка
        RPAREN     : new Token('RPAREN',     false), // Закрывающая скобка
        SEMICOLON  : new Token('SEMICOLON',  false)  // ";"
    };
    
    function get() {
        return instance;
    }

    function isKeyword(word) {
        return instance[word] && instance[word].isKeyword();
    }
    
    return {
        get: get,
        isKeyword: isKeyword
    };

})();

