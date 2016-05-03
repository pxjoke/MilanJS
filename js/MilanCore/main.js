'use strict';

console.log('hello');

var tokens = new Token();
var cmp = new Cmp();
var arithmetic = new Arithmetic();
var keywords = new Keywords();
var hello = 'Hello';
var scanner = new Scanner(' +  begin end');

var command = new Command(Opcodes.get().LOAD, 15);
console.dir(command);

var str = command.getStr(47);
console.log(str);

// scanner = new Scanner("/* Greatest common divisor */" +
//     "BEGIN\n " +
//     "a := READ;" +
//     "b := READ;" +
//     "WHILE a != b DO " +
//     "IF a < b THEN " +
//     "b := b - a " +
//     "ELSE " +
//     "a := a - b " +
//     "FI " +
//     "OD ;" +
//     "WRITE(a) " +
//     "END " +
//     "$");
//
// while (scanner.token !== tokens.EOF) {
//     console.log(scanner.token + ' : '+scanner.value);
//     scanner.nextToken();
// }
// console.log(scanner.token + ' : '+scanner.value);

