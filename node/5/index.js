const {readData} = require('../utilities')
const R = require('ramda')

var data = readData('jumps.txt');
var list = data.split("\n")
list = list.map(i => parseInt(i))
let list2 = R.clone(list)

const isInside = (idx, list) => idx >= 0 && idx < list.length

// Part 1
let idx = 0, count = 0
while (isInside(idx, list)) {
  let j = list[idx]
  list[idx]++
  idx = idx + j
  count++
}

console.log('Part 1: '+count)

// Part 2
idx = 0
count = 0
while (isInside(idx, list2)) {
  let j = list2[idx]
  if (j >= 3) {
  // if (Math.abs(j) >= 3) {
    list2[idx]--
  } else {
    list2[idx]++
  }
  idx = idx + j
  count++
}

console.log('Part 2: '+count)