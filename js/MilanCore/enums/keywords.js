'use strict';

function Keywords() {
    var token = new Token();

    this.begin = token.BEGIN;
    this.end   = token.END;
    this.if    = token.IF;
    this.then  = token.THEN;
    this.else  = token.ELSE;
    this.fi    = token.FI;
    this.while = token.WHILE;
    this.do    = token.DO;
    this.od    = token.OD;
    this.write = token.WRITE;
    this.read  = token.READ;
}