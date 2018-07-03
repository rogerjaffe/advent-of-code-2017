const {readData} = require('../utilities')
const R = require('ramda')

var data = readData('data.csv');

data = data.split("\n")
data = R.init(R.map(d => d.split("\t"), data))

let sorted = R.map(row => {
  row = R.sort((a,b) => parseInt(a)-parseInt(b), row)
  return R.last(row) - R.head(row)
}, data)

let sum = R.reduce((a, v) => a+v, 0, sorted)

console.log('Part 1: '+sum)
// answer 36766

let sum2 = 0

let checked = R.map(row => {
  let found = false
  row = R.map(v => parseInt(v), row)
  for (let i=0; i<row.length-1 && !found; i++) {
    for (let j=i+1; j<row.length && !found; j++) {
      let max = R.max(row[i], row[j])
      let min = R.min(row[i], row[j])
      if (max % min === 0) {
        sum2 += parseInt(max / min)
        found = true
      }
    }
  }
}, data)

console.log('Part 2: '+sum2)