'use strict';

console.log('hello');

var hello = 'Hello';
var scanner = new Scanner(' +  begin end');

var command = new Command(Opcodes.get().LOAD, 15);
console.dir(command);

var str = command.getStr(47);
console.log(str);

scanner = new Scanner("/* Greatest common divisor */" +
    "BEGIN\n " +
    "a := READ;" +
    "b := READ;" +
    "WHILE a != b DO " +
    "IF a < b THEN " +
    "b := b - a " +
    "ELSE " +
    "a := a - b " +
    "FI " +
    "OD ;" +
    "WRITE(a) " +
    "END " +
    "$");

while (scanner.token !== Tokens.get().EOF) {
    scanner.nextToken();
    console.log(scanner.token);
    console.log(scanner.value);
}

