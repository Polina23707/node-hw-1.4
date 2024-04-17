const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { boolean, command } = require('yargs');

const readline = require('readline');
const fs = require('fs');

const argv = yargs(hideBin(process.argv));

let logFileName = argv.argv._[0]
console.log(`Имя файла для логирования: ${logFileName}`);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var sideCoin = [["1", "Орел"], ["2", "Решка"]];

function start() {
  console.log('Введите 1 (Орел), 2 (Решка):');
}

start();

rl.on('line', function (cmd) {
  let rand = Math.floor(Math.random() * sideCoin.length);

  let string = '';

  if ((cmd === '1') || (cmd === '2')) {
    console.log('Вы ввели "' + cmd + '", Было загадано "' + sideCoin[rand][0] + '"');
    if (cmd === sideCoin[rand][0]) {
      console.log('Вы выиграли!');
      string = "1\n";
    } else {
      console.log('Вы проиграли.');
      string = "0\n";
    }

    fs.appendFile(`${logFileName}.txt`, string, function (err) {
      if (err) {
        throw err;
      }
    });

  } else {
    console.log('Введенное значение недопустимо');
  }
  start();
});