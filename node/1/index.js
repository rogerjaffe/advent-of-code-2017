const {readData} = require('../utilities')
const R = require('ramda')

var data = readData('data.txt');
data = R.map(n => parseInt(n), data.split(""))

let len = data.length
let sum = 0

for (let i = 0; i<len; i++) {
  let l
  let f = data[i]
  if (i === len-1) {
    l = data[0]
  } else {
    l = data[i+1]
  }
  if (f === l) {
    sum += f
  }
}

console.log('Part 1: '+sum)

let sum2 = 0
let hw = parseInt(len / 2)
for (let i = 0; i<hw; i++) {
  let l=data[i+(hw)]
  let f=data[i]
  if (l === f) sum2 += f
}

console.log('Part 2: '+(sum2*2))
