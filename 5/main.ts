import * as fs from 'fs'
const lines = fs.readFileSync('./5/input.txt').toString().split("\n").filter(l => l !== "")

type Seat = [number, number]
type BSPReducer = (range: [number, number], input: string) => [number, number]

const rreducer: (l: string) => BSPReducer = (upperLetter: string) => 
  ([min, max], input) => <[number, number]>
    (input === upperLetter ? [Math.floor((max - min + 1) / 2) + min, max] : [min, Math.floor((max - min + 1) / 2) + min - 1])

const logger: (f: BSPReducer) => BSPReducer = (f) => (a, b) => {
    console.log(a, b)
    return f(a, b)
}

const lineToSeat = (line: string): Seat => {
    const rowBSP = line.slice(0, -3)
    const colBSP = line.slice(-3)
    const row = rowBSP.split("").reduce(rreducer("B"), [0, 127])[0]
    const col = colBSP.split("").reduce(rreducer("R"), [0, 8])[0]
    return [row, col]
}

const seatToID = ([row, col]: Seat): number => (row * 8) + col

const seats = lines.map(lineToSeat)
const ids = seats.map(seatToID)
const highestId = ids.reduce((p, v) => v > p ? v : p)

// not implementing my own merge sort again lol
// that was strictly 4fun
const sortedIds = ids.sort((a, b) => {
    if (a === b) {
        return 0
    } else {
        return a > b ? 1 : -1
    }
})

const askewIds = sortedIds.map(i => i - sortedIds[0]).filter((i, x) => x !== i).map(i => i + sortedIds[0])
const missingId = askewIds[0] - 1

// part 1
console.log(highestId)

// part 2
console.log(missingId)