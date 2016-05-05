'use strict';

console.log('hello');

var hello = 'Hello';
var scanner = new Scanner(' +  begin end');

var command = new Command(Opcodes.get().LOAD, 15);

var ce = new CodeEmitter('hello\n');

// ce.emit(Opcodes.get().PUSH, 25);
// ce.emit(Opcodes.get().LOAD, 13);
// ce.makeHole();
// ce.emit(Opcodes.get().STOP);
// ce.emitAt(1, Opcodes.get().ADD);
// console.log(ce.flush());

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



// scanner = new Scanner("/* Greatest common divisor */" +
//     "BEGIN\n " +
//     "a := READ;" +
//     "b := READ;" +
//     "b := b - 3*(6-a)/241; " +
//     "a := a - b; " +
//     "a := -----4; " +
//     "END " +
//     "$");

scanner = new Scanner(undefined);


// while (scanner.token !== Tokens.get().EOF) {
//     scanner.nextToken();
//     console.log(scanner.token);
//     console.log(scanner.value);
// }
//
var parser = new Parser(scanner, '');
console.log(parser.parse());
console.dir(parser.getVarTable());



