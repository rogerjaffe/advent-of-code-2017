const {readData} = require('../utilities')
const R = require('ramda')

// Which direction should we look given the direction we're going
const lookAheadDirection = {N: 'W', W: 'S', S: 'E', E: 'N'}

// Direction vectors to get to new position
const vectors = {
  E: {x:1, y:0},
  W: {x:-1, y:0},
  N: {x:0, y:1},
  S: {x:0, y:-1}
}

const coordToIdx = (ms, off, x, y) => ((x + off) * ms) + (y + off)

const idxToCoord = (ms, off, idx) => ({
  x: (idx % ms) - off,
  y: parseInt(idx / ms) - off
})

class Grid {
  constructor(count) {
    this.maxSize = Math.ceil(Math.sqrt(count))
    this.maxSize = (this.maxSize % 2 === 0) ? this.maxSize : this.maxSize+1
    this.offset = this.maxSize / 2
    this.grid = {};
    this.x = 0;
    this.y = 0;
    this.nextDir = 'E'
  }
  
  getNextMove() {
    let vector = vectors[this.nextDir]
    let newPos = {
      x: this.x+vector.x,
      y: this.y+vector.y,
      nextDir: this.nextDir
    }

    let checkThisDir = lookAheadDirection[this.nextDir]
    vector = vectors[checkThisDir]
    if (this.isNotFilled(newPos, vector)) {
      newPos.nextDir = checkThisDir
    }
    return newPos
  }
  
  isNotFilled(pos, vector) {
    return this.getSquare(pos.x+vector.x, pos.y+vector.y) === undefined
  }
  
  getSquare(x, y) {
    return this.grid[coordToIdx(this.maxSize, this.offset, x, y)]
  }
  
  sumSurrounding(x, y) {
    let i=[-1,0,1], j=[-1,0,1]
    return R.reduce((sum, iVal) => {
      return R.reduce((sum, jVal) => {
        let s = this.getSquare(x+iVal, y+jVal)
        return (s !== undefined) ? sum + s : sum
      }, sum, j)
    }, 0, i)
  }
  
  place(newPos) {
    // console.log(newPos)
    let idx = coordToIdx(this.maxSize, this.offset, newPos.x, newPos.y)
    this.grid[idx] = newPos.val
    // console.log(newPos.val+' '+newPos.x+' '+newPos.y+' '+idx)
    // console.log(idxToCoord(this.maxSize, this.offset, idx))
    // console.log('---')
    this.x = newPos.x
    this.y = newPos.y
    this.nextDir = newPos.nextDir
    return this
  }
  
  getDistance() {
    return Math.abs(this.x) + Math.abs(this.y)
  }
}

// Part 1
// let data = 1024;
var data = 361527;

let grid = new Grid(data)
grid.place({x:0, y:0, nextDir: 'N', val:1})
grid.place({x:1, y:0, nextDir: 'N', val:2})

for (let i=3; i<=data; i++) {
  let newPos = grid.getNextMove()
  newPos.val = i
  grid = grid.place(newPos)
}

console.log('Distance: '+grid.getDistance())

// Part 2
grid = new Grid(data)
grid.place({x:0, y:0, nextDir: 'N', val:1})
grid.place({x:1, y:0, nextDir: 'N', val:1})

let found = false
for (let i=3; i<=data && !found; i++) {
  let newPos = grid.getNextMove()
  newPos.val = grid.sumSurrounding(newPos.x, newPos.y)
  if (newPos.val > data) {
    console.log('Found it: '+newPos.val)
    found = true
  }
  grid = grid.place(newPos)
  console.log('Square: '+i)
  console.log(newPos)
  console.log('----')
}

