import * as fs from 'fs'
const lines = fs.readFileSync('./3/input.txt').toString().split("\n").filter(l => l !== "")

// this one seems fairly simple just iterate over each downward thing
type Row = boolean[]

const lineToRow = (line: string) => line.split("").map(c => c === "#")

const rows = lines.map(lineToRow)

const traverseRows = (slope: number) => (collisions: number, row: Row, index: number) => {
    const position = (slope * index) % row.length
    return row[position] ? collisions + 1 : collisions
}

const slope1 = rows.reduce(traverseRows(1), 0)
const slope3 = rows.reduce(traverseRows(3), 0)
const slope5 = rows.reduce(traverseRows(5), 0)
const slope7 = rows.reduce(traverseRows(7), 0)

const traverseRowsSteep = (slope: number) => (collisions: number, row: Row, index: number) => {
    if (index % slope !== 0) return collisions
    const position = Math.floor(index / slope) % row.length
    return row[position] ? collisions + 1 : collisions
}

const slope2Steep = rows.reduce(traverseRowsSteep(2), 0)

// first solution
console.log(slope3)

// second solution
console.log(slope1*slope3*slope5*slope7*slope2Steep)