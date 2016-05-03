'use strict';

function Token() {
        this.EOF        = 'EOF';        // Признак конца файла
        this.ILLEGAL    = 'ILLEGAL';    // Признак недопустимого символа
        this.IDENTIFIER = 'IDENTIFIER'; // Идентификатор
        this.NUMBER     = 'NUMBER';     // Целочисленный литерал
        this.BEGIN      = 'BEGIN';      // Ключевое слово "begin"
        this.END        = 'END';        // Ключевое слово "end"
        this.IF         = 'IF';         // Ключевое слово "if"
        this.THEN       = 'THEN';       // Ключевое слово "then"
        this.ELSE       = 'ELSE';       // Ключевое слово "else"
        this.FI         = 'FI';         // Ключевое слово "fi"
        this.WHILE      = 'WHILE';      // Ключевое слово "while"
        this.DO         = 'DO';         // Ключевое слово "do"
        this.OD         = 'OD';         // Ключевое слово "od"
        this.WRITE      = 'WRITE';      // Ключевое слово "write"
        this.READ       = 'READ';       // Ключевое слово "read"
        this.ASSIGN     = 'ASSIGN';     // Оператор ":="
        this.ADDOP      = 'ADDOP';      // Сводная лексема для "+" и "-"
        this.MULOP      = 'MULOP';      // Сводная лексема для "*" и "/"
        this.CMP        = 'CMP';        // Сводная лексема для операторов отношения
        this.LPAREN     = 'LPAREN';     // Открывающая скобка
        this.RPAREN     = 'RPAREN';     // Закрывающая скобка
        this.SEMICOLON  = 'SEMICOLON';  // ";"

}
