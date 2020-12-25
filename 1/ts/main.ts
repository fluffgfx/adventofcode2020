// this is implementation 2, as described in the Haskell file
// i got sick of working with haskell on like the first day
// not specifically the language but all the tooling behind it made no sense

// First, imports (too lazy to handle this through piping in node)
// The proper way to run this from the root directory is npx ts-node 1/ts/main.ts
import * as fs from 'fs'

// Some typings
// The Duple and Truple typings are probably entirely unnecessary but fun to say out loud
// Truple!
type Comparator<T> = (a: T, b: T) => boolean
type Sorter<T> = (comparator: Comparator<T>) => (array: Array<T>) => Array<T>
type Duple<T> = [T, T]
type Truple<T> = [T, T, T]
type Part1Solver = (n: number) => (a: number[]) => Duple<number>
type Part2Solver = (n: number) => (a: number[]) => Truple<number>

// Read the whole file into a list (it turns out map(parseInt) doesn't work and in fact breaks everything)
const nums = fs.readFileSync('./1/input.txt').toString().split("\n").map((s) => parseInt(s)).filter(x => !isNaN(x))

// split an array in two
// basic part of any mergesort implementation, which i do manually cuz it's good warmup?
const split: (a: number[]) => Duple<number[]> = (a) => {
    const half = Math.ceil(a.length / 2)
    return [a.splice(0, half), a.splice(-half)]
}

// merge an array smartly
// mergesorts are straightforward enough, we have two arrays, presumably sorted, we take the smallest number
// from the top of either of those arrays (whichever is smaller) put it on top and then merge the rest
// this is CS101 etc etc
const merge: (comparator: Comparator<number>) => (a: Duple<number[]>) => number[] = (c) => (a) => {
    let [left, right] = a
    if (left.length === 0 && right.length === 0) return []
    if (right.length === 0) return left
    if (left.length === 0) return right
    const front = <number>(c(left[0], right[0]) ? right.shift() : left.shift())
    return [front, ...merge(c)([left, right])]
}

// the number of times i have to cast to number is far too high because shift() returns are maybe undefined
// even though i check earlier in the code that the length is high enough that it should never return
// undefined... lol
// this does what it says on the tin, take a comparator and an array, if the array is small enough it's
// already sorted, if it's of length 2 then just check to see if it needs to be swapped, any bigger and
// we split it in half, sort the halves, and merge the halves
const mergeSort: Sorter<number> = (comparator) => (array) => {
    switch(array.length) {
        case 0: return [];
        case 1: return array;
        case 2: return comparator(array[0], array[1]) ? [array[1], array[0]] : [array[0], array[1]]
        default: return merge(comparator)(<Duple<number[]>>(split(array).map(mergeSort(comparator))))
    }
}

// there was no point (in any "quick and dirty" sense) to genericize the merge sort i was building for
// one specific purpose, but i did anyway, so i get to write this line of code
const bigger: Comparator<number> = (a, b) => a > b

// all done
// we note this is an O(n log n) sort in the worst case, and the following doublesolve will iterate through
// the inputs only once, so we can reduce the entire problem to complexity O(n log n) and omit the +n that
// would come of that. this is better than my original O(n^2) solution which runs faster probably anyway
// because i wrote that one in haskell. BUT I HATE THE TOOLING
const sorted = mergeSort(bigger)(nums)

// technically the "solution" is the uh, product of these two numbers we find but i'm lazy. just punch that
// into a calculator or something.
const doubleSolve: Part1Solver = (n) => (a) => {
    if (a.length < 2) return [0, 0]
    const l = <number>a.shift();
    const r = <number>a.pop();
    const sum = l + r
    if (sum === n) return [l, r]
    if (sum > n) return doubleSolve(n)([l, ...a])
    return doubleSolve(n)([...a, r])
}

// this triplesolver is technically an O(n^2 log n) solution i think, because we iterate over the entire
// set to solve it, n * n log n. have i brushed up on my logarithmic properties to check this is a technically
// correct notation? no i have not.
const tripleSolve: Part2Solver = (n) => (a) => {
    return a.map((i) => <Truple<number>>[i, ...doubleSolve(n - i)(a)]).filter(r => r[1] !== 0)[0]
}

console.log(doubleSolve(2020)(sorted))
console.log(tripleSolve(2020)(sorted))