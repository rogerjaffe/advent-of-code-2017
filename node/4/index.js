const {readData} = require('../utilities')
const R = require('ramda')

var data = readData('list.txt');
var list = data.split("\n")
var lines = R.map(line => line.split(' '), list)

// Part 1
var valid = R.reduce((total, line) => {
  let dupe = false
  for (let i=0; i<line.length-1 && !dupe; i++) {
    for (let j=i+1; j<line.length && !dupe; j++) {
      if (line[i] === line[j]) dupe = true
    }
  }
  return total + ((dupe) ? 0 : 1)
}, 0, lines)
console.log("Part 1 valid passphrases: "+valid)

// Part 2
var byLetter = R.comparator((a, b) => a < b);
var valid2 = R.reduce((total, line) => {
  line = R.map(word => {
    let lets = word.split('')
    lets = R.sort(byLetter, lets)
    lets = lets.join('')
    return lets
  }, line)

  let dupe = false
  for (let i=0; i<line.length-1 && !dupe; i++) {
    for (let j=i+1; j<line.length && !dupe; j++) {
      if (line[i] === line[j]) dupe = true
    }
  }
  return total + ((dupe) ? 0 : 1)
}, 0, lines)

console.log("Part 2 valid passphrases: "+valid2)
